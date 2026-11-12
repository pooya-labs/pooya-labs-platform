# Manual Contrast Review Matrix

**Status:** Prepared for human rendered-background measurements. No manual color measurement, WCAG certification, or owner acceptance is claimed.  
**Latest evidence:** [Exact-main Browser QA run 43221461301](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301), artifact [13946521920](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301/artifacts/13946521920).  
**Source commit:** `64c5966cba21a2d25d8f357b351593cbe51f26b2`.  
**Axe:** 4.14.0; WCAG 2.2 AA and best-practice tags.

## Current evidence snapshot — 12 November 2026

The exact-main run covered 18 localized routes (homepage plus eight project case studies in Persian and English), each at desktop and mobile sizes. Axe ran separately in dark and light themes.

| Theme | Incomplete checks | Color-contrast incomplete | ARIA incomplete | Node occurrences | Unique selectors | Confirmed Axe violations |
|---|---:|---:|---:|---:|---:|---:|
| Dark | 36 | 36 | 0 | 267 | 57 | 0 |
| Light | 36 | 36 | 0 | 288 | 48 | 0 |
| **Combined** | **72** | **72** | **0** | **555** | **57 selector union** | **0** |

The four `aria-prohibited-attr` incomplete checks per theme that were present in the previous report were resolved by PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75), which gives the labeled skill-chip container `role="group"`. The only remaining Axe-incomplete rule is `color-contrast`: Axe could not reliably derive the rendered background behind text because of gradients, pseudo-elements or overlap. These are neither passes nor confirmed failures.

### Unresolved rendered-background causes

| Cause | Dark node occurrences | Light node occurrences | Combined |
|---|---:|---:|---:|
| Background gradient | 159 | 101 | 260 |
| Pseudo-element / decorative layer | 90 | 151 | 241 |
| Overlap by another element | 16 | 32 | 48 |
| Other / image-only or non-text context | 2 | 4 | 6 |
| **Total** | **267** | **288** | **555** |

The 57 unique CSS selectors are available in the downloadable `qa-report.json` inside artifact [13946521920](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301/artifacts/13946521920). It is the current source of truth for the selector-level review; the earlier 2026-11-10 inventory below is retained only for historical comparison.

## Historical selector inventory — 10 November 2026 (superseded)

## Human review procedure

Review each selector in the theme column where it has a non-zero occurrence count. Cover the affected Persian/English routes at desktop and mobile sizes; inspect the actual rendered pixels rather than relying only on CSS token values.

1. Identify the foreground color and the background directly behind the glyphs. Include gradients, pseudo-elements, translucency, imagery, and overlapping decorations.
2. Measure the lowest contrast across the visible text area. Apply WCAG AA's 4.5:1 threshold for normal text and 3:1 for qualifying large text; record the rendered size and weight used to classify it.
3. For interactive targets, inspect resting and visible-focus states. Confirm that the focus indicator is distinguishable from adjacent colors.
4. Record the exact route, language, theme, viewport, selector, foreground/background sample, measured ratio, result, and screenshot/evidence reference.
5. Fix confirmed failures in application CSS and add a regression assertion where a stable foreground/background pair can be tested automatically.

## Selector inventory

Historical counts are from the 2026-11-10 snapshot, not the current selector set. Use the downloadable 2026-11-12 report above for the live manual review; every human result remains pending.

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
