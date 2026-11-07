# Visual Direction — Pooya Labs personal portfolio

**Status:** First public portfolio layout implemented as an early draft. It is not the final visual design. A full owner-reviewed redesign is a release-blocking roadmap milestone.

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
- Dark mode is the primary presentation. Light mode may be added after the first full design review.
- Persian is the initial language with complete English LTR parity.
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

## Mandatory pre-release redesign and owner feedback

This is a release-blocking gate, not optional polish:
1. Present a complete visual and content prototype to Pooya.
2. Collect his feedback on identity, bio, layout, project priority, project descriptions, screenshots, visual references, motion, colors, and mobile behavior.
3. Record each decision and rejected direction; update the prototype and roadmap.
4. Run a second full review on desktop and mobile after revisions.
5. Do not mark the redesign milestone complete or release V1 until Pooya explicitly approves the final direction.

Review criteria: distinctive personal identity, strong project storytelling, credible evidence, readable Persian and English, accessibility, mobile quality, loading performance, and a consistent design system.


## 2026-11-07 — Motion-led direction, using Framer as a reference

Pooya selected [Framer](https://www.framer.com/) as the visual/motion reference for the Phase 7 redesign. Use its general interaction language as inspiration: confident oversized type, restrained dark canvas, sticky translucent navigation, large website previews, layered image compositions, editorial section transitions, marquees, and polished hover/scroll motion. This is a design reference, not permission to reuse Framer's logo, copy, proprietary site assets, templates, or exact page composition. The result must remain an original Pooya Labs portfolio.

### First implementation pass
- The homepage hero now uses actual pinned project interface imagery (GlobalCart, ORBIT, NexusCanvas, LuminaGlass, and AuraPulse) in a layered 3D screenshot stage; screenshot-backed project cards are preferred over logo-only art wherever current reviewed assets exist.
- A project-name marquee, floating preview windows, reveal-on-scroll sections, subtle hover depth, animated gradients, and an animated about/contact treatment establish the first motion system.
- Reduced-motion preferences remain respected; the native pointer stays visible and the previously removed pointer-following lens remains out of scope.
- The project capture workflow now includes GlobalCart and creates private desktop/mobile screenshot candidates plus one WebM motion reel for each of seven public projects. ORBIT's Metrics/Logs/Traces states are captured only as connection-required views where available, never as live telemetry.
- Salon Booking stays excluded from automated visual capture until the product owner approves a synthetic or privacy-redacted state. Customer names, phone numbers, booking references, tokens, and private booking content must not enter public portfolio assets.

### Review still required
This is the first design pass, not final Phase 7 approval. Review the generated capture artifact and the new site on desktop/mobile, then record the first feedback round. A second review remains required after those revisions. Do not publish unreviewed captures or mark the redesign gate complete before explicit owner approval.
