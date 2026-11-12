# Accessibility manual review matrix

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

## Latest corroborating evidence — PR #78 documentation-only head, 13 November 2026

- PR [#78](https://github.com/pooya-labs/pooya-labs-platform/pull/78) head: `dd37e1f37b646137280f1a315143f82aef549bc6`; base: `860c067bb1b19d94ebb67184bd59e1ebb5a85acb`. Its diff contains documentation changes only. The portfolio application source remained `64c5966cba21a2d25d8f357b351593cbe51f26b2`; this run therefore rechecks the same app source and is **not** a new exact-main build or production deployment.
- Repository CI: [run 43328360853](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43328360853) — passed. Portfolio Browser QA: [run 43328360741](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43328360741) — passed. [Browser QA artifact 13994116607](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43328360741/artifacts/13994116607).
- The artifact report was generated at `2026-11-12T23:23:27Z`. It covers 18 localized routes and 36 desktop/mobile viewport records, 18 keyboard skip-navigation checks and 34 social-crawler checks. There were zero route failures, page errors, missing image alt attributes, or confirmed Axe violations.
- All 36 incomplete checks in each theme remain `color-contrast`. The refreshed report records 269 dark-theme and 288 light-theme node occurrences across 56 and 48 unique selectors. The six `.flow-trigger > .flow-icon` occurrences are non-text icon content and are not text-contrast measurements. These are unresolved Axe checks, not confirmed failures and not passes.
- The dark node count is two higher than the previous exact-main report (269 versus 267); because application source was unchanged, this difference is recorded as a report-inventory variance, not as a confirmed CSS regression. The latest selector counts below supersede the previous table.

| Theme | Incomplete rule checks | Color-contrast checks | ARIA-prohibited-attribute checks | Node occurrences | Unique CSS selectors | Confirmed Axe violations |
|---|---:|---:|---:|---:|---:|---:|
| Dark | 36 | 36 | 0 | 269 | 56 | 0 |
| Light | 36 | 36 | 0 | 288 | 48 | 0 |
| **Combined** | **72** | **72** | **0** | **557** | **56-selector union** | **0** |

| Unresolved background reason | Dark nodes | Light nodes |
|---|---:|---:|
| Gradient | 161 | 101 |
| Pseudo-element / decorative layer | 90 | 151 |
| Overlap by another element | 16 | 32 |
| Non-text content | 2 | 4 |
| **Total** | **269** | **288** |

## Current selector inventory — PR #78 Browser QA run 43328360741

Counts are node occurrences from the latest downloaded artifact, grouped by unique CSS selector. A dash means no incomplete node for that selector in the theme. The table identifies where Axe could not resolve the background; it does not establish whether measured contrast passes WCAG.

| CSS selector | Dark | Light | Unresolved background |
|---|---:|---:|---|
| `.booking-calendar-head > span:nth-child(1)` | 2 | 4 | pseudo-element |
| `.booking-calendar-head > span:nth-child(2)` | 2 | 4 | pseudo-element |
| `.booking-calendar-head > span:nth-child(3)` | 2 | 2 | pseudo-element |
| `.booking-calendar-head > span:nth-child(4)` | 1 | 1 | pseudo-element |
| `.case-study-back` | 16 | 32 | overlap |
| `.case-study-scroll-note` | 4 | — | gradient |
| `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow` | 4 | — | gradient |
| `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow > .eyebrow-index` | 2 | — | gradient |
| `.device-desktop > figcaption` | 8 | — | gradient |
| `.device-mobile > figcaption` | 4 | — | gradient |
| `.device-mobile.case-study-media-card:nth-child(2) > figcaption` | 11 | — | gradient |
| `.device-mobile.case-study-media-card:nth-child(2) > figcaption > .case-study-scroll-note` | 12 | — | gradient |
| `.flow-trigger > .flow-icon` | 2 | 4 | non-text |
| `.flow-trigger > small` | 2 | 2 | pseudo-element |
| `.flow-trigger > strong` | 2 | 4 | pseudo-element |
| `.flow-worker > .flow-icon` | 1 | 1 | pseudo-element |
| `.glass-controls > span:nth-child(1)` | 2 | 4 | pseudo-element |
| `.glass-controls > span:nth-child(3)` | 2 | 2 | pseudo-element |
| `.hero-title-line[dir="auto"]:nth-child(1)` | 1 | 1 | pseudo-element |
| `.market-range > span:nth-child(1)` | 2 | 2 | pseudo-element |
| `.market-range > span:nth-child(2)` | 1 | 1 | pseudo-element |
| `.market-simulated` | 2 | 4 | pseudo-element |
| `.market-symbol > span` | 2 | 4 | pseudo-element |
| `.market-symbol > strong` | 2 | 4 | pseudo-element |
| `.node-gateway` | 2 | 4 | pseudo-element |
| `.node-gateway > small` | 2 | 4 | pseudo-element |
| `.node-service` | 2 | 2 | pseudo-element |
| `.node-service > small` | 1 | 1 | pseudo-element |
| `.orbit-health-card > small` | 2 | 4 | pseudo-element |
| `.orbit-health-card > strong` | 2 | 4 | pseudo-element |
| `.orbit-stat-card > small` | 2 | 2 | pseudo-element |
| `.orbit-stat-card > strong` | 1 | 1 | pseudo-element |
| `.os-avatar` | 2 | 2 | pseudo-element |
| `.os-terminal-line > span` | 1 | 1 | pseudo-element |
| `.os-window-back > .os-titlebar > span` | 2 | 4 | pseudo-element |
| `.os-window-front > .os-titlebar > span` | 2 | 4 | pseudo-element |
| `.portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > small` | 16 | 16 | gradient |
| `.portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > strong` | 32 | 32 | gradient |
| `.portfolio-hero-copy > .portfolio-eyebrow` | 3 | 2 | pseudo-element |
| `.portfolio-language` | 28 | 28 | gradient |
| `.portfolio-workspace > span` | 16 | — | gradient |
| `.product-a > b` | 2 | 4 | pseudo-element |
| `.product-a > small` | 2 | 4 | pseudo-element |
| `.product-b > b` | 2 | 2 | pseudo-element |
| `.product-b > small` | 1 | 1 | pseudo-element |
| `.scene-topline > i` | 14 | 28 | pseudo-element |
| `.scene-topline > span` | 16 | 32 | pseudo-element |
| `a[href$="#about"]` | 4 | 4 | gradient |
| `a[href$="#contact"]` | 2 | 3 | gradient |
| `a[href$="#novels"]` | 4 | 4 | gradient |
| `a[href$="#stack"]` | 4 | 4 | gradient |
| `header > .portfolio-brand[href$="#top"] > span:nth-child(2) > small` | 2 | 2 | gradient |
| `header > .portfolio-brand[href$="#top"] > span:nth-child(2) > strong` | 4 | 4 | gradient |
| `nav > a[href$="#projects"]` | 4 | 4 | gradient |
| `span:nth-child(1) > b` | 2 | 4 | pseudo-element |
| `span:nth-child(3) > b` | 1 | 1 | pseudo-element |

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

