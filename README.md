# Pooya Labs Platform

A personal, extensible engineering workspace for presenting and operating Pooya's projects.

> This repository is the canonical home of the **platform product**. The separate `pooya-labs/pooya-labs` repository remains the personal profile and must not be repurposed.

## Product direction

Build a polished, bilingual (Persian/English), responsive, offline-capable Spatial Web OS with a manifest-driven app registry, interactive engineering mini-apps, and a modest serverless backend based on Google Apps Script and Google Sheets.

## Hosting architecture

- **Application:** Google Apps Script HtmlService, with `google.script.run` as the browser-to-server RPC transport.
- **GitHub Pages:** public docs, showcase pages, design previews, and isolated static demos.
- **Not supported:** direct cross-origin fetch from GitHub Pages to the GAS ContentService endpoint. A real Chromium test observed a missing `Access-Control-Allow-Origin` header.
- **No Cloudflare dependency** and no mandatory paid backend service.

## Platform preview

The React + TypeScript workspace source lives in [`apps/platform`](apps/platform). It has dual build targets: a static GitHub Pages preview and a single-file HtmlService bundle. The current first slice includes the responsive desktop/mobile shell, app windows, command palette, Persian/English toggle, light/dark theme, and an optional cursor refraction field. See [DESIGN-DIRECTION.md](docs/DESIGN-DIRECTION.md) for the visual rules and known demo-only features.

## Non-negotiable project constraints

- Do not claim that Google Apps Script + Sheets provides relational ACID transactions or guaranteed real-time latency.
- Validate authentication and authorization before adding protected operations.
- Keep durable data out of CacheService. Use IndexedDB for client offline persistence; use durable server-side records for accepted submissions.
- Never report an offline booking as confirmed.
- Keep admin secrets server-side; enforce authorization in the backend.
- Reuse previous projects only after they are stable and the owner explicitly schedules integration.
- All meaningful decisions, implementation milestones, test results, and handoff state must be committed here.

## Current status

The Phase 0 HtmlService RPC proof passed in the owner's browser. The external Pages-to-GAS fetch was blocked by CORS in a real Chromium test, so the app will be hosted by HtmlService and Pages will remain the public showcase/documentation surface. The revised `Code.gs` and `Index.html` are ready to sync into the deployed Apps Script project.

Start here:
1. Read [AGENTS.md](AGENTS.md).
2. Read [ROADMAP.md](docs/ROADMAP.md), [STATUS.md](docs/STATUS.md), [SECURITY-MODEL.md](docs/SECURITY-MODEL.md), and [DATA-CLASSIFICATION.md](docs/DATA-CLASSIFICATION.md).
3. Review [PERFORMANCE-BUDGETS.md](docs/PERFORMANCE-BUDGETS.md) and [DEPLOYMENT-RUNBOOK.md](docs/DEPLOYMENT-RUNBOOK.md).
4. Execute the exact next task in [NEXT.md](docs/NEXT.md).
5. Follow [RECOVERY.md](docs/RECOVERY.md) after context loss or AI handoff.

## Repository map

- `docs/`: roadmap, architecture, contracts, deployment, security/data classification, recovery, and decision records.
- `apps/platform/`: React + TypeScript Spatial OS shell and dual-host Vite build.
- `packages/`: reusable platform packages (introduced after Phase 0).
- `apps-script/`: Google Apps Script application entry and backend RPC.
- `tests/`: automated source-contract and browser integration tests.

## Project identity

- Product: Pooya Labs Platform
- Repository: `pooya-labs/pooya-labs-platform`
- Default branch: `main`
- Current phase: Phase 0 — remaining security, performance, and deployment proof
- Previous-project integration: explicitly deferred to the final roadmap phase.
