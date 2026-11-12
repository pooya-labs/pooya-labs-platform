
# Project content audit — pre-release source of truth

**Last reviewed:** 2026-11-10 (latest read-only upstream recheck)  
**Purpose:** Separate facts supported by the eight source repositories from information/evidence still required before Pooya Labs V1.  
**Rule:** Do not fill gaps with assumptions. Keep verified descriptions in the portfolio and keep missing items as release checklist tasks.

## Latest read-only upstream recheck — 2026-11-12

**Inspection mode:** read-only; all eight independent project repositories were inspected on their current default branch. No independent project repository was modified. This refresh is a source/evidence inventory only; it does not grant approval to publish project claims, media, client material, or deep integrations.

| Project | Exact current `main` SHA | Latest commit (UTC) | Latest verified CI/deploy evidence | Open PRs / current boundary |
|---|---|---:|---|---|
| AetherFlow | [`bfc1109b9473`](https://github.com/pooya-labs/aetherflow/commit/bfc1109b94736bdbf67d81e0d85a8b4949337d83) | 2026-11-12 11:44 | Exact-main Gateway CI [43211702345](https://github.com/pooya-labs/aetherflow/actions/runs/43211702345), Rust CI [43211702447](https://github.com/pooya-labs/aetherflow/actions/runs/43211702447), supply-chain/secret checks [43211702313](https://github.com/pooya-labs/aetherflow/actions/runs/43211702313), and Pages [43211701975](https://github.com/pooya-labs/aetherflow/actions/runs/43211701975) passed. The only delta after the Nov 12 documentation checkpoint is 56 added lines in `cloudflare-gateway/runtime.test.mjs`, exercising origin failures. | PR [#47](https://github.com/pooya-labs/aetherflow/pull/47) is open and mergeable: it adds an HTTP-router regression test for a streamed body one byte over 2 MiB without `Content-Length`, expecting HTTP 413 and `payload_too_large`. Its exact-head Rust/server, migrations, Docker Compose, Gateway, dependency-audit and secret-scan checks passed; deployed Cloudflare Free runtime smoke was skipped. The Gateway production route still has no configured Rust API origin and is not claimed live. |
| ORBIT | [`c2cada4972da`](https://github.com/pooya-labs/orbit/commit/c2cada4972dae13515a45cc338af9a517815bfbe) | 2026-11-12 11:40 | Exact-main check-runs include successful website build/publish, security/dependency scans, Local Work and stable release gates, and local telemetry pipeline; Go API build/tests and Local Work runtime E2E are explicitly skipped on this maintenance/dependency checkpoint. | Open PRs: [#192](https://github.com/pooya-labs/orbit/pull/192) is a docs-only maintenance handoff; [#190](https://github.com/pooya-labs/orbit/pull/190) updates the server OTLP trace HTTP exporter to 1.47.0; [#181](https://github.com/pooya-labs/orbit/pull/181) updates the same exporter in the Go telemetry example. Releases remain [stable portfolio demo v1.0.0](https://github.com/pooya-labs/orbit/releases/tag/v1.0.0) and separate [Local Work v1.1.0](https://github.com/pooya-labs/orbit/releases/tag/local-work-v1.1.0). Local Work is single-user/loopback-only; production Compose remains on Keycloak 26.8.1; patched 26.8.2 has not been promoted, and the Workers/D1 and Cloudflare edge foundations are not a live production runtime. |
| Pooya.OS | [`c3b79f7f8613`](https://github.com/pooya-labs/pooya-os/commit/c3b79f7f861398419d4b63f994a9c08c23cbdd01) | 2026-11-09 13:45 | Pages deployment [42628234482](https://github.com/pooya-labs/pooya-os/actions/runs/42628234482) passed on the exact head. No newer main commit or open PR was observed. | Latest delta is ownership/readme wording only; no new application-code change. Final public role/content/media review remains open. |
| NexusCanvas | [`99a95ad3649b`](https://github.com/pooya-labs/nexus-canvas/commit/99a95ad3649bc34068eace565a975257994da519) | 2026-11-09 13:45 | Pages deployment [42628272725](https://github.com/pooya-labs/nexus-canvas/actions/runs/42628272725) passed on the exact head. No newer main commit or open PR was observed. | Latest delta is ownership/readme wording only; no new application-code change. Rack/analysis/snapshot evidence and owner-content approval remain open. |
| LuminaGlass | [`450067f9327f`](https://github.com/pooya-labs/lumina-glass/commit/450067f9327f8a83235d6b06d174b04452d0dcde) | 2026-11-09 13:45 | Pages deployment [42628341734](https://github.com/pooya-labs/lumina-glass/actions/runs/42628341734) passed on the exact head. No newer main commit or open PR was observed. | Latest delta is README attribution and ownership documentation; no new application-code change. Export/Audio Lab/task-board evidence and owner-content approval remain open. |
| AuraPulse | [`410529e3e818`](https://github.com/pooya-labs/aurapulse/commit/410529e3e81894c0908020703add51b314e016ba) | 2026-11-09 13:45 | Pages deployment [42628242835](https://github.com/pooya-labs/aurapulse/actions/runs/42628242835) passed on the exact head. No newer main commit or open PR was observed. | README confirms public Binance ticker use is read-only and availability-dependent; order-book depth, seeded/generated candles, risk markers, and paper trading remain synthetic/local demonstrations. Do not imply brokerage or real-money execution. |
| GlobalCart | [`08f17873e111`](https://github.com/pooya-labs/globalcart/commit/08f17873e111f5aa4e965d2ecf0304c747865dbe) | 2026-11-10 12:48 | The stable [v1.0.0](https://github.com/pooya-labs/globalcart/releases/tag/v1.0.0) release exists. Publish workflow [42819475293](https://github.com/pooya-labs/globalcart/actions/runs/42819475293), post-deploy visual QA [42819187155](https://github.com/pooya-labs/globalcart/actions/runs/42819187155), Shopify catalog smoke [42819187084](https://github.com/pooya-labs/globalcart/actions/runs/42819187084), and Lighthouse audit [42819187307](https://github.com/pooya-labs/globalcart/actions/runs/42819187307) passed on this source checkpoint. | No open PR was observed. The project remains a marketplace simulation, not a live retailer. Current committed TGJU FX snapshot records 2,632,950 IRR / 263,295 toman per USD at `2026-11-10T09:50:30Z` (Tehran clock 13:20:30); this is a timestamped snapshot, not a verified current Nov 12 quote. |
| Salon Booking | [`e4170913b704`](https://github.com/pooya-labs/salon-booking/commit/e4170913b704f3e9d3d9c0eaef2a953161524c68) | 2026-11-10 17:45 | CI [42868162146](https://github.com/pooya-labs/salon-booking/actions/runs/42868162146) and Pages preview deployment [42868161950](https://github.com/pooya-labs/salon-booking/actions/runs/42868161950) passed. Release [v1.2.0](https://github.com/pooya-labs/salon-booking/releases/tag/v1.2.0) was published on Nov 10. | No open PR was observed. v1.2.0 is explicitly a Firebase-configured **debug-signed APK**, not a production-signed Android release; its notes still request physical-device/theme/notification smoke testing before broad distribution. The live booking website and Apps Script backend remain the existing production services. Salon-owner permission for portfolio attribution/imagery remains separate and pending. |

### Material changes since the 2026-11-10 inventory

- **AetherFlow:** Gateway test coverage now includes origin failures. The open PR #47 strengthens the Rust API's actual streamed-body limit when `Content-Length` is absent; its tests pass, but the deployed Cloudflare runtime smoke is skipped and the production route remains disabled without an origin.
- **ORBIT:** main advanced through dependency maintenance; its two separate releases remain stable portfolio demo v1.0.0 and Local Work v1.1.0. Neither release makes the Cloudflare Worker/D1 or edge gateway production-ready.
- **GlobalCart:** the FX snapshot now moves forward to Nov 10 09:50 UTC and the v1.0.0 publication/visual/catalog/Lighthouse workflows passed. The snapshot is still about two days old at this audit time; no current-market-rate claim is justified.
- **Salon Booking:** the Shayan Barber Studio Android v1.2.0 debug APK is documented and released; this does not replace the existing website/backend production system or authorize public salon media without the salon owner's permission.
- **Pooya.OS, NexusCanvas, LuminaGlass and AuraPulse:** no newer default-branch commits were observed than the Nov 9 ownership/documentation changes; exact Pages deployment evidence remains as listed.

This refresh is not owner acceptance and does not approve biographies, individual contribution claims, featured order, screenshots, captions, alt text, or client media. Preserve each project's simulation, demo, debug-build, connection-required, deployment and attribution boundaries. Phase 9 implementation remains blocked until the outstanding Phase 7 owner/device/accessibility/privacy gates are closed; read-only source verification may continue.

## Portfolio-layer integration verified — P7-27, 2026-11-10

PR [#53](https://github.com/pooya-labs/pooya-labs-platform/pull/53) merged as [`1ba198d`](https://github.com/pooya-labs/pooya-labs-platform/commit/1ba198d1293305c9b0a64c91746989570f952ec2). The checks verify the portfolio layer—not embedded or live project backends.

| Project | Source repository | Public demo | Internal case study |
|---|---|---|---|
| AetherFlow | [GitHub](https://github.com/pooya-labs/aetherflow) | [Demo](https://pooya-labs.github.io/aetherflow/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/aetherflow/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/aetherflow/) |
| ORBIT | [GitHub](https://github.com/pooya-labs/orbit) | [Demo](https://pooya-labs.github.io/orbit/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/orbit/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/orbit/) |
| Pooya.OS | [GitHub](https://github.com/pooya-labs/pooya-os) | [Demo](https://pooya-labs.github.io/pooya-os/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/pooya-os/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/pooya-os/) |
| NexusCanvas | [GitHub](https://github.com/pooya-labs/nexus-canvas) | [Demo](https://pooya-labs.github.io/nexus-canvas/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/nexus-canvas/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/nexus-canvas/) |
| LuminaGlass | [GitHub](https://github.com/pooya-labs/lumina-glass) | [Demo](https://pooya-labs.github.io/lumina-glass/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/lumina-glass/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/lumina-glass/) |
| AuraPulse | [GitHub](https://github.com/pooya-labs/aurapulse) | [Demo](https://pooya-labs.github.io/aurapulse/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/aura-pulse/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/aura-pulse/) |
| GlobalCart | [GitHub](https://github.com/pooya-labs/globalcart) | [Demo](https://pooya-labs.github.io/globalcart/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/global-cart/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/global-cart/) |
| Salon Booking | [GitHub](https://github.com/pooya-labs/salon-booking) | [Demo](https://pooya-labs.github.io/salon-booking/) | [فارسی](https://pooya-labs.github.io/pooya-labs-platform/projects/salon-booking/) · [English](https://pooya-labs.github.io/pooya-labs-platform/en/projects/salon-booking/) |

The homepage card layer uses each project's visual, official demo, repository, and in-site case-study route. All eight projects also have bilingual case-study dossiers and localized architecture diagrams. The static-build contract now validates responsive AetherFlow evidence for both locales.

**AetherFlow homepage artwork:** the platform now stores `apps/platform/public/project-marks/aetherflow.svg`, a faithful extraction of the project's own inline favicon mark from [AetherFlow `index.html` at upstream SHA `ad3edc6`](https://github.com/pooya-labs/aetherflow/blob/ad3edc60d0f65922bfeecc94111725fc61cebab3/index.html). The platform asset is pinned to [platform asset commit `99dc331`](https://github.com/pooya-labs/pooya-labs-platform/commit/99dc3317afa180058def6f0d860e4b654be62ae2); the upstream project remains licensed under [Apache-2.0](https://github.com/pooya-labs/aetherflow/blob/ad3edc60d0f65922bfeecc94111725fc61cebab3/LICENSE). The approved full-page AetherFlow desktop/mobile captures remain pinned to platform source commit `eba5e2d02047375ae8a42514f7bbb58c75106ba7` and recorded in [the 2026-11-08 reviewed capture manifest](approved-interface-captures/portfolio-2026-11-06.json).

**Scope and limitations:** this is a portfolio/navigation/media integration only. No independent application source, API, database, identity provider, or live backend was embedded or modified. Deeper integrations remain deferred to Phase 9 under ADR-0001. The project registry's eight `reviewState` values remain `needs-owner-review`; Salon Booking's separate owner permission is still pending. AetherFlow M08, ORBIT production image promotion, and GlobalCart FX freshness gates remain open.

## Latest read-only upstream recheck — 2026-11-10

**Inspection mode:** read-only. All eight independent project repositories were checked against their current `main` commit history. No independent repository was modified. This refresh updates the source inventory and corrects superseded ORBIT/AetherFlow/GlobalCart statements; it does not approve final case-study content or media.

| Project | Current `main` SHA | Latest commit (UTC) | Verified status / observed delta |
|---|---|---:|---|
| AetherFlow | [`ad3edc60d0f6`](https://github.com/pooya-labs/aetherflow/commit/ad3edc60d0f65922bfeecc94111725fc61cebab3) (docs checkpoint; latest application-code merge [`5cc44c1a7c91`](https://github.com/pooya-labs/aetherflow/commit/5cc44c1a7c91f0fd330a2055cc2e900b2d58a7c6)) | 2026-11-09 23:27:44 | PR [#19](https://github.com/pooya-labs/aetherflow/pull/19) added a hard 2 MiB cap to streamed control-plane responses, including responses without a reliable Content-Length; its exact PR-head Rust CI and supply-chain/secret checks passed ([Rust](https://github.com/pooya-labs/aetherflow/actions/runs/42657163383), [security](https://github.com/pooya-labs/aetherflow/actions/runs/42657163367)). PR [#18](https://github.com/pooya-labs/aetherflow/pull/18) added deterministic lifecycle walks across 1,024 seeds × 64 transitions for Workflow and Task. PR [#20](https://github.com/pooya-labs/aetherflow/pull/20) refreshed the README, roadmap and release checkpoint. The current README reports the exact application-code merge's Rust CI, security and Pages checks passed. **M08 remains in progress**: the five-repeat benchmark must run on a matching EPYC 9V45 fingerprint before numeric thresholds can be evaluated; AetherFlow is not a stable v1.0.0 production release. No open PRs were returned by the current read-only query. |
| ORBIT | [`3c8ebc56d34a`](https://github.com/pooya-labs/orbit/commit/3c8ebc56d34a4c9ed553338c7d8531bb1c4a0e20) | 2026-11-09 23:24:33 | PR [#138](https://github.com/pooya-labs/orbit/pull/138) is **merged**, superseding the earlier audit that described it as open and its Keycloak scan as failing. It built and published patched Keycloak 26.8.2 with Guava 33.7.2-jre as multi-architecture GHCR digest `sha256:97cc4590f5abd77e23522d6d94c3fe77c82b91c44a4e7acef22aec28c61bf81d`; strict scans of that exact digest passed on AMD64 and ARM64, and the deferred identity scan passed ([publication](https://github.com/pooya-labs/orbit/actions/runs/42654381960), [CI](https://github.com/pooya-labs/orbit/actions/runs/42666620838), [Security](https://github.com/pooya-labs/orbit/actions/runs/42666620866), [deferred identity scan](https://github.com/pooya-labs/orbit/actions/runs/42666620875), [native rebuild](https://github.com/pooya-labs/orbit/actions/runs/42666620841)). **Production Compose remains pinned to upstream Keycloak 26.8.1**; the patched GHCR image has not been promoted/deployed, and identity provisioning, routing and production traffic were not changed. The stable `v1.0.0` release remains intact. No open PRs were returned by the current read-only query. |
| Pooya.OS | [`c3b79f7f8613`](https://github.com/pooya-labs/pooya-os/commit/c3b79f7f861398419d4b63f994a9c08c23cbdd01) | 2026-11-09 13:45 | Latest observed commit deduplicates the bilingual README ownership marks and clarifies the permission boundary; no new application-code change was observed. Exact-head build/deployment evidence from the previous audit remains the latest recorded verification ([run 42628234482](https://github.com/pooya-labs/pooya-os/actions/runs/42628234482)). |
| NexusCanvas | [`99a95ad3649b`](https://github.com/pooya-labs/nexus-canvas/commit/99a95ad3649bc34068eace565a975257994da519) | 2026-11-09 13:45 | Latest observed commit deduplicates the bilingual README ownership marks and clarifies the permission boundary; no new application-code change was observed. Exact-head build/deployment evidence from the previous audit remains the latest recorded verification ([run 42628272725](https://github.com/pooya-labs/nexus-canvas/actions/runs/42628272725)). |
| LuminaGlass | [`450067f9327f`](https://github.com/pooya-labs/lumina-glass/commit/450067f9327f8a83235d6b06d174b04452d0dcde) | 2026-11-09 13:45 | Latest observed commit updates README attribution and adds `docs/OWNERSHIP-AND-ATTRIBUTION.md`; no new application-code change was observed. Exact-head build/deployment evidence from the previous audit remains the latest recorded verification ([run 42628341734](https://github.com/pooya-labs/lumina-glass/actions/runs/42628341734)). |
| AuraPulse | [`410529e3e818`](https://github.com/pooya-labs/aurapulse/commit/410529e3e81894c0908020703add51b314e016ba) | 2026-11-09 13:45 | Latest observed commit deduplicates the bilingual README ownership marks and clarifies the permission boundary; no new application-code change was observed. Synthetic-market-data and CORS boundaries remain; no live exchange connectivity is claimed. Exact-head build/deployment evidence from the previous audit remains the latest recorded verification ([run 42628242835](https://github.com/pooya-labs/aurapulse/actions/runs/42628242835)). |
| GlobalCart | [`2ef95fafda7c`](https://github.com/pooya-labs/globalcart/commit/2ef95fafda7ccee913f7b47aec8a8dec088c6be1) | 2026-11-09 (automation data commit) | The latest commit is authored by `github-actions[bot]`, changes only `data/fx-rate.json`, and is marked `[skip ci]`. The snapshot changes the raw quote to 2,659,000 IRR / 265,900 toman per USD, but its embedded `sourceUpdatedAt` moves **backward** from `2026-11-09T09:54:57Z` in the prior snapshot to `2026-11-09T08:34:57Z` (and the Tehran source clock moves from 13:24:57 to 12:04:57). This is a source-freshness/order anomaly, not evidence of a newer market observation. No CI or deployment for this commit is verified; the previous exact-main Pages deployment remains run [42628309742](https://github.com/pooya-labs/globalcart/actions/runs/42628309742) on `1c3d27f`. Do not claim this FX snapshot is current until its source timestamp/order is reconciled. GlobalCart remains a marketplace simulation, not a live retailer. |
| Salon Booking | [`4fc21aeb4659`](https://github.com/pooya-labs/salon-booking/commit/4fc21aeb46593377b2dc96322ce31a5e3c82dce4) | 2026-11-09 13:48 | Latest observed commit updates README attribution and adds `docs/OWNERSHIP-AND-ATTRIBUTION.md`; no new application-code change was observed. Previous exact-head build, Windows visual, deployment and Cloudflare build checks remain the latest recorded evidence. Public case-study media is still subject to the salon owner's permission and privacy review ([workflow](https://github.com/pooya-labs/salon-booking/actions/runs/42628721667), [deployment](https://github.com/pooya-labs/salon-booking/actions/runs/42628721658)). |

### Material changes since the 2026-11-09 audit

- **AetherFlow:** PR #19 merged the bounded 2 MiB streamed CLI response handling; PR #18 added deterministic seeded lifecycle coverage; PR #20 synchronized the handoff and release docs. M08 and the matching-runner benchmark remain open.
- **ORBIT:** PR #138 merged. The patched Keycloak 26.8.2/Guava 33.7.2 image was published and strict-scanned successfully on both architectures. This closes the previous image-scan failure for that exact digest, **not** production promotion: Compose still uses Keycloak 26.8.1.
- **GlobalCart:** a new automation commit changed only the FX snapshot. Its source timestamp regressed by 80 minutes compared with the previous snapshot, and the commit skipped CI. It must not be presented as a verified current quote or a new production deployment.
- **Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and Salon Booking:** no newer main commit was observed in this refresh; their latest known commits and boundaries remain as recorded in the table.

This is a source inventory, not a portfolio approval round. Preserve simulation/synthetic-data, connection-required, runtime, contribution-attribution, privacy, and separate product-owner boundaries in public copy. The refresh does not approve the biographies, featured order, roles, screenshots, captions, alt text, or any final project claim. Phase 9 must repeat the source review and approve final media after the Phase 8 redesign.

## What is already populated

The portfolio now has eight bilingual project dossiers. Each includes documented role/attribution (or explicitly says when the source does not identify an individual), architecture, implementation details, engineering decisions, verification evidence, and links to source documentation and relevant CI runs. Case-study pages render these in Persian and English. Source repositories remain independent; no project code was copied into this portfolio.


## Previous upstream `main` recheck — 2026-11-08 19:30 UTC

This checkpoint supersedes the older upstream head inventory below for current branch-head references. Each commit was fetched from the corresponding public repository and its diff inspected.

| Project | Current `main` SHA | Latest commit (UTC) | Observed delta in this recheck |
|---|---|---:|---|
| AetherFlow | [`2ce6c7450186`](https://github.com/pooya-labs/aetherflow/commit/2ce6c7450186a6e50332c12872b17f4b01196739) | 19:25 | README ownership artwork updated to the centered rounded black-tile Pooya Labs monogram; bilingual ownership blocks retained. |
| ORBIT | [`970d9723ee44`](https://github.com/pooya-labs/orbit/commit/970d9723ee4419df82979a5e232f4fed3c8ab5a2) | 19:25 | README ownership artwork updated to the centered rounded black-tile Pooya Labs monogram; bilingual ownership blocks retained. |
| Pooya.OS | [`f4b93d7f95a1`](https://github.com/pooya-labs/pooya-os/commit/f4b93d7f95a1c25dfd62fd4c28b64de4fac0ec6c) | 19:25 | README ownership artwork updated to the centered rounded black-tile Pooya Labs monogram; bilingual ownership blocks retained. |
| NexusCanvas | [`9f2756b18466`](https://github.com/pooya-labs/nexus-canvas/commit/9f2756b1846622caa43e3947c4387c71a3e988c9) | 19:25 | README ownership artwork updated to the centered rounded black-tile Pooya Labs monogram; bilingual ownership blocks retained. |
| LuminaGlass | [`f8e6c958d33d`](https://github.com/pooya-labs/lumina-glass/commit/f8e6c958d33d494d9d26ff98279897d8bfd3aa35) | 19:25 | README ownership artwork updated to the centered rounded black-tile Pooya Labs monogram; bilingual ownership blocks retained. |
| AuraPulse | [`b4a83648025d`](https://github.com/pooya-labs/aurapulse/commit/b4a83648025d30162ad8754516b7c419b56e68ea) | 19:25 | README ownership artwork updated to the centered rounded black-tile Pooya Labs monogram; bilingual ownership blocks retained. |
| GlobalCart | [`fed6f59f62c9`](https://github.com/pooya-labs/globalcart/commit/fed6f59f62c9d853ae82099b7266339ada15f9c2) | 19:30 | Two storefront-home screenshot files added under docs/screenshots; no application code changed. |
| Salon Booking | [`ca745a46c863`](https://github.com/pooya-labs/salon-booking/commit/ca745a46c863010f2d7133356a0209abf928a12) | 19:25 | README ownership artwork updated to the centered rounded black-tile Pooya Labs monogram; bilingual ownership blocks retained. |

The seven README-only changes point to `pooya-monogram-tile.svg` at 96px in both English and Persian ownership sections. GlobalCart's commit adds `docs/screenshots/storefront-home-desktop.png` and `docs/screenshots/storefront-home-mobile.png`; it contains no application-code change. These are source-head and change-inventory findings only: no independent repository was modified, no new application behavior was accepted, and final feature/content/media acceptance remains reserved for Phase 9.

## What is already populated

The portfolio now has eight bilingual project dossiers. Each includes the documented role/attribution (or explicitly says when the source does not identify an individual), architecture, implementation details, engineering decisions, verification evidence, and links to source documentation and relevant CI runs. Case-study pages render these in Persian and English. Source repositories remain independent; no project code was copied into this portfolio.

## Upstream source recheck — 2026-11-07

This checkpoint supersedes older stage labels and runtime descriptions below where they conflict.

### Read-only upstream `main` ref inventory — 2026-11-07 (UTC)

| Project | Current `main` SHA | Latest commit date (UTC) |
|---|---|---|
| AetherFlow | `c7cb553f0751514df0d916e69c29807636e66c67` | 2026-11-06 15:03 |
| ORBIT | `268017365cd22f7db9dd8895fb59fbccc76c9b8f` | 2026-11-06 13:14 |
| Pooya.OS | `1d408c0881d480db8f1c1a7a9f94272a93d4e617` | 2026-11-01 00:13 |
| NexusCanvas | `df05f90b0463e5681324efec9083c9fe20c2cc7c` | 2026-11-01 00:13 |
| LuminaGlass | `06fa93428a00442e5ec53d5486c3615048f66842` | 2026-11-01 00:13 |
| AuraPulse | `7f3611cae0d74e06b6b01af534a5f84a79e5901c` | 2026-11-01 00:13 |
| GlobalCart | `9afa4f5d726df51ae4f9b95b30982fb5ecd3482a` | 2026-11-07 16:54 |
| Salon Booking | `4c4840c639da099379e8f65b387b1589685c6afd` | 2026-11-07 17:02 |

This table records branch heads only; it does not substitute for feature-level acceptance or owner approval. GlobalCart was re-inspected because its main branch advanced after the previous platform checkpoint. No independent source repository was modified.

### ORBIT — main `268017365cd22f7db9dd8895fb59fbccc76c9b8f`

- PR [#136](https://github.com/pooya-labs/orbit/pull/136) merged the Cloudflare edge-gateway path into the canonical ORBIT stack. It adds a thin Worker proxy; it does not duplicate Go business logic, OIDC, roles, workspace policy, PostgreSQL, or telemetry storage.
- Exact-main CI [42223939950](https://github.com/pooya-labs/orbit/actions/runs/42223939950), Security [42223939967](https://github.com/pooya-labs/orbit/actions/runs/42223939967), and Pages deployment [42223939898](https://github.com/pooya-labs/orbit/actions/runs/42223939898) passed on the merge SHA.
- Runtime acceptance is **not complete**: Worker version 0.2.3 is deployed, but the `workers.dev` route is disabled; Worker secrets and resource bindings are empty; the private Go/Caddy origin and `ORBIT_GATEWAY_SECRET` are not configured. The Worker therefore remains fail-closed for API routes. Do not describe the Cloudflare runtime as connected or live.
- The intended boundaries are now reflected in the portfolio dossier and architecture diagram: Apps Script continues as an independent synthetic-data demo; Cloudflare Worker is the edge entry to the canonical Go API once configured; PostgreSQL remains authoritative; OTLP/HTTP and OTLP/gRPC remain separate authenticated paths to the private Collector and Prometheus/Loki/Tempo.
- Current open ORBIT proposals at the 2026-11-07 recheck: [#137](https://github.com/pooya-labs/orbit/pull/137) docs/handoff sync, [#138](https://github.com/pooya-labs/orbit/pull/138) deferred Keycloak-origin update, [#140](https://github.com/pooya-labs/orbit/pull/140) draft Cloudflare-native D1 runtime foundation, and [#142](https://github.com/pooya-labs/orbit/pull/142) draft x/net security remediation. None is merged into main; describe only the main-branch architecture as shipped.
- Required post-v1 edge acceptance remains CF01–CF05: origin trust and secret, direct-origin denial, Worker forwarding, Pages/PKCE API parity, role and workspace isolation, telemetry/operations checks, dual-runtime profile isolation, and a separately evidenced edge release. Do not modify the immutable ORBIT v1.0.0 tag.
- The current Cloudflare runtime design and operator checklist are documented at [docs/cloudflare-runtime.md](https://github.com/pooya-labs/orbit/blob/main/docs/cloudflare-runtime.md). A follow-up runbook-fix PR was still open/in progress when this checkpoint was taken; only merged main SHA 2680173 is treated as the source of truth.

### GlobalCart — main 9afa4f5d726df51ae4f9b95b30982fb5ecd3482a

- Current package remains **v0.2.3-dev / M09.8**. The current application-code checkpoint is 6192f8eccdbf8092c31e06a0f37a53485c3e3589; main HEAD 9afa4f5d726df51ae4f9b95b30982fb5ecd3482a follows it with a catalog snapshot persistence commit. The compare from 61ce7f5 to 6192f8 includes an accessibility patch, the corresponding E2E assertion change, and data/catalog.json.
- Pages deployment [42393544307](https://github.com/pooya-labs/globalcart/actions/runs/42393544307) and Security [42393544310](https://github.com/pooya-labs/globalcart/actions/runs/42393544310) passed on application SHA 6192f8. The attempted fix removed the explicit aria-label from .hero-product-tile links so visible text would provide the name, but the browser still computes an empty accessible name.
- Browser E2E [42393544303](https://github.com/pooya-labs/globalcart/actions/runs/42393544303) failed with **137 passed / 3 failed / 9 skipped**. The three failures occurred in Chromium mobile: homepage WCAG axe scan and command-palette-open axe scan both report serious link-name violations on hero product links, and the storefront merchandising test receives an empty accessible name where a Persian product name is expected. Keep the axe and Playwright assertions; fix the markup/name calculation rather than suppressing the tests.
- Lighthouse [42393731570](https://github.com/pooya-labs/globalcart/actions/runs/42393731570), post-deploy visual QA [42393731697](https://github.com/pooya-labs/globalcart/actions/runs/42393731697), and Shopify Catalog Smoke [42393731548](https://github.com/pooya-labs/globalcart/actions/runs/42393731548) passed on the current main snapshot. Portfolio screenshot publishing [42394145400](https://github.com/pooya-labs/globalcart/actions/runs/42394145400) was skipped.
- The 1,000-product snapshot/galleries remain part of the M09.6 evidence. M09.8 still needs a real accessible-name fix and green exact-current-SHA Browser E2E, full gallery/PDP interaction acceptance, source-document handoff reconciliation, owner review of the 12 selected products and Persian editorial copy, and human physical-device/screen-reader/RTL-LTR review. Continue labeling generated catalog prices as GlobalCart estimates, not seller quotes. Do not tag 1.0.0.
- Current GlobalCart has no open pull requests at the time of this recheck. Its independent source repository was not modified during this platform audit.

## Latest upstream source deltas — 2026-11-08 (read-only)

The following are the newest commits surfaced for the eight independent repositories during this readiness pass. Their diffs were inspected. This is a current-change inventory, not final feature acceptance; each exact source revision and its tests must be revalidated again during Phase 9, immediately before final project integration.

| Project | Latest source commit inspected | Observed change |
|---|---|---|
| AetherFlow | [b7ee1de](https://github.com/pooya-labs/aetherflow/commit/b7ee1de0c300b6457958eadb04a93558f8cec196) | Apps Script dashboard records are now explicitly labelled synthetic demo data; do not describe this bridge data as live production telemetry. |
| ORBIT | [161913b](https://github.com/pooya-labs/orbit/commit/161913be3134d8ad89d8cbb535b066c01768fbd1) | Documentation-only correction to Cloudflare D1 implementation gate numbering; the earlier fail-closed gateway/runtime limitations remain. |
| Pooya.OS | [b3e4ee8](https://github.com/pooya-labs/pooya-os/commit/b3e4ee8f3a6352aa8d17320584570d9b8ec798e7) | Window frames now reserve additional footer/dock space, including mobile safe-area space. |
| NexusCanvas | [ebcda40](https://github.com/pooya-labs/nexus-canvas/commit/ebcda40e0334822ab75a43093cd923f599bebfb5) | Removed an undefined footer language-variable reference; the new footer strings are fixed English copy and localized parity should be checked during final integration. |
| LuminaGlass | [9c479da](https://github.com/pooya-labs/lumina-glass/commit/9c479da9c726d044f3482aa10fdc8aa27307d694) | Unified project marks, added missing AetherFlow/ORBIT/Salon Booking live links, and normalized the Salon Booking logo treatment. |
| AuraPulse | [99f9048](https://github.com/pooya-labs/aurapulse/commit/99f90489f50d349be565640cf60738e181436245) | Footer ownership marks now reference the current Pooya Labs Platform monogram. |
| GlobalCart | [2101f02](https://github.com/pooya-labs/globalcart/commit/2101f02cf60a0aba9291757a699d843c41455e1f) | Bot commit persists the product catalog snapshot, lockfile, and site imagery; no application-code fix is present in this commit, so the previously recorded accessible-name Browser E2E failures remain unverified/unresolved. |
| Salon Booking | [fcd7b0f](https://github.com/pooya-labs/salon-booking/commit/fcd7b0fcfedf8f94227e164ef60ce74549fe1731) | The Pooya Labs Platform owner mark is now loaded from a local asset rather than a remote raw-GitHub URL. This does not authorize publication of customer/admin data. |

No independent source repository was modified in this pass. The platform currently has draft case studies for all eight projects, but the final source refresh, feature evidence, owner-approved media, and complete portfolio-level integration are reserved for Phase 9, after Phase 8 redesign approval.

## Artifact-only project screenshots and motion reels — 2026-11-07

**Run:** [Project Interface Captures 42399972697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697) · **artifact:** [13584314344](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697/artifacts/13584314344)

- Result: **29 PNG screenshots and seven WebM motion reels**, 37 files total. The images include 1440×1000 desktop and 390×844 mobile views; WebM captures are 1440×1000 at 25 fps and approximately 8.6–14.5 seconds each. The capture report records SHA-256 and marks all candidate media `captured-pending-human-review`.
- Project coverage: AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, GlobalCart. The workflow also captures ORBIT Incidents and Metrics/Logs/Traces connection-required states, NexusCanvas Mobile Rack/export modal, and LuminaGlass Audio Lab/local task board. It never starts audio or imports files.
- Visual review: the project pages and mobile crops render and no capture failures were reported. Keep every image and reel artifact-only until the owner reviews and approves it. None of these new captures has been committed to `apps/platform/public/interface-captures`.
- AetherFlow screenshots still visibly contain the M07/README M08 mismatch and duplicate Dashboard navigation; keep them withheld pending upstream correction. AuraPulse's requests to Binance returned CORS/network failures in desktop and mobile recordings; screenshots must stay clearly SIMULATED and must not be described as live market data. ORBIT Metrics/Logs/Traces show a connection-required state, not live telemetry. LuminaGlass overview remains at 32px blur; the Audio Lab and task-board screens are legible.
- Salon Booking was not captured. Customer names, phone numbers, booking references, tokens, and private booking data remain excluded until the salon owner approves a synthetic or fully redacted test environment and publication.

## Artifact-only interface recapture review — 2026-11-06

**Capture evidence:** workflow [42235240283](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283), artifact [13510233762](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42235240283/artifacts/13510233762), with `capture-report.json` and twelve PNG candidates:
- AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse; each at 1440×1000 and 390×844.
- All twelve page requests returned HTTP 200 and all twelve viewport diagnostics reported no horizontal overflow.
- The capture runner reported no page/console/network errors for AetherFlow, ORBIT, Pooya.OS, NexusCanvas, or LuminaGlass. AuraPulse reported a failed request to Binance's `/api/v3/ticker/24hr` endpoint because the browser origin `https://pooya-labs.github.io` did not receive an `Access-Control-Allow-Origin` response.
- All twelve individual screenshots were visually inspected at full size on 2026-11-06. This is a visual review of candidate evidence, not owner approval or permission to publish. The files remain in the workflow artifact only; none was committed to the public portfolio.

**Per-project visual findings**
- **AetherFlow:** Desktop and mobile layouts are composed cleanly, but both show `CONTROL PLANE / M07` while the source README records M08 in progress. The desktop header also visibly contains two `Dashboard` navigation labels. Keep both screenshots withheld until the upstream owner reconciles milestone labels/navigation, public host links, and dashboard/API CORS instructions.
- **ORBIT:** Desktop and mobile screenshots clearly show `DEMO ENVIRONMENT` and explicitly say the metrics, services, and incidents are illustrative; the side rail also says demo telemetry/sample rather than live usage. These are useful Overview candidates, not evidence of a real connected infrastructure. Incidents/Metrics/Logs/Traces focused states remain missing.
- **Pooya.OS:** Both screenshots show the profile portrait and the X-Ray/engineering-profile window. The owner must approve the visible portrait and verify that the displayed frame-time/FPS indicators are demo/interface telemetry before these candidates replace any existing approved media.
- **NexusCanvas:** Both screenshots expose the graph editor and node inspector; the desktop identifies modelled latency/throughput, and the side panel explicitly says telemetry is illustrative, not live. They are candidates for the main canvas only; rack view, focused graph analysis, and snapshot import/export still need dedicated evidence.
- **LuminaGlass:** Both screenshots show the optical-glass editor, preset list, and PNG export area, with Blur set to 32px. The preset-title/input area is heavily blurred in this state. Keep as a candidate; add a clearer low/no-blur or successful-export capture, plus Audio Lab and task-board states, before treating the case study as complete.
- **AuraPulse:** Desktop and mobile screenshots visibly carry a `SIMULATED` badge and the chart is labeled illustrative OHLC. This supports an explicitly simulated UI showcase only. The same capture run's Binance ticker request failed CORS, so do not describe the screenshot as live market data or a verified connected-feed capture.
- **Salon Booking:** Deliberately excluded from this run because a usable capture requires owner-approved, privacy-reviewed synthetic/redacted content.

**Publication rule:** keep these twelve new files separate from previously approved/pinned screenshots. Promote a candidate only through the existing checksum-gated approval-manifest workflow after owner approval and any project-specific factual/privacy checks.

## Per-project audit

### 01 — AetherFlow

**Recorded from source**
- Rust/Tokio workflow engine with Axum control plane, PostgreSQL persistence, NATS JetStream, outbox/inbox delivery, Wasmtime extension support, CLI, typed Rust SDK, versioned API/OpenAPI, and OpenTelemetry.
- Durable workflow/task state, recoverable workers, leases/heartbeats/epoch fencing, tenant-scoped routes, and FORCE ROW LEVEL SECURITY on ten tables.
- M00–M07 are recorded complete; M08 production engineering remains in progress.
- Restore-to-runtime evidence: [PostgreSQL/NATS run 41882781118](https://github.com/pooya-labs/aetherflow/actions/runs/41882781118).
- API process-kill/restart evidence: [run 42011508896](https://github.com/pooya-labs/aetherflow/actions/runs/42011508896).
- Performance results are restricted to matching AMD EPYC 9V45 runner/workload fingerprints; they are lab results, not production SLO or capacity guarantees.

**Required before portfolio release**
- [ ] Confirm exact public attribution/role wording. The current README does not identify an individual author or provide a personal contribution breakdown.
- [x] Add a bilingual architecture/execution-flow diagram based on the documented Rust, PostgreSQL, JetStream, Worker, and observability boundaries.
- [ ] Capture and approve current AetherFlow UI evidence. The portfolio's artifact-only capture workflow [42234110094](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110094) reached the current `pooya-labs.github.io` landing route and produced an unreviewed candidate, but the visible milestone still reads M07.
- [ ] Resolve the public landing-page milestone mismatch before screenshot acceptance: README says M08 is in progress while the landing page and dashboard still display M07. The portfolio continues to withhold AetherFlow UI imagery.

**Verified source detail (2026-11-06; read-only recheck)**
- Inspected upstream `pooya-labs/aetherflow` main at `c7cb553f0751514df0d916e69c29807636e66c67`. README says M00–M07 are complete and M08 is in progress.
- The same source revision's `index.html` still displays `Control plane / M07`, and `dashboard/index.html` still displays `Observability / M07`.
- The portfolio capture workflow [42234110094](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42234110094) reached `https://pooya-labs.github.io/aetherflow/` with HTTP 200 and no failed page request. This proves landing-page reachability only, not API connectivity.
- The AetherFlow README's exact CORS guidance and dashboard/index.html notice now use `https://pooya-labs.github.io`. Some landing-page source/repository/navigation links still point to the old `pooya16pg-spec` account. Dashboard API base URL is operator-entered, and its client requires remote API URLs to use HTTPS.
- No live API preflight or successful hosted dashboard/API exchange was verified. Do not describe the dashboard as connected on the new origin until the deployed API CORS allowlist is tested from the real browser origin.
- Pages deployment [42239430319](https://github.com/pooya-labs/aetherflow/actions/runs/42239430319) passed on exact source `c7cb553`. Rust CI [42239384393](https://github.com/pooya-labs/aetherflow/actions/runs/42239384393), PostgreSQL schema [42239384017](https://github.com/pooya-labs/aetherflow/actions/runs/42239384017), and supply-chain/security [42239384049](https://github.com/pooya-labs/aetherflow/actions/runs/42239384049) passed on parent source `fc6e44b`; the child commit only applies rustfmt to a CORS test. These results do not establish live browser/API CORS behavior.
- This was a read-only inspection; the independent AetherFlow repository was not modified. Keep its UI screenshot withheld until the owner reconciles the M07 page badge with M08 README status, removes duplicate Dashboard navigation, aligns remaining public/source links, verifies live API preflight from the real browser origin, and approves the new screenshot.
- [ ] Recheck M08 against the current main SHA: in-flight worker completion during API outage, additional distinct recovery/failure-injection cases, and the fingerprint-aware benchmark comparator. Resolve or clearly describe any outstanding schema/CI failure.
- [ ] Record the owner's license choice; README states license selection is still pending.
- [ ] Confirm which benchmark/recovery results may be quoted publicly and retain exact run/source links.
- [ ] Keep production-readiness, exactly-once, and SLO claims out unless the source later provides evidence.

### 02 — ORBIT

**Recorded from source**
- Stable v1.0.0 for the stated portfolio-demo scope.
- Ten observability areas: Overview, Incidents, Alerts, Notifications, Deployments, SLOs, Audit, Metrics, Logs, and Traces.
- Public architecture is a static Pages dashboard plus a separate Apps Script synthetic-data demo. The local engineering stack (Go API, PostgreSQL, OpenTelemetry Collector, Prometheus, Loki, Tempo) is not a hosted production service.
- Release CI, Security, and Pages evidence are linked from the dossier. Demo notifications are simulated; no real webhook/email is sent.

**Evidence checkpoint (2026-11-06)**
- The ORBIT case study now uses a visually reviewed desktop hero and mobile screenshot, committed at `77bc3ce0c41533661b8970d2527f4cd94b8a4341` and referenced through immutable raw-GitHub URLs. Both images show the public synthetic-data demo and were checked for private data, browser errors, failed requests, and horizontal overflow.
- The capture workflow remains artifact-only. A separate approval-manifest publisher verifies exact artifact identity, PNG signatures, byte sizes, and SHA-256 checksums before it commits explicitly selected screenshots.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram that keeps the public Apps Script demo path separate from the local Go/OTel/Prometheus/Loki/Tempo engineering path.
- [x] Capture and visually approve the Overview dashboard in desktop and mobile sizes; both screenshots are in the case study and pinned to immutable portfolio commits. The current images show synthetic demo data and no private records.
- [ ] Capture additional real dashboard states for Incidents, Metrics, Logs, and Traces; these are not covered by the current Overview screenshots.
- [ ] Have the owner run and record an Apps Script demo smoke: bootstrap, a mutation in a synthetic workspace, reload/refresh persistence, and an isolated second browser profile. The external verification environment could not independently validate the owner's Apps Script deployment.
- [ ] Complete real-device TalkBack and VoiceOver sessions and the remaining human keyboard/chart-table review; automated axe/Playwright/NVDA runs do not constitute formal WCAG certification.
- [ ] Keep synthetic data, non-hosted Go/PostgreSQL/OTel infrastructure, and simulated notifications clearly disclosed.

### 03 — Pooya.OS

**Recorded from source**
- Authored by Pooya; static Next.js 16 / React 19 / TypeScript desktop-style portfolio using Zustand, Tailwind CSS, and Framer Motion.
- Window manager, four project case studies, local allowlisted CLI, Design Token inspector/X-Ray labels, and browser-side frame monitor.
- No backend, database, accounts, API routes, or real operating-system shell.
- Latest recorded Pages deployment in the README history is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram showing the static Pages export, Next/React workspace, Zustand state, and browser-local tools; the no-backend boundary is explicit.
- [x] Capture and visually review current desktop and mobile interface screenshots, including the engineering-profile window; both are committed and included in the case study.
- [ ] Run current-source browser, keyboard, responsive, reduced-motion, and accessibility checks; the README did not provide a consolidated current QA report at audit time.
- [ ] Confirm whether the project is still actively maintained or should be labelled as a completed experiment/demonstration.

### 04 — NexusCanvas

**Recorded from source**
- Authored by Pooya; client-side Next.js 16 / React 19 / TypeScript / Tailwind / SVG topology tool.
- Gateway/service/AI-worker/database/cache nodes, canvas and rack views, graph analysis, cycle/path checks, local stress simulation, validated versioned snapshots, and Docker Compose starter generation.
- BroadcastChannel synchronizes only same-origin tabs in the same browser. Metrics shown by the tool are modelled inputs, not measurements from real containers. No server, account system, live telemetry, or remote collaboration.
- Latest recorded Pages deployment is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram for the browser graph editor, graph analysis, validated model, local simulation, and snapshot/Compose export.
- [x] Capture and visually review representative desktop and mobile screenshots of the live canvas/topology workspace.
- [ ] Add focused evidence for rack view, graph analysis, and snapshot import/export; these states are not represented by the current two screenshots.
- [ ] Run current-source browser, keyboard, mobile, reduced-motion, and accessibility checks; no consolidated current QA report was found in the README.
- [ ] Confirm whether generated Compose output has an example verified by a real local Docker Compose run; otherwise continue calling it a starter, not a deployable production topology.

### 05 — LuminaGlass

**Recorded from source**
- Authored by Pooya; Next.js 16 / React 19 / TypeScript / Tailwind browser lab.
- SVG optical controls, Canvas PNG export, Web Audio API with five Biquad filters, presets, local task board, and cleanup of audio/microphone/object URL resources.
- Presets, EQ, and tasks are browser-local. Audio is not uploaded to a server; microphone requires secure context and user permission.
- Latest recorded Pages deployment is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram showing the separate SVG/Canvas optical path, Web Audio filter chain, and browser-local preset/task storage.
- [x] Capture and visually review desktop and mobile screenshots of the Optical Studio.
- [ ] Add focused evidence for PNG export, Audio Lab, and the task board; the current images do not demonstrate all four features.
- [ ] Run current-source tests for mic permission denial, stop/source switching, AudioContext/resource cleanup, and reduced-motion/accessibility behavior.
- [ ] Do not claim cloud sync, AI audio processing, or server persistence.

### 06 — AuraPulse

**Recorded from source**
- Authored by Pooya; Next.js 16 / React 19 / TypeScript market-data dashboard and browser-local paper-trading simulator.
- Binance 24-hour BTC/ETH/SOL tickers are read when reachable; fallback data is labelled illustrative. NVDA/AI is a synthetic demo instrument. Candle/order-book/pressure/AI-style markers may be illustrative.
- Local simulation includes buy/sell, average entry, valuation, realized/unrealized P&L, an illustrative 0.10% fee, history, and reset.
- No exchange API key or real order execution. Account state belongs to the current browser/device.
- Latest recorded Pages deployment is linked from the dossier.

**Required before portfolio release**
- [x] Add a bilingual architecture diagram separating Binance public ticker input, labelled illustrative fallback, browser dashboard, and local paper-trading storage; no exchange order path is shown.
- [x] Capture and visually review desktop and mobile screenshots of the clearly labelled simulated workspace; the images identify the chart as illustrative and the account as simulated.
- [ ] Capture separate connected-ticker and disconnected/fallback states plus a focused paper-trading flow. The current automation-origin browser run logged a CORS failure for the optional Binance ticker request, so these screenshots must not be presented as proof of live market connectivity.
- [ ] Re-run tests for feed availability/fallback labelling, local storage reset, arithmetic, and browser/accessibility behavior on current source.
- [ ] Ensure the portfolio never presents illustrative indicators as live market data or the project as a real trading platform.

### 07 — GlobalCart

**Recorded from source**
- README identifies Pooya as owner and product engineer.
- The source repository contains actual desktop and mobile storefront homepage screenshots; both are now embedded in the GlobalCart case study and pinned to immutable source commit `5ca43e40ff101e673ee7cf261850bff0a679047c`.
- Current line is **0.2.3-dev / M09.6**, not 1.0.0.
- Static Next.js storefront with a local 1,000-product Amazon Berkeley Objects snapshot and self-hosted WebP galleries, plus a separate runtime Shopify Global Catalog discovery path through a constrained Cloudflare Worker.
- Shopify runtime search is not a persisted local catalog: results and merchant images are not cached or re-hosted; merchant identity, seller URL, and seller-supplied price/availability remain visible.
- Local cart/checkout/orders/returns are simulations; no real payment, inventory reservation, shipping, or fulfillment occurs.
- Local Go/PostgreSQL/OpenAPI backend is a development/CI foundation; current public API endpoints are read-only and are not hosted production infrastructure.
- Latest Lighthouse lab and Shopify catalog smoke runs were successful on current HEAD at audit time. A Browser E2E run was still in progress on a prior commit; a Pages deployment of that previous commit succeeded.

**Required before portfolio release**
- [ ] Complete M09.6: verify all 1,000 imported product galleries, all referenced local image files, deploy smoke, and desktop/mobile detail/gallery E2E on the exact current SHA.
- [ ] Read and record the final Browser E2E result and publish the same successful code SHA to Pages.
- [ ] Reconcile stale/conflicting source-document statements about which catalog path is active (local ABO snapshot versus Shopify runtime discovery) across README, PROJECT_CONTEXT, ARCHITECTURE, DATA_SOURCES, and REAL_CATALOG_MIGRATION.
- [x] Add a bilingual architecture diagram for the local ABO snapshot, no-store Shopify discovery proxy, TGJU FX snapshot, storefront, and simulated cart.
- [x] Locate, visually inspect, and embed the actual desktop and mobile storefront homepage screenshots from the source repository; both show the storefront interface without customer personal data, use device-specific captions, and are pinned to commit `5ca43e40ff101e673ee7cf261850bff0a679047c`.
- [x] Link the original screenshot evidence folder directly from the GlobalCart case-study source references.
- [ ] Review the embedded screenshots against the latest published GlobalCart HEAD and capture missing product-detail/gallery states if they materially improve the case study.
- [ ] Complete physical-device, manual screen-reader, human RTL/LTR, and normal-network checks.
- [ ] Keep 0.2.3-dev and do not tag 1.0.0 until manual visual approval and all repository release gates pass.

### 08 — Salon Booking

**Recorded from source**
- Product version **1.0.0** was released on 2026-11-05 and marked owner-accepted in the repository release record; official tag: [v1.0.0](https://github.com/pooya-labs/salon-booking/releases/tag/v1.0.0).
- The frontend is React / TypeScript / Vite on GitHub Pages. The active backend path is the hidden iframe bridge → Google Apps Script → private Google Sheets; Firebase Cloud Messaging is the manager push path. Cloudflare Workers/D1 are legacy recovery material, not the active runtime.
- The Apps Script source version is **1.5.3** (APP_VERSION_ in relay/Code.gs); this is distinct from product version 1.0.0.
- Release CI [42086718663](https://github.com/pooya-labs/salon-booking/actions/runs/42086718663) and Pages deployment [42086718821](https://github.com/pooya-labs/salon-booking/actions/runs/42086718821) passed on exact release commit 56ff5cde573eccb3febd7efe2de270f9ded2b7e5. The Pages workflow also recorded a read-only live relay smoke.
- The release record states that the product owner accepted the operational setup, schedule configuration, and manager notification checks on 2026-11-05.
- The current upstream main is 4c4840c639da099379e8f65b387b1589685c6afd; four commits after the release checkpoint changed only README, ROADMAP.md, docs/DEPLOYMENT.md, and docs/PROJECT-STATE.md. The updated deployment note records Apps Script owner acceptance and retains Worker/D1 only as recovery material, with deletion still requiring explicit owner approval.
- Current CI [42394326231](https://github.com/pooya-labs/salon-booking/actions/runs/42394326231) is not green: owner-dashboard date-range browser QA failed on both Linux and Windows with expected 2026-11-06 versus actual 2026-11-08 for the 11:00 / 15-minute slot. Lint, unit/migration tests, typecheck/build, responsive/RTL/keyboard browser checks, and owner-panel axe scans passed. Treat this as a date/fixture assertion requiring reconciliation, not as confirmed booking-logic failure.
- Current Pages deployment workflow [42394326440](https://github.com/pooya-labs/salon-booking/actions/runs/42394326440) succeeded. The earlier official v1.0.0 release acceptance remains recorded, but current-main CI needs the date-range test brought back into alignment.
- The public case study must still avoid customer personal information; no unredacted bookings, phone numbers, names, references, or tokens may appear in screenshots.

**Required before portfolio release**
- [ ] Confirm the salon product owner’s permission to publish the case-study details and attribution in this portfolio.
- [ ] Capture only synthetic/demo screens or owner-approved redacted screenshots; never expose customer names, phone numbers, booking references, or tokens.
- [ ] Pooya to approve the exact public project description, attribution, and whether the official v1.0.0 release should be featured.

## Global portfolio information still needed from Pooya

- [ ] Approve the exact public biography, headline, and positioning (the current copy is a draft).
- [ ] Choose the first three featured projects and approve the order of all eight.
- [ ] Confirm personal role/contribution statements project by project. AetherFlow's README does not identify an individual author; other project README files provide different attribution wording.
- [ ] Approve each project status and the precise public claims after checking current source and current workflow evidence.
- [ ] Choose the contact channel to publish (do not invent an email or social profile).
- [ ] Supply/approve any personal portrait or owner-provided assets. Do not substitute stock imagery.
- [ ] Approve the generated architecture diagrams, screenshots, captions, and alt text; confirm that no confidential/client data appears.
- [ ] Give feedback on final visual direction, typography, color, animation, navigation, case-study density, and mobile reading flow in the two required redesign rounds.

## Required order before V1

1. **Phase 7 — readiness first:** complete platform engineering, source/factual audit, accessibility preparation, performance/security/privacy checks, SEO/social-crawler checks, deployment automation or a tested manual release path, rollback/recovery rehearsal, and all owner/device acceptance inputs that can be completed before redesign.
2. **Phase 8 — penultimate:** perform a complete new visual redesign of the entire site, run two full owner feedback/approval rounds, and freeze the accepted direction.
3. **Phase 9 — final pre-release integration:** refresh all eight upstream source SHAs again, then complete the portfolio-level integration of AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, GlobalCart, and Salon Booking—final bilingual case studies, source-backed facts, project-specific media, diagrams, demo links, and any justified interactive walkthroughs. Do not copy all independent source code into this repository by default.
4. **Phase 10 — release:** rerun exact-SHA CI, Browser QA, accessibility, performance, security, SEO, deployment, rollback, and final owner checks against the fully integrated result before creating the V1 tag.
5. Existing crawler-readable Persian/English static case-study pages, 17 PNG social cards, matching SVG sources, and the previously inspected Pages artifact are useful baseline assets, not proof that the redesigned/finally integrated V1 has passed. Validate final external LinkedIn/Facebook rendering and cache refresh after Phase 9.

**Release rule:** no V1 tag or release while any mandatory checklist item above is unchecked. Do not publish unsupported role, skill, performance, live-service, or production-readiness claims.
