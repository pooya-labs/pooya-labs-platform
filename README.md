# Pooya Labs — Personal Portfolio

Pooya Labs is Pooya's personal engineering portfolio and project showcase. Its main purpose is to introduce Pooya, explain how he approaches software engineering, and make his most meaningful projects easy to explore.

This is a portfolio first—not a generic SaaS dashboard or customer-account product.

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

Start with the [contribution guide](CONTRIBUTING.md), [release checklist](docs/RELEASE.md), and [static-host deployment/rollback runbook](docs/STATIC-HOST-DEPLOYMENT.md), and the project handoff docs: docs/ROADMAP.md, docs/STATUS.md, docs/NEXT.md, docs/DEPLOYMENT-TARGETS.md, docs/PROJECT-CONTENT-AUDIT.md, docs/NOVELS-GUIDE.md, docs/PRODUCT-SURFACES.md, docs/DESIGN-DIRECTION.md, docs/ARCHITECTURE.md, and docs/RECOVERY.md.

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
