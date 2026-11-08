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

## Measurement limitations

- Cross-origin assets that omit Timing-Allow-Origin may report zero transfer/encoded size. Those zeroes are explicitly counted and must not be interpreted as free downloads.
- CI Chromium emulation is a regression baseline, not a physical Android performance result.
- The final V1 gate requires a real-device review on a representative mobile connection, including image loading, animation smoothness, battery/thermal behavior, and font/layout stability.
- Budgets must be revised only with measured evidence and a documented reason; do not silently raise them to make a failing build green.

## Enforcement

The workflow initially runs in report-only mode. Set PORTFOLIO_PERF_ENFORCE=1 only after reviewing the baseline artifact and deciding the current limits are realistic. Phase 7 cannot close based solely on an automated green result; physical-device measurements and owner review remain required.
