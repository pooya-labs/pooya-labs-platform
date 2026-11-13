# Accessibility manual review matrix

## Latest corroborating evidence — PR #82 post-merge checkpoint Browser QA (13 November 2026)

- PR [#82](https://github.com/pooya-labs/pooya-labs-platform/pull/82) head d91070cba1434904108cce75a238b7604f34d1b2 was a four-file documentation-only change based on 4da12e06572a61a9da7388d80c551914a603636a; application source remained 64c5966cba21a2d25d8f357b351593cbe51f26b2.
- Repository CI [43336079868](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43336079868) and Portfolio Browser QA [43336080028](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43336080028) passed; Browser QA artifact [13997895518](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43336080028/artifacts/13997895518). The run passed 18/18 localized routes, 36/36 viewport checks and 34/34 social-crawler checks, with zero confirmed Axe violations and zero failures.
- The console summary reports 36 incomplete checks in the default-theme Axe summary. The script stores light-theme counts and findings separately in the report. Keep the PR #79 selector inventory above as the latest fully extracted per-theme matrix; do not infer new selector/node counts from the PR #82 console summary alone. Incomplete checks remain human review targets, not confirmed failures or passes.
- The three-host 20-sample p75 performance baseline was:

| Host | TTFB | FCP | LCP | CLS |
|---|---:|---:|---:|---:|
| Local build | 5 ms | 216 ms | 272 ms | 0.000 |
| GitHub Pages | 134 ms | 336 ms | 408 ms | 0.000 |
| Cloudflare Pages | 61 ms | 300 ms | 360 ms | 0.000 |

- These are CI lab measurements against the current static hosts, not field Core Web Vitals, a representative mobile network, or physical-device acceptance. Performance enforcement remains report-only.

**Status:** Human color-contrast, focus, physical-device and assistive-technology acceptance remains open. No manual color measurement, WCAG certification or owner acceptance is claimed.

## Latest exact-main evidence — 12 November 2026

- Source: main commit `64c5966cba21a2d25d8f357b351593cbe51f26b2`.
- Browser QA: [run 43221461301](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301), [artifact 13946521920](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301/artifacts/13946521920).
- Axe version: 4.14.0; tags include WCAG 2.2 AA and best-practice checks.
- The latest report records zero confirmed Axe violations and zero `aria-prohibited-attr` incomplete checks in both themes. PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75) resolved the prior generic-`div` named-group issue by adding `role="group"` to the skill-chip collections and an automated contract assertion.

| Theme | Incomplete rule checks | Color-contrast checks | ARIA-prohibited-attribute checks | Node occurrences | Unique CSS selectors | Confirmed Axe violations |
|---|---:|---:|---:|---:|---:|---:|
| Dark | 36 | 36 | 0 | 267 | 57 | 0 |
| Light | 36 | 36 | 0 | 288 | 48 | 0 |
| **Combined** | **72** | **72** | **0** | **555** | **57-selector union** | **0** |

All incomplete rule checks are `color-contrast`. Axe could not determine the rendered background for text over gradients, pseudo-elements and overlapping decorative layers. Two dark and four light node occurrences belong to `.flow-trigger > .flow-icon` and contain only non-text characters; those icon-only cases are not text-contrast measurements. The remaining nodes are review targets, not confirmed failures or passes.

| Unresolved background reason | Dark nodes | Light nodes |
|---|---:|---:|
| Gradient | 159 | 101 |
| Pseudo-element / decorative layer | 90 | 151 |
| Overlap by another element | 16 | 32 |
| Non-text content | 2 | 4 |
| **Total** | **267** | **288** |

The report passed 18/18 localized routes, all 36 desktop/mobile viewport checks, 18/18 fresh-load keyboard skip-link checks, 12/12 mobile case-study gallery gutter swipe checks, and 34/34 social-crawler route/user-agent checks. It reported zero page errors, missing image alt text, horizontal overflow, or confirmed Axe violations. This is automated Chromium evidence, not WCAG certification, physical-device acceptance, or screen-reader sign-off.

## Latest exact-main evidence — 12 November 2026

- Source: main application commit `64c5966cba21a2d25d8f357b351593cbe51f26b2`.
- Browser QA: [exact-main run 43221461301](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301), [artifact 13946521920](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301/artifacts/13946521920).
- Axe version: 4.14.0; tags include WCAG 2.2 AA and best-practice checks. PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75) resolved the prior `aria-prohibited-attr` incomplete checks by adding `role="group"` to the named skill-chip collections and an automated contract assertion.

## Previous corroborating evidence — PR #78 documentation-only head (13 November 2026)

