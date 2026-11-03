#!/usr/bin/env bash
# The deployment pipeline's Google Cloud side (DEPLOYMENT.md; LAUNCH_PLAN.md, Phases 6 and 7):
#   - the Cloud Build trigger that builds every commit on main and deploys it to development, and
#   - Workload Identity Federation, so the Release workflow in GitHub Actions can deploy to production
#     with no stored key, and only from the `production` environment that you approve.
# Needs the GitHub connection made in the console first (Cloud Build → Repositories → 2nd gen, region
# us-east4, connection "github", repository "gitilizer").
#   bash infra/pipeline.sh
source "$(dirname "$0")/config.sh"

step "Cloud Build trigger"
repository=projects/$PROJECT/locations/$REGION/connections/github/repositories/gitilizer
gcloud builds repositories describe gitilizer --connection=github --region="$REGION" >/dev/null 2>&1 || {
  echo "  The repository isn't linked yet: Cloud Build → Repositories → 2nd gen → Link repository (connection github)."
  exit 1
}
ensure "trigger deploy-dev" gcloud builds triggers describe deploy-dev --region="$REGION" -- \
  gcloud builds triggers create github --name=deploy-dev --region="$REGION" \
    --repository="$repository" --branch-pattern='^main$' --build-config=cloudbuild.yaml \
    --service-account="projects/$PROJECT/serviceAccounts/$(sa deploy-dev)" \
    --description="Every commit on main: build the image, deploy it to gitilizer-dev"

step "Workload Identity Federation for the Release workflow"
repo_id=$(curl -fsS "https://api.github.com/repos/$REPO" | jq -r .id)
ensure "pool github" gcloud iam workload-identity-pools describe github --location=global -- \
  gcloud iam workload-identity-pools create github --location=global --display-name="GitHub Actions"
# Matching the numeric repository ID means a renamed or recreated repository can't deploy, and only jobs in
# the `production` environment (which needs the owner's approval) get a token at all.
ensure "provider gitilizer-repo" gcloud iam workload-identity-pools providers describe gitilizer-repo --location=global --workload-identity-pool=github -- \
  gcloud iam workload-identity-pools providers create-oidc gitilizer-repo \
    --location=global --workload-identity-pool=github \
    --issuer-uri=https://token.actions.githubusercontent.com \
    --attribute-mapping=google.subject=assertion.sub,attribute.repository_id=assertion.repository_id,attribute.environment=assertion.environment \
    --attribute-condition="assertion.repository_id=='$repo_id' && assertion.environment=='production'"
gcloud iam service-accounts add-iam-policy-binding "$(sa deploy-prod)" --role=roles/iam.workloadIdentityUser \
  --member="principal://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/subject/repo:$REPO:environment:production" \
  --quiet >/dev/null
echo "  ✓ only repo:$REPO:environment:production may act as deploy-prod"

cat <<VARS

In GitHub → Settings → Environments → production → Environment variables:
  WIF_PROVIDER = projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/gitilizer-repo
  DEPLOY_SA    = $(sa deploy-prod)
VARS
