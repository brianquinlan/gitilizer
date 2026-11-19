# Gitilizer eval: next-step-prod-gemini-low-t2

next steps only · model `gemini-3.8-flash` · thinking `low` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/work/prompts/v4.md` · 1 trial(s) · 20 items, 20 labelled · 20261119-015223

## Next steps (mean ± sd across trials)

| metric | value |
|---|---|
| exact | 0.550 ± 0.000 |
| same side | 0.800 ± 0.000 |

| expected | items | given (all trials) | right |
|---|---:|---|---:|
| review | 1 | waiting 1 | 0.00 |
| respond | 2 | respond 1, backlog 1 | 0.50 |
| todo | 2 | todo 1, backlog 1 | 0.50 |
| backlog | 9 | backlog 6, todo 2, elsewhere 1 | 0.67 |
| waiting | 2 | waiting 1, not_yours 1 | 0.50 |
| not_yours | 4 | not_yours 2, review 1, todo 1 | 0.50 |

## Per item

| item | expected | given | next action (last trial) |
|---|---|---|---|
| dart-lang/http#1742 | backlog | backlog | Evaluate the feature request to expose internal request headers added by the client, or close as not planned. |
| dart-lang/sdk#61328 | backlog | todo ⚠️ | Investigate the flaky test timeout on Windows or unassign myself. |
| dart-lang/http#1701 | respond | backlog ⚠️ | Reply to the user's question about checking connection state in package:web_socket_channel, or close the issue if obsolete. |
| dart-lang/tools#2899 | not_yours | review ⚠️ | Review the PR hardening CI and pinning NASM for package:boring. |
| dart-lang/http#1988 | backlog | backlog | Decide whether to publish a new release or pre-release of package:ok_http to pub.dev. |
| dart-lang/tools#2893 | review | waiting ⚠️ | Wait for mosuem to respond to review comments and decide how to split or update the PR. |
| dart-lang/sdk#60881 | backlog | todo ⚠️ | Evaluate the requested SecurityContext EKU check override for BoringSSL mTLS or unassign myself. |
| canonical/stdlibc.dart#152 | backlog | elsewhere ⚠️ | Update or close PR #150 to implement the Ubuntu 24.04 ffigen workflow changes. |
| dart-lang/sdk#54851 | not_yours | todo ⚠️ | Check the Wireshark dump and certificate validation failure in dart:io to see if this is an active TLS issue. |
| dart-lang/http#1620 | backlog | backlog | Triage this stale discussion on detecting disconnection in web_socket_channel when grooming. |
| dart-lang/http#1817 | backlog | backlog | Consider closing this issue since `cronet_http` resolved the background issue or file a feature request for `addPublicKeyPins` if needed. |
| dart-lang/sdk#60768 | backlog | backlog | Decide whether to modify default Content-Type headers for empty bodies or unassign myself. |
| dart-lang/sdk#51528 | respond | respond | Reply to mraleph's question about whether dart:io HttpClient should support preserving header casing and ordering for non-compliant servers. |
| dart-lang/http#1217 | todo | backlog ⚠️ | Review or triage this long-standing Cronet network/DNS issue when grooming cronet_http. |
| dart-lang/http#2112 | not_yours | not_yours | None, as package:http2 is outside my scope and I am not assigned or mentioned. |
| dart-lang/http#1382 | not_yours | not_yours | None; this package:http2 question was redirected to mosuem over two years ago. |
| googleapis/librarian#2490 | backlog | backlog | Leave in backlog until ready to work on sidekick Dart generator streaming whitelist. |
| dart-lang/http#1530 | waiting | waiting | Wait for reporter response to my question about WebSocketChannel.ready, or triage and close during backlog grooming. |
| dart-lang/language#2133 | waiting | not_yours ⚠️ | None; this is an open language feature request in dart-lang/language and is waiting on the language team. |
| googleapis/google-cloud-dart#392 | todo | todo | Implement support for x-google-user-project in requestMetadata or prioritize this feature request. |