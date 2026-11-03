#!/usr/bin/env bash
# Creates or reconfigures a Cloud Run service with all its settings (LAUNCH_PLAN.md, Phases 6 and 7).
# Day-to-day deployments change only the image (cloudbuild.yaml, the Release workflow); this script is for
# the first deployment and for changing settings.
#
#   GOOGLE_CLIENT_ID=... GITHUB_CLIENT_ID=... SIGN_IN_ALLOWLIST="google:you@example.com github-id:1" \
#     bash infra/services.sh dev <commit-sha>
#   GOOGLE_CLIENT_ID=... GITHUB_CLIENT_ID=... bash infra/services.sh prod <commit-sha>
#
# Leave out the SHA to keep the image the service already runs, or give `placeholder` to create the service
# with Google's sample container before any Gitilizer image exists (the Cloud Build trigger then deploys the
# real one). SIGN_IN_ALLOWLIST is never written to the repository: it is read from your shell, or from the
# service's current setting.
source "$(dirname "$0")/config.sh"

env=${1:?"dev or prod"}
sha=${2:-}
case $env in
  dev)  service=gitilizer-dev; url=https://dev.$DOMAIN; name=development ;;
  prod) service=gitilizer-api; url=https://$DOMAIN;     name=production ;;
  *) echo "dev or prod"; exit 2 ;;
esac

current() { gcloud run services describe "$service" --region="$REGION" --format=json 2>/dev/null || true; }
existing=$(current)
setting() { # an environment variable's current value on the service
  [[ -z $existing ]] || jq -r --arg k "$1" '.spec.template.spec.containers[0].env[]? | select(.name==$k) | .value // empty' <<<"$existing"
}

if [[ $sha == placeholder ]]; then image=us-docker.pkg.dev/cloudrun/container/hello
elif [[ -n $sha ]]; then image=$IMAGE:$sha
elif [[ -n $existing ]]; then image=$(jq -r '.spec.template.spec.containers[0].image' <<<"$existing")
else echo "First deployment of $service: give the commit SHA of an image in Artifact Registry, or placeholder."; exit 2
fi
if [[ $image == "$IMAGE":* ]]; then
  gcloud artifacts docker images describe "$image" >/dev/null || { echo "No image $image"; exit 1; }
fi

google_id=${GOOGLE_CLIENT_ID:-$(setting GOOGLE_CLIENT_ID)}
github_id=${GITHUB_CLIENT_ID:-$(setting GITHUB_CLIENT_ID)}
[[ -n $google_id && -n $github_id ]] || { echo "Set GOOGLE_CLIENT_ID and GITHUB_CLIENT_ID (the $name clients' IDs)."; exit 2; }

# One process does everything, with exactly one instance in production (LAUNCH_PLAN.md, L-1). To split the
# scheduler and worker into gitilizer-worker later, see DEPLOYMENT.md, "Splitting production".
vars="GITILIZER_ENV=$([ $env = prod ] && echo production || echo development);NODE_ENV=production;HOST=0.0.0.0"
vars+=";LOG_FORMAT=json;LOG_LEVEL=info;PUBLIC_URL=$url;GOOGLE_CLIENT_ID=$google_id;GITHUB_CLIENT_ID=$github_id"
if [[ $env == dev ]]; then
  allow=${SIGN_IN_ALLOWLIST:-$(setting SIGN_IN_ALLOWLIST)}
  [[ -n $allow ]] || { echo "Development needs SIGN_IN_ALLOWLIST (DEPLOYMENT.md, \"Who can sign in to development\")."; exit 2; }
  vars+=";DATABASE_POOL_MAX=5;SIGN_IN_ALLOWLIST=$allow"
  scaling=(--min-instances=0 --max-instances=1)
else
  vars+=";DATABASE_POOL_MAX=10"
  scaling=(--min-instances=1 --max-instances=1 --no-cpu-throttling)
fi
secrets="DATABASE_URL=$env-database-url:latest,CREDENTIAL_KEY=$env-credential-key:latest,WORKER_TOKEN=$env-worker-token:latest"
secrets+=",GOOGLE_CLIENT_SECRET=$env-google-client-secret:latest,GITHUB_CLIENT_SECRET=$env-github-client-secret:latest"

step "Deploying $service ($name) with $image"
gcloud run deploy "$service" --image="$image" --region="$REGION" \
  --service-account="$(sa run-$env)" \
  --ingress=internal-and-cloud-load-balancing --allow-unauthenticated \
  "${scaling[@]}" --concurrency=1000 --timeout=3600 --cpu=1 --memory=1Gi --cpu-boost \
  --add-cloudsql-instances="$SQL" \
  --set-env-vars="^;^$vars" \
  --set-secrets="$secrets"

step "Who can deploy it"
gcloud run services add-iam-policy-binding "$service" --region="$REGION" \
  --member="serviceAccount:$(sa deploy-$env)" --role=roles/run.developer --quiet >/dev/null
echo "  ✓ deploy-$env may deploy $service, and nothing else"
