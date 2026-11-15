#!/usr/bin/env bash
# Stores the secrets of the Gitilizer GitHub Apps (DEPLOYMENT.md, "The Gitilizer GitHub App") without them
# appearing on screen or in the shell history. Run it yourself, after registering the apps.
#   bash infra/github-app-secrets.sh            # the client secrets
#   bash infra/github-app-secrets.sh dev key.pem  # also an app's private key, which is optional
# The private key only serves the "waiting for an owner to approve" rows in Settings (DESIGN.md, D-19).
source "$(dirname "$0")/config.sh"

store() { # name, then the value on stdin
  local name=$1
  if gcloud secrets describe "$name" >/dev/null 2>&1; then
    gcloud secrets versions add "$name" --data-file=- >/dev/null
  else
    gcloud secrets create "$name" --replication-policy=user-managed --locations="$REGION" --data-file=- >/dev/null
  fi
  local env=${name%%-*}
  gcloud secrets add-iam-policy-binding "$name" --member="serviceAccount:$(sa run-$env)" \
    --role=roles/secretmanager.secretAccessor --quiet >/dev/null
  echo "  ✓ $name (readable by run-$env only)"
}

if [[ $# -eq 2 ]]; then
  env=$1; pem=$2
  [[ $env == dev || $env == prod ]] || { echo "dev or prod"; exit 2; }
  grep -q "PRIVATE KEY" "$pem" || { echo "$pem isn't a private key (.pem) file"; exit 2; }
  store "$env-github-app-private-key" <"$pem"
  echo "Delete $pem now: GitHub can generate another, and the app keeps working with either."
elif [[ $# -eq 0 ]]; then
  for env in prod dev; do
    name=$env-github-app-client-secret
    if gcloud secrets describe "$name" >/dev/null 2>&1; then
      read -r -p "$name exists. Add a new version? [y/N] " yn
      [[ $yn == [yY] ]] || continue
    fi
    read -r -s -p "Paste the $([ $env = prod ] && echo production || echo development) Gitilizer app's client secret: " v; echo
    [[ -n $v ]] || { echo "  … skipped"; continue; }
    printf %s "$v" | store "$name"
    unset v
  done
else
  echo "Usage: bash infra/github-app-secrets.sh [dev|prod key.pem]"; exit 2
fi
echo "A new secret version reaches a service at its next deployment (infra/services.sh)."
