# Data Classification — Phase 0 baseline

The platform collects no production data yet. This classification is a design baseline, not permission to begin collection.

| Class | Examples | Approved location | GitHub Pages / public repo |
|---|---|---|---|
| Public | Published project summaries, public documentation, released app manifests, public changelog | GitHub Pages and repository | Allowed after review |
| Internal | Source code, deployment notes, non-secret technical configuration, internal architecture | Private configuration or repository where appropriate | Do not expose deployment-specific values unnecessarily |
| Private | Contact details, inquiry/booking contents, user preferences, private attachments | Restricted server-side storage with least-privilege access | Prohibited |
| Restricted | Passwords, password hashes, OAuth refresh/access tokens, HMAC keys, signing secrets, API credentials | Server-side Script Properties or a dedicated secret store | Prohibited; never include in logs or artifacts |

## Data minimization
- Collect only fields required for a declared feature.
- Avoid collecting government identifiers, payment-card data, health information, precise location, or other highly sensitive data.
- Do not store raw passwords. Prefer a tested identity provider; if a password-based admin design is ever proposed, it requires a separate cryptographic and abuse review.
- Avoid logging request payloads. Log correlation IDs, action names, outcome codes, and coarse timing only.
- Define retention and deletion periods before accepting real user submissions.
- Do not use CacheService as a source of truth for private or restricted data.
- Public acknowledgements must not disclose private records or expose sequential identifiers.

## Storage rules
- Sheets and Drive are not public hosting locations. File sharing must be explicitly restricted and reviewed.
- Store only the minimum necessary record set in each file.
- Separate public intake data from admin-only data where practical; document the limits of that separation because both scripts may run under the same owner identity.
- Exported CSV, backups, and diagnostic artifacts inherit the classification of the source data.
- Any production backup must be encrypted or access-restricted, and its restore procedure tested.

## Release gate
No Private or Restricted data may be introduced until the security model, authentication/authorization, access permissions, retention policy, breach response, and backup/restore plan are approved and tested.
