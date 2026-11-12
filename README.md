# Pooya Labs — Personal Portfolio

Pooya Labs is Pooya's personal engineering portfolio and project showcase. Its main purpose is to introduce Pooya, explain how he approaches software engineering, and make his most meaningful projects easy to explore.

This is a portfolio first—not a generic SaaS dashboard or customer-account product.

## Latest project update — 12 November 2026, final accessibility correction

The owner-directed redesign is live on both static hosts at exact application commit `64c5966cba21a2d25d8f357b351593cbe51f26b2`. PR [#71](https://github.com/pooya-labs/pooya-labs-platform/pull/71) promoted the redesign, PR [#72](https://github.com/pooya-labs/pooya-labs-platform/pull/72) corrected the light-theme header toggle, and PR [#75](https://github.com/pooya-labs/pooya-labs-platform/pull/75) added a semantic group role to the named skill-chip collections. Exact-head Repository CI [43220737566](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43220737566) and Browser QA [43220737568](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43220737568) passed. The main-branch Browser QA [43221461301](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461301) is the post-merge verification record; its final result is tracked in the project state. GitHub Pages [run 43221461285](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43221461285) and Cloudflare Production deployment [975b9e6d](https://975b9e6d.pooya-labs-platform.pages.dev/) publish the same main SHA; Cloudflare completed all five stages.

The latest completed Chromium report found zero confirmed Axe violations and zero remaining incomplete ARIA-prohibited-attribute checks in both themes. Thirty-six color-contrast checks per theme remain incomplete because the backgrounds behind some text cannot be resolved automatically through gradients, pseudo-elements, and layered artwork; manual contrast measurement is still required. The report is not a WCAG certification. The site remains **pre-alpha / portfolio draft**, not V1: Phase 7 human/owner acceptance and Phase 9/10 release gates remain open. The two owner-supplied books «گوزن» and «غزال» remain connected to the Novels section with WebP covers and PDF manuscripts.

## Previous project update — 12 November 2026 (superseded)

The completed owner-directed redesign is now the main production version at exact application commit `b7d4d136d58e2121d6bd2bd11c03ff774431a2d7`. PR [#71](https://github.com/pooya-labs/pooya-labs-platform/pull/71) promoted the redesign and PR [#72](https://github.com/pooya-labs/pooya-labs-platform/pull/72) corrected the label-level light-theme header contrast found by the post-merge browser check. Repository CI [43215080520](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080520), Browser QA [43215080506](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080506), and GitHub Pages deploy [43215080845](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/43215080845) passed on that exact SHA. Cloudflare Pages Production deployment [b7ed72f1](https://b7ed72f1.pooya-labs-platform.pages.dev/) completed all five deployment stages from the same SHA. The public Novels section now contains the owner-supplied «گوزن» and «غزال» manuscripts, optimized WebP covers, and PDF reader links. The old Phase 8 prototype PR [#70](https://github.com/pooya-labs/pooya-labs-platform/pull/70) was closed as superseded.

The repository remains **pre-alpha / portfolio draft**, not V1. Phase 8 design promotion is complete, but Phase 7 human/device/accessibility/content/privacy/social-cache/rollback acceptance remains open and blocks final Phase 9 integration and Phase 10 publication. Browser QA reported zero confirmed Axe violations, but 40 incomplete checks per theme remain (36 contrast and 4 ARIA semantic records); human review is still required. See [STATUS.md](docs/STATUS.md), [NEXT.md](docs/NEXT.md), [ROADMAP.md](docs/ROADMAP.md), [RELEASE.md](docs/RELEASE.md), and [PROJECT-CONTENT-AUDIT.md](docs/PROJECT-CONTENT-AUDIT.md).

## Previous project update — 10 November 2026 (superseded)

The latest verified application source revision is `e5ef6389`. GitHub Pages was rebuilt from main checkpoint `5321d3f` (application source unchanged by the social-crawler QA tooling), and Cloudflare Pages' latest verified production deployment is `ed73cc8e` from the same application source. The later platform main checkpoints `b1db0ccc` and `b3e548e` are documentation/state-only; PR #48's exact-head Repository CI [42723838058](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42723838058) and Browser QA [42723837697](https://github.com/pooya-labs/pooya-labs-platform/actions/runs/42723837697) passed on `1c2f11e`. The latest recorded exact-main Repository CI and Browser QA before those documentation-only merges passed on `5321d3f`; Browser QA covered 18/18 routes, 36/36 viewports and 34/34 social-crawler checks, with 36 incomplete Axe contrast checks still reserved for manual review. Cloudflare's native Git-push trigger remains unverified, and the GitHub Actions Cloudflare publish plus Apps Script stable Web App publish jobs remain skipped without their private configuration. A fresh read-only audit of all eight upstream project repositories is recorded in [PROJECT-CONTENT-AUDIT.md](docs/PROJECT-CONTENT-AUDIT.md). The platform remains pre-alpha / Phase 7; human accessibility/device review, owner content/privacy approvals, authenticated social-cache validation and rollback rehearsal remain open.

## Project ownership

<p align="center"><a href="https://pooya-labs.github.io/pooya-labs-platform/"><img src="https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/main/apps/platform/public/brand/pooya-monogram-tile.svg" alt="Pooya Monogram — project owner mark" width="96" /></a></p>

**Project owner identity:** [Pooya Monogram (پویا مونوگرام)](https://github.com/pooya-labs). **Created and maintained by:** **Pooya Goodarzi**, through Pooya Labs Platform.

**Exclusive project boundary:** Pooya Labs Platform is the sole project in this portfolio set that Pooya has designated for his exclusive ownership, control, direction, and use. This public repository does not grant a general reuse license; third-party and upstream rights remain separate. See the bilingual [ownership/IP policy](docs/OWNERSHIP-AND-IP-POLICY.md) and [repository ownership register](docs/REPOSITORY-OWNERSHIP-REGISTER.md).

## The visitor journey

1. Meet Pooya and understand his current engineering focus.
2. Browse a curated set of selected projects.
3. Open detailed case studies covering the problem, contribution, architecture, technical decisions, implementation, validation, and current state.
4. Inspect real repositories, demos, and evidence where available.
5. Find a clear way to connect.

## Product surfaces

- **Public portfolio (primary):** the default website, published as a static site.
- **Private owner workspace (secondary):** the retained Spatial OS shell and possible owner-only content tools.
- **Customer dashboard:** not part of the portfolio by default. A separate product can add one later only if there is a real customer workflow.

The portfolio has completed three implementation and feedback cycles, including its motion-led identity, radial proof scene, Systems in Motion and craft sections, bilingual layout fixes, and responsive project evidence. Final owner review and the Phase 8 release gates remain open.

## Technology and hosting

- React + TypeScript + Vite.
- GitHub Actions for type-checking, contract tests, and builds.
- GitHub Pages is the primary portfolio host; Cloudflare Pages has a separate production build and deployment path.
- Persian-first RTL with English LTR support.
- Deep graphite surfaces, cyan/emerald accents, and restrained spatial layering; the custom pointer-following lens was removed at owner request.
- Apps Script has an independent HtmlService build and a secret-gated production deployment workflow. Its current RPC surface remains a Phase 0 health-check proof; the static portfolio does not depend on it.

**Previews:** [GitHub Pages](https://pooya-labs.github.io/pooya-labs-platform/) · [Cloudflare Pages](https://pooya-labs-platform.pages.dev/)

## Current implementation

The first portfolio draft includes:
- Personal introduction and project showcase as the root page.
- About, focus areas, technology list, contact section, and a data-driven novels library with cover art and an in-site Markdown/TXT reader.
- Eight project cards with verified source-repository and GitHub Pages preview links, honest project statuses, and explicit scope boundaries.
- Eight bilingual, shareable case studies with source-grounded engineering dossiers, generated architecture diagrams, and crawler-readable Persian/English static routes.
- A public novels library powered by apps/platform/public/novels/catalog.json; covers live in apps/platform/public/novels/covers/ and manuscripts in apps/platform/public/novels/manuscripts/. See [NOVELS-GUIDE.md](docs/NOVELS-GUIDE.md) for GitHub upload steps.
- Seven commit-pinned project-card/hero visuals plus two real GlobalCart storefront screenshots (desktop and mobile), all with Persian/English alt text and immutable source commit URLs.
- Ten reviewed interface screenshots across five project case studies: ORBIT, Pooya.OS, NexusCanvas, LuminaGlass, and AuraPulse each have a desktop case-study hero and a lazy-loaded mobile evidence image. Each image is pinned to an immutable portfolio commit. AuraPulse evidence is explicitly simulated/illustrative and does not prove live Binance connectivity; AetherFlow's UI screenshot remains withheld until its public M07/M08 status mismatch is reconciled.
- The screenshot capture workflow produces review-only artifacts. Dedicated approval manifests and checksum-gated GitHub Actions publishers verify the exact artifact, PNG signature, dimensions, byte size, and SHA-256 before selected images are committed. Salon Booking captures remain excluded until owner-approved privacy review.
- Canonical and Open Graph metadata, dynamic browser titles/descriptions for case-study routes, Person JSON-LD, a branded SVG favicon, and an XML sitemap covering the homepage plus all eight case-study URLs.
- An optional link to the existing GlobalCart bilingual case study.
- A secondary link to the existing Spatial OS workspace.
- Persian/English language switching and a responsive layout.

All project content is still marked for Pooya's review. The eight source-grounded dossiers and each project's missing pre-release information/evidence are tracked in [PROJECT-CONTENT-AUDIT.md](docs/PROJECT-CONTENT-AUDIT.md). The public biography, featured order, role/contribution details, remaining real UI screenshots, manual QA, and contact channel must be reviewed before release. Static crawler-readable case-study pages and architecture diagrams are generated at build time. Seventeen 1200×627 PNG social cards (homepage plus eight projects in Persian and English) are the primary Open Graph images; matching SVG source files are retained. External social-client rendering and cache refresh still need validation. No project is presented as production-ready without evidence.

## Development

Start with the [contribution guide](CONTRIBUTING.md), [ownership/IP policy](docs/OWNERSHIP-AND-IP-POLICY.md), [repository ownership register](docs/REPOSITORY-OWNERSHIP-REGISTER.md), [release checklist](docs/RELEASE.md), and [static-host deployment/rollback runbook](docs/STATIC-HOST-DEPLOYMENT.md), and the project handoff docs: docs/ROADMAP.md, docs/STATUS.md, docs/NEXT.md, docs/DEPLOYMENT-TARGETS.md, docs/PROJECT-CONTENT-AUDIT.md, docs/NOVELS-GUIDE.md, docs/PRODUCT-SURFACES.md, docs/DESIGN-DIRECTION.md, docs/ARCHITECTURE.md, and docs/RECOVERY.md.

Commands: npm install · npm run lint · npm run format:check · npm run typecheck · npm test · npm run build · npm run build:cloudflare · npm run build:gas

## Project identity

- Product: Pooya Labs personal portfolio
- Repository: pooya-labs/pooya-labs-platform
- Default branch: main
- Current release: pre-alpha / portfolio draft
- Previous-project code integration: deferred to Phase 9


---

## راهنمای فارسی

### معرفی

**Pooya Labs** پورتفولیوی شخصی و ویترین مهندسی پویاست؛ هدف آن معرفی مسیر فنی، شیوهٔ حل مسئله و پروژه‌های منتخب از طریق نمونه‌های واقعی، مخازن کد و مطالعه‌های موردی است. این وب‌سایت در درجهٔ اول یک پورتفولیو است، نه یک داشبورد عمومی SaaS یا محصول دارای حساب مشتری.

### تجربهٔ بازدیدکننده

بازدیدکننده ابتدا با حوزه‌های تمرکز مهندسی آشنا می‌شود، سپس پروژه‌ها را مرور می‌کند و می‌تواند مطالعه‌های موردی هر پروژه را با توضیح مسئله، نقش توسعه‌دهنده، معماری، تصمیم‌های فنی، پیاده‌سازی و شواهد اعتبارسنجی بخواند. پیوند مخزن و نسخهٔ نمایشی پروژه‌ها نیز در دسترس قرار دارد.

### امکانات فعلی

- صفحهٔ معرفی، حوزه‌های تمرکز، فناوری‌ها و راه‌های ارتباطی.
- ویترین پروژه‌ها با وضعیت و محدودهٔ واقعی هر پروژه.
- هشت مطالعهٔ موردی دوزبانه با مسیرهای مستقل فارسی و انگلیسی.
- کتابخانهٔ رمان‌ها با تصویر جلد و مطالعه‌گر درون‌سایتی برای فایل‌های Markdown و TXT.
- نمودارهای معماری و تصاویر شواهد پروژه‌ها با متن جایگزین فارسی و انگلیسی.
- پشتیبانی از فارسی راست‌به‌چپ و انگلیسی چپ‌به‌راست.

### فناوری و میزبانی

رابط اصلی با React، TypeScript و Vite ساخته شده است. GitHub Pages میزبان اصلی نسخهٔ استاتیک است و مسیر ساخت و انتشار جداگانه‌ای برای Cloudflare Pages نیز وجود دارد. نسخهٔ مستقل Google Apps Script با HtmlService نیز نگهداری می‌شود؛ RPC آن در حال حاضر در حد اثبات سلامت اولیه است و وب‌سایت استاتیک برای اجرا به آن وابسته نیست.

### وضعیت پروژه

نسخهٔ فعلی در وضعیت پیش‌انتشار و پیش‌نویس پورتفولیو قرار دارد. بازبینی نهایی مالک و دروازه‌های انتشار مرحلهٔ ۸ همچنان باز هستند. یکپارچه‌سازی کد پروژه‌های مستقل به مرحلهٔ ۹ موکول شده است؛ بنابراین نباید پروژه‌های مستقل را وابسته به runtime این پلتفرم فرض کرد.

### توسعه و بررسی

راهنمای مشارکت، چک‌لیست انتشار، راهنمای استقرار و بازگشت نسخه و اسناد تحویل پروژه در پوشهٔ `docs/` قرار دارند. فرمان‌های اصلی:

```bash
npm install
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
npm run build:cloudflare
npm run build:gas
```

برای ادامهٔ کار، فایل‌های `docs/ROADMAP.md`، `docs/STATUS.md`، `docs/NEXT.md`، `docs/ARCHITECTURE.md` و `docs/NOVELS-GUIDE.md` مرجع وضعیت و تصمیم‌های پروژه هستند.

### آخرین تغییرات — ۹ نوامبر ۲۰۲۶

در آخرین اصلاحات مطالعه‌های موردی، همان کامپوننتی که در مرورگر hydrate می‌شود اکنون در سمت سرور نیز رندر می‌شود؛ در نتیجه مسیرهای ایندکس‌پذیر فارسی و انگلیسی حفظ شده‌اند و ناهماهنگی hydration و پایداری چیدمان برطرف شده است. گالری تصاویر رابط با دسترس‌پذیری بهتر و رفتار طبیعی زنجیرهٔ اسکرول موبایل بازگردانده شد. خط مبنای کارایی روی سه میزبان ثبت شده، اما اعمال محدودیت‌های بودجهٔ کارایی تا زمان بررسی اندازه‌گیری‌ها صرفاً در حالت گزارش‌گیری است. آیکون تب مرورگر نیز از مونوگرام پویا در مرکز یک زمینهٔ مشکی با گوشه‌های گرد استفاده می‌کند.

پلتفرم همچنان در وضعیت پیش‌انتشار قرار دارد؛ بازبینی نهایی مالک و دروازه‌های انتشار مرحلهٔ ۸ هنوز باز هستند.

### مالکیت و نگه‌داری

<p align="center"><a href="https://pooya-labs.github.io/pooya-labs-platform/"><img src="https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/main/apps/platform/public/brand/pooya-monogram-tile.svg" alt="نشان مالک پروژه، پویا مونوگرام" width="96" /></a></p>

**هویت مالک پروژه:** [پویا مونوگرام (Pooya Monogram)](https://github.com/pooya-labs). **سازنده و نگه‌دارنده:** **پویا گودرزی**، در چارچوب پلتفرم پویا لبز.

**مرز انحصاری پروژه:** پلتفرم پویا لبز تنها پروژه در این مجموعه است که پویا مالکیت، کنترل، جهت‌دهی و استفادهٔ انحصاری از آن را تعیین کرده است. این مخزن مجوز عمومی استفادهٔ مجدد صادر نمی‌کند و حقوق وابستگی‌ها و دارایی‌های اشخاص ثالث جداگانه باقی می‌ماند. جزئیات در [سیاست دوزبانهٔ مالکیت و حقوق فکری](docs/OWNERSHIP-AND-IP-POLICY.md) و [دفتر ثبت مالکیت مخزن‌ها](docs/REPOSITORY-OWNERSHIP-REGISTER.md) آمده است.
