# Portfolio performance budget

The following are initial guardrails for the static portfolio, not measured results or guarantees for every network/device. Phase 7 records the first Chromium baseline; thresholds are enforced only after the measured report has been reviewed and calibrated against the actual output.

## Automated Chromium budgets

| Metric | Initial guardrail | Measurement |
|---|---:|---|
| Time to first byte (TTFB) | ≤ 1,200 ms | cold-context Chromium navigation timing |
| DOM content loaded | ≤ 3,500 ms | navigation timing |
| Load event | ≤ 6,500 ms | navigation timing |
| Largest Contentful Paint (LCP) | ≤ 4,000 ms | Chromium Largest Contentful Paint observer |
| JavaScript transfer/encoded bytes | ≤ 700 KB | Resource Timing entries |
| CSS transfer/encoded bytes | ≤ 300 KB | Resource Timing entries |
| Total observed resource bytes | ≤ 4 MB | Resource Timing entries |

The performance workflow captures the homepage in English and Persian plus all eight English project routes at desktop (1440×1000) and mobile (390×844) viewports. It records p50/p75/max for navigation timing, FCP/LCP, CLS, and JS/CSS/image/font resource sizes.

## First measured local-build baseline — 2026-11-08

The initial baseline was collected by Browser QA run [42507165883](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42507165883), artifact [13627897772](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42507165883/artifacts/13627897772), from the PR #13 source before layout-shift source attribution was added.

**20 cold-context measurements** were collected: Persian and English homepages plus all eight English project routes, at desktop and mobile sizes.

| Metric | p50 | p75 | Maximum |
|---|---:|---:|---:|
| TTFB | 3 ms | 3 ms | 4 ms |
| DOM content loaded | 45 ms | 53 ms | 59 ms |
| Load event | 103 ms | 123 ms | 257 ms |
| First Contentful Paint | 60 ms | 68 ms | 356 ms |
| Largest Contentful Paint | 180 ms | 288 ms | 524 ms |
| Cumulative Layout Shift | 0 | 0 | 0.1713 |
| Observed total resource bytes | 177,599 | 177,671 | 178,095 |
| JavaScript | 128,533 | 128,533 | 128,533 |
| CSS | 40,577 | 40,577 | 40,577 |
| Images with visible timing sizes | 8,148 | 8,220 | 8,644 |

**Interpretation:** these local-runner numbers are fast because the HTML/CSS/JS are served from the CI machine, not because a visitor's network will match them. Resource Timing reported hidden transfer sizes for 1–5 cross-origin assets per route; those assets are not included reliably in the byte totals. Font bytes were zero in this measurement and must not be interpreted as proof that every font request has zero cost.

## Pre-remediation three-host baseline and confirmed CLS source (historical) — 2026-11-08

Browser QA run [42509020267](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020267), artifact [13628113221](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42509020267/artifacts/13628113221), collected 20 cold-context measurements per host before the hydration fix. It recorded p75 CLS 0.1713 on local build, GitHub Pages, and Cloudflare Pages. This is retained as the regression that motivated the remediation; it is not the current baseline.

