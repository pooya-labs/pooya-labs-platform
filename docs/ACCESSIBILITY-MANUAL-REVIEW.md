# Manual Contrast Review Matrix

**Status:** Prepared for human review; no manual color measurement or owner acceptance is claimed.  
**Evidence source:** Post-merge Browser QA run [42807667588](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667588), artifact [13760621268](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42807667588/artifacts/13760621268).  
**Capture commit:** `542baa7efd5b63b941eb34bbba90a60d047cfa2a`.  
**Axe version:** 4.14.0, rule `color-contrast`, WCAG 2.2 AA and best-practice tags.

## What the report says—and does not say

The run covered 18 localized routes at desktop (1440×1000) and mobile (390×844), producing 36 route/viewport accessibility records. It reported **zero confirmed Axe violations** and **36 incomplete `color-contrast` rule checks**.

These 36 records are not 36 confirmed contrast failures. Axe marked the rule incomplete with impact `serious` because it could not reliably determine the rendered background behind some foreground text. Across the 36 records it listed 229 node occurrences and 73 unique CSS target selectors. The inability to calculate a ratio is not evidence that a target passes.

| Why Axe could not determine the background | Node occurrences | Share |
|---|---:|---:|
| Pseudo-element/background decoration | 129 | 56.3% |
| Background gradient | 82 | 35.8% |
| Element overlapped by another element | 16 | 7.0% |
| Partial overlap | 2 | 0.9% |
| **Total** | **229** | **100%** |

The published report is a default-theme route/viewport scan. It does not establish that both dark and light theme contrast, all focus states, or real-device rendering have passed. Those remain explicit human-review tasks.

## Route coverage

The following counts are the number of distinct selectors reported across desktop and mobile for each localized route. A selector appearing on several routes is listed once in the total of 73 unique targets.

| Route | Unique selectors |
|---|---:|
| Homepage — Persian | 15 |
| Homepage — English | 16 |
| AetherFlow — Persian | 16 |
| AetherFlow — English | 16 |
| ORBIT — Persian | 10 |
| ORBIT — English | 12 |
| Pooya.OS — Persian | 11 |
| Pooya.OS — English | 12 |
| NexusCanvas — Persian | 11 |
| NexusCanvas — English | 12 |
| LuminaGlass — Persian | 11 |
| LuminaGlass — English | 12 |
| AuraPulse — Persian | 11 |
| AuraPulse — English | 12 |
| GlobalCart — Persian | 16 |
| GlobalCart — English | 12 |
| Salon Booking — Persian | 11 |
| Salon Booking — English | 12 |

## Manual review procedure

Review every target family below in Persian and English, in both dark and light themes, at desktop and mobile sizes. Inspect the actual rendered page—not only the CSS token—because the incomplete findings involve gradients, pseudo-elements, or overlaps.

For each target:

1. Identify the real foreground color and the background directly behind the glyphs, including any gradient stop, translucent layer, pseudo-element, image, or overlapping decoration.
2. Measure the lowest contrast across the text's rendered area. For text, apply the WCAG 2.2 AA threshold appropriate to its rendered size and weight; do not classify large headings as normal body text.
3. Inspect both resting and visible-focus states for interactive controls. Check that the focus indicator itself remains visible against adjacent colors.
4. Record the route, language, theme, viewport, selector, foreground/background sample, measured ratio, and pass/fail result. Attach a screenshot for each failure or ambiguous case.
5. Fix confirmed failures in application CSS, then add a regression assertion where a stable color pair can be tested automatically. Do not close an item solely because Axe continues to report it as incomplete.

## Selector inventory

The selectors are grouped by the UI family that needs to be inspected. The number in parentheses is the number of node occurrences in the 36 route/viewport records, not a count of unique pages.

### Shared shell, case-study headings, and labels

- `.portfolio-workspace > span` (17; gradient)
- `.case-study-back` (16; overlap)
- `.scene-topline > span` (14; pseudo-element)
- `.scene-topline > i` (12; pseudo-element)
- `.case-study-index` (4; pseudo-element/gradient)
- `.case-study-status` (2; gradient)
- `.case-study-heading > .portfolio-eyebrow` (2; gradient)
- `.case-study-heading > .portfolio-eyebrow > .eyebrow-index` (2; gradient)
- `.case-study-heading > p` (2; partial overlap)
- `h1` (2; gradient)
- `.project-tags > span:nth-child(1)` (2; gradient)
- `em` (2; pseudo-element)

### Homepage hero, proof row, and project previews

