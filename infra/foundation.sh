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

step "Cloud SQL (5 to 10 minutes the first time; safe to stop and run again while it waits)"
# ALLOW_DATA_API lets this script run SQL over HTTPS (gcloud sql instances execute-sql) with the administrator
# password kept in Secret Manager, so no one needs a direct database connection. It needs both IAM permission
# on the instance and a database password, so it opens nothing to the internet.
ensure "instance $SQL_INSTANCE" gcloud sql instances describe "$SQL_INSTANCE" -- \
  gcloud sql instances create "$SQL_INSTANCE" --async \
    --database-version=POSTGRES_17 --edition=ENTERPRISE --tier=db-g1-small \
    --region="$REGION" --storage-type=SSD --storage-size=10 --storage-auto-increase \
    --backup-start-time=09:00 --retained-backups-count=180 \
    --enable-point-in-time-recovery --retained-transaction-log-days=7 \
    --maintenance-window-day=SUN --maintenance-window-hour=10 \
    --data-api-access=ALLOW_DATA_API --deletion-protection
until [[ $(gcloud sql instances describe "$SQL_INSTANCE" --format='value(state)') == RUNNABLE ]]; do
  echo "  … waiting for $SQL_INSTANCE ($(gcloud sql instances describe "$SQL_INSTANCE" --format='value(state)'))"; sleep 20
done
if [[ $(gcloud sql instances describe "$SQL_INSTANCE" --format='value(settings.dataApiAccess)') != ALLOW_DATA_API ]]; then
  gcloud sql instances patch "$SQL_INSTANCE" --data-api-access=ALLOW_DATA_API --quiet >/dev/null
fi
echo "  ✓ $SQL_INSTANCE is running"
for db in gitilizer gitilizer_dev; do
  ensure "database $db" gcloud sql databases describe "$db" --instance="$SQL_INSTANCE" -- \
    gcloud sql databases create "$db" --instance="$SQL_INSTANCE"
done

new_secret() { # name, value on stdin
  gcloud secrets create "$1" --replication-policy=user-managed --locations="$REGION" --data-file=- >/dev/null
}

step "Database administrator password (a regional secret, which execute-sql reads)"
# Regional secrets live behind Secret Manager's regional endpoint.
regional() { CLOUDSDK_API_ENDPOINT_OVERRIDES_SECRETMANAGER="https://secretmanager.$REGION.rep.googleapis.com/" gcloud "$@"; }
if regional secrets describe sql-admin-password --location="$REGION" >/dev/null 2>&1; then
  echo "  ✓ sql-admin-password"
else
  pw=$(openssl rand -hex 24)
  gcloud sql users set-password postgres --instance="$SQL_INSTANCE" --password="$pw" >/dev/null
  printf %s "$pw" | regional secrets create sql-admin-password --location="$REGION" --data-file=- >/dev/null
  unset pw
  echo "  + sql-admin-password (the postgres user's new password)"
fi
admin_password=projects/$PROJECT/locations/$REGION/secrets/sql-admin-password/versions/latest
sql() { # database, statement
  gcloud sql instances execute-sql "$SQL_INSTANCE" --database="$1" --user=postgres \
    --password-secret-version="$admin_password" --sql="$2" --quiet >/dev/null
}

step "Database users: each owns its own database and can't connect to the other's"
# Made with SQL rather than `gcloud sql users create`, whose users join cloudsqlsuperuser and could reach both
# databases. The passwords are generated here and go only into each environment's database-url secret.
for env in prod dev; do
  user=gitilizer_$env
  db=$([ "$env" = prod ] && echo gitilizer || echo gitilizer_dev)
  if gcloud secrets describe "$env-database-url" >/dev/null 2>&1; then
    echo "  ✓ $user and $env-database-url"
    continue
  fi
  pw=$(openssl rand -hex 24)
  sql postgres "DO \$\$ BEGIN
      IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '$user') THEN ALTER ROLE $user WITH LOGIN PASSWORD '$pw';
      ELSE CREATE ROLE $user WITH LOGIN PASSWORD '$pw'; END IF; END \$\$;"
  sql postgres "GRANT $user TO postgres"
  sql postgres "ALTER DATABASE $db OWNER TO $user"
  sql postgres "REVOKE ALL ON DATABASE $db FROM PUBLIC"
  printf 'postgresql://%s:%s@/%s?host=/cloudsql/%s' "$user" "$pw" "$db" "$SQL" | new_secret "$env-database-url"
  unset pw
  echo "  + $user owns $db; $env-database-url"
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
