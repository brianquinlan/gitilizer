#!/usr/bin/env bash
# Stores the four OAuth client secrets (LAUNCH_PLAN.md, Phase 5) without them appearing on screen or in
# the shell history. Run it yourself, after creating the Google clients and GitHub OAuth apps.
#   bash infra/oauth-secrets.sh
source "$(dirname "$0")/config.sh"

for env in prod dev; do
  for p in google github; do
    name=$env-$p-client-secret
    if gcloud secrets describe "$name" >/dev/null 2>&1; then
      read -r -p "$name exists. Add a new version? [y/N] " yn
      [[ $yn == [yY] ]] || continue
      read -r -s -p "Paste the $([ $env = prod ] && echo production || echo development) $p client secret: " v; echo
      printf %s "$v" | gcloud secrets versions add "$name" --data-file=- >/dev/null
    else
      read -r -s -p "Paste the $([ $env = prod ] && echo production || echo development) $p client secret: " v; echo
      printf %s "$v" | gcloud secrets create "$name" --replication-policy=user-managed --locations="$REGION" --data-file=- >/dev/null
    fi
    unset v
    gcloud secrets add-iam-policy-binding "$name" --member="serviceAccount:$(sa run-$env)" \
      --role=roles/secretmanager.secretAccessor --quiet >/dev/null
    echo "  ✓ $name (readable by run-$env only)"
  done
done
echo "A new secret version reaches a service at its next deployment."
