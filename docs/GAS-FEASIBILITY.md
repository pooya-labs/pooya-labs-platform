# Google Apps Script Feasibility Notes

**Checked:** 2026-11-05  
**Source policy:** Google developer documentation; quotas can change and must be rechecked before release.

## Verified platform facts

| Area | Verified behavior | Design consequence |
|---|---|---|
| Web app entry | A deployed web app invokes `doGet(e)` for GET and `doPost(e)` for POST; return values are HtmlOutput or TextOutput. | `doGet` serves the primary application shell; server methods are called with HtmlService RPC. |
| ContentService | ContentService responses are redirected to a one-time `script.googleusercontent.com` URL for security. | Do not assume a static external browser can read the response; a real browser test is required. |
| HtmlService RPC | `google.script.run` is asynchronous; use success/failure handlers. Calls may complete out of order and at most 10 calls run concurrently. | Use a Promise adapter, request IDs, and serialize dependent mutations. |
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

## Transport experiment result
- HtmlService `google.script.run` health RPC: passed in the owner's deployed proof.
- External fetch from published GitHub Pages origin: blocked by CORS in real Chromium; the browser Console reported a missing `Access-Control-Allow-Origin` header.
- Browser could not read the external response status/body. This says nothing definitive about whether the GAS `doPost` handler executed.
- Decision: HtmlService is the primary app runtime; GitHub Pages is static showcase/documentation hosting.

## Important design constraints
1. `text/plain` may avoid a preflight for some cross-origin requests, but it does not grant CORS permission.
2. ContentService redirects to a one-time `script.googleusercontent.com` URL; external clients must follow redirects, but browser CORS still applies.
3. JSONP is executable script inclusion and must remain read-only/non-sensitive; it is not an RPC solution for protected data or mutations.
4. A GAS script lock prevents concurrent critical sections; it does not make multiple Sheets writes ACID-atomic.
5. CacheService is explicitly best-effort and unsuitable for write-behind durability.
6. Time-driven triggers are scheduled executions subject to quotas, not always-on workers.
7. Do not promise sub-50ms or sub-100ms end-to-end backend latency. Measure p50/p95/p99 under representative conditions.
8. Consumer and Workspace quotas differ; use the actual deployment account's limits and recheck them at release time.
