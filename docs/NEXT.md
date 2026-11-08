# Next Task — Owner visual review and pre-V1 hardening

**Task ID:** P7-09  
**Priority:** Owner review and manual release gates  
**Checkpoint date:** 2026-11-08  
**Latest verified `main` SHA:** `fa5d412506387622ca39df792fcaed62eb88cb67`

## Current verified baseline

- The public bilingual portfolio remains the root experience; the workspace is secondary.
- Eight bilingual project case studies, architecture diagrams, novels section, static SEO routes, Open Graph cards, screenshot galleries, and three independent publishing targets remain in place.
- The latest visual feedback cycle is implemented and deployed: new P monogram/favicon, coherent graphite/ivory/emerald palette, theme-aware header controls, rebuilt footer/contact section, slower screenshot-led hero motion, and a full-width Stripe-inspired radial proof scene.
- Architecture SVGs now wrap Persian/English node labels, descriptions, and long diagram captions into bounded lines. The direct route startup no longer restores a stale middle-of-page position.
- Telegram `@pooyayee` and Instagram `@_p.ooya` are visible in the contact section and footer.
- AuraPulse and Shayan Salon now use reviewed screenshots in the project cards; Salon Booking captures remain limited to its public customer journey.
- Repository CI [42476478338](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478338) passed TypeScript, all three build targets, and **67/67 contract tests**.
- Browser QA [42476478346](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478346) passed **17/17 routes**, **34/34 viewports**, and recorded zero axe violations.
- GitHub Pages [42476478354](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478354), Cloudflare Pages [42476478409](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478409), and Apps Script [42476478245](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42476478245) completed their deployment jobs successfully on the same `main` SHA.
- The earlier 32 moderate axe findings were repeated generic labels on project screenshot regions; PR #7 replaced those labels with project-specific names. Latest QA reports zero violations.
- The QA report still has 36 incomplete axe checks (34 color-contrast and 2 `aria-prohibited-attr` checks). They are not confirmed violations; manually inspect them. Keyboard-only and screen-reader sessions also remain open.
- The novel catalog is intentionally empty pending Pooya-provided titles, descriptions, covers, and manuscripts.

## Immediate next steps

1. Review the live site on a real desktop and phone. Focus on the ORBIT architecture page, the new logo/header, light/dark header colors, the Stripe-inspired radial section, the slowed hero screenshot stage, and the lower contact/footer area.
2. Confirm the text in all project diagrams remains inside its node cards in Persian and English, including long node captions and the diagram's top description.
3. Complete manual contrast checks and keyboard/screen-reader review across RTL/LTR and both themes. Use the latest QA artifact as the checklist; do not treat incomplete axe results as a pass.
4. Confirm the public biography, featured-project order, role/attribution wording, and project statuses. Reconfirm that the Telegram and Instagram handles are correct before V1.
5. Validate the 17 PNG Open Graph cards with external LinkedIn/Facebook crawler tools and refresh their caches.
6. Rehearse a rollback/recovery path and recheck the deployed site before asking for explicit V1 approval.

## Existing project evidence boundaries

- **AetherFlow:** maintain the M07/M08 and duplicate Dashboard mismatch as an open factual caveat until reconciled. Do not imply live API acceptance that has not been verified.
- **ORBIT:** the Cloudflare edge gateway is not to be described as live-connected unless its origin, secret, route, and CF01–CF05 acceptance have been completed.
- **AuraPulse:** captures represent a simulated paper-trading dashboard. Do not imply live-market connectivity while its public ticker request remains unverified.
- **GlobalCart:** retain its curated screenshots; do not publish a new full-page capture while the public catalog grid shows blank placeholders.
- **Salon Booking:** only use owner-approved public booking-flow screenshots. Never capture the admin route or customer records.
- Keep every independent project repository untouched unless Pooya explicitly requests work there.

## Release gate

The site is deployed, but the product remains **pre-alpha**. Phase 7 visual implementation is complete; owner review and manual acceptance remain open. Phase 8 performance, accessibility, security, release/rollback, and explicit V1 approval are still required. Do not create a V1 tag or describe the portfolio as final before those gates are closed.
