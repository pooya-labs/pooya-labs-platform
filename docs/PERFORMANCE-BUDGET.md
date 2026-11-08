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

A layout-shift warning needs follow-up: NexusCanvas desktop recorded CLS 0.1713 and ORBIT desktop 0.1202; other samples were lower. The current branch extends the probe to include the DOM source and before/after rectangles for each non-input layout-shift event. Do not close the Phase 7 performance task or enable budget enforcement until those sources are reviewed and the published-host measurements have been collected.

## Measurement limitations

- Cross-origin assets that omit Timing-Allow-Origin may report zero transfer/encoded size. Those zeroes are explicitly counted and must not be interpreted as free downloads.
- CI Chromium emulation is a regression baseline, not a physical Android performance result.
- The final V1 gate requires a real-device review on a representative mobile connection, including image loading, animation smoothness, battery/thermal behavior, and font/layout stability.
- Budgets must be revised only with measured evidence and a documented reason; do not silently raise them to make a failing build green.

## Enforcement

The workflow initially runs in report-only mode. Set PORTFOLIO_PERF_ENFORCE=1 only after reviewing the baseline artifact and deciding the current limits are realistic. Phase 7 cannot close based solely on an automated green result; physical-device measurements and owner review remain required.
