# API Contract — HtmlService RPC v1

The canonical browser-to-backend transport is `google.script.run` from a page served by the same Apps Script HtmlService deployment. The contract is an RPC argument/return value, not an external HTTP JSON API.

## Request envelope
```json
{
  "apiVersion": 1,
  "requestId": "client-generated-unique-id",
  "action": "health.check",
  "payload": {}
}
```

## Response envelope
```json
{
  "apiVersion": 1,
  "requestId": "same-request-id",
  "ok": true,
  "data": {},
  "error": null,
  "serverTime": "ISO-8601"
}
```

## Invocation
The client invokes the public `rpcCall(request)` function using `google.script.run`, registering both success and failure handlers. The wrapper may expose a Promise to application code, but it must not pretend the underlying RPC is synchronous.

## Contract rules
- Validate envelope, action, payload shape, serialized size, and version on the server.
- Normalize errors; do not leak stack traces, secrets, or internal identifiers.
- Mutating operations require idempotency keys and durable deduplication records before they are enabled.
- Request IDs are for tracing; they are not authorization.
- Admin routes require server-side authentication and authorization.
- Public routes expose only intentionally public data.
- Keep at most 10 calls in flight and serialize operations whose order matters; Google does not guarantee invocation order.
- Only explicit allowlisted actions are dispatchable. Unknown actions fail closed.
- Do not call GAS ContentService from GitHub Pages as an application RPC. The real Chromium test observed a missing `Access-Control-Allow-Origin` header and an unreadable response.
- JSONP is not an alternative for protected data or mutations; Google's guidance limits it to read-only, non-sensitive data.
