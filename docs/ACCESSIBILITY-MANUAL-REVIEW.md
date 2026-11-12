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

