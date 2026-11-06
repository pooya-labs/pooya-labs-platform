# Performance Budgets — Provisional

**Status:** Targets for implementation and measurement; not measured and not service-level guarantees.  
**Runtime:** Google Apps Script HtmlService, with GitHub Pages used only for static public material.

## Measurement profile

Use repeatable runs and record:
- Desktop: current Chrome/Firefox on a typical Windows laptop.
- Mobile: current Chrome on an Android mid-range device, with a second low/mid-tier device where available.
- Network: normal Wi-Fi and throttled mobile profile (4G-like latency/bandwidth).
- Warm and cold loads separately; report sample count, browser, device, network, and date.
- Use at least 5 cold and 10 warm runs per profile for directional comparison; use p75 for user-facing page metrics and p50/p95 for RPC timing.

Do not compare measurements taken on different profiles as if they were the same test.

## Initial targets

| Area | Provisional target | How to measure |
|---|---:|---|
| Initial HTML document | <= 150 KB transferred before app assets | Browser Network |
| First-load JS | <= 300 KB gzip total | Build output / Network |
| First-load CSS | <= 80 KB gzip total | Build output / Network |
| Main shell visible | p75 <= 2.5 s on mobile profile | Lighthouse / browser trace |
| Largest Contentful Paint | p75 <= 2.5 s where applicable | Lighthouse |
| Cumulative Layout Shift | <= 0.1 | Lighthouse |
| Interaction responsiveness | p75 <= 200 ms for local UI actions | Browser performance trace |
| UI motion | Aim for 60 fps; no repeated long tasks during routine navigation | Performance trace |
| Health/read RPC | p50 <= 1.0 s and p95 <= 3.0 s as an initial investigation target | Real HtmlService deployment |
| Simple mutation RPC | p95 <= 4.0 s as an initial investigation target | Real deployment, after mutation design exists |

These are design budgets, not contractual guarantees. Apps Script execution, account quotas, Google service latency, browser startup, authentication prompts, and network conditions can exceed them. Do not retry a mutation automatically unless an idempotency key and duplicate-handling policy are implemented.

## Performance rules

- Render the shell before loading non-critical imagery and optional modules.
- Avoid shipping large frameworks or animation libraries solely for decorative effects.
- Keep blur, backdrop filters, canvas effects, and continuous animation out of the critical path on mobile.
- Lazy-load non-visible mini-apps and optional media.
- Batch Sheets reads/writes; avoid one Google service call per displayed row.
- Keep RPC payloads small and bounded. Paginate large lists instead of returning an entire sheet.
- Avoid fan-out RPC calls during initial render. Use a single bootstrap call only when its data set is stable and small.
- Prefer local UI state for interactions that do not require durable server state.
- Respect reduced-motion preferences and avoid blocking navigation on telemetry.

## Acceptance gate

Before Phase 0 closes, capture a baseline report with device/network profiles, sample counts, p50/p75/p95 values, screenshots or traces as appropriate, and a list of any budget misses. Adjust targets only with recorded evidence; do not mark this document measured just because the health RPC worked once.