The confirmed root cause was the Vite build inserting crawler-readable case-study markup inside `#root`, followed by `createRoot(rootElement).render(...)` clearing and rebuilding the DOM after first paint. PR [#13](https://github.com/pooya-labs/pooya-labs-platform/pull/13) fixed this by server-rendering a shared case-study React component and using `hydrateRoot` on direct routes.

## Post-remediation three-host verification — 2026-11-08

Browser QA run [42513404040, attempt 2](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040), artifact [13630148273](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404040/artifacts/13630148273), measured the merged application commit [`045bc845`](https://github.com/pooya-labs/pooya-labs-platform/commit/045bc84526ef823a37599c6790d144d68465d35c). Each host received 20 cold-context measurements across the Persian/English homepage and eight English case-study routes at desktop and mobile sizes.

| Metric (p75) | Local build | GitHub Pages | Cloudflare Pages |
|---|---:|---:|---:|
| Time to first byte | 4 ms | 43 ms | 185 ms |
| DOM content loaded | 106 ms | 149 ms | 416 ms |
| Load event | 108 ms | 151 ms | 504 ms |
| First Contentful Paint | 228 ms | 256 ms | 576 ms |
| Largest Contentful Paint | 272 ms | 304 ms | 584 ms |
| Cumulative Layout Shift | **0.0000** | **0.0000** | **0.0000** |
| Observed total resource bytes | 178,276 | 181,290 | 178,866 |
| JavaScript bytes | 129,364 | 130,735 | 127,971 |
| CSS bytes | 40,692 | 42,310 | 42,726 |
| Image bytes with visible timing sizes | 8,220 | 8,245 | 8,193 |

CLS p50, p75, and maximum were **0.0000 in all three environments** (20/20 samples per host). No route in the post-remediation report recorded a non-zero CLS. Cloudflare's FCP/LCP summaries contain 19 timing samples because one navigation did not produce a reportable paint entry; navigation timing and CLS retained 20 samples.

The same Browser QA run passed **18/18 routes** and **36/36 viewport checks**, with zero failures and zero horizontal overflow. Axe recorded zero confirmed violations across all impact levels. **36 incomplete `color-contrast` checks remain** because Axe could not determine some gradient/pseudo-element backdrops; these are not passes and require human review.

GitHub Pages deployment [42513404002](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42513404002) succeeded. Cloudflare production deployment [`592357af`](https://592357af.pooya-labs-platform.pages.dev/) (ID `592357af-e235-4d3f-9912-bbca7edbfc51`) completed successful build and deploy stages for the same main commit.

**Remaining measurement limits:** this is repeatable Chromium CI evidence, not physical-device acceptance. Resource Timing can omit cross-origin transfer sizes when Timing-Allow-Origin is unavailable; font byte values of zero do not prove that font downloads are free. Keep `PORTFOLIO_PERF_ENFORCE=0` until representative physical-device/network checks and owner review are complete.

## Latest three-host verification after the monogram asset publish — 2026-11-08

Browser QA run [42514976406](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406), artifact [13631024148](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976406/artifacts/13631024148), measured 20 cold-context samples per host after Cloudflare deployment [`107de2a2`](https://107de2a2.pooya-labs-platform.pages.dev/) completed from current main commit `a37de4cf`. GitHub Pages was serving application asset revision `41ea1004`; the Cloudflare source commit includes that same asset revision.

| Metric (p75) | Local build | GitHub Pages | Cloudflare Pages |
|---|---:|---:|---:|
| Time to first byte | 4 ms | 109 ms | 83 ms |
| DOM content loaded | 96 ms | 266 ms | 282 ms |
| Load event | 97 ms | 293 ms | 300 ms |
| First Contentful Paint | 220 ms | 332 ms | 328 ms |
| Largest Contentful Paint | 316 ms | 400 ms | 400 ms |
| Cumulative Layout Shift | **0.0000** | **0.0000** | **0.0000** |
| Observed total resource bytes | 178,276 | 181,290 | 178,821 |
| JavaScript bytes | 129,364 | 130,735 | 127,971 |
| CSS bytes | 40,692 | 42,310 | 42,726 |
| Images with visible timing sizes | 8,220 | 8,245 | 8,124 |

The same browser run completed **18/18 routes** with zero reported failures and zero confirmed Axe violations. **36 incomplete color-contrast checks remain** because automated analysis cannot determine certain gradient/pseudo-element backgrounds; they are not passes and still require human review.

Cloudflare's deployment record confirms successful `queued`, `initialize`, `clone_repo`, `build`, and `deploy` stages for commit `a37de4cf21bc5e41f8fca9ea08ba6d6dfd350b67`. GitHub Pages build/deploy run [42514976384](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42514976384) succeeded for asset revision `41ea1004`.

This remains a Chromium CI regression measurement, not physical Android/network acceptance. Keep performance enforcement report-only until representative device/network checks and owner review are complete.

## Measurement limitations

- Cross-origin assets that omit Timing-Allow-Origin may report zero transfer/encoded size. Those zeroes are explicitly counted and must not be interpreted as free downloads.
- CI Chromium emulation is a regression baseline, not a physical Android performance result.
- The final V1 gate requires a real-device review on a representative mobile connection, including image loading, animation smoothness, battery/thermal behavior, and font/layout stability.
- Budgets must be revised only with measured evidence and a documented reason; do not silently raise them to make a failing build green.

## Enforcement

The workflow initially runs in report-only mode. Set PORTFOLIO_PERF_ENFORCE=1 only after reviewing the baseline artifact and deciding the current limits are realistic. Phase 7 cannot close based solely on an automated green result; physical-device measurements and owner review remain required.
