# API Contract — Initial Rules

The concrete endpoint schema is intentionally not frozen until Phase 0 transport testing is complete.

## Envelope
All backend operations should use a versioned envelope:
```json
{
  "apiVersion": 1,
  "requestId": "client-generated-unique-id",
  "idempotencyKey": "required-for-mutations",
  "action": "health.check",
  "payload": {}
}
```

Responses:
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

## Contract rules
- Validate envelope, action, payload shape, size, and version on the server.
- Normalize errors; do not leak stack traces, secrets, or internal identifiers.
- Mutating operations require idempotency keys and durable deduplication records.
- Request IDs are for tracing; they are not authorization.
- Admin routes require server-side authentication and authorization.
- Public endpoints expose only intentionally public data.
- Transport adapters must preserve the same logical contract.
- Booking responses distinguish `pending`, `accepted`, `rejected`, and `confirmed`; only server-persisted acceptance can be confirmed.
- Do not rely on arbitrary browser-supplied IP or fingerprint values as identity.
- CORS, redirects, credentials, and origin behavior are deployment-specific and must be tested.