- PR #78 head `dd37e1f37b646137280f1a315143f82aef549bc6` was documentation-only and used the same application source `64c5966cba21a2d25d8f357b351593cbe51f26b2`.
- Its exact-head Repository CI [43328360853](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43328360853) and Browser QA [43328360741](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43328360741), artifact [13994116607](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43328360741/artifacts/13994116607), passed.
- That report recorded 36 incomplete contrast checks per theme, with 269 dark / 288 light node occurrences and 56 / 48 selectors. The newer PR #79 artifact below supersedes that inventory: it records 267 dark / 288 light node occurrences and 57 / 48 selectors on the same app source. Treat the two-node / one-selector difference as a report-inventory variance, not a code change or proven accessibility regression.

## Latest corroborating evidence — PR #79 exact-head Browser QA (13 November 2026)

- PR [#79](https://github.com/pooya-labs/pooya-labs-platform/pull/79) head: `0ea35d3910551332b5edd81a2906f39229caa41b`; merged into main as [`56b2f8a`](https://github.com/pooya-labs/pooya-labs-platform/commit/56b2f8a0d94d4ef6575183b7dfe8f74d54a7130a). Its 7-file diff was documentation-only; the application source remained `64c5966cba21a2d25d8f357b351593cbe51f26b2`, and production deployments were not changed.
- Repository CI [run 43332873662](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43332873662) passed, including all 124 contract tests. Portfolio Browser QA [run 43332873670](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43332873670) passed; [artifact 13995024749](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43332873670/artifacts/13995024749).
- The report was generated at `2026-11-12T23:56:06Z`. It checked 18 localized routes, 36 desktop/mobile viewport records, 18 keyboard skip-navigation checks, 12 mobile gallery-scroll checks and 34 social-crawler checks. It recorded zero route failures, page errors, missing image alt attributes, horizontal overflow or confirmed Axe violations.
- The latest artifact records 36 incomplete `color-contrast` rule checks in each theme. Dark mode has 267 node occurrences across 57 selectors; light mode has 288 occurrences across 48 selectors. The union is 57 selectors and 555 node occurrences.
- Unresolved-background reasons: dark — 159 gradient, 90 pseudo-element/decorative layer, 16 overlap and 2 non-text; light — 101 gradient, 151 pseudo-element/decorative layer, 32 overlap and 4 non-text. Six icon-only `.flow-trigger > .flow-icon` occurrences are not text-contrast measurements. These findings are unresolved checks, not confirmed failures or passes.
- The PR #78 report had 269 dark nodes / 56 selectors. Since both PRs used the unchanged application source, use the PR #79 result as the latest inventory and preserve the PR #78 variance as report-only.
- Performance baseline: 20 samples per host. p75 TTFB / FCP / LCP / CLS were local `3 / 185 / 229 ms / 0.000`, GitHub Pages `121 / 293 / 364 ms / 0.000`, and Cloudflare Pages `74 / 338 / 396 ms / 0.000`. These are CI lab baselines, not field Core Web Vitals or physical-device measurements.

| Theme | Incomplete rule checks | Color-contrast checks | ARIA-prohibited-attribute checks | Node occurrences | Unique CSS selectors | Confirmed Axe violations |
|---|---:|---:|---:|---:|---:|---:|
| Dark | 36 | 36 | 0 | 267 | 57 | 0 |
| Light | 36 | 36 | 0 | 288 | 48 | 0 |
| **Combined** | **72** | **72** | **0** | **555** | **57-selector union** | **0** |

| Unresolved background reason | Dark nodes | Light nodes |
|---|---:|---:|
| Gradient | 159 | 101 |
| Pseudo-element / decorative layer | 90 | 151 |
| Overlap by another element | 16 | 32 |
| Non-text content | 2 | 4 |
| **Total** | **267** | **288** |

## Current selector inventory — PR #79 Browser QA run 43332873670

Counts are node occurrences by selector. Background notes identify Axe's unresolved reason in each theme. These rows do not establish that contrast passes or fails WCAG.

| CSS selector | Dark nodes | Dark background note | Light nodes | Light background note |
|---|---:|---|---:|---|
| `.booking-calendar-head > span:nth-child(1)` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.booking-calendar-head > span:nth-child(2)` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.booking-calendar-head > span:nth-child(3)` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.booking-calendar-head > span:nth-child(4)` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.case-study-back` | 16 | overlap (16) | 32 | overlap (32) |
| `.case-study-scroll-note` | 4 | gradient (4) | — | — |
| `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow` | 3 | gradient (3) | — | — |
| `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow > .eyebrow-index` | 1 | gradient (1) | — | — |
| `.device-desktop > figcaption` | 8 | gradient (8) | — | — |
| `.device-mobile > figcaption` | 4 | gradient (4) | — | — |
| `.device-mobile.case-study-media-card:nth-child(2) > figcaption` | 11 | gradient (11) | — | — |
| `.device-mobile.case-study-media-card:nth-child(2) > figcaption > .case-study-scroll-note` | 12 | gradient (12) | — | — |
| `.flow-trigger > .flow-icon` | 2 | non-text (2) | 4 | non-text (4) |
| `.flow-trigger > small` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.flow-trigger > strong` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.flow-worker > .flow-icon` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.glass-controls > span:nth-child(1)` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.glass-controls > span:nth-child(3)` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.hero-gradient` | 1 | pseudo-element (1) | — | — |
| `.hero-title-line[dir="auto"]:nth-child(1)` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.market-range > span:nth-child(1)` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.market-range > span:nth-child(2)` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.market-simulated` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.market-symbol > span` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.market-symbol > strong` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.node-gateway` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.node-gateway > small` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.node-service` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.node-service > small` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.orbit-health-card > small` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.orbit-health-card > strong` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.orbit-stat-card > small` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.orbit-stat-card > strong` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.os-avatar` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.os-terminal-line > span` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.os-window-back > .os-titlebar > span` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.os-window-front > .os-titlebar > span` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > small` | 16 | gradient (16) | 16 | gradient (16) |
| `.portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > strong` | 32 | gradient (32) | 32 | gradient (32) |
| `.portfolio-hero-copy > .portfolio-eyebrow` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.portfolio-language` | 28 | gradient (28) | 28 | gradient (28) |
| `.portfolio-workspace > span` | 16 | gradient (16) | — | — |
| `.product-a > b` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.product-a > small` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `.product-b > b` | 2 | pseudo-element (2) | 2 | pseudo-element (2) |
| `.product-b > small` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |
| `.scene-topline > i` | 14 | pseudo-element (14) | 28 | pseudo-element (28) |
| `.scene-topline > span` | 16 | pseudo-element (16) | 32 | pseudo-element (32) |
| `a[href$="#about"]` | 4 | gradient (4) | 4 | gradient (4) |
| `a[href$="#contact"]` | 2 | gradient (2) | 3 | gradient (3) |
| `a[href$="#novels"]` | 4 | gradient (4) | 4 | gradient (4) |
| `a[href$="#stack"]` | 4 | gradient (4) | 4 | gradient (4) |
| `header > .portfolio-brand[href$="#top"] > span:nth-child(2) > small` | 2 | gradient (2) | 2 | gradient (2) |
| `header > .portfolio-brand[href$="#top"] > span:nth-child(2) > strong` | 4 | gradient (4) | 4 | gradient (4) |
| `nav > a[href$="#projects"]` | 4 | gradient (4) | 4 | gradient (4) |
| `span:nth-child(1) > b` | 2 | pseudo-element (2) | 4 | pseudo-element (4) |
| `span:nth-child(3) > b` | 1 | pseudo-element (1) | 1 | pseudo-element (1) |

## Human review procedure

Review the selector inventory below in the theme column where it has a non-zero occurrence count. Cover the affected Persian/English routes at desktop and mobile sizes; inspect the actual rendered pixels rather than relying only on CSS token values.

1. Identify the foreground color and the background directly behind the glyphs. Include gradients, pseudo-elements, translucency, imagery and overlapping decorations.
2. Measure the lowest contrast across the visible text area. Apply WCAG AA's 4.5:1 threshold for normal text and 3:1 for qualifying large text; record the rendered size and weight used to classify it.
3. For interactive targets, inspect resting and visible-focus states. Confirm that the focus indicator is distinguishable from adjacent colors.
4. Record the exact route, language, theme, viewport, selector, foreground/background sample, measured ratio, result and screenshot/evidence reference.
5. Fix confirmed failures in application CSS and add a regression assertion where a stable foreground/background pair can be tested automatically.
6. Review non-text icon targets separately for accessible names, semantics and focusability; do not apply text contrast thresholds to icon-only nodes.

## Current selector inventory — exact main QA run 43221461301

Counts are node occurrences across the 18 localized routes at two viewports. A dash means no incomplete node for that selector in the theme. The unresolved-background column comes directly from Axe failure summaries. All human results remain pending.

| CSS selector | Dark node occurrences | Light node occurrences | Unresolved background | Human result |
|---|---:|---:|---|---|
| `.booking-calendar-head > span:nth-child(1)` | 2 | 4 | pseudo-element | Pending |
| `.booking-calendar-head > span:nth-child(2)` | 2 | 4 | pseudo-element | Pending |
| `.booking-calendar-head > span:nth-child(3)` | 2 | 2 | pseudo-element | Pending |
| `.booking-calendar-head > span:nth-child(4)` | 1 | 1 | pseudo-element | Pending |
| `.case-study-back` | 16 | 32 | overlap | Pending |
| `.case-study-scroll-note` | 4 | — | gradient | Pending |
| `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow` | 3 | — | gradient | Pending |
| `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow > .eyebrow-index` | 1 | — | gradient | Pending |
| `.device-desktop > figcaption` | 8 | — | gradient | Pending |
| `.device-mobile > figcaption` | 4 | — | gradient | Pending |
| `.device-mobile.case-study-media-card:nth-child(2) > figcaption` | 11 | — | gradient | Pending |
| `.device-mobile.case-study-media-card:nth-child(2) > figcaption > .case-study-scroll-note` | 12 | — | gradient | Pending |
| `.flow-trigger > .flow-icon` | 2 | 4 | non-text content | Pending |
| `.flow-trigger > small` | 2 | 2 | pseudo-element | Pending |
| `.flow-trigger > strong` | 2 | 4 | pseudo-element | Pending |
| `.flow-worker > .flow-icon` | 1 | 1 | pseudo-element | Pending |
| `.glass-controls > span:nth-child(1)` | 2 | 4 | pseudo-element | Pending |
| `.glass-controls > span:nth-child(3)` | 2 | 2 | pseudo-element | Pending |
| `.hero-title-line[dir="auto"]:nth-child(1)` | 1 | 1 | pseudo-element | Pending |
| `.market-range > span:nth-child(1)` | 2 | 2 | pseudo-element | Pending |
| `.market-range > span:nth-child(2)` | 1 | 1 | pseudo-element | Pending |
| `.market-simulated` | 2 | 4 | pseudo-element | Pending |
| `.market-symbol > span` | 2 | 4 | pseudo-element | Pending |
| `.market-symbol > strong` | 2 | 4 | pseudo-element | Pending |
| `.node-gateway` | 2 | 4 | pseudo-element | Pending |
| `.node-gateway > small` | 2 | 4 | pseudo-element | Pending |
| `.node-service` | 2 | 2 | pseudo-element | Pending |
| `.node-service > small` | 1 | 1 | pseudo-element | Pending |
| `.orbit-health-card > small` | 2 | 4 | pseudo-element | Pending |
| `.orbit-health-card > strong` | 2 | 4 | pseudo-element | Pending |
| `.orbit-stat-card > small` | 2 | 2 | pseudo-element | Pending |
| `.orbit-stat-card > strong` | 1 | 1 | pseudo-element | Pending |
| `.os-avatar` | 2 | 2 | pseudo-element | Pending |
| `.os-terminal-line > span` | 1 | 1 | pseudo-element | Pending |
| `.os-window-back > .os-titlebar > span` | 2 | 4 | pseudo-element | Pending |
| `.os-window-front > .os-titlebar > span` | 2 | 4 | pseudo-element | Pending |
| `.portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > small` | 16 | 16 | gradient | Pending |
| `.portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > strong` | 32 | 32 | gradient | Pending |
| `.portfolio-hero-copy > .portfolio-eyebrow` | 2 | 2 | pseudo-element | Pending |
| `.portfolio-language` | 28 | 28 | gradient | Pending |
| `.portfolio-primary[href$="#projects"]` | 1 | — | pseudo-element | Pending |
| `.portfolio-workspace > span` | 16 | — | gradient | Pending |
| `.product-a > b` | 2 | 4 | pseudo-element | Pending |
| `.product-a > small` | 2 | 4 | pseudo-element | Pending |
| `.product-b > b` | 2 | 2 | pseudo-element | Pending |
| `.product-b > small` | 1 | 1 | pseudo-element | Pending |
| `.scene-topline > i` | 14 | 28 | pseudo-element | Pending |
| `.scene-topline > span` | 16 | 32 | pseudo-element | Pending |
| `a[href$="#about"]` | 4 | 4 | gradient | Pending |
| `a[href$="#contact"]` | 2 | 3 | gradient | Pending |
| `a[href$="#novels"]` | 4 | 4 | gradient | Pending |
| `a[href$="#stack"]` | 4 | 4 | gradient | Pending |
| `header > .portfolio-brand[href$="#top"] > span:nth-child(2) > small` | 2 | 2 | gradient | Pending |
| `header > .portfolio-brand[href$="#top"] > span:nth-child(2) > strong` | 4 | 4 | gradient | Pending |
| `nav > a[href$="#projects"]` | 4 | 4 | gradient | Pending |
| `span:nth-child(1) > b` | 2 | 4 | pseudo-element | Pending |
| `span:nth-child(3) > b` | 1 | 1 | pseudo-element | Pending |

