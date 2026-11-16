#!/usr/bin/env bash
# Stores Gitilizer's own Gemini API keys for basic ranking (DEPLOYMENT.md, "The basic ranking key"), one for
# each environment, without them appearing on screen or in the shell history. Run it yourself, after
# creating the keys in Google AI Studio, in a project with billing turned on.
#   bash infra/basic-ranking-secret.sh          # asks for both
#   bash infra/basic-ranking-secret.sh dev      # or one
source "$(dirname "$0")/config.sh"

for env in ${1:-prod dev}; do
  [[ $env == dev || $env == prod ]] || { echo "dev or prod"; exit 2; }
  name=$env-basic-ranking-key
  label=$([ $env = prod ] && echo production || echo development)
  if gcloud secrets describe "$name" >/dev/null 2>&1; then
    read -r -p "$name exists. Add a new version? [y/N] " yn
    [[ $yn == [yY] ]] || continue
    read -r -s -p "Paste the $label basic ranking key (a Gemini API key on a paid tier): " v; echo
    printf %s "$v" | gcloud secrets versions add "$name" --data-file=- >/dev/null
  else
    read -r -s -p "Paste the $label basic ranking key (a Gemini API key on a paid tier): " v; echo
    printf %s "$v" | gcloud secrets create "$name" --replication-policy=user-managed --locations="$REGION" --data-file=- >/dev/null
  fi
  unset v
  gcloud secrets add-iam-policy-binding "$name" --member="serviceAccount:$(sa run-$env)" \
    --role=roles/secretmanager.secretAccessor --quiet >/dev/null
  echo "  ✓ $name (readable by run-$env only)"
done
echo "A new secret version reaches a service at its next deployment; infra/services.sh sets it on a service."
