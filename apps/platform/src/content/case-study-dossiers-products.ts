export const productDossiers = {
  "lumina-glass": {
    role: { fa: "README، پویا را نویسنده پروژه معرفی می‌کند.", en: "The README identifies Pooya as the author." },
    architecture: { fa: "آزمایشگاه static مبتنی بر Next.js 16، React 19، TypeScript و Tailwind؛ SVG پیش‌نمایش optical، Canvas خروجی PNG، Web Audio API فیلترهای صوتی محلی و localStorage تنظیمات و task board را نگه می‌دارد.", en: "A static lab built with Next.js 16, React 19, TypeScript, and Tailwind; SVG renders optical previews, Canvas exports PNGs, Web Audio API runs local audio filters, and localStorage stores preferences and the task board." },
    implementation: {
      fa: ["تنظیم زنده iridescence، fluidity و لایه‌های crystal.", "خروجی PNG با Canvas.", "پنج Biquad filter برای oscillator، فایل صوتی محلی یا microphone.", "Presetهای Flat/Warm/Clarity/Cinematic و تنظیم دستی bandها.", "Task board سه‌مرحله‌ای و ذخیره محلی.", "آزادسازی oscillator، microphone tracks، AudioContext و object URLها هنگام stop یا تغییر source."],
      en: ["Tune iridescence, fluidity, and crystal layers live.", "Canvas PNG export.", "Five Biquad filters for oscillator, local audio file, or microphone.", "Flat/Warm/Clarity/Cinematic presets and manual band controls.", "Three-stage local task board.", "Release oscillator, microphone tracks, AudioContext, and object URLs on stop/source change."]
    },
    decisions: {
      fa: ["preset، EQ و taskها فقط روی localStorage همین browser ذخیره می‌شوند؛ cloud sync وجود ندارد.", "صوت پس از reload خودکار شروع نمی‌شود و AudioContext با کنش کاربر resume می‌شود.", "دسترسی microphone به HTTPS/localhost و اجازه مرورگر نیاز دارد؛ صوت به سرور فرستاده نمی‌شود."],
      en: ["Presets, EQ, and tasks stay in this browser's localStorage; there is no cloud sync.", "Audio never resumes automatically after reload; AudioContext resumes from user action.", "Microphone requires HTTPS/localhost and browser permission; audio is not sent to a server."]
    },
    verification: {
      fa: ["انتشار Pages روی commit 06fa934 در ۱ نوامبر ۲۰۲۶ موفق بود.", "README گزارش یکپارچه تازه از browser/accessibility tests ارائه نمی‌کند."],
      en: ["Pages deployment for commit 06fa934 succeeded on November 1, 2026.", "The README does not provide a consolidated recent browser/accessibility test report."]
    },
    references: [
      { label: { fa: "README و workflow آزمایشگاه", en: "README and lab workflow" }, url: "https://github.com/pooya-labs/lumina-glass/blob/main/README.md" },
      { label: { fa: "انتشار Pages", en: "Pages deployment" }, url: "https://github.com/pooya-labs/lumina-glass/actions/runs/41255800771" }
    ]
  },
  "aura-pulse": {
    role: { fa: "README، پویا را نویسنده پروژه معرفی می‌کند.", en: "The README identifies Pooya as the author." },
    architecture: { fa: "داشبورد static بر پایه Next.js 16، React 19 و TypeScript؛ ticker عمومی در صورت دسترسی مرورگر از Binance می‌آید و chart/paper trading در مرورگر محاسبه می‌شود. حساب آزمایشی در localStorage ذخیره می‌شود.", en: "A static dashboard built with Next.js 16, React 19, and TypeScript; public tickers come from Binance when reachable, while charts and paper-trading run in-browser. The demo account is stored in localStorage." },
    implementation: {
      fa: ["tickerهای ۲۴ ساعته BTC، ETH و SOL از Binance در صورت دسترسی.", "وضعیت اتصال روشن و fallback برچسب‌خورده؛ NVDA/AI نماد مصنوعی demo است.", "تعویض symbol و interval، candlestick و indicatorهای SVG.", "شبیه‌سازی buy/sell، average entry، position valuation و realized/unrealized P&L.", "کارمزد فرضی ۰٫۱۰٪، history و balance محلی و reset demo account."],
      en: ["24-hour BTC, ETH, and SOL tickers from Binance when reachable.", "Explicit connection state and labelled fallback; NVDA/AI is a synthetic demo symbol.", "Symbol/interval switching, candlesticks, and SVG indicators.", "Simulated buy/sell, average entry, position valuation, and realized/unrealized P&L.", "Illustrative 0.10% fee, local history/balance, and demo-account reset."]
    },
    decisions: {
      fa: ["API key صرافی دریافت نمی‌شود و سفارش واقعی ارسال نمی‌شود.", "candle history، order-book depth، pressure و AI-style markers ممکن است illustrative باشند.", "حساب به همین browser/device محدود است؛ پاک‌کردن storage یا عوض‌کردن دستگاه حساب تازه می‌سازد."],
      en: ["No exchange API key is requested and no real order is sent.", "Candle history, order-book depth, pressure, and AI-style markers may be illustrative.", "The account is browser/device-local; clearing storage or switching devices creates a new account."]
    },
    verification: {
      fa: ["انتشار Pages روی commit 7f3611c در ۱ نوامبر ۲۰۲۶ موفق بود.", "README گزارش تجمیعی جدیدی از آزمون‌های chart، paper-trading و accessibility ندارد."],
      en: ["Pages deployment for commit 7f3611c succeeded on November 1, 2026.", "The README does not contain a consolidated recent chart, paper-trading, and accessibility test report."]
    },
    references: [
      { label: { fa: "README و مرز داده بازار", en: "README and market-data boundaries" }, url: "https://github.com/pooya-labs/aurapulse/blob/main/README.md" },
      { label: { fa: "انتشار Pages", en: "Pages deployment" }, url: "https://github.com/pooya-labs/aurapulse/actions/runs/41255787297" }
    ]
  },
  "global-cart": {
    role: { fa: "README، پویا را Owner و Product Engineer معرفی می‌کند.", en: "The README identifies Pooya as owner and product engineer." },
    architecture: { fa: "Frontend Next.js 15/React 19/TypeScript روی Pages به‌صورت static منتشر می‌شود. دو جریان کاتالوگ جدا هستند: snapshot محلی ۱۰۰۰ محصول ABO با گالری WebP self-hosted، و discovery زمان‌اجرا از Shopify Global Catalog از مسیر Worker محدود و no-store که نتیجه/تصویر را ذخیره نمی‌کند. Go REST/OpenAPI و PostgreSQL 17 با migration و sqlc برای local development/CI است، نه backend production میزبانی‌شده.", en: "The Next.js 15/React 19/TypeScript frontend is static on Pages. Two catalog paths are distinct: a local 1,000-item ABO snapshot with self-hosted WebP galleries, and runtime discovery through Shopify Global Catalog via a constrained no-store Worker that does not persist results/images. Go REST/OpenAPI and PostgreSQL 17 with migrations/sqlc support local development/CI, not hosted production."
    },
    implementation: {
      fa: ["Category mega-menu، search، filter، sort، quick view، favorites، recently viewed و مقایسه تا چهار کالا.", "صفحات static جزئیات محصول و gallery چندتصویری با thumbnail و کنترل قبلی/بعدی.", "در ABO، sale price/rating/stock که منبع فراهم نمی‌کند unavailable می‌ماند؛ مقدار ساختگی درج نمی‌شود.", "در Shopify، نام فروشنده، listing URL و price/availability ارائه‌شده توسط فروشنده حفظ می‌شوند.", "cart، checkout، order و return/refund صرفاً شبیه‌سازی یا local هستند.", "قیمت‌گذاری decimal-safe و نرخ USD منبع TGJU با تبدیل Rial به Toman و برچسب freshness.", "Backend محلی با Go، PostgreSQL، ۲۷ جدول، OpenAPI و sqlc؛ APIهای عمومی موجود read-only هستند."],
      en: ["Category mega-menu, search, filters, sort, quick view, favorites, recently viewed, and comparison for up to four products.", "Static product detail pages and multi-image galleries with thumbnails and previous/next controls.", "For ABO, absent sale-price/rating/stock fields remain unavailable; no fabricated values.", "For Shopify, seller name, listing URL, and seller-provided price/availability remain visible.", "Cart, checkout, orders, and returns/refunds are simulated or local only.", "Decimal-safe pricing and TGJU USD rate normalized from Rial to Toman with freshness labels.", "Local Go/PostgreSQL backend foundation with 27 tables, OpenAPI, and sqlc; current public APIs are read-only."]
    },
    decisions: {
      fa: ["این نسخه پرداخت، سفارش، رزرو موجودی یا fulfillment واقعی ندارد؛ cart و checkout صرفاً نمایشی‌اند.", "snapshot ABO با attribution و مجوز CC BY 4.0 ارائه می‌شود؛ فیلدهای غایب جعل نمی‌شوند.", "Shopify runtime discovery با سیاست no-cache/no-rehost کار می‌کند؛ seller identity و listing link پنهان نمی‌شود.", "translation خودکار paused است؛ feed جدید نیازمند بررسی حقوق، terms، quality و freshness است.", "Go/PostgreSQL هنوز local/CI است و hosted production API ادعا نمی‌شود."],
      en: ["No real payment, order, inventory reservation, or fulfillment is performed; cart and checkout are simulations.", "The ABO snapshot is attributed under CC BY 4.0; absent fields are not invented.", "Shopify discovery follows no-cache/no-rehost rules; seller identity and listing links remain visible.", "Automatic translation is paused; new feeds require rights, terms, quality, and freshness review.", "Go/PostgreSQL remains local/CI; no hosted production API is claimed."]
    },
    verification: {
      fa: [
        "آخرین وضعیت upstream روی main برابر v0.2.3-dev / M09.8 است؛ HEAD فعلی 9afa4f5d726df51ae4f9b95b30982fb5ecd3482a است. کد برنامه در SHA 6192f8eccdbf8092c31e06a0f37a53485c3e3589 قرار دارد و commit نهایی فقط snapshot کاتالوگ data/catalog.json را ذخیره کرده است.",
        "در commit 6192f8 برای اصلاح نام لینک‌های کارت hero، aria-label صریح حذف شده تا نام از متن قابل‌مشاهده گرفته شود؛ اما Browser E2E جدید نشان می‌دهد نام محاسبه‌شده همچنان خالی است و این اصلاح مشکل را نبسته است.",
        "انتشار GitHub Pages، run 42393544307، و Security، run 42393544310، روی کد برنامه 6192f8 موفق شدند. اجرای Browser E2E، run 42393544303، با 137 passed / 3 failed / 9 skipped پایان یافت.",
        "سه شکست E2E در Chromium mobile رخ داد: دو اسکن axe با اثر serious و rule برابر link-name برای لینک‌های .hero-product-tile، و یک انتظار storefront که نام قابل‌دسترسی لینک کالا را خالی دریافت کرد. لینک‌های hero هنوز برای فناوری‌های کمکی نام قابل‌تشخیص ندارند؛ assertion نباید حذف یا ضعیف شود.",
        "Lighthouse lab run 42393731570، Post-deploy visual QA run 42393731697 و Shopify Catalog Smoke run 42393731548 روی HEAD فعلی 9afa4f5 موفق شدند. اجرای Publish portfolio screenshots، run 42394145400، skip شد.",
        "M09.8 و انتشار 1.0.0 همچنان باز می‌مانند تا accessible name کارت‌ها واقعاً اصلاح و Browser E2E کامل روی SHA جاری سبز شود؛ تأیید تعامل گالری/PDP هر ۱۰۰۰ محصول و بازبینی دستی مالک نیز باقی است.",
        "GlobalCart یک شبیه‌ساز marketplace است، نه فروشگاه واقعی؛ پرداخت، موجودی رزروشده، fulfillment یا فروش واقعی انجام نمی‌دهد. قیمت‌های برآوردی کاتالوگ باید با برچسب تخمینی باقی بمانند."
      ],
      en: [
        "The upstream project remains v0.2.3-dev / M09.8. Current main HEAD is 9afa4f5d726df51ae4f9b95b30982fb5ecd3482a. Application code is at 6192f8eccdbf8092c31e06a0f37a53485c3e3589; the final main commit only persisted the data/catalog.json snapshot.",
        "Commit 6192f8 attempted to fix hero-link names by removing explicit aria-label and relying on visible text. The new Browser E2E run shows the computed accessible name is still empty, so the attempted fix did not close the defect.",
        "GitHub Pages deployment run 42393544307 and Security run 42393544310 passed on application SHA 6192f8. Browser E2E run 42393544303 finished with 137 passed / 3 failed / 9 skipped.",
        "All three E2E failures occurred in Chromium mobile: two serious axe link-name violations on .hero-product-tile links, plus a storefront assertion that received an empty accessible name for a product link. Hero links remain unnamed for assistive technology; do not weaken the assertion.",
        "Lighthouse lab run 42393731570, post-deploy visual QA run 42393731697, and Shopify Catalog Smoke run 42393731548 passed on current main. Publish portfolio screenshots run 42394145400 was skipped.",
        "M09.8 and the 1.0.0 release remain open until hero links have real accessible names and full Browser E2E passes on current SHA. Verification of all 1,000 gallery/PDP interactions and owner manual review also remain open.",
        "GlobalCart is a marketplace simulation, not a live retailer; no real payments, inventory reservation, fulfillment, or sales occur. Estimated catalog prices must remain clearly labeled as estimates."
      ]
    },
    references: [
      { label: { fa: "کامیت تلاش برای اصلاح نام لینک‌های hero", en: "Attempted hero-link accessible-name fix commit" }, url: "https://github.com/pooya-labs/globalcart/commit/6192f8eccdbf8092c31e06a0f37a53485c3e3589" },
      { label: { fa: "README و وضعیت", en: "README and status" }, url: "https://github.com/pooya-labs/globalcart/blob/main/README.md" },
      { label: { fa: "PROJECT_CONTEXT", en: "PROJECT_CONTEXT" }, url: "https://github.com/pooya-labs/globalcart/blob/main/PROJECT_CONTEXT.md" },
      { label: { fa: "Architecture", en: "Architecture" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/ARCHITECTURE.md" },
      { label: { fa: "Data sources", en: "Data sources" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/DATA_SOURCES.md" },
      { label: { fa: "Real catalog migration", en: "Real catalog migration" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/REAL_CATALOG_MIGRATION.md" },
      { label: { fa: "تصاویر واقعی رابط دسکتاپ و موبایل", en: "Actual desktop and mobile UI screenshots" }, url: "https://github.com/pooya-labs/globalcart/tree/5ca43e40ff101e673ee7cf261850bff0a679047c/docs/screenshots" },
      { label: { fa: "Database ERD", en: "Database ERD" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/DATABASE_ERD.md" },
      { label: { fa: "HEAD فعلی main", en: "Current main HEAD" }, url: "https://github.com/pooya-labs/globalcart/commit/9afa4f5d726df51ae4f9b95b30982fb5ecd3482a" },
      { label: { fa: "انتشار Pages و smoke", en: "Pages deploy and smoke" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42393544307" },
      { label: { fa: "Security scan", en: "Security scan" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42393544310" },
      { label: { fa: "Browser E2E — ۳ شکست نام قابل‌دسترسی", en: "Browser E2E — three accessible-name failures" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42393544303" },
      { label: { fa: "Lighthouse lab budget", en: "Lighthouse lab budget" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42393731570" },
      { label: { fa: "Post-deploy image QA", en: "Post-deploy image QA" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42393731697" },
      { label: { fa: "Shopify catalog smoke", en: "Shopify catalog smoke" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42393731548" },
      { label: { fa: "انتشار قبلی / snapshot persistence", en: "Previous deployment / snapshot persistence" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42387896585" },
      { label: { fa: "Shopify smoke", en: "Shopify smoke" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42054988648" },
      { label: { fa: "Browser E2E", en: "Browser E2E" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42054626880" }
    ]
  },
  "salon-booking": {
    role: { fa: "README، پویا را مهندس/سازنده و مالک سالن را صاحب محصول معرفی می‌کند.", en: "The README identifies Pooya as engineer/creator and the salon owner as product owner." },
    architecture: { fa: "GitHub Pages، React/TypeScript/Vite را سرو می‌کند. درخواست‌های same-origin از hidden iframe به bridge Apps Script و google.script.run می‌روند؛ Apps Script منطق API و Google Sheets خصوصی داده را نگه می‌دارند. Firebase Cloud Messaging برای push مدیر است؛ email اختیاری خاموش است. Worker/D1 قدیمی در مسیر فعال نیست و فقط recovery material باقی مانده.", en: "GitHub Pages serves React/TypeScript/Vite. Same-origin requests pass through a hidden iframe to the Apps Script bridge and google.script.run; Apps Script runs API logic and private Google Sheets stores records. Firebase Cloud Messaging supports manager push; optional email is off. The old Worker/D1 is not active and remains only as recovery material." },
    implementation: {
      fa: ["service catalog و availability بر اساس duration، ساعات هفتگی، استثناها، timezone، buffer و رزروهای فعال.", "تقویم Jalali با timezone سالن Asia/Tehran و ذخیره زمان UTC.", "booking با Idempotency-Key، recheck/write زیر LockService، reference code و customer management token یک‌بارمصرف.", "lookup/cancel مشتری با reference و proof-of-possession؛ اطلاعات تماس به API عمومی برگردانده نمی‌شود.", "پنل مالک: sign-in، رزروها، confirm/cancel/complete/no-show، خدمات/قیمت، ساعات چندبازه‌ای، date exceptions و TimeBlocks.", "AuditLog، IP-HMAC rate limit، hash کردن token/session و session چرخشی ۳۰روزه با logout revocation.", "push مدیر از FCM پس از config/device registration؛ ایمیل پیش‌فرض خاموش."],
      en: ["Service catalog and availability from duration, weekly hours, exceptions, timezone, buffer, and active bookings.", "Jalali calendar in salon timezone Asia/Tehran with UTC persistence.", "Booking with Idempotency-Key, LockService-protected recheck/write, reference code, and one-time customer-management token.", "Customer lookup/cancel using reference and proof-of-possession; public API does not return contact details.", "Owner panel: sign-in, bookings, confirm/cancel/complete/no-show, services/prices, multi-interval hours, date exceptions, and TimeBlocks.", "AuditLog, IP-HMAC rate limits, hashed token/session, rolling 30-day sessions, and logout revocation.", "Manager push through FCM after configuration/device registration; email is off by default."]
    },
    decisions: {
      fa: ["Cloudflare/D1 دیگر مسیر فعال نیست؛ داده قدیمی بدون تصمیم مالک حذف/منتقل نمی‌شود.", "نسخه محصول ۱٫۰٫۰ با پذیرش مالک منتشر شده است؛ تنظیمات عملیاتی و داده‌های واقعی مشتریان در اختیار مالک سالن باقی می‌مانند.", "timezone، ساعت کاری، خدمات و قیمت باید توسط صاحب سالن تأیید شوند.", "داده مشتری در screenshot یا پورتفولیو منتشر نمی‌شود."],
      en: ["Cloudflare/D1 is no longer active; legacy data is not deleted/migrated without owner approval.", "Product v1.0.0 was owner-accepted; operational settings and real customer records remain under the salon owner’s control.", "Timezone, hours, services, and prices must be approved by the salon owner.", "Customer data must not appear in screenshots or the portfolio."]
    },
    verification: {
      fa: [
        "نسخه محصول ۱٫۰٫۰ در ۵ نوامبر ۲۰۲۶ با تأیید مالک منتشر شد؛ تگ رسمی v1.0.0 موجود است.",
        "سورس Apps Script مقدار APP_VERSION_ = 1.5.3 را گزارش می‌کند؛ این شماره با نسخه محصول ۱٫۰٫۰ متفاوت است.",
        "CI نسخه نهایی روی commit 56ff5cde با run 42086718663 موفق شد؛ GitHub Pages و read-only relay smoke نیز روی همان commit در run 42086718821 موفق بودند.",
        "main فعلی روی SHA 4c4840c639da099379e8f65b387b1589685c6afd قرار دارد؛ چهار commit بعد از release checkpoint فقط README، ROADMAP.md، docs/DEPLOYMENT.md و docs/PROJECT-STATE.md را تغییر داده‌اند. مستندات جدید می‌گویند پذیرش deployment در Apps Script انجام شده و Worker/D1 قدیمی فقط recovery archive است و نباید دوباره ترافیک production بگیرد.",
        "CI روی SHA فعلی، run 42394326231، قرمز است: آزمون owner-dashboard date-range روی Linux و Windows انتظار 2026-11-06 را داشت، اما مقدار واقعی 2026-11-08 برای slot ساعت 11:00 با duration برابر 15 دقیقه بود. lint، unit، migration، typecheck/build، responsive/RTL/keyboard و اسکن‌های axe پنل‌ها موفق شدند؛ شکست فعلی به آزمون بازه‌تاریخ محدود است و باید clock/fixture آن هم‌تراز شود.",
        "Workflow انتشار Pages، run 42394326440، روی SHA فعلی موفق شد. این نتیجه، شکست آزمون بازه‌تاریخ را نادیده نمی‌گیرد و جایگزین CI سبز نیست.",
        "مالک پذیرش مسیر عملیاتی و تنظیمات سالن را ثبت کرده است؛ انتشار case study همچنان نیازمند اجازه جداگانه مالک سالن و اسکرین‌شات synthetic یا کاملاً redacted است."
      ],
      en: [
        "Product v1.0.0 was released and owner-accepted on November 5, 2026; the official v1.0.0 tag is published.",
        "The Apps Script source reports APP_VERSION_ = 1.5.3; this is distinct from product version 1.0.0.",
        "Release CI passed on commit 56ff5cde in run 42086718663; GitHub Pages and the read-only relay smoke passed on the same commit in run 42086718821.",
        "Current main is 4c4840c639da099379e8f65b387b1589685c6afd. Four commits after the release checkpoint changed only README, ROADMAP.md, docs/DEPLOYMENT.md, and docs/PROJECT-STATE.md. The updated deployment documentation records Apps Script deployment acceptance and states that the old Worker/D1 is archival recovery material only, never a production traffic path.",
        "CI on current SHA, run 42394326231, is red: the owner-dashboard date-range test failed on both Linux and Windows. It expected 2026-11-06 but received 2026-11-08 for an 11:00 / 15-minute slot. Lint, unit, migration, typecheck/build, responsive/RTL/keyboard checks, and owner-panel axe scans passed; the current failure is isolated to the date-range assertion and its clock/fixture alignment needs investigation.",
        "The Pages deployment workflow, run 42394326440, succeeded on current SHA. This does not erase the date-range CI failure or make current CI green.",
        "The owner has recorded operational and salon-configuration acceptance; portfolio publication still requires separate salon-owner permission and synthetic or fully redacted screenshots."
      ]
    },
    references: [
      { label: { fa: "README و معماری", en: "README and architecture" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/README.md" },
      { label: { fa: "API", en: "API" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/API.md" },
      { label: { fa: "Project state", en: "Project state" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/PROJECT-STATE.md" },
      { label: { fa: "Deployment", en: "Deployment" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/DEPLOYMENT.md" },
      { label: { fa: "Roadmap", en: "Roadmap" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/ROADMAP.md" },
      { label: { fa: "HEAD فعلی main", en: "Current main HEAD" }, url: "https://github.com/pooya-labs/salon-booking/commit/4c4840c639da099379e8f65b387b1589685c6afd" },
      { label: { fa: "CI جاری — شکست date-range", en: "Current CI — date-range assertion failure" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42394326231" },
      { label: { fa: "انتشار Pages روی HEAD جاری", en: "Pages deployment on current HEAD" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42394326440" },
      { label: { fa: "انتشار رسمی نسخه ۱٫۰٫۰", en: "Official v1.0.0 release" }, url: "https://github.com/pooya-labs/salon-booking/releases/tag/v1.0.0" },
      { label: { fa: "CI نسخه ۱٫۰٫۰", en: "v1.0.0 CI" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42086718663" },
      { label: { fa: "انتشار Pages و smoke relay", en: "Pages deployment and relay smoke" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42086718821" }
    ]
  }
} as const;
