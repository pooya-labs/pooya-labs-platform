# Next Task — Runtime service contracts and customer/admin domain

**Task ID:** P3-02  
**Title:** Define runtime service interfaces and the customer request lifecycle  
**Status:** Versioned owner-workspace manifest implemented; CI validation pending

## What is now implemented
- React + TypeScript + Vite shell with desktop/mobile layout, dock, floating windows, command palette, Persian/English, and dark/light themes.
- Cursor refraction field with touch and reduced-motion fallbacks.
- Version 1 built-in app manifest in `apps/platform/src/lib/app-manifest.ts`.
- Manifest validation for supported version, unique IDs and shortcuts, complete Persian/English labels, and explicit owner-workspace audience.
- Existing dock, rail, cards, and command palette now consume the manifest-backed registry.
- Product surface boundaries documented in [PRODUCT-SURFACES.md](PRODUCT-SURFACES.md).

## Important product distinction
The current Spatial OS shell is the **owner workspace foundation**, not a finished customer portal and not yet the operational admin console. The product will include both:
1. A separate customer-facing portal for customers to discover services, submit requests/bookings, and track confirmed status.
2. A separate owner-only administration console for reviewing requests, changing statuses, managing operations, and viewing audit history.

These will not be a shared dashboard with hidden role buttons. The owner-approved separation in ADR-0004 remains mandatory.

## Current boundaries
- All current built-in apps are explicitly marked `owner-workspace`.
- Files remain sample content; terminal is local demo only.
- Only `health.check` is a live RPC action.
- No customer identity, persistent customer records, booking mutations, privileged admin actions, or notifications are enabled.
- Google Apps Script source sync and deployment are intentionally deferred until the platform implementation is substantially complete.
- Existing project repositories remain untouched; integration is still Phase 9.

## Next implementation sequence
1. Add typed runtime service interfaces and explicit mock/live adapters; mocks must never be presented as server-confirmed results.
2. Define customer identity, request/booking lifecycle, ownership, status transitions, and idempotency contracts before building mutations.
3. Build the customer-facing portal as a separate application surface against those contracts.
4. Build the owner-only administration console as a separate deployment and enforce authorization server-side.
5. Complete persistence, notifications, security, accessibility, recovery, and release gates.
6. Sync the final HtmlService bundle and deploy Apps Script only near the end, after the application and backend contracts are ready.

## Validation
- Run the repository CI after this manifest milestone and record its actual result here.
- Keep the Pages preview as the fast visual review surface; it is not the production customer runtime.
