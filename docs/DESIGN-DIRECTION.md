# Visual Direction — Pooya Labs personal portfolio

**Current as-built status (2026-11-12):** The owner-directed redesign is complete and live on both static production hosts at exact application SHA `64c5966cba21a2d25d8f357b351593cbe51f26b2`. The as-built direction is a personal engineering portfolio with a restrained graphite/ivory/emerald visual system, editorial hierarchy, an animated proof/hero composition, systems-flow storytelling, project-specific visual scenes, and a craft gallery. It preserves English-first/LTR, Persian/RTL, dark/light themes, reduced-motion support and native pointer behavior. The removed cursor-following lens remains excluded.

- Owner promotion: PR [#71](https://github.com/pooya-labs/pooya-labs-platform/pull/71); contrast correction: PR [#72](https://github.com/pooya-labs/pooya-labs-platform/pull/72); semantic skill-group accessibility fix: PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75).
- CI: [43215080520](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080520); Browser QA: [43215080506](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080506).
- GitHub Pages: [production site](https://pooya-labs.github.io/pooya-labs-platform/); Cloudflare Pages: [canonical production host](https://pooya-labs-platform.pages.dev/).
- Phase 8 is complete. Phase 7 manual/owner acceptance remains open and still blocks Phase 9 final evidence integration and V1. No project-level content or client media has been implicitly approved by the design promotion.

## Historical design brief and earlier baseline

**Status:** The current motion-led portfolio is a review baseline, not the final design. A complete new redesign with two owner review/approval rounds is Phase 8, the penultimate stage before V1. Full portfolio-level integration of all eight projects is Phase 9, immediately before release.

## Product first

The root website is a personal engineering portfolio. Its hierarchy must communicate:
1. Who Pooya is.
2. What kinds of software he builds and what he is learning.
3. Which projects best demonstrate his abilities.
4. How a visitor can inspect the project evidence and get in touch.

Do not let a workspace dashboard, metrics panel, product catalogue, or decorative animation compete with this story.

## Visual language

- Deep obsidian / blue-black surfaces with restrained cyan and emerald accents.
- Liquid-glass layers, fine borders, atmospheric light, and confident typography.
- Original Antigravity-inspired spatial depth, not a copy of Google's UI or assets.
- Project cards should feel like individual engineered artifacts, not generic SaaS KPI tiles.
- Large typography and meaningful whitespace; project descriptions and evidence remain readable.
- Both dark and light themes are already implemented; the final redesign must retain and refine both.
- English is the default language (LTR); Persian is available through the language toggle with complete RTL parity.
- Responsive from large desktop to narrow mobile, with no critical interaction dependent on hover.

## Motion and pointer behavior

- The experimental pointer-following light/lens has been removed by owner request and must not return without new owner approval.
- Keep the native system pointer visible; do not add a custom cursor-following layer back during implementation.
- Motion should remain purposeful, restrained, and respectful of reduced-motion preferences.

## Content design

- A visitor should understand the site within a few seconds.
- The hero introduces the person, not a fictional product or generic platform.
- Featured projects should have clear status labels and evidence links where verified.
- Case studies should show the actual process: problem, role, constraints, architecture, tools, key decisions, validation, and outcome.
- Avoid fabricated metrics, generic claims such as "expert in everything", placeholder testimonials, and unverified customer logos.
- Do not publish private details. The public profile should use only information Pooya has reviewed and approved.

## Current draft

The current implementation contains:
- Persian/English switch.
- Introductory hero and GitHub links.
- Initial about section and areas of focus.
- An eight-project draft grid with status labels.
- Initial technology list.
- Contact section and a link to the secondary workspace.
- Bilingual keyboard skip links on the homepage and case-study pages, with visible-on-focus styling and reduced-motion handling.
- Native pointer behavior; the experimental pointer-following lens remains removed.

Project descriptions, skill emphasis, featured-project order, photos/avatar, contact channels, and public bio are content drafts and require Pooya's review before launch.

## Phase 8 — mandatory complete redesign and owner feedback (penultimate stage)

This is a release-blocking gate, not optional polish:
1. Present a complete visual and content prototype to Pooya.
2. Collect his feedback on identity, bio, layout, project priority, project descriptions, screenshots, visual references, motion, colors, and mobile behavior.
3. Record each decision and rejected direction; update the prototype and roadmap.
4. Run a second full review on desktop and mobile after revisions.
5. Do not mark the redesign milestone complete or release V1 until Pooya explicitly approves the final direction.

Review criteria: distinctive personal identity, strong project storytelling, credible evidence, readable Persian and English, accessibility, mobile quality, loading performance, and a consistent design system.


## 2026-11-07 — Motion-led direction, using Framer as a reference

Pooya selected [Framer](https://www.framer.com/) as the visual/motion reference for the Phase 8 redesign. Use its general interaction language as inspiration: confident oversized type, restrained dark canvas, sticky translucent navigation, large website previews, layered image compositions, editorial section transitions, marquees, and polished hover/scroll motion. This is a design reference, not permission to reuse Framer's logo, copy, proprietary site assets, templates, or exact page composition. The result must remain an original Pooya Labs portfolio.

### First implementation pass
- The homepage hero now uses actual pinned project interface imagery (GlobalCart, ORBIT, NexusCanvas, LuminaGlass, and AuraPulse) in a layered 3D screenshot stage; screenshot-backed project cards are preferred over logo-only art wherever current reviewed assets exist.
- A project-name marquee, floating preview windows, reveal-on-scroll sections, subtle hover depth, animated gradients, and an animated about/contact treatment establish the first motion system.
- Reduced-motion preferences remain respected; the native pointer stays visible and the previously removed pointer-following lens remains out of scope.
- The project capture workflow now includes GlobalCart and creates private desktop/mobile screenshot candidates plus one WebM motion reel for each of seven public projects. ORBIT's Metrics/Logs/Traces states are captured only as connection-required views where available, never as live telemetry.
- Salon Booking stays excluded from automated visual capture until the product owner approves a synthetic or privacy-redacted state. Customer names, phone numbers, booking references, tokens, and private booking content must not enter public portfolio assets.

### Verified first-pass evidence — 2026-11-07

- Portfolio code now includes the first motion-led homepage prototype. The deployed Pages workflow [42399972687](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972687) passed on the source tree containing this implementation.
- Browser QA [42399972654](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972654) passed **17/17 routes**, **34/34 desktop/mobile viewports**, and **zero axe violations**. Thirty-four axe incomplete checks still need manual human review; no formal WCAG certification is claimed.
- Repository CI [42400056094](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42400056094) passed **54/54 contract tests**, TypeScript, and the three independent build targets.
- Private capture workflow [42399972697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42399972697) produced **29 screenshot candidates and seven WebM motion reels** across AetherFlow, ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, AuraPulse, and GlobalCart. All are artifact-only, SHA-256 recorded, pending human/owner review; none was published into the website.
- ORBIT Metrics/Logs/Traces show connection-required states, not live telemetry. AuraPulse’s browser request to Binance failed CORS and its screenshots must remain explicitly simulated. AetherFlow's M07/M08 label mismatch and duplicate Dashboard navigation remain visible. Salon Booking was excluded to protect customer information until the salon owner approves a synthetic/redacted capture.
- The capture artifact includes desktop/mobile scenarios such as ORBIT incidents and connection prompts, NexusCanvas Mobile Rack and export modal, and LuminaGlass Audio Lab and local task board. Audio was not started, and no data was imported or modified.

### Review still required
This is the first design pass, not final Phase 8 approval. Review the generated capture artifact and the new site on desktop/mobile, then record the first feedback round. A second review remains required after those revisions. Do not publish unreviewed captures or mark the redesign gate complete before explicit owner approval.


## Release sequence (2026-11-08)

- Phase 7 closes engineering, evidence-baseline, performance, security, accessibility-preparation, deployment/recovery, and owner/device readiness before any new visual rebuild.
- Phase 8 is the penultimate stage: complete redesign of every public surface followed by two explicit owner feedback/approval rounds.
- Phase 9 is the final implementation stage before V1: refresh and fully integrate all eight independent projects into the approved design, including their verified facts, case studies, current links, diagrams, approved media, and useful demos. Source-code imports remain opt-in and require a separate architecture/licensing approval.
- Phase 10 is release hardening and V1 publication. No V1 tag is permitted before Phases 7–9 are complete.
