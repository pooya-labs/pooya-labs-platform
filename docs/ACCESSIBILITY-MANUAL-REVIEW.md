# Manual Contrast Review Matrix

**Latest completed exact-head evidence — 12 November 2026:** PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75), Browser QA run [43220737568](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43220737568), artifact [13944948728](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43220737568/artifacts/13944948728), PR head `e9a8a2f0e0de553ee160833dc260ad8a3a968551`. The PR head and merged main commit `64c5966cba21a2d25d8f357b351593cbe51f26b2` have the same Git tree.

| Theme | Incomplete rule checks | Color-contrast checks | ARIA-prohibited-attribute checks | Node occurrences | Unique CSS selectors | Confirmed Axe violations |
|---|---:|---:|---:|---:|---:|---:|
| Dark | 36 | 36 | 0 | 267 | 56 | 0 |
| Light | 36 | 36 | 0 | 288 | 48 | 0 |
| **Combined** | **72** | **72** | **0** | **555** | **70-selector union** | **0** |

The previous `aria-prohibited-attr` incompletes were caused by skill-chip group containers having `aria-label` on generic `div` elements without a supported role. PR #75 adds `role="group"` to those containers and an automated contract assertion. The latest report contains no ARIA-prohibited-attribute checks in either theme.

All remaining incomplete checks are `color-contrast`. Axe cannot reliably calculate the rendered background for text over gradients, pseudo-elements, and overlapping decorative layers. These are neither confirmed failures nor passes. Each requires rendered-pixel sampling and a manual WCAG AA comparison. No manual color measurement or WCAG certification is claimed.

The latest report passed 18/18 localized routes, 36/36 desktop/mobile viewport checks, 18/18 keyboard skip-link checks, 12/12 mobile gallery gutter swipe checks, and 34/34 social-crawler checks. It recorded no page errors, missing image alt text, horizontal overflow, or confirmed Axe violations. This is automated Chromium evidence only; physical-device, screen-reader and human color-contrast acceptance remain open.

**Status:** Prepared for human review. No manual color measurement, WCAG certification, or owner acceptance is claimed.  
**Evidence:** [Browser QA run 42815065767](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065767), [artifact 13765540433](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42815065767/artifacts/13765540433).  
**Source commit:** `5af6dd2ca19cdc87783f6312f890c6244e9240b1`.  
**Axe:** 4.14.0; `color-contrast` rule; WCAG 2.2 AA and best-practice tags.

## Current evidence snapshot

The exact-main run covered 18 localized routes (homepage plus eight project case studies in Persian and English), each at desktop 1440×1000 and mobile 390×844. Axe ran separately in dark and light themes.

| Theme | Incomplete rule checks | Node occurrences | Unique CSS selectors | Confirmed Axe violations |
|---|---:|---:|---:|---:|
| Dark | 36 | 228 | 74 | 0 |
| Light | 36 | 288 | 56 | 0 |
| **Combined** | **72** | **516** | **87 across both themes** | **0** |

The 87-selector total is the union of the two theme inventories; 43 selectors occur in both inventories. The counts are not 87 failures. They are text targets for which Axe could not confidently derive the rendered background. An incomplete check is neither a pass nor a confirmed failure.

### Why Axe could not resolve the background

| Unresolved background cause | Dark nodes | Light nodes | Combined |
|---|---:|---:|---:|
| Pseudo-element / decorative layer | 129 | 138 | 267 |
| Background gradient | 83 | 118 | 201 |
| Overlap by another element | 14 | 30 | 44 |
| Partial overlap | 2 | 2 | 4 |
| **Total** | **228** | **288** | **516** |

The latest report also records 18/18 route checks, 36/36 desktop/mobile viewport checks, 18/18 fresh-load keyboard skip-link checks, zero failures, and zero confirmed Axe violations in either theme. Automated browser checks do not replace rendered-color measurement, physical-device review, or screen-reader acceptance.

## Human review procedure

Review each selector in the theme column where it has a non-zero occurrence count. Cover the affected Persian/English routes at desktop and mobile sizes; inspect the actual rendered pixels rather than relying only on CSS token values.

1. Identify the foreground color and the background directly behind the glyphs. Include gradients, pseudo-elements, translucency, imagery, and overlapping decorations.
2. Measure the lowest contrast across the visible text area. Apply WCAG AA's 4.5:1 threshold for normal text and 3:1 for qualifying large text; record the rendered size and weight used to classify it.
3. For interactive targets, inspect resting and visible-focus states. Confirm that the focus indicator is distinguishable from adjacent colors.
4. Record the exact route, language, theme, viewport, selector, foreground/background sample, measured ratio, result, and screenshot/evidence reference.
5. Fix confirmed failures in application CSS and add a regression assertion where a stable foreground/background pair can be tested automatically.

## Current selector inventory — exact main QA run 43221461301

Counts are node occurrences across the 18 localized routes at two viewports. A dash means no incomplete node for that selector in the theme. The unresolved-background column comes directly from Axe failure summaries. Two dark and four light occurrences of `.flow-trigger > .flow-icon` contain non-text content; do not treat those icon-only nodes as text-contrast failures. All 36 incomplete rule checks per theme are color-contrast checks, but this is an automated rule classification, not a statement that every occurrence needs color adjustment.

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

**Distribution:** Dark — 159 gradient, 90 pseudo-element, 16 overlap, 2 non-text-content nodes (267 total). Light — 101 gradient, 151 pseudo-element, 32 overlap, 4 non-text-content nodes (288 total). The union is 57 unique selectors (57 present in dark, 48 in light). These are measurement targets, not confirmed contrast failures.

