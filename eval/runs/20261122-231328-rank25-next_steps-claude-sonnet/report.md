# Gitilizer eval: rank25-next_steps-claude-sonnet

next steps only · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwk6smifvq1n8sesn8rb/evalwork/prompts/v4.md` · 3 trial(s) · 20 items, 20 labelled · 20261122-231328

## Next steps (mean ± sd across trials)

| metric | value |
|---|---|
| exact | 0.417 ± 0.058 |
| same side | 0.667 ± 0.058 |

| expected | items | given (all trials) | right |
|---|---:|---|---:|
| review | 1 | review 2, elsewhere 1 | 0.67 |
| respond | 2 | respond 3, backlog 3 | 0.50 |
| todo | 2 | backlog 6 | 0.00 |
| backlog | 9 | backlog 19, not_yours 5, todo 3 | 0.70 |
| waiting | 2 | backlog 6 | 0.00 |
| not_yours | 4 | backlog 5, review 3, elsewhere 3, not_yours 1 | 0.08 |

## Per item

| item | expected | given | next action (last trial) |
|---|---|---|---|
| dart-lang/http#1742 | backlog | backlog | Reply to Clasherzz's clarification (they want the extra headers the http package adds when sending) and decide whether to close, or mark contributions-welcome. |
| dart-lang/sdk#61328 | backlog | backlog | Triage when grooming: investigate the flaky Windows file_system_watcher_test timeout or unassign yourself. |
| dart-lang/http#1701 | respond | respond | Reply to RazaGR's follow-up: explain there is no readyState equivalent in web_socket_channel 3.x and suggest tracking closeCode or stream done, or close the issue. |
| dart-lang/tools#2899 | not_yours | review ⚠️ | Review mosuem's CI hardening PR #2899 for package:boring (NASM pinning, macOS cross-toolchain checksum, separate attest job); jonasfj is also requested. |
| dart-lang/http#1988 | backlog | backlog | Decide whether to publish a new ok_http version (even pre-release) and reply to EchoEllet, or triage/close when grooming. |
| dart-lang/tools#2893 | review | review 2/3, elsewhere 1/3 ⚠️ | Reply to mosuem's question and dcharkes's points on #2893 (fail the hook instead of falling back for sanitizers; OPENSSL_SMALL as a default or later change), then re-review. |
| dart-lang/sdk#60881 | backlog | todo ⚠️ | Decide whether to add a SecurityContext option to relax the client EKU check in BoringSSL for mTLS, or unassign myself and reply to cpswan. |
| canonical/stdlibc.dart#152 | backlog | not_yours 2/3, backlog 1/3 ⚠️ | Nothing required in this repo, which is outside my listed responsibilities. Optionally finish or close draft PR canonical/stdlibc.dart#150. |
| dart-lang/sdk#54851 | not_yours | backlog 2/3, not_yours 1/3 ⚠️ | Nothing required; optionally skim the thread if you want to weigh in on the intermittent TLS handshake failures in dart:io. |
| dart-lang/http#1620 | backlog | backlog | Triage when grooming: decide whether to close, or ask for a reproduction of the disconnect-detection problem for package:web_socket_channel. |
| dart-lang/http#1817 | backlog | backlog | Decide whether to close this as an Android dart:io limitation (cronet_http works) or open a cronet_http issue for addPublicKeyPins support. |
| dart-lang/sdk#60768 | backlog | backlog | Decide whether to fix the default Content-Type for empty-body responses in dart:io HttpServer, or unassign or close the issue. |
| dart-lang/sdk#51528 | respond | backlog ⚠️ | When grooming, decide whether dart:io HttpClient should support case-preserving/ordered headers, reply to mraleph's deferral, and close or label the issue accordingly. |
| dart-lang/http#1217 | todo | backlog ⚠️ | Check whether the cronet_http fixes (#1862 and the DNS/stale-DNS config changes) resolve this, then ask for confirmation or close it as a mix of unrelated network errors. |
| dart-lang/http#2112 | not_yours | elsewhere ⚠️ | Review the lower PRs in the stack first, starting with #2106 (and the rest up through #2111), before this PR (#2112). |
| dart-lang/http#1382 | not_yours | backlog ⚠️ | Nothing pressing; optionally triage or close this stale http2 question during grooming, or leave it to mosuem. |
| googleapis/librarian#2490 | backlog | not_yours ⚠️ | Nothing to do; this is in googleapis/librarian, outside my listed repositories, and has only had label and project-board changes. |
| dart-lang/http#1530 | waiting | backlog ⚠️ | When grooming, check whether WebSocketChannel.ready resolves this and close the issue or ask the reporter to confirm. |
| dart-lang/language#2133 | waiting | backlog ⚠️ | Optionally triage this old language feature request I filed; the dart-lang/language repo is not one I own, and no one has asked me anything. |
| googleapis/google-cloud-dart#392 | todo | backlog ⚠️ | Triage when grooming: decide whether to implement x-google-user-project support in requestMetadata (as in Java's QuotaProjectIdProvider) or leave it as a p3 feature request. |