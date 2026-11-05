# Product surfaces: customer, owner workspace, and administration

Pooya Labs is not a single shared dashboard with role-based buttons. It has separate product surfaces with separate trust boundaries.

## 1. Customer-facing portal

**Purpose:** the place an invited or public customer visits to use the services Pooya Labs exposes.

Planned capabilities, introduced only when their service contracts are ready:
- Clear public landing and service catalogue.
- Customer sign-in or a deliberately limited guest flow, depending on the final identity decision.
- Customer-owned requests, submissions, bookings, and their confirmed status.
- Profile and notification preferences where identity and retention rules permit.
- Responsive mobile-first navigation and accessible Persian/English presentation.

The customer portal must never expose owner tools, private workspace files, internal telemetry, or administrative actions. A customer-facing UI is a distinct application surface, not a hidden mode inside the owner dashboard.

## 2. Owner workspace

**Current implementation:** the Antigravity-inspired Spatial OS shell in `apps/platform`.

Its overview, sample files, local demo terminal, and settings are currently a workspace foundation and design preview. They are not yet the operational customer portal and they are not yet the production administration console. The app manifest marks these built-ins as `owner-workspace`.

## 3. Owner-only administration console

**Purpose:** private operational control for the platform owner.

Planned capabilities:
- Review and process customer requests and bookings.
- Change request status with server-confirmed transitions.
- View operational activity and audit history.
- Manage service availability, announcements, and approved configuration.
- Receive operational notifications and export permitted records.

This console will be a separate deployment restricted to the owner. Authorization must be enforced on the server; hiding controls or trusting a browser-supplied role is never sufficient.

## Delivery order

1. Finish the shared shell, app manifest, runtime service contracts, and explicit loading/empty/error states.
2. Define identity, customer data ownership, request lifecycle, and persistence contracts.
3. Build the customer portal against those contracts.
4. Build the separate owner-only administration console against the same reviewed domain model, with its own authorization boundary.
5. Complete security, accessibility, recovery, and deployment validation.
6. Integrate earlier Pooya Labs projects only in the final integration phase, after each source project is independently stable.

## Current scope boundary

No customer account system, real customer data, booking mutation, privileged administration, or persistent workspace storage is implied by the current visual shell. Sample content remains visibly demonstrative until backed by a verified service.
