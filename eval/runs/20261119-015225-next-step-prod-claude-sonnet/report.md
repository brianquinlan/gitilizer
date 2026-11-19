# Gitilizer eval: next-step-prod-claude-sonnet

next steps only · model `claude-sonnet-5-5` · thinking `default` · prompt `/sessions/rcw-01fmhwkbaxx3b3yagpz8tnn6/work/prompts/v4.md` · 3 trial(s) · 20 items, 20 labelled · 20261119-015225

## Next steps (mean ± sd across trials)

| metric | value |
|---|---|
| exact | 0.433 ± 0.029 |
| same side | 0.717 ± 0.029 |

| expected | items | given (all trials) | right |
|---|---:|---|---:|
| review | 1 | review 3 | 1.00 |
| respond | 2 | backlog 6 | 0.00 |
| todo | 2 | backlog 4, todo 2 | 0.33 |
| backlog | 9 | backlog 19, not_yours 5, todo 3 | 0.70 |
| waiting | 2 | backlog 6 | 0.00 |
| not_yours | 4 | elsewhere 4, backlog 4, not_yours 2, review 2 | 0.17 |

## Per item

| item | expected | given | next action (last trial) |
|---|---|---|---|
| dart-lang/http#1742 | backlog | backlog | When grooming, decide whether to answer that StreamedResponse.request.headers only has user-set headers (not those added by the HTTP client) and close or mark it as contributions-welcome. |
| dart-lang/sdk#61328 | backlog | backlog | When grooming, decide whether to fix this flaky Windows timeout in file_system_watcher_test or unassign myself. |
| dart-lang/http#1701 | respond | backlog ⚠️ | Reply to RazaGR on whether package:web_socket_channel 3.x offers a way to check the current readyState (e.g. closeCode or tracking stream done), or close the issue as a feature request. |
| dart-lang/tools#2899 | not_yours | review 2/3, elsewhere 1/3 ⚠️ | Review #2899: check the NASM and macOS toolchain SHA-256 pins and the new separate attest job, then approve or request changes. |
| dart-lang/http#1988 | backlog | backlog | Triage when grooming: decide whether to publish a new ok_http release (even a pre-release) and reply to EchoEllet. |
| dart-lang/tools#2893 | review | review | Re-review #2893: reply on the open threads (sanitizer fallback vs failing the hook, OPENSSL_SMALL default/user-define, split changelog) and note the PR is stacked on #2892, now merged, so it needs a retarget/rebase. |
| dart-lang/sdk#60881 | backlog | todo ⚠️ | Decide whether to implement an option on SecurityContext to relax the client EKU check, or unassign myself, and comment on the issue either way. |
| canonical/stdlibc.dart#152 | backlog | not_yours 2/3, backlog 1/3 ⚠️ | Decide whether to finish draft PR #150 (define the __*stat symbols directly via external in gnu/stat.dart) or close it, then close this issue. |
| dart-lang/sdk#54851 | not_yours | not_yours 2/3, backlog 1/3 ⚠️ | When grooming, skim the Wireshark capture and the HP Wolf Security lead, then decide whether to comment, hand off to the VM/io owners, or leave it. |
| dart-lang/http#1620 | backlog | backlog | When grooming, triage this old web_socket_channel disconnect-detection question: point to closeCode/onDone/pingInterval or close it as a question. |
| dart-lang/http#1817 | backlog | backlog | When grooming, decide whether to close this as resolved by package:cronet_http or track a separate cronet_http request for addPublicKeyPins; no reply is needed now. |
| dart-lang/sdk#60768 | backlog | backlog | Decide whether to drop the default Content-Type for empty bodies in dart:io HttpServer, or unassign/close if not worth changing. |
| dart-lang/sdk#51528 | respond | backlog ⚠️ | Decide whether dart:io HttpClient should support header casing/order control, then reply or close; the dart-lang/sdk repo isn't one I own, so only do it if I want to make the call mraleph deferred to me. |
| dart-lang/http#1217 | todo | backlog ⚠️ | Triage when grooming: check whether the DNS config API exposed in fryette's PR and the 107e4c7 commit resolve the reports, then close or ask for confirmation. |
| dart-lang/http#2112 | not_yours | elsewhere ⚠️ | Review the lower PRs in the stack first, starting with #2106 (and #2107-#2111), before coming back to this one. |
| dart-lang/http#1382 | not_yours | backlog ⚠️ | Nothing pressing; when grooming, triage or close this old http2 question (mosuem has the most context on the package). |
| googleapis/librarian#2490 | backlog | not_yours ⚠️ | Nothing to do; googleapis/librarian is outside my listed repositories, and this is an old unplanned item with no new activity. |
| dart-lang/http#1530 | waiting | backlog ⚠️ | When grooming, check whether WebSocketChannel.ready answers this request and close the issue if it does, or ask the reporter to confirm. |
| dart-lang/language#2133 | waiting | backlog ⚠️ | Optionally reply to the latest comment or close/triage this old language feature request when grooming; nothing is pending on me. |
| googleapis/google-cloud-dart#392 | todo | todo 2/3, backlog 1/3 ⚠️ | Decide whether to implement x-google-user-project support in requestMetadata for the auth package, or defer it until the feature is needed. |