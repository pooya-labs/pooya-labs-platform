# Google Apps Script Feasibility Notes

**Checked:** 2026-11-05  
**Source policy:** Google developer documentation; quotas can change and must be rechecked before release.

## Verified platform facts

| Area | Verified behavior | Design consequence |
|---|---|---|
| Web app entry | A deployed web app invokes `doGet(e)` for GET and `doPost(e)` for POST; return values are HtmlOutput or TextOutput. | A JSON action router is possible, but deployment mode and response behavior must be tested. |
| ContentService | ContentService responses are redirected to a one-time `script.googleusercontent.com` URL for security. | External HTTP clients must correctly follow redirects; browser fetch/CORS must be tested in a real browser. |
| HtmlService RPC | `google.script.run` is asynchronous; use success/failure handlers. Calls may complete out of order and at most 10 calls run concurrently. | Bridge needs request correlation, concurrency control, and explicit ordering for mutations. |
| CacheService | Cache is short-term and values may disappear before expiration. Individual values are limited to 100 KB; cache capacity/expiration are constrained. | Never use CacheService as durable queue, source of truth, or accepted booking storage. |
| LockService | Script locks coordinate mutually exclusive sections across executions of the script; acquisition requires tryLock/waitLock. | Protect narrow read-modify-write critical sections; release locks promptly. It does not provide database transactions. |
| Quotas | Consumer accounts currently list 6-minute execution limit, 90 minutes/day total trigger runtime, and per-user concurrency limits. Quotas may change without notice. | Keep operations bounded, batch I/O, monitor quota failures, and design resumable maintenance tasks. |
| Best practices | Google recommends minimizing external service calls, batching spreadsheet reads/writes, and using cache to reduce repeated fetches. | Batch Sheets operations and use cache only as an optimization. |
| HtmlService sandbox | HTML Service uses an iframe sandbox; active content must load over HTTPS and navigation has restrictions. | Validate asset paths, routing, downloads, and iframe behavior in the actual deployed container. |

## Official references

- [Apps Script web apps](https://developers.google.com/apps-script/guides/web)
- [Content Service and redirects](https://developers.google.com/apps-script/guides/content)
- [ContentService reference](https://developers.google.com/apps-script/reference/content/content-service)
- [HTML Service communication / google.script.run](https://developers.google.com/apps-script/guides/html/communication)
- [google.script.run reference](https://developers.google.com/apps-script/guides/html/reference/run)
- [CacheService reference](https://developers.google.com/apps-script/reference/cache/cache-service)
- [Cache item limits](https://developers.google.com/apps-script/reference/cache/cache)
- [LockService reference](https://developers.google.com/apps-script/reference/lock)
- [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [Apps Script best practices](https://developers.google.com/apps-script/guides/support/best-practices)
- [HTML Service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [HtmlService reference](https://developers.google.com/apps-script/reference/html/html-service)

## Important corrections to the initial proposal

1. `Content-Type: text/plain;charset=utf-8` can help avoid a CORS preflight for some cross-origin POSTs, but it does not grant CORS permission or guarantee that a browser can read the response. The redirect and final response headers matter.
2. ContentService's redirect behavior is documented, but the exact browser CORS behavior for the deployed web app must be tested from the intended host.
3. A GAS script lock prevents concurrent critical sections; it does not make multiple Sheets writes ACID-atomic.
4. CacheService is explicitly best-effort and unsuitable for write-behind durability.
5. Time-driven triggers are scheduled executions subject to quotas, not always-on workers.
6. Do not promise sub-50ms or sub-100ms end-to-end backend latency. Measure p50/p95/p99 under representative conditions.
7. Consumer and Workspace quotas differ; use the actual deployment account's limits and recheck them at release time.

## Transport proof matrix

| Test | HtmlService page + google.script.run | External HTTPS origin + fetch |
|---|---|---|
| Public health read | Required | Required |
| POST JSON envelope | Required through RPC adapter | Required using text/plain and application/json experiments |
| Browser console/network capture | Required | Required |
| Redirect chain | N/A to RPC path | Record each redirect and final origin |
| CORS response headers | N/A to RPC path | Record preflight and final response behavior |
| Error normalization | Required | Required |
| Authentication behavior | Test deployment access model | Test without exposing bearer secrets in public static code |
| Duplicate mutation | Verify durable idempotency | Verify durable idempotency |
| Offline/reconnect | Client queue only; server not reachable offline | Client queue only; server not reachable offline |

## Current result
Documentation review only. No Apps Script project has been deployed and no real browser transport test has been run. Therefore the external GitHub Pages transport remains **unproven**.
