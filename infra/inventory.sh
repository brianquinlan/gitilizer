#!/usr/bin/env bash
# Lists everything in the project that an earlier attempt could have left behind (LAUNCH_PLAN.md, Phase 1).
# Writes gcp-inventory.txt. Changes nothing.
#   bash infra/inventory.sh
P=${PROJECT:-gitilizer}
cmds=(
  "services list --enabled"
  "run services list" "run jobs list" "run domain-mappings list --region us-east4"
  "functions list" "app describe" "app services list"
  "compute instances list" "compute addresses list"
  "compute forwarding-rules list" "compute target-https-proxies list" "compute target-http-proxies list"
  "compute url-maps list" "compute backend-services list" "compute backend-buckets list"
  "compute network-endpoint-groups list" "compute health-checks list"
  "compute ssl-certificates list" "compute ssl-policies list" "compute security-policies list"
  "compute networks list" "compute firewall-rules list" "compute routers list"
  "certificate-manager certificates list" "certificate-manager maps list"
  "certificate-manager dns-authorizations list"
  "sql instances list" "redis instances list --region us-east4"
  "artifacts repositories list" "secrets list"
  "kms keyrings list --location us-east4" "kms keyrings list --location global"
  "builds triggers list" "builds triggers list --region us-east4"
  "builds connections list --region us-east4"
  "scheduler jobs list --location us-east4" "tasks queues list --location us-east4"
  "pubsub topics list" "pubsub subscriptions list"
  "storage buckets list --format='value(name)'" "dns managed-zones list"
  "iam service-accounts list" "iam workload-identity-pools list --location global --show-deleted"
  "logging sinks list" "logging metrics list"
  "monitoring uptime list-configs" "monitoring dashboards list --format='value(displayName)'"
  "beta monitoring policies list --format='value(displayName)'"
  "beta monitoring channels list --format='value(displayName,type)'"
  "projects get-iam-policy $P"
)
for c in "${cmds[@]}"; do
  echo "=== gcloud $c"
  eval gcloud $c --project "$P" 2>&1
done > gcp-inventory.txt
echo "Wrote gcp-inventory.txt. Also check https://console.firebase.google.com/ for Firebase Hosting sites."
