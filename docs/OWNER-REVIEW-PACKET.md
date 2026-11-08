# Owner review packet — Pooya Labs Platform

**Prepared:** 2026-11-08  
**Source status refreshed:** 2026-11-09 (read-only upstream recheck; owner approval remains pending)  
**Review state:** Prepared; owner approval is still pending.  
**Purpose:** Give Pooya one place to review public biography, project order, role attribution, status labels, contact channels, and media boundaries before Phase 8.  
**Important:** This document is a review snapshot, not approval to publish new claims or media. All eight project registry entries currently remain marked as needs-owner-review.
**Owner-confirmed platform identity (2026-11-09):** Use **Pooya Monogram (پویا مونوگرام)** and the centered black-tile monogram as the Pooya Labs Platform owner identity in the homepage footer, case-study footers, bilingual README ownership blocks, and structured metadata. Credit **Pooya Goodarzi** as creator and maintainer. This narrow confirmation applies to the platform brand only; it does not approve the eight independent project dossiers/media or close any Phase 7–10 release gate.

## 1. Homepage identity and copy currently in the repository

### Headline / شعار

**English:** Turning ideas into thoughtful digital experiences.

**فارسی:** ایده‌ها را به تجربه‌های دیجیتال تبدیل می‌کنم.

### Introduction / معرفی

**English**

> I’m Pooya, a computer engineering student focused on product design, frontend engineering, and systems thinking. Here I share the projects I build, along with their technical journey, decisions, and honest current status.

**فارسی**

> من پویا هستم؛ دانشجوی مهندسی کامپیوتر با تمرکز بر طراحی محصول، مهندسی فرانت‌اند و تفکر سیستمی. اینجا پروژه‌هایی را می‌بینی که می‌سازم، همراه با مسیر فنی، تصمیم‌ها و وضعیت واقعی هرکدام.

### About / درباره من

**English**

> My projects span interactive interfaces and visual tools, distributed systems, data dashboards, and web products. I aim to present each one with a clear architecture, honest boundaries, testing, and an accurate account of its current state.

**فارسی**

> در پروژه‌هایم از رابط‌های تعاملی و ابزارهای بصری تا سیستم‌های توزیع‌شده، داشبوردهای داده و محصولات وب کار کرده‌ام. تلاشم این است که هر پروژه با معماری مشخص، مرزهای روشن، تست و توضیح صادقانه از وضعیت واقعی ارائه شود.

**Current browser/page identity:** English is the default language and LTR; Persian is available through the language switch. The default visual theme is dark, with a light-theme option. The current document title is “Pooya — Personal Portfolio & Projects | Pooya Labs”.

## 2. Featured project order, current status, and attribution

The table records the current portfolio order and the wording already grounded in each source README/dossier. It does not mean the owner has approved the wording.

