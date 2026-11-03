#!/usr/bin/env bash
# The load balancer's addresses and its Google-managed certificate for gitilizer.com and *.gitilizer.com
# (LAUNCH_PLAN.md, Phase 4). Prints the DNS records to add at GoDaddy.
#   bash infra/certificate.sh
source "$(dirname "$0")/config.sh"

step "Addresses"
ensure "gitilizer-ipv4" gcloud compute addresses describe gitilizer-ipv4 --global -- \
  gcloud compute addresses create gitilizer-ipv4 --global --ip-version=IPV4
ensure "gitilizer-ipv6" gcloud compute addresses describe gitilizer-ipv6 --global -- \
  gcloud compute addresses create gitilizer-ipv6 --global --ip-version=IPV6

step "Certificate"
ensure "DNS authorization gitilizer-com" gcloud certificate-manager dns-authorizations describe gitilizer-com -- \
  gcloud certificate-manager dns-authorizations create gitilizer-com --domain="$DOMAIN"
ensure "certificate gitilizer-cert" gcloud certificate-manager certificates describe gitilizer-cert -- \
  gcloud certificate-manager certificates create gitilizer-cert --domains="$DOMAIN,*.$DOMAIN" --dns-authorizations=gitilizer-com
ensure "map gitilizer-map" gcloud certificate-manager maps describe gitilizer-map -- \
  gcloud certificate-manager maps create gitilizer-map
ensure "map entry apex" gcloud certificate-manager maps entries describe apex --map=gitilizer-map -- \
  gcloud certificate-manager maps entries create apex --map=gitilizer-map --certificates=gitilizer-cert --hostname="$DOMAIN"
ensure "map entry wildcard" gcloud certificate-manager maps entries describe wildcard --map=gitilizer-map -- \
  gcloud certificate-manager maps entries create wildcard --map=gitilizer-map --certificates=gitilizer-cert --hostname="*.$DOMAIN"

v4=$(gcloud compute addresses describe gitilizer-ipv4 --global --format='value(address)')
v6=$(gcloud compute addresses describe gitilizer-ipv6 --global --format='value(address)')
read -r cname cvalue < <(gcloud certificate-manager dns-authorizations describe gitilizer-com --format='value(dnsResourceRecord.name,dnsResourceRecord.data)')
state=$(gcloud certificate-manager certificates describe gitilizer-cert --format='value(managed.state)')
cat <<RECORDS

Records for GoDaddy (gitilizer.com → DNS). Enter the name without ".gitilizer.com"; GoDaddy adds it.

  Now:        CNAME  ${cname%.$DOMAIN.}  →  $cvalue
  For dev:    A      dev  →  $v4        AAAA  dev  →  $v6
  Cutover:    A      @    →  $v4        AAAA  @    →  $v6   (after turning off forwarding; see DEPLOYMENT.md)

Certificate: $state  (ACTIVE once GoDaddy serves the CNAME; check again with this script)
RECORDS
