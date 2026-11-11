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
        "نسخه پایدار GlobalCart v1.0.0 در ۸ نوامبر ۲۰۲۶ منتشر شده و tag آن به commit dfe9a98c70a9bbde3f5444c6f2cad2abd74269ac اشاره می‌کند.",
        "workflow انتشار v1.0.0، run 42494416761، پس از TypeScript، unit tests، build، Browser Playwright/axe با ۱۵۱ موفق، ۹ مورد skip عمدی و صفر شکست، secret scan و route smoke انتشار را انجام داد.",
        "Browser E2E روی main پس از انتشار، run 42516946135، با ۱۶۳ موفق، ۹ مورد skip عمدی و صفر شکست پایان یافت.",
        "Lighthouse run 42517087881 شش گزارش route/mode را تأیید کرد: امتیاز Performance موبایل صفحه اصلی ۹۶، محصول ۹۶ و مطالعه موردی ۹۹؛ دسکتاپ هر سه ۱۰۰. Accessibility، Best Practices و SEO در همه گزارش‌ها ۱۰۰ و CLS برابر صفر بود.",
        "Security run 42518528453، Pages run 42518528466، بررسی زنده دسکتاپ/موبایل run 42518731820 و Shopify Catalog Smoke run 42518731796 موفق شدند.",
        "مالک در ۸ نوامبر مرور واقعی دسکتاپ/موبایل، بررسی screen reader و مرور RTL/LTR را تأیید کرد. گزارش‌های آزمایشگاهی جایگزین Core Web Vitals واقعی کاربران نیستند.",
        "GlobalCart شبیه‌ساز marketplace است، نه فروشگاه زنده: سفارش، پرداخت، رزرو موجودی، ارسال، تسویه فروشنده یا بازپرداخت واقعی انجام نمی‌شود؛ قیمت‌های کاتالوگ تخمینی‌اند."
      ],
      en: [
        "GlobalCart stable v1.0.0 was released on November 8, 2026; its tag points to dfe9a98c70a9bbde3f5444c6f2cad2abd74269ac.",
        "The v1.0.0 release workflow, run 42494416761, published after TypeScript, unit tests, production build, Playwright/axe browser checks (151 passed, 9 intentional skips, 0 failed), secret scan, and route smoke.",
        "Post-release mainline Browser E2E, run 42516946135, completed with 163 passed, 9 intentional skips, and 0 failed.",
        "Lighthouse run 42517087881 passed six route/mode reports: mobile Performance 96 (home), 96 (product), and 99 (case study); all three desktop reports scored 100. Accessibility, Best Practices, and SEO scored 100 in every report, with CLS 0 throughout.",
        "Security run 42518528453, Pages run 42518528466, live desktop/mobile QA run 42518731820, and Shopify Catalog Smoke run 42518731796 passed.",
        "On November 8, the owner confirmed real desktop/mobile review, an actual screen-reader pass, and full human RTL/LTR review. Lab reports are not real-user Core Web Vitals.",
        "GlobalCart is a marketplace simulation, not a live retailer: it does not process real orders, payments, inventory reservations, shipping, seller payouts, or refunds; catalog prices are estimates."
      ]
    },
    
    references: [
      { label: { fa: "انتشار رسمی نسخه ۱٫۰٫۰", en: "Official v1.0.0 release" }, url: "https://github.com/pooya-labs/globalcart/releases/tag/v1.0.0" },
      { label: { fa: "گزارش انتشار v1.0.0", en: "v1.0.0 release workflow" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42494416761" },
      { label: { fa: "Browser E2E پس از انتشار", en: "Post-release Browser E2E" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42516946135" },
      { label: { fa: "Lighthouse شش گزارش", en: "Six Lighthouse reports" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42517087881" },
      { label: { fa: "Security", en: "Security" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42518528453" },
      { label: { fa: "انتشار Pages", en: "Pages deployment" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42518528466" },
      { label: { fa: "بررسی زنده دسکتاپ و موبایل", en: "Live desktop/mobile QA" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42518731820" },
      { label: { fa: "Shopify Catalog Smoke", en: "Shopify Catalog Smoke" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42518731796" },
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
    architecture: { fa: "وب‌سایت GitHub Pages با React/TypeScript/Vite منتشر می‌شود و درخواست‌ها از hidden iframe و bridge به Google Apps Script می‌رسند؛ Google Sheets خصوصی منبع داده است. Firebase Cloud Messaging اعلان مدیر را فراهم می‌کند. اپ Android با Kotlin همان Apps Script API، نشست مدیر، Sheet خصوصی و Firebase موجود را استفاده می‌کند؛ Worker/D1 قدیمی در مسیر فعال نیست و فقط recovery material است.", en: "The GitHub Pages website uses React/TypeScript/Vite, with requests routed through a hidden iframe bridge to Google Apps Script and private Google Sheets. Firebase Cloud Messaging delivers manager notifications. The Kotlin Android companion reuses the same Apps Script API, manager session, private Sheet, and existing Firebase project; the old Worker/D1 is archival recovery material only." },
    implementation: {
      fa: ["service catalog و availability بر اساس duration، ساعات هفتگی، استثناها، timezone، buffer و رزروهای فعال.", "تقویم Jalali با timezone سالن Asia/Tehran و ذخیره زمان UTC.", "booking با Idempotency-Key، recheck/write زیر LockService، reference code و customer management token یک‌بارمصرف.", "lookup/cancel مشتری با reference و proof-of-possession؛ اطلاعات تماس به API عمومی برگردانده نمی‌شود.", "پنل مالک: sign-in، رزروها، confirm/cancel/complete/no-show، خدمات/قیمت، ساعات چندبازه‌ای، date exceptions و TimeBlocks.", "AuditLog، IP-HMAC rate limit، hash کردن token/session و session چرخشی ۳۰روزه با logout revocation.", "push مدیر از FCM پس از config/device registration؛ ایمیل پیش‌فرض خاموش.", "اپ اندروید مدیر با تقویم هفتگی، time-block شمسی، سه حالت System/Light/Dark، اعلان بومی و ورود سریع زیست‌سنجی با Android Keystore."],
      en: ["Service catalog and availability from duration, weekly hours, exceptions, timezone, buffer, and active bookings.", "Jalali calendar in salon timezone Asia/Tehran with UTC persistence.", "Booking with Idempotency-Key, LockService-protected recheck/write, reference code, and one-time customer-management token.", "Customer lookup/cancel using reference and proof-of-possession; public API does not return contact details.", "Owner panel: sign-in, bookings, confirm/cancel/complete/no-show, services/prices, multi-interval hours, date exceptions, and TimeBlocks.", "AuditLog, IP-HMAC rate limits, hashed token/session, rolling 30-day sessions, and logout revocation.", "Manager push through FCM after configuration/device registration; email is off by default.", "Native Android manager app with weekly calendar, Jalali time blocks, System/Light/Dark themes, native notifications, and Android Keystore-backed biometric quick sign-in."]
    },
    decisions: {
      fa: ["Cloudflare/D1 دیگر مسیر فعال نیست؛ داده قدیمی بدون تصمیم مالک حذف/منتقل نمی‌شود.", "نسخه محصول ۱٫۰٫۰ با پذیرش مالک منتشر شده است؛ تنظیمات عملیاتی و داده‌های واقعی مشتریان در اختیار مالک سالن باقی می‌مانند.", "timezone، ساعت کاری، خدمات و قیمت باید توسط صاحب سالن تأیید شوند.", "داده مشتری در screenshot یا پورتفولیو منتشر نمی‌شود."],
      en: ["Cloudflare/D1 is no longer active; legacy data is not deleted/migrated without owner approval.", "Product v1.0.0 was owner-accepted; operational settings and real customer records remain under the salon owner’s control.", "Timezone, hours, services, and prices must be approved by the salon owner.", "Customer data must not appear in screenshots or the portfolio."]
    },
    verification: {
      fa: [
        "نسخه محصول ۱٫۰٫۰ در ۵ نوامبر ۲۰۲۶ منتشر و توسط مالک سالن پذیرفته شد.",
        "Apps Script نسخه ۱٫۵٫۵ منتشر شده و آدرس فعال Web App با /exec قبلی حفظ شده است؛ Google Sheets خصوصی همچنان منبع داده رزروهاست.",
        "Firebase در پروژه موجود پیکربندی شده است. workflow اندروید run 42820405938 شامل source-contract tests، پردازش Google Services، آزمون‌های Kotlin و ساخت APK موفق شد؛ CI لینوکس/ویندوز run 42820405870 نیز موفق بود.",
        "اپ اندروید Shayan Barber Studio نسخه ۱٫۲٫۰ به‌صورت GitHub prerelease با APK امضاشدهٔ debug منتشر شده است؛ کلید امضای تولیدی هنوز تنظیم نشده و این فایل انتشار فروشگاهی محسوب نمی‌شود.",
        "آزمون‌های فیزیکی قبلی ورود مدیر و دریافت اعلان در حالت foreground، پس از بستن برنامه از Recents و پس از reboot را تأیید کرده‌اند؛ بررسی نهایی تغییرات جدید تقویم، ورود زیست‌سنجی و حالت‌های ظاهری هنوز نیازمند پذیرش مالک است.",
        "سامانه وب نسخه ۱٫۰٫۰ تکمیل و پذیرفته شده است. اپ همراه Android یک انتشار prerelease جداگانه دارد و محدودیت امضای تولیدی آن باید شفاف بماند.",
        "انتشار مطالعه موردی همچنان تابع اجازه مستقل مالک سالن است؛ هیچ اطلاعات شخصی یا رکورد مشتری نباید در تصاویر عمومی نمایش داده شود."
      ],
      en: [
        "Product v1.0.0 was released and accepted by the salon owner on November 5, 2026.",
        "Apps Script source 1.5.5 was published while preserving the existing active /exec Web App URL; the private Google Sheet remains the booking data store.",
        "Firebase was configured in the existing project. Android workflow run 42820405938 passed source-contract tests, Google Services processing, Kotlin tests, and APK assembly; Linux/Windows CI run 42820405870 also passed.",
        "Shayan Barber Studio Android v1.2.0 is published as a GitHub prerelease with a debug-signed APK; a production signing key is not configured and this is not a store-signed release.",
        "Earlier physical checks confirmed manager sign-in and notification delivery in the foreground, after dismissing the app from Recents, and after reboot. Final owner acceptance of the latest calendar, biometric sign-in, and appearance changes remains pending.",
        "The web product v1.0.0 is complete and accepted. The Android companion has a separate prerelease state and its production-signing limitation remains explicit.",
        "Case-study publication still requires separate salon-owner permission; no personal information or customer records may appear in public imagery."
      ]
    },
    
    references: [
      { label: { fa: "README وب و معماری", en: "Web README and architecture" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/README.md" },
      { label: { fa: "راهنمای اپ اندروید", en: "Android manager app guide" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/android/README.md" },
      { label: { fa: "پیش‌انتشار Android v1.2.0", en: "Android v1.2.0 prerelease" }, url: "https://github.com/pooya-labs/salon-booking/releases/tag/v1.2.0" },
      { label: { fa: "ساخت APK و آزمون Android", en: "Android APK build and tests" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42820405938" },
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
