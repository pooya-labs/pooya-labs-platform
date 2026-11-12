# Phase 8 — Complete redesign: direction comparison

**Status: complete.** The completed owner-directed redesign was promoted to `main` on 2026-11-12 through PR [#71](https://github.com/pooya-labs/pooya-labs-platform/pull/71) and finalized by PR [#72](https://github.com/pooya-labs/pooya-labs-platform/pull/72) and the semantic accessibility fix in PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75), exact application SHA `64c5966cba21a2d25d8f357b351593cbe51f26b2`. The superseded prototype PR [#70](https://github.com/pooya-labs/pooya-labs-platform/pull/70) is closed and was not merged.

**Important decision record:** this document compared Direction A and B as options. Pooya did not make a separate checkbox selection of A or B in this file; he later iteratively directed and explicitly approved the actual redesign that was promoted. Do not rewrite the historical record as though he explicitly chose A or B. The shipped visual direction is documented in [DESIGN-DIRECTION.md](DESIGN-DIRECTION.md).

The design milestone is complete, but V1 is not approved. Phase 7 human/owner acceptance carry-over remains open; Phase 9 project evidence/content reconciliation must wait until those gates are closed.

---

# Phase 8 — Complete redesign: direction comparison

**Phase:** 8 — Complete redesign and owner approval  
**Entry authorization:** Pooya explicitly requested entering Phase 8 on 2026-11-10.  
**Current task:** P8-01 — compare two coherent visual systems and obtain the owner's direction selection.  
**Implementation state:** not started; do not replace the existing site until one direction is selected.  
**Release state:** pre-alpha. This document is not approval to publish new biography, project claims, personal media, client material, or V1.

## Why this phase is open

The existing motion-led site is a review baseline, not the final design. The ORBIT card image regression has been fixed and deployed on main at [`3888d07`](https://github.com/pooya-labs/pooya-labs-platform/commit/3888d0799afdf4c3bb702489b6f1fc22c98d1f3b). PR #68's Repository CI and Browser QA passed; the post-merge GitHub Pages deployment and Browser QA also passed. The new Phase 8 work is a full-site redesign, not another isolated card patch.

The Phase 8 brief preserves the previously selected Framer motion reference as an influence only. It does not copy Framer's branding, layout, assets, or components. The removed cursor-following lens stays out of scope unless Pooya explicitly re-approves it.

## Shared requirements for both directions

- English remains the default locale and LTR. Persian remains a complete RTL experience behind the language switch.
- Dark and light themes remain supported. Both must be first-class designs, not a dark design with a simple color inversion.
- Use the existing Pooya Monogram identity. Do not invent a replacement logo or project mark.
- The homepage tells Pooya's story first, then helps visitors inspect credible engineering work. It must not read like a generic SaaS dashboard or agency landing page.
- Use actual, immutable, approved project screenshots where they exist. A logo or decorative shape must not silently replace available product evidence.
- Preserve all eight project records, current status labels, correct public demo/repository links, bilingual case-study routes, and honest product boundaries.
- Keep the project order and all public biography/role/contact claims subject to owner review. In particular, do not overstate AetherFlow contribution, ORBIT production readiness, simulated AuraPulse values, GlobalCart sales/fulfilment, or Salon Booking product ownership.
- The Novels section has no approved catalog yet. Design a graceful empty state or a section that can remain hidden; do not invent covers, titles, summaries, or manuscript content.
- No Salon Booking owner approval is implied by this redesign request. Public customer information, admin surfaces, appointment records, and unapproved assets stay excluded.
- No cursor-following visual effect. Motion is restrained, purposeful, and disabled or simplified for `prefers-reduced-motion`.
- No important action depends on hover. Keep keyboard focus visible, touch targets usable, text contrast measurable, and layouts stable at narrow widths.
- Keep the application static and suitable for GitHub Pages. Do not turn the public portfolio into a login/dashboard product or add backend dependencies as part of the visual redesign.

## Direction A — Obsidian Editorial Systems (recommended)

**Positioning:** A premium engineering portfolio with an editorial voice. Confident, quiet, technical, and product-led.

### Visual system

- Deep graphite/obsidian surfaces as the default, with warm off-white text and restrained cyan/emerald accents.
- The accent is a signal, not a glow effect: use it for links, states, small rules, and focused highlights rather than large neon gradients.
- Large, deliberate typography; strong but short headlines; a narrow readable text measure.
- Fine borders, subtle surface elevation, selective glass in the navigation and small metadata layers. Avoid glass on every card.
- A matching light theme uses clear ivory/neutral surfaces and dark readable text while preserving the same hierarchy and accent logic.

### Homepage composition

1. A clean sticky navigation with the mark, About / Projects / Novels / Stack / Contact, language, theme, and one clear workspace link.
2. An editorial hero: concise introduction on one side, one composed stage of real project interface captures on the other. The person remains the subject; floating UI is supporting evidence, not a fake product console.
3. A short proof strip with factual focus areas, not invented metrics or testimonials.
4. A curated project feature grid. Each card has a large, correctly cropped product screenshot, project name, honest status, one-sentence explanation, and clear demo / case-study / source links. ORBIT and AetherFlow images must use the full card frame.
5. One coherent process / engineering approach section rather than several repeated decorative panels.
6. About and technology sections with enough detail to explain focus without repeating the hero.
7. Novels in an intentional empty or hidden state until owner-supplied content exists.
8. A concise contact close and consistent footer.

### Case-study system

- A consistent editorial header with project name, actual status, concise scope, and direct source/demo actions.
- A large real product image or approved media gallery before long technical detail.
- Reusable sections for problem, approach, architecture, engineering decisions, verification/evidence, limitations, and next steps.
- Architecture diagrams and gallery media are readable at full width on desktop and swipe/scroll safely on mobile.
- Bilingual labels, RTL/LTR alignment, captions, and accessible alt text must remain equivalent.

### Motion language

- Use a small set of motion primitives: initial reveal, gentle section entrance, card hover elevation, and purposeful image transitions.
- Keep scroll effects short and predictable. No perpetual marquee unless it carries real navigation/content value; no large 3D transforms that make text or screenshots hard to read.
- Native pointer only. Honor reduced motion and avoid layout shifts during animation.

### Strengths and trade-offs

- Strong fit for an engineering-focused personal brand and the existing dark-first identity.
- Lets the work itself create visual richness; real screenshots carry more value than decorative widgets.
- Requires disciplined restraint so the page does not become too dark, too dense, or overly "developer dashboard" in tone.

## Direction B — Warm Editorial Gallery

**Positioning:** A refined creative-technologist portfolio closer to a design journal or architecture magazine than a software product site.

### Visual system

- Warm paper/stone neutrals and ink/charcoal as the default surface, with deep forest or muted teal as the primary accent and a small copper/sand secondary accent.
- Typography-led hierarchy with generous whitespace, thin dividers, restrained serif display treatment where a verified/system-supported font is available, and clean sans-serif body copy.
- Project imagery is treated like an editorial gallery: wide frames, consistent crops, visible captions, and plenty of breathing room.
- The dark theme becomes a low-glare ink edition of the same editorial system, not a separate neon interface.

### Homepage composition

1. A minimal editorial masthead with the monogram, navigation, language/theme switches, and contact.
2. A personal introduction with a short statement and a single carefully chosen visual, rather than a large animated collage.
3. A horizontal or staggered "selected work" gallery where projects feel like distinct case files, with varied but controlled image ratios.
4. Short notes about engineering approach and current focus.
5. A magazine-like About section with compact biography and skill/technology taxonomy.
6. Novels as a small library shelf or intentionally hidden section until real manuscripts and covers are supplied.
7. A quiet contact panel and understated footer.

### Case-study system

- A magazine-like cover with title, status, category, a short abstract, and one strong image.
- A readable long-form narrative with generous line length, quiet captions, and architecture diagrams integrated as figures.
- Gallery images are presented with explicit captions and device labels; no floating dashboards or excessive chrome.
- Bilingual pages preserve the editorial rhythm while adapting line lengths and direction for Persian.

### Motion language

- Minimal: opacity/position transitions, subtle image reveal, and restrained hover feedback.
- Navigation and page flow remain stable; no sticky storytelling sections that trap or hijack scroll.
- Motion is not part of the brand's main identity; typography, whitespace, and image curation do the work.

### Strengths and trade-offs

- More distinctive and timeless as a personal portfolio; it will feel less like a conventional software landing page.
- Creates a strong frame for writing and project narratives.
- Less immediately "technical product" in tone; it depends heavily on excellent images, final copy, and strong editorial selection. The current empty Novels catalog and pending project-content approvals are noticeable constraints.

## Comparison

| Criterion | Direction A — Obsidian Editorial Systems | Direction B — Warm Editorial Gallery |
|---|---|---|
| Engineering / product identity | Strong | Moderate to strong |
| Fit with current Pooya Monogram + dark-first identity | Very strong | Intentional evolution |
| Role of real product screenshots | Feature-stage evidence | Editorial gallery evidence |
| Motion emphasis | Restrained and purposeful | Minimal |
| Visual warmth | Cool, precise, premium | Warm, human, magazine-like |
| Risk | Can become too dark or dashboard-like | Can become generic without strong imagery and final writing |
| Best use | Engineering portfolio with real product interfaces | Personal design/engineering journal |

## Recommendation

**Direction A is the recommended starting point**, with two safeguards borrowed from Direction B: stronger whitespace and editorial typography. That hybrid detail does not create a third direction; Direction A remains the selected system unless Pooya chooses B.

The recommendation is not final owner approval. No full application implementation should begin until Pooya selects A or B (or requests a specific adjustment). After selection, prepare a full-site prototype and deliver review round one on desktop and mobile.

## Owner decision

- [ ] Select A — Obsidian Editorial Systems.
- [ ] Select B — Warm Editorial Gallery.
- [ ] Request adjustments before choosing.

**Decision status:** pending Pooya.  
**Next step after selection:** P8-02 — produce the complete bilingual responsive prototype for owner review round one.

## Phase 7 carry-over gates — still open

Pooya's instruction authorizes Phase 8 design exploration to begin now. It does **not** mark Phase 7 fully accepted and does not waive the following pre-publication requirements:

- Human review of the 36 incomplete Axe contrast checks in each theme.
- Physical desktop/Android review and actual keyboard/focus/screen-reader evaluation.
- Owner approval of biography, headline, positioning, featured order, project contribution wording, contact details, and public media.
- Separate Salon Booking owner permission for attribution and imagery.
- Authenticated LinkedIn/Meta share-cache validation.
- Cloudflare native deployment trigger/credential decision and any required Apps Script decision.
- Public/private asset audit and non-destructive rollback rehearsal.

These remain blockers for Phase 10/V1. Full project-content/media integration remains Phase 9 after the Phase 8 two-round redesign approval.
