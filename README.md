# Pooya Labs Platform

A personal, extensible engineering workspace for presenting and operating Pooya's projects.

> This repository is the canonical home of the **platform product**. The separate `pooya-labs/pooya-labs` repository remains the personal profile and must not be repurposed.

## Product direction

Build a polished, bilingual (Persian/English), responsive, offline-capable Spatial Web OS with a manifest-driven app registry, interactive engineering mini-apps, and a modest serverless backend based on Google Apps Script and Google Sheets.

## Non-negotiable project constraints

- No Cloudflare dependency.
- No mandatory paid API, database, or hosting service.
- Do not claim that Google Apps Script + Sheets provides relational ACID transactions or guaranteed real-time latency.
- Validate browser-to-GAS transport and authentication experimentally before depending on GitHub Pages as a production host.
- Keep durable data out of CacheService. Use IndexedDB for client offline persistence; use durable server-side records for accepted submissions.
- Never report an offline booking as confirmed.
- Keep admin secrets server-side; enforce authorization in the backend.
- Reuse previous projects only after they are stable and the owner explicitly schedules integration.
- All meaningful decisions, implementation milestones, test results, and handoff state must be committed here.

## Current status

The repository has been initialized with the architecture, roadmap, recovery protocol, and Phase 0 validation plan. No previous project has been modified or imported.

Start here:
1. Read [AGENTS.md](AGENTS.md).
2. Read [ROADMAP.md](docs/ROADMAP.md) and [STATUS.md](docs/STATUS.md).
3. Execute the exact next task in [NEXT.md](docs/NEXT.md).
4. Follow [RECOVERY.md](docs/RECOVERY.md) after context loss or AI handoff.

## Repository map

- `docs/`: roadmap, architecture, contracts, deployment, recovery, and decision records.
- `apps/`: user-facing applications (introduced after Phase 0).
- `packages/`: reusable platform packages (introduced after Phase 0).
- `apps-script/`: Google Apps Script backend (introduced after transport proof).
- `tests/`: automated and integration tests.

## Project identity

- Product: Pooya Labs Platform
- Repository: `pooya-labs/pooya-labs-platform`
- Default branch: `main`
- Current phase: Phase 0 — feasibility and architecture validation
- Previous-project integration: explicitly deferred to the final roadmap phase.
