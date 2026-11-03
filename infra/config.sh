# Shared settings for the infra/ scripts. Each script sources this file.
# Run the scripts from the repository root in Cloud Shell, signed in as the project owner:
#   bash infra/foundation.sh
set -euo pipefail

export PROJECT=${PROJECT:-gitilizer}
export REGION=${REGION:-us-east4}
export REPO=${REPO:-brianquinlan/gitilizer}
export DOMAIN=${DOMAIN:-gitilizer.com}
export SQL_INSTANCE=${SQL_INSTANCE:-gitilizer-pg}
export SQL=$PROJECT:$REGION:$SQL_INSTANCE
export IMAGE=$REGION-docker.pkg.dev/$PROJECT/gitilizer/gitilizer

gcloud config set project "$PROJECT" --quiet >/dev/null 2>&1
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')
export PROJECT_NUMBER

# The service account's email address.
sa() { echo "$1@$PROJECT.iam.gserviceaccount.com"; }

# Runs "$@" only if `describe` fails, so every script can be run again safely.
#   ensure "<what>" <describe command...> -- <create command...>
ensure() {
  local what=$1; shift
  local describe=() create=()
  while [[ $# -gt 0 && $1 != -- ]]; do describe+=("$1"); shift; done
  shift
  create=("$@")
  if "${describe[@]}" >/dev/null 2>&1; then
    echo "  ✓ $what"
  else
    echo "  + $what"
    "${create[@]}"
  fi
}

step() { echo; echo "== $*"; }
