# ADR-0001: Defer previous-project integration until the final phase

- **Status:** Accepted
- **Date:** 2026-11-05
- **Decision owners:** Project owner

## Context
The owner is actively developing several independent repositories and wants to finish those projects before connecting them to the new Pooya Labs platform. Integrating unfinished projects now risks duplicated effort, unstable interfaces, context switching, and rework.

## Decision
Build the platform as a standalone product first. Keep previous-project integration in Phase 9, after the standalone V1 release and after the owner confirms each source repository is ready. Until then, only perform read-only inspection when it helps architecture planning. Do not modify source repositories or import their code.

## Consequences
- The platform must have first-party implementations for its V1 core.
- Manifest and adapter boundaries must make later integration straightforward.
- The integration inventory must record source commit, maturity, dependencies, licensing, security, and reuse decisions.
- Integrations are opt-in and individually tested behind feature flags.
- Existing project completion is not blocked by this platform.
