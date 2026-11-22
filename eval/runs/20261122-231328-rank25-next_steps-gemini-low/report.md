# Gitilizer eval: rank25-next_steps-gemini-low

next steps only · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwk6smifvq1n8sesn8rb/evalwork/prompts/v4.md` · 3 trial(s) · 20 items, 20 labelled · 20261122-231328

## Next steps (mean ± sd across trials)

| metric | value |
|---|---|
| exact | 0.500 ± 0.100 |
| same side | 0.800 ± 0.050 |

| expected | items | given (all trials) | right |
|---|---:|---|---:|
| review | 1 | respond 2, waiting 1 | 0.00 |
| respond | 2 | respond 4, backlog 2 | 0.67 |
| todo | 2 | todo 3, backlog 3 | 0.50 |
| backlog | 9 | backlog 16, todo 5, elsewhere 3, respond 3 | 0.59 |
| waiting | 2 | not_yours 3, backlog 2, waiting 1 | 0.17 |
| not_yours | 4 | not_yours 6, review 3, backlog 3 | 0.50 |

## Per item

| item | expected | given | next action (last trial) |
|---|---|---|---|
| dart-lang/http#1742 | backlog | backlog 2/3, respond 1/3 ⚠️ | Evaluate the feature request to expose synthesized outgoing request headers on StreamedResponse or close as not planned. |
| dart-lang/sdk#61328 | backlog | todo 2/3, backlog 1/3 ⚠️ | Investigate the flaky Windows ARM64 test timeout or unassign yourself. |
| dart-lang/http#1701 | respond | backlog 2/3, respond 1/3 ⚠️ | Reply to RazaGR's question about checking connection state in package:web_socket_channel 3.x, or triage the issue. |
| dart-lang/tools#2899 | not_yours | review ⚠️ | Review the PR hardening CI and pinning NASM/toolchains for package:boring. |
| dart-lang/http#1988 | backlog | respond 2/3, backlog 1/3 ⚠️ | Reply to the contributor about whether there are plans to publish a new ok_http release on pub.dev. |
| dart-lang/tools#2893 | review | respond 2/3, waiting 1/3 ⚠️ | Reply to the comments from mosuem and dcharkes regarding sanitizers and OPENSSL_SMALL. |
| dart-lang/sdk#60881 | backlog | todo ⚠️ | Triage or decide whether to implement the requested BoringSSL EKU override in dart:io SecurityContext or unassign myself. |
| canonical/stdlibc.dart#152 | backlog | elsewhere ⚠️ | Follow up on draft PR #150 to implement the direct definitions. |
| dart-lang/sdk#54851 | not_yours | backlog ⚠️ | Check the wireshark report to see if there is an actionable bug in dart:io TLS handshake handling. |
| dart-lang/http#1620 | backlog | backlog | Triage or consider API improvements for connection state in package:web_socket_channel when grooming the backlog. |
| dart-lang/http#1817 | backlog | backlog | Decide whether to close this issue as resolved by cronet_http or keep it as backlog. |
| dart-lang/sdk#60768 | backlog | backlog | Decide on next steps or unassign yourself from this stale SDK issue. |
| dart-lang/sdk#51528 | respond | respond | Reply to mraleph and the thread stating whether dart:io HttpClient should support preserving header casing and ordering. |
| dart-lang/http#1217 | todo | todo 2/3, backlog 1/3 ⚠️ | Review the DNS caching/stale delay issue and decide if exposing Cronet configuration options is needed to close this. |
| dart-lang/http#2112 | not_yours | not_yours | None; this PR is for package:http2 which I do not cover, and I am neither assigned nor mentioned. |
| dart-lang/http#1382 | not_yours | not_yours | None; this package:http2 question was redirected to mosuem over two years ago. |
| googleapis/librarian#2490 | backlog | backlog | Triage or prioritize this feature request when grooming old backlog items. |
| dart-lang/http#1530 | waiting | backlog 2/3, waiting 1/3 ⚠️ | Review or close this old web_socket_channel feature request during backlog grooming. |
| dart-lang/language#2133 | waiting | not_yours ⚠️ | None; this is an open language design request outside my owned repositories with no action requested of me. |
| googleapis/google-cloud-dart#392 | todo | backlog 2/3, todo 1/3 ⚠️ | Implement support for x-google-user-project or leave it in the backlog. |