| # | Project | Current status / وضعیت فعلی | Attribution currently recorded / انتساب فعلی |
|---|---|---|---|
| 01 | [AetherFlow](https://github.com/pooya-labs/aetherflow) | In development · M08 / در حال توسعه · M08 | Maintained in the public Pooya Labs organization; the current README does not identify an individual author or contribution split. / در سازمان عمومی Pooya Labs نگه‌داری می‌شود؛ README فعلی نویسنده و سهم فردی را مشخص نمی‌کند. |
| 02 | [ORBIT](https://github.com/pooya-labs/orbit) | Stable v1.0.0 / نسخه پایدار ۱٫۰٫۰ | README identifies Pooya as project owner and maintainer. / README پویا را مالک و نگه‌دارنده پروژه معرفی می‌کند. |
| 03 | [Pooya.OS](https://github.com/pooya-labs/pooya-os) | Public demo / دموی عمومی | README identifies Pooya as author/creator. / README پویا را نویسنده و سازنده معرفی می‌کند. |
| 04 | [NexusCanvas](https://github.com/pooya-labs/nexus-canvas) | Public demo / دموی عمومی | README identifies Pooya as author. / README پویا را نویسنده معرفی می‌کند. |
| 05 | [LuminaGlass](https://github.com/pooya-labs/lumina-glass) | Public demo / دموی عمومی | README identifies Pooya as author. / README پویا را نویسنده معرفی می‌کند. |
| 06 | [AuraPulse](https://github.com/pooya-labs/aurapulse) | Public demo / دموی عمومی | README identifies Pooya as author. / README پویا را نویسنده معرفی می‌کند. |
| 07 | [GlobalCart](https://github.com/pooya-labs/globalcart) | Stable portfolio/demo release · v1.0.0 / انتشار پایدار نسخهٔ نمایشی ۱.۰.۰ | README identifies Pooya as owner and product engineer. / README پویا را مالک و مهندس محصول معرفی می‌کند. |
| 08 | [Salon Booking](https://github.com/pooya-labs/salon-booking) | Released · v1.0.0 / منتشرشده | README identifies Pooya as engineer/creator and the salon owner as product owner. / README پویا را مهندس و سازنده و مالک سالن را صاحب محصول معرفی می‌کند. |

**Attribution notes**

- AetherFlow's current source README does not specify an individual author or contribution split. Keep this limitation visible unless the source repository and owner-approved wording change.
- Salon Booking is not solely owned as a product by Pooya; the salon owner is the product owner. Obtain the salon owner's permission for public case-study attribution and imagery.
- The role wording is copied from the current bilingual case-study dossier and should be approved before any project review state is changed to owner-reviewed.

## 3. Project-specific boundaries to preserve in public copy

These are important accuracy constraints, not optional marketing language.

- **AetherFlow:** M08 remains in progress and the project is experimental, not production-ready. The owner confirmed one real write/reload/read round-trip through the private Apps Script Sheet; the stored item is a bounded synthetic control-plane record, not an executed workflow. The checked-in Apps Script correction now keeps new storage-only records in `pending`, but the live Web App still needs a manual new-version redeploy before that correction is active. Keep the separate Rust/PostgreSQL/NATS production gates open. Its documented delivery guarantee is at-least-once, not universal exactly-once.
- **ORBIT:** v1.0.0 covers the portfolio-demo scope. The Apps Script dashboard uses synthetic demo records. The Cloudflare Worker route is not a live runtime and Metrics, Logs, and Traces connection-required states are not live telemetry. Open PR #138 contains a CI-only Keycloak candidate; its strict production-image security gate still fails on unresolved SQLite FTS5 and upstream Guava findings. Do not describe the candidate as deployed or production-ready.
- **Pooya.OS:** Public demo only. Review the profile portrait and X-Ray figures as personal/public-facing assets before treating any new recapture as approved.
- **NexusCanvas:** Keep modelled metrics and illustrative telemetry labelled as such. Review the recently corrected footer strings for Persian/English parity.
- **LuminaGlass:** Audio Lab and task-board data are local to the browser; there is no cloud sync. Microphone access requires browser permission, and no audio is sent to a server. Some candidate overview captures remain visually blurred and should not be substituted for clearer evidence.
- **AuraPulse:** Binance ticker requests have failed in recorded browser captures due to CORS/network access. The fallback must remain labelled simulated; paper-trading does not send real orders and must not be described as live market execution.
- **GlobalCart:** Stable portfolio/demo release v1.0.0 is published at [GitHub Releases](https://github.com/pooya-labs/globalcart/releases/tag/v1.0.0). This is still a marketplace simulation, not a live retailer: no real goods are sold, and payment, inventory reservation, order fulfilment, seller payouts, and refunds are not real. Catalog amounts are estimates, not seller quotes. Merged-main Browser E2E [42516946135](https://github.com/pooya-labs/globalcart/actions/runs/42516946135) passed 163 tests / 9 intentional skips / 0 failures. Current-main project docs record owner-confirmed real desktop/mobile review, actual platform screen-reader review, and full human RTL/LTR review on 2026-11-08; the exact device/browser matrix was not recorded. Physical tablet review and eligible field Core Web Vitals remain unverified/optional. PR [#23](https://github.com/pooya-labs/globalcart/pull/23) was closed without merge; the v1.0.0 closeout is documented directly on current main commit `220b216fbad4`.
- **Salon Booking:** Public evidence must be limited to the customer booking journey. Do not publish admin views, customer records, phone numbers, or private appointment data. Obtain the salon owner's permission and use synthetic/redacted evidence only.

## 4. Public contact channels currently shown

| Channel | Current public destination |
|---|---|
| GitHub | https://github.com/pooya-labs |
| Telegram | https://t.me/pooyayee |
| Instagram | https://instagram.com/_p.ooya |

No public email address is currently shown in the portfolio footer. Do not add one without owner confirmation.

## 5. Brand, screenshots, and other media requiring review

- The project registry references seven project visual/brand assets, six case-study hero assets, and per-project desktop/mobile/detail media. The source URLs are pinned to immutable Git commits and the project registry provides Persian and English alt text.
- Fourteen full-page desktop/mobile captures are currently published across seven project case studies. Their presence in the repository does not replace a final owner review of the portfolio as a whole.
- A newer recapture workflow produced 29 PNG candidates and seven WebM reels for technical review. Those candidates remain workflow artifacts, not approved public assets; do not publish them automatically.
- GlobalCart now has separate desktop and mobile storefront-home screenshots in its source repository's docs/screenshots directory. These are not a substitute for resolving the outstanding accessible-name and gallery/PDP acceptance.
- The portfolio has 17 PNG social preview cards plus 17 SVG source cards. External LinkedIn/Facebook crawler rendering and cache-refresh validation remain open.
- Use the current Pooya Labs monogram and the project-specific marks already pinned in the registry. Do not replace an established logo with a newly invented mark as part of this review packet.

## 6. Novels section

The bilingual Novels section and safe reader are implemented, but the catalog is intentionally empty. Confirm one of the following before content is added:

- Keep the section empty/hidden for V1; or
- Supply the titles, descriptions, cover images, and manuscripts that may be published.

Do not invent titles, cover art, author text, or manuscript content. Files committed under the public repository remain publicly accessible even when a catalog entry has published: false.

## 7. Owner decisions requested

Please review and confirm or correct these items before Phase 8 begins:

- [ ] Headline in Persian and English.
- [ ] Introduction and About copy, including whether the public positioning should explicitly include AI Engineering.
- [ ] Featured-project order (01–08).
- [ ] Per-project role/contribution wording, especially AetherFlow's unattributed individual contribution and Salon Booking's separate product owner.
- [ ] Current public status labels and release/version wording for all eight projects.
- [ ] GitHub, Telegram, and Instagram as the intended public contact channels.
- [ ] Personal portraits, project marks, case-study screenshots, and social-card imagery permitted for public use.
- [ ] Salon owner's separate permission for case-study attribution and privacy-reviewed imagery.
- [ ] Whether the Novels section stays empty or receives owner-supplied material.

**Source freshness note:** The project-head, release, and open-PR inventory was refreshed read-only on 2026-11-09; see [PROJECT-CONTENT-AUDIT.md](PROJECT-CONTENT-AUDIT.md). AetherFlow's live Sheet write/reload/read check and GlobalCart's separate owner-confirmed manual review are recorded in their current source docs; neither changes Pooya Labs portfolio approval. A current source status does not imply owner approval of the portfolio wording or media.

**Approval rule:** No item is considered approved by the existence of this document. Keep all eight project review states as needs-owner-review until the owner explicitly confirms the relevant content and media. Phase 8 redesign, Phase 9 project integration, and Phase 10 release remain gated by the existing roadmap.