- `.portfolio-social-proof > span:nth-child(2)` (3; pseudo-element)
- `.proof-dot` (2; pseudo-element)
- `.portfolio-social-proof > span:nth-child(4)` (2; pseudo-element)
- `.portfolio-hero-copy > .portfolio-eyebrow` (2; pseudo-element)
- `.hero-title-line[dir="auto"]:nth-child(1)` (2; pseudo-element)
- `.hero-title-line[dir="auto"]:nth-child(3)` (2; pseudo-element)
- `.hero-gradient` (1; pseudo-element)
- `.hero-title-prefix` (1; pseudo-element)
- `.hero-title-word` (1; pseudo-element)
- `.portfolio-intro` (2; pseudo-element)
- `.portfolio-primary[href$="#projects"]` (2; pseudo-element)
- `.portfolio-secondary` (2; pseudo-element)
- `.hero-preview-1 > .hero-preview-toolbar > strong` (2; pseudo-element)
- `.hero-preview-1 > .hero-preview-toolbar > small` (2; pseudo-element)
- `.hero-preview-1 > .hero-preview-caption > b` (2; pseudo-element)
- `.hero-preview-1 > .hero-preview-caption > span` (2; pseudo-element)
- `.hero-preview-2 > .hero-preview-toolbar > strong` (1; pseudo-element)

### Case-study media captions and scroll guidance

- `.device-mobile.case-study-media-card:nth-child(2) > figcaption > .case-study-scroll-note` (12; gradient)
- `.device-mobile.case-study-media-card:nth-child(2) > figcaption` (11; gradient)
- `.device-desktop > figcaption` (8; gradient)
- `.device-mobile > figcaption` (4; gradient)
- `.case-study-scroll-note` (4; gradient)

### Case-study body and source metadata

- `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow` (3; gradient)
- `.case-study-section-grid > .case-study-panel:nth-child(1) > .portfolio-eyebrow > .eyebrow-index` (3; gradient)
- `.case-study-section-grid > .case-study-panel:nth-child(1) > p` (3; gradient)
- `.case-study-section-grid > .case-study-panel:nth-child(2) > .portfolio-eyebrow` (3; gradient)
- `.case-study-section-grid > .case-study-panel:nth-child(2) > .portfolio-eyebrow > .eyebrow-index` (2; gradient)

### ORBIT motion scene

- `.orbit-health-card > small` (2; pseudo-element)
- `.orbit-health-card > strong` (2; pseudo-element)
- `.orbit-stat-card > small` (2; pseudo-element)
- `.orbit-stat-card > strong` (2; pseudo-element)

### Pooya.OS motion scene

- `.os-window-back > .os-titlebar > span` (2; pseudo-element)
- `.os-window-front > .os-titlebar > span` (2; pseudo-element)
- `.os-avatar` (2; pseudo-element)
- `.os-terminal-line > span` (2; pseudo-element)

### NexusCanvas motion scene

- `.node-gateway` (2; pseudo-element)
- `.node-gateway > small` (2; pseudo-element)
- `.node-service` (2; pseudo-element)
- `.node-service > small` (2; pseudo-element)
- `.node-worker` (2; pseudo-element)

### LuminaGlass motion scene

- `.glass-controls > span:nth-child(1)` (2; pseudo-element)
- `.glass-controls > span:nth-child(3)` (2; pseudo-element)
- `.glass-footnote` (2; pseudo-element)

### AuraPulse motion scene

- `.market-simulated` (2; pseudo-element)
- `.market-symbol > strong` (2; pseudo-element)
- `.market-symbol > span` (2; pseudo-element)
- `.market-range > span:nth-child(1)` (2; pseudo-element)
- `.market-range > span:nth-child(2)` (2; pseudo-element)
- `.market-range > span:nth-child(3)` (2; pseudo-element)

### GlobalCart motion scene

- `.product-a > b` (2; pseudo-element)
- `.product-a > small` (2; pseudo-element)
- `.product-b > b` (2; pseudo-element)
- `.product-b > small` (2; pseudo-element)
- `.product-c > b` (2; pseudo-element)

### Salon Booking motion scene

- `.booking-calendar-head > span:nth-child(1)` (2; pseudo-element)
- `.booking-calendar-head > span:nth-child(2)` (2; pseudo-element)
- `.booking-calendar-head > span:nth-child(3)` (2; pseudo-element)
- `.booking-calendar-head > span:nth-child(4)` (2; pseudo-element)
- `span:nth-child(5)` (2; pseudo-element)

## Completion record

Do not change the status of this matrix to passed until a human reviewer has recorded the measurements for both languages and themes on desktop and mobile, assessed focus states, and listed any remediated failures with follow-up evidence. The current automated status remains: 36 incomplete Axe checks; zero confirmed Axe violations; manual review pending.
