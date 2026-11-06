# Previous Project Integration Inventory

**Inspection date:** 2026-11-05  
**Method:** Read-only inspection of public repository metadata and README files on each repository's default branch.  
**Policy:** No source repository was modified and no source code was imported. This is a high-level inventory, not a full code/license audit.

| Repository | Observed stack / direction | Observed maturity and reusable areas | Current blocker / integration rule |
|---|---|---|---|
| [AetherFlow](https://github.com/pooya-labs/aetherflow) | Rust distributed workflow engine; Axum control API; PostgreSQL; NATS JetStream; OpenTelemetry; experimental WASM boundary | README reports M00–M07 complete and M08 in progress; durable state, worker recovery, tracing, operations docs, OpenAPI | Explicitly experimental and not production-ready. Reassess only after owner completes it; potential manifest/workflow concepts are not copied now. |
| [ORBIT](https://github.com/pooya-labs/orbit) | Go API, Next.js/TypeScript dashboard, PostgreSQL, optional Redis/NATS and OTel stack; GAS demo migration | Rich observability UX, workspace-scoped telemetry, audit/incident workflows, operational runbooks | README says owner-side GAS Web App is not yet deployed. Reassess after its own deployment/acceptance and owner approval. |
| [Pooya.OS](https://github.com/pooya-labs/pooya-os) | Next.js static export, React, TypeScript, Zustand, Tailwind, Framer Motion | Browser desktop shell, window manager, local CLI sandbox, design tokens, case studies, frame monitor | Current deployment is static/client-side without backend. Candidate shell reference, but platform V1 will implement its own clean core first. |
| [AuraPulse](https://github.com/pooya-labs/aurapulse) | Next.js static export, React, TypeScript, SVG charts, local paper trading | Market dashboard, chart interactions, local state, command/navigation patterns | No backend account or cross-device persistence; market feed may be unreachable. Reuse only selected UI patterns after completion. |
| [NexusCanvas](https://github.com/pooya-labs/nexus-canvas) | Next.js static export, React, TypeScript, SVG, BroadcastChannel, JSON import/export | Topology editor, structural checks, graph snapshot validation, Compose starter export | Client-side only; modeled metrics are illustrative. Reassess graph editor/export after owner completion. |
| [LuminaGlass](https://github.com/pooya-labs/lumina-glass) | Next.js static export, React, TypeScript, Tailwind, SVG/Canvas, Web Audio | Optical controls, PNG export, local presets, five-band EQ/audio processing, local task board | Browser-local only; no cloud AI or remote preset store. Reassess audio/visual lab modules after completion. |
| [Salon Booking](https://github.com/pooya-labs/salon-booking) | React, Vite, TypeScript, Tailwind, GitHub Pages, GAS + private Sheets | README reports release line 0.7.0; booking, availability, idempotency, Jalali dates, owner workspace, push-notification path | Owner deployment/acceptance and current migration must finish first. It is a valuable later reference, not a dependency for platform V1. |
| [GlobalCart](https://github.com/pooya-labs/globalcart) | Next.js/React/TypeScript storefront; Go/PostgreSQL backend foundation; GitHub Pages | README reports v0.2.3-dev, large local catalog, bilingual UX, multi-image product detail, offline catalog, automated browser/accessibility tests | README says v1.0 remains gated by manual QA and hosted business backend is not deployed. Reassess after its independent release. |

## Cross-project conclusions
- Several projects use Next.js static export, but the new platform's SPA requirements favor a fresh React + Vite + TypeScript workspace unless Phase 0 proves otherwise.
- Pooya.OS is the closest conceptual predecessor for the desktop shell, but importing it now would couple the new product to an actively evolving project.
- Salon Booking and ORBIT provide valuable GAS/Sheets operational experience, but their owner-side deployment and acceptance gates must be completed independently.
- NexusCanvas and LuminaGlass are natural future mini-app candidates; AuraPulse contributes dashboard/chart interaction patterns.
- AetherFlow may inform future workflow/manifest orchestration but is intentionally not a V1 runtime dependency.
- GlobalCart is likely best represented as a future case study rather than embedding its commerce system into the OS.

## Evidence and limits
This inventory reflects public README and repository metadata only, inspected on 2026-11-05. It does not establish source-code quality, current CI status, dependency licenses, exact module boundaries, or readiness for extraction. Those require a targeted source audit during Phase 9, with the owner's approval.

## Integration gate
No integration starts until:
1. The owner declares the source project complete/stable enough.
2. A source commit SHA is pinned.
3. License and attribution are checked.
4. A module-level extraction plan and tests are approved.
5. The integration is added here behind a manifest/feature flag with a rollback path.
