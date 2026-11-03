#!/usr/bin/env bash
# APIs, Artifact Registry, service accounts and their permissions, Cloud SQL, and the generated secrets
# (LAUNCH_PLAN.md, Phase 3). Safe to run again: it creates only what is missing.
#   bash infra/foundation.sh
source "$(dirname "$0")/config.sh"

step "APIs"
gcloud services enable run.googleapis.com sqladmin.googleapis.com artifactregistry.googleapis.com \
  cloudbuild.googleapis.com secretmanager.googleapis.com compute.googleapis.com \
  certificatemanager.googleapis.com iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com \
  monitoring.googleapis.com logging.googleapis.com cloudresourcemanager.googleapis.com
echo "  ✓ enabled"

step "Artifact Registry"
ensure "repository gitilizer" gcloud artifacts repositories describe gitilizer --location="$REGION" -- \
  gcloud artifacts repositories create gitilizer --repository-format=docker --location="$REGION" \
    --description="Gitilizer images, tagged with the commit SHA"

step "Service accounts"
for a in run-prod run-dev deploy-dev deploy-prod; do
  ensure "$a" gcloud iam service-accounts describe "$(sa $a)" -- gcloud iam service-accounts create "$a"
done
# Both runtimes connect to Cloud SQL through the connector. The database boundary is the Postgres user,
# whose password only that environment's account can read.
for a in run-prod run-dev; do
  gcloud projects add-iam-policy-binding "$PROJECT" --member="serviceAccount:$(sa $a)" \
    --role=roles/cloudsql.client --condition=None --quiet >/dev/null
done
# Cloud Build (deploy-dev) pushes images, writes build logs and deploys as run-dev.
gcloud artifacts repositories add-iam-policy-binding gitilizer --location="$REGION" \
  --member="serviceAccount:$(sa deploy-dev)" --role=roles/artifactregistry.writer --quiet >/dev/null
gcloud projects add-iam-policy-binding "$PROJECT" --member="serviceAccount:$(sa deploy-dev)" \
  --role=roles/logging.logWriter --condition=None --quiet >/dev/null
gcloud iam service-accounts add-iam-policy-binding "$(sa run-dev)" \
  --member="serviceAccount:$(sa deploy-dev)" --role=roles/iam.serviceAccountUser --quiet >/dev/null
# The release workflow (deploy-prod) reads images and deploys as run-prod.
gcloud artifacts repositories add-iam-policy-binding gitilizer --location="$REGION" \
  --member="serviceAccount:$(sa deploy-prod)" --role=roles/artifactregistry.reader --quiet >/dev/null
gcloud iam service-accounts add-iam-policy-binding "$(sa run-prod)" \
  --member="serviceAccount:$(sa deploy-prod)" --role=roles/iam.serviceAccountUser --quiet >/dev/null
echo "  ✓ permissions (run.developer on each service is granted by services.sh, once the service exists)"

step "Default service accounts: no project-wide Editor (design: Deployment)"
for m in "serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" "serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com"; do
  if gcloud projects get-iam-policy "$PROJECT" --flatten=bindings --filter="bindings.role=roles/editor AND bindings.members=$m" --format='value(bindings.role)' | grep -q editor; then
    gcloud projects remove-iam-policy-binding "$PROJECT" --member="$m" --role=roles/editor --condition=None --quiet >/dev/null
    echo "  - removed Editor from $m"
  else
    echo "  ✓ $m has no Editor"
  fi
done

step "Cloud SQL (a few minutes the first time)"
ensure "instance $SQL_INSTANCE" gcloud sql instances describe "$SQL_INSTANCE" -- \
  gcloud sql instances create "$SQL_INSTANCE" \
    --database-version=POSTGRES_17 --edition=ENTERPRISE --tier=db-g1-small \
    --region="$REGION" --storage-type=SSD --storage-size=10 --storage-auto-increase \
    --backup-start-time=09:00 --retained-backups-count=180 \
    --enable-point-in-time-recovery --retained-transaction-log-days=7 \
    --maintenance-window-day=SUN --maintenance-window-hour=10 \
    --deletion-protection
for db in gitilizer gitilizer_dev; do
  ensure "database $db" gcloud sql databases describe "$db" --instance="$SQL_INSTANCE" -- \
    gcloud sql databases create "$db" --instance="$SQL_INSTANCE"
done

new_secret() { # name, value on stdin
  gcloud secrets create "$1" --replication-policy=user-managed --locations="$REGION" --data-file=- >/dev/null
}

step "Database users and their connection strings (generated; no one needs to see them)"
for env in prod dev; do
  user=gitilizer_$env
  db=$([ "$env" = prod ] && echo gitilizer || echo gitilizer_dev)
  if gcloud secrets describe "$env-database-url" >/dev/null 2>&1; then
    echo "  ✓ $user and $env-database-url"
    continue
  fi
  pw=$(openssl rand -hex 24)
  if gcloud sql users list --instance="$SQL_INSTANCE" --format='value(name)' | grep -qx "$user"; then
    gcloud sql users set-password "$user" --instance="$SQL_INSTANCE" --password="$pw" >/dev/null
  else
    gcloud sql users create "$user" --instance="$SQL_INSTANCE" --password="$pw" >/dev/null
  fi
  printf 'postgresql://%s:%s@/%s?host=/cloudsql/%s' "$user" "$pw" "$db" "$SQL" | new_secret "$env-database-url"
  echo "  + $user and $env-database-url"
done

step "Credential keys and worker tokens"
for env in prod dev; do
  ensure "$env-credential-key" gcloud secrets describe "$env-credential-key" -- \
    bash -c "openssl rand -base64 32 | tr -d '\n' | gcloud secrets create $env-credential-key --replication-policy=user-managed --locations=$REGION --data-file=- >/dev/null"
  ensure "$env-worker-token" gcloud secrets describe "$env-worker-token" -- \
    bash -c "openssl rand -hex 32 | tr -d '\n' | gcloud secrets create $env-worker-token --replication-policy=user-managed --locations=$REGION --data-file=- >/dev/null"
done

step "Secret access: each environment reads its own secrets only"
for env in prod dev; do
  for s in database-url credential-key worker-token google-client-secret github-client-secret; do
    if gcloud secrets describe "$env-$s" >/dev/null 2>&1; then
      gcloud secrets add-iam-policy-binding "$env-$s" --member="serviceAccount:$(sa run-$env)" \
        --role=roles/secretmanager.secretAccessor --quiet >/dev/null
      echo "  ✓ run-$env → $env-$s"
    else
      echo "  … $env-$s doesn't exist yet (infra/oauth-secrets.sh), run this script again afterwards"
    fi
  done
done

cat <<SQLNOTE

Last step, once: give each database user its own database and nothing else.
  gcloud sql users set-password postgres --instance=$SQL_INSTANCE --prompt-for-password
  gcloud sql connect $SQL_INSTANCE --user=postgres
then paste:
  GRANT gitilizer_prod TO postgres;
  GRANT gitilizer_dev TO postgres;
  ALTER DATABASE gitilizer OWNER TO gitilizer_prod;
  ALTER DATABASE gitilizer_dev OWNER TO gitilizer_dev;
  REVOKE ALL ON DATABASE gitilizer FROM PUBLIC;
  REVOKE ALL ON DATABASE gitilizer_dev FROM PUBLIC;
SQLNOTE
