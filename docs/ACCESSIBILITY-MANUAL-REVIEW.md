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

## Selector inventory

Counts are node occurrences in the latest 36 route/viewport records for each theme, not counts of unique pages. A dash means the selector was not present in that theme's incomplete-result set. Every human result remains pending.

| CSS selector | Dark nodes | Light nodes | Unresolved background | Human result |
|---|---:|---:|---|---|
| .booking-calendar-head > span:nth-child(1) | 2 | 4 | pseudo-element | Pending |
| .booking-calendar-head > span:nth-child(2) | 2 | 4 | pseudo-element | Pending |
| .booking-calendar-head > span:nth-child(3) | 2 | 2 | pseudo-element | Pending |
| .booking-calendar-head > span:nth-child(4) | 2 | 1 | pseudo-element | Pending |
| .case-study-back | 14 | 30 | overlap | Pending |
| .case-study-heading > .portfolio-eyebrow | 2 | 2 | gradient | Pending |
| .case-study-heading > .portfolio-eyebrow > .eyebrow-index | 2 | 2 | gradient | Pending |
| .case-study-heading > p | 2 | 2 | partial overlap | Pending |
| .case-study-index | 4 | 2 | gradient + pseudo-element | Pending |
| .case-study-media-heading > .portfolio-eyebrow | — | 1 | gradient | Pending |
| .case-study-scroll-note | 4 | — | gradient | Pending |
| .case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow | 3 | — | gradient | Pending |
| .case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow > .eyebrow-index | 3 | — | gradient | Pending |
| .case-study-section-grid > .case-study-panel:nth-child(1) > p | 3 | — | gradient | Pending |
| .case-study-section-grid > .case-study-panel:nth-child(2) > .portfolio-eyebrow | 3 | — | gradient | Pending |
| .case-study-section-grid > .case-study-panel:nth-child(2) > .portfolio-eyebrow > .eyebrow-index | 1 | — | gradient | Pending |
| .case-study-status | 2 | 1 | gradient | Pending |
| .device-desktop > figcaption | 8 | — | gradient | Pending |
| .device-mobile > figcaption | 4 | — | gradient | Pending |
| .device-mobile.case-study-media-card:nth-child(2) > figcaption | 11 | — | gradient | Pending |
| .device-mobile.case-study-media-card:nth-child(2) > figcaption > .case-study-scroll-note | 12 | — | gradient | Pending |
| .glass-controls > span:nth-child(1) | 2 | 4 | pseudo-element | Pending |
| .glass-controls > span:nth-child(3) | 2 | 2 | pseudo-element | Pending |
| .glass-footnote | 2 | — | pseudo-element | Pending |
| .hero-gradient | 1 | — | pseudo-element | Pending |
| .hero-preview-1 > .hero-preview-caption > b | 2 | — | pseudo-element | Pending |
| .hero-preview-1 > .hero-preview-caption > span | 2 | — | pseudo-element | Pending |
| .hero-preview-1 > .hero-preview-toolbar > small | 2 | — | pseudo-element | Pending |
| .hero-preview-1 > .hero-preview-toolbar > strong | 2 | — | pseudo-element | Pending |
| .hero-preview-2 > .hero-preview-toolbar > strong | 1 | — | pseudo-element | Pending |
| .hero-title-line[dir="auto"]:nth-child(1) | 2 | 1 | pseudo-element | Pending |
| .hero-title-line[dir="auto"]:nth-child(3) | 2 | — | pseudo-element | Pending |
| .hero-title-prefix | 1 | — | pseudo-element | Pending |
| .hero-title-word | 1 | — | pseudo-element | Pending |
| .market-range > span:nth-child(1) | 2 | 2 | pseudo-element | Pending |
| .market-range > span:nth-child(2) | 2 | 1 | pseudo-element | Pending |
| .market-range > span:nth-child(3) | 2 | — | pseudo-element | Pending |
| .market-simulated | 2 | 4 | pseudo-element | Pending |
| .market-symbol > span | 2 | 4 | pseudo-element | Pending |
| .market-symbol > strong | 2 | 4 | pseudo-element | Pending |
| .node-gateway | 2 | 4 | pseudo-element | Pending |
| .node-gateway > small | 2 | 4 | pseudo-element | Pending |
| .node-service | 2 | 2 | pseudo-element | Pending |
| .node-service > small | 2 | 1 | pseudo-element | Pending |
| .node-worker | 2 | — | pseudo-element | Pending |
| .orbit-health-card > small | 2 | 4 | pseudo-element | Pending |
| .orbit-health-card > strong | 2 | 4 | pseudo-element | Pending |
| .orbit-stat-card > small | 2 | 2 | pseudo-element | Pending |
| .orbit-stat-card > strong | 2 | 1 | pseudo-element | Pending |
| .os-avatar | 2 | 2 | pseudo-element | Pending |
| .os-terminal-line > span | 2 | 1 | pseudo-element | Pending |
| .os-window-back > .os-titlebar > span | 2 | 4 | pseudo-element | Pending |
| .os-window-front > .os-titlebar > span | 2 | 4 | pseudo-element | Pending |
| .portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > small | — | 16 | gradient | Pending |
| .portfolio-brand[href$="pooya-labs-platform/"] > span:nth-child(2) > strong | — | 32 | gradient | Pending |
| .portfolio-hero-copy > .portfolio-eyebrow | 2 | 2 | pseudo-element | Pending |
| .portfolio-intro | 2 | — | pseudo-element | Pending |
| .portfolio-language | — | 28 | gradient | Pending |
| .portfolio-primary[href$="#projects"] | 2 | — | pseudo-element | Pending |
| .portfolio-secondary | 2 | 1 | gradient + pseudo-element | Pending |
| .portfolio-social-proof > span:nth-child(2) | 3 | — | pseudo-element | Pending |
| .portfolio-social-proof > span:nth-child(4) | 2 | — | pseudo-element | Pending |
| .portfolio-workspace > span | 17 | — | gradient | Pending |
| .product-a > b | 2 | 4 | pseudo-element | Pending |
| .product-a > small | 2 | 4 | pseudo-element | Pending |
| .product-b > b | 2 | 2 | pseudo-element | Pending |
| .product-b > small | 2 | 1 | pseudo-element | Pending |
| .product-c > b | 2 | — | pseudo-element | Pending |
| .project-tags > span:nth-child(1) | 2 | 2 | gradient | Pending |
| .project-tags > span:nth-child(2) | 2 | 2 | gradient | Pending |
| .project-tags > span:nth-child(3) | — | 2 | gradient | Pending |
| .proof-dot | 2 | — | pseudo-element | Pending |
| .scene-topline > i | 12 | 24 | pseudo-element | Pending |
| .scene-topline > span | 14 | 28 | pseudo-element | Pending |
| a[href$="#about"] | — | 4 | gradient | Pending |
| a[href$="#contact"] | — | 3 | gradient | Pending |
| a[href$="#novels"] | — | 4 | gradient | Pending |
| a[href$="#stack"] | — | 4 | gradient | Pending |
| em | 2 | — | pseudo-element | Pending |
| h1 | 2 | 2 | gradient | Pending |
| header > .portfolio-brand[href$="#top"] > span:nth-child(2) > small | — | 2 | gradient | Pending |
| header > .portfolio-brand[href$="#top"] > span:nth-child(2) > strong | — | 4 | gradient | Pending |
| nav > a[href$="#projects"] | — | 4 | gradient | Pending |
| span:nth-child(1) > b | 2 | 4 | pseudo-element | Pending |
| span:nth-child(3) > b | 2 | 1 | pseudo-element | Pending |
| span:nth-child(4) | — | 2 | gradient | Pending |
| span:nth-child(5) | 2 | — | pseudo-element | Pending |

## Completion rule

Do not mark this review complete until a human reviewer records actual foreground/background samples and contrast ratios for all applicable target/theme/language/viewport combinations, inspects interactive focus states, and attaches evidence for any failure or ambiguous case. The current automated result is: zero confirmed Axe violations; 72 incomplete contrast checks (36 per theme); **human review pending**.
