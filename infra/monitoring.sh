#!/usr/bin/env bash
# Monitoring and alerts (PRD METRIC-3, METRIC-4, NFR-6; LAUNCH_PLAN.md, Phase 8): log-based metrics from
# the server's structured log lines, an uptime check on https://gitilizer.com/api/health, alert policies that
# email the owner, and one dashboard. Run it after production is serving.
#   ALERT_EMAIL=you@example.com bash infra/monitoring.sh
source "$(dirname "$0")/config.sh"
dir=$(dirname "$0")/monitoring
email=${ALERT_EMAIL:?"Set ALERT_EMAIL to the address that gets the alerts."}

# `gcloud monitoring policies` and `channels` are in beta or alpha depending on the gcloud version.
mon() {
  local kind=$1; shift
  for track in "" beta alpha; do
    if gcloud $track monitoring "$kind" --help >/dev/null 2>&1; then gcloud $track monitoring "$kind" "$@"; return; fi
  done
  echo "This gcloud has no 'monitoring $kind' command; update it with: gcloud components update" >&2; return 1
}

step "Log-based metrics"
for f in "$dir"/*.yaml; do
  name=$(basename "$f" .yaml)
  if gcloud logging metrics describe "$name" >/dev/null 2>&1; then
    gcloud logging metrics update "$name" --config-from-file="$f" >/dev/null && echo "  ✓ $name (updated)"
  else
    gcloud logging metrics create "$name" --config-from-file="$f" >/dev/null && echo "  + $name"
  fi
done

step "Email channel"
channel=$(mon channels list --filter="type=\"email\" AND labels.email_address=\"$email\"" --format='value(name)' | head -1)
if [[ -z $channel ]]; then
  channel=$(mon channels create --display-name="Gitilizer owner" --type=email --channel-labels=email_address="$email" --format='value(name)')
  echo "  + $email"
else
  echo "  ✓ $email"
fi

step "Uptime check"
if gcloud monitoring uptime list-configs --filter="displayName=\"$DOMAIN health\"" --format='value(name)' | grep -q .; then
  echo "  ✓ $DOMAIN health"
else
  gcloud monitoring uptime create "$DOMAIN health" --resource-type=uptime-url \
    --resource-labels=host="$DOMAIN",project_id="$PROJECT" --protocol=https --path=/api/health \
    --period=5 --timeout=10 --matcher-type=contains-string --matcher-content='"ok":true' >/dev/null
  echo "  + $DOMAIN health (every 5 minutes)"
fi

step "Alert policies"
for f in "$dir"/policy-*.json; do
  tmp=$(mktemp)
  # The definitions name Gitilizer's own domain; another copy gets its own.
  sed "s/gitilizer\.com/$DOMAIN/g" "$f" | jq --arg c "$channel" '.notificationChannels = [$c]' > "$tmp"
  title=$(jq -r .displayName "$tmp")
  existing=$(mon policies list --filter="displayName=\"$title\"" --format='value(name)' | head -1)
  if [[ -n $existing ]]; then
    mon policies update "$existing" --policy-from-file="$tmp" >/dev/null && echo "  ✓ $title (updated)"
  else
    mon policies create --policy-from-file="$tmp" >/dev/null && echo "  + $title"
  fi
  rm -f "$tmp"
done

step "Dashboard"
existing=$(gcloud monitoring dashboards list --filter='displayName="Gitilizer"' --format='value(name)' | head -1)
if [[ -n $existing ]]; then
  etag=$(gcloud monitoring dashboards describe "$existing" --format='value(etag)')
  jq --arg e "$etag" '.etag = $e' "$dir/dashboard.json" > "$dir/.dashboard.tmp.json"
  gcloud monitoring dashboards update "$existing" --config-from-file="$dir/.dashboard.tmp.json" >/dev/null && echo "  ✓ Gitilizer (updated)"
  rm -f "$dir/.dashboard.tmp.json"
else
  gcloud monitoring dashboards create --config-from-file="$dir/dashboard.json" >/dev/null && echo "  + Gitilizer"
fi
echo
echo "Dashboard: https://console.cloud.google.com/monitoring/dashboards?project=$PROJECT"
