#!/usr/bin/env bash
# The global external Application Load Balancer in front of Cloud Run ([D-2]; LAUNCH_PLAN.md, Phases 6 and 7).
# Routes gitilizer.com to gitilizer-api and dev.gitilizer.com to gitilizer-dev, for whichever exist.
#   bash infra/load-balancer.sh
source "$(dirname "$0")/config.sh"
dir=$(dirname "$0")

step "Backends"
have=()
for pair in prod:gitilizer-api dev:gitilizer-dev; do
  env=${pair%%:*}; service=${pair#*:}
  if ! gcloud run services describe "$service" --region="$REGION" >/dev/null 2>&1; then
    echo "  … $service doesn't exist yet: skipped (run this again after infra/services.sh $env)"
    continue
  fi
  ensure "neg-$env → $service" gcloud compute network-endpoint-groups describe "neg-$env" --region="$REGION" -- \
    gcloud compute network-endpoint-groups create "neg-$env" --region="$REGION" --network-endpoint-type=serverless --cloud-run-service="$service"
  ensure "be-$env" gcloud compute backend-services describe "be-$env" --global -- \
    gcloud compute backend-services create "be-$env" --global --load-balancing-scheme=EXTERNAL_MANAGED
  if ! gcloud compute backend-services describe "be-$env" --global --format='value(backends[].group)' | grep -q "neg-$env"; then
    gcloud compute backend-services add-backend "be-$env" --global --network-endpoint-group="neg-$env" --network-endpoint-group-region="$REGION"
  fi
  have+=("$env")
done

step "Routing"
# url-map.yaml with only the hosts whose backend exists (www goes with prod).
tmp=$(mktemp)
python3 - "$dir/url-map.yaml" "$tmp" "$DOMAIN" "$PROJECT" "${have[@]}" <<'PY'
import sys, re
src, out, domain, project, have = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], set(sys.argv[5:])
text = open(src).read().replace("${DOMAIN}", domain).replace("${PROJECT}", project)
keep = lambda name: name in have or (name == "www" and "prod" in have)
lines, skip = [], False
for line in text.splitlines():
    m = re.match(r"\s+- \{ hosts: \[[^\]]+\], pathMatcher: (\w+) \}", line)
    if m:
        if keep(m.group(1)): lines.append(line)
        continue
    m = re.match(r"\s+- name: (\w+)", line)
    if m: skip = not keep(m.group(1))
    if not skip: lines.append(line)
body = "\n".join(lines) + "\n"
if not any(keep(n) for n in ("prod", "dev")):
    body = re.sub(r"hostRules:\n|pathMatchers:\n", "", body)
open(out, "w").write(body)
PY
gcloud compute url-maps import gitilizer-https --global --source="$tmp" --quiet >/dev/null && echo "  ✓ gitilizer-https (${have[*]:-no backends yet})"
gcloud compute url-maps import gitilizer-http-redirect --global --source="$dir/url-map-http.yaml" --quiet >/dev/null && echo "  ✓ gitilizer-http-redirect"
rm -f "$tmp"

step "Proxies and forwarding rules"
ensure "SSL policy gitilizer-tls" gcloud compute ssl-policies describe gitilizer-tls -- \
  gcloud compute ssl-policies create gitilizer-tls --profile=MODERN --min-tls-version=1.2
ensure "HTTPS proxy" gcloud compute target-https-proxies describe gitilizer-https --global -- \
  gcloud compute target-https-proxies create gitilizer-https --global --url-map=gitilizer-https \
    --certificate-map=gitilizer-map --ssl-policy=gitilizer-tls
ensure "HTTP proxy" gcloud compute target-http-proxies describe gitilizer-http --global -- \
  gcloud compute target-http-proxies create gitilizer-http --global --url-map=gitilizer-http-redirect
for v in 4 6; do
  ensure "gitilizer-https-v$v" gcloud compute forwarding-rules describe "gitilizer-https-v$v" --global -- \
    gcloud compute forwarding-rules create "gitilizer-https-v$v" --global --load-balancing-scheme=EXTERNAL_MANAGED \
      --address="gitilizer-ipv$v" --target-https-proxy=gitilizer-https --ports=443
  ensure "gitilizer-http-v$v" gcloud compute forwarding-rules describe "gitilizer-http-v$v" --global -- \
    gcloud compute forwarding-rules create "gitilizer-http-v$v" --global --load-balancing-scheme=EXTERNAL_MANAGED \
      --address="gitilizer-ipv$v" --target-http-proxy=gitilizer-http --ports=80
done

ip=$(gcloud compute addresses describe gitilizer-ipv4 --global --format='value(address)')
echo
echo "Check before changing DNS:  curl -sS --resolve $DOMAIN:443:$ip https://$DOMAIN/api/health"
