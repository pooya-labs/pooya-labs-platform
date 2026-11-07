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
      fa: ["آخرین وضعیت upstream روی main برابر v0.2.3-dev / M09.8 است؛ HEAD فعلی 119afcd4924fbdda0287558d00926ab051255e59 فقط snapshot فایل data/catalog.json را نسبت به کد برنامه 61ce7f5 به‌روزرسانی کرده است. انتشار 1.0.0 هنوز مسدود است.", "Pages build/deploy و public smoke، run 42392071302، روی کد برنامه 61ce7f5 موفق شدند؛ Security run 42392071307 نیز روی همان SHA موفق بود.", "Browser E2E run 42392071315 روی همان درخت کد برنامه با 134 passed / 6 failed / 9 skipped پایان یافت. تمام شش شکست از دو آزمون دسترس‌پذیری در سه مرورگر Chromium، Firefox و WebKit می‌آیند: axe rule با اثر serious به نام label-content-name-mismatch، چون متن قابل‌مشاهده کارت‌های hero-product-tile در accessible name آن‌ها وارد نشده است. همین کارت‌ها هنگام بازبودن command palette نیز در صفحه باقی می‌مانند و همان تخلف را ایجاد می‌کنند؛ این یک ایراد واقعی در دسترس‌پذیری است و نباید با حذف assertion پنهان شود.", "مقایسه SHA برنامه 61ce7f5 با HEAD 119afcd نشان می‌دهد تنها data/catalog.json تغییر کرده؛ بنابراین نتیجه E2E همچنان نماینده کد برنامه فعلی است، اما باید پس از اصلاح accessible nameها دوباره اجرا شود.", "Lighthouse lab run 42392214241 هر شش بودجه route/mode را پاس کرد. خانه موبایل Performance=92، LCP=2.5s و TBT=260ms داشت؛ Accessibility، Best Practices و SEO در شش گزارش 100 بودند. این ارقام آزمایش GitHub-hosted هستند، نه field Core Web Vitals.", "Post-deploy visual QA run 42392214297 دو بررسی تصویر دسکتاپ/موبایل را پاس و دو مورد دیگر را skip کرد؛ Shopify Catalog Smoke run 42392214325 نیز موفق شد. این‌ها روی SHA 119afcd اجرا شدند.", "M09.8 تا اجرای مجدد کامل Browser E2E + axe و رفع تخلف نام قابل‌دسترسی، تأیید گالری ۱۰۰۰ محصول و تعامل PDP روی SHA جاری، بررسی دستی و تأیید چشمی مالک باز می‌ماند.", "manual screen-reader، دستگاه فیزیکی، RTL/LTR انسانی و شبکه عادی/field QA همچنان release gate هستند."],
      en: ["The latest upstream main is v0.2.3-dev / M09.8. HEAD 119afcd4924fbdda0287558d00926ab051255e59 only updates data/catalog.json relative to application-code SHA 61ce7f5; the 1.0.0 release remains blocked.", "Pages build/deploy and public smoke run 42392071302 passed on application SHA 61ce7f5; Security run 42392071307 also passed on that SHA.", "Browser E2E run 42392071315 on the same application tree finished with 134 passed / 6 failed / 9 skipped. All six failures came from two accessibility tests across Chromium, Firefox, and WebKit: serious axe rule label-content-name-mismatch because visible text in hero-product-tile cards is not included in their accessible names. The same hero cards remain in the page behind the open command palette, so the palette accessibility scan reports the same violation. This is a real accessibility defect and must not be hidden by removing the assertion.", "A comparison of app SHA 61ce7f5 with HEAD 119afcd shows only data/catalog.json changed; the E2E result therefore still represents the current application code, but must be rerun after fixing accessible names.", "Lighthouse lab run 42392214241 passed all six route/mode budgets. Home-mobile scored Performance 92, LCP 2.5 s and TBT 260 ms; Accessibility, Best Practices and SEO scored 100 in all six reports. These are GitHub-hosted lab readings, not field Core Web Vitals.", "Post-deploy visual QA run 42392214297 passed two desktop/mobile image checks and skipped two unavailable cases; Shopify Catalog Smoke run 42392214325 also passed. These checks ran on SHA 119afcd.", "M09.8 remains open until a full Browser E2E + axe rerun passes after the accessible-name fix, all 1,000 galleries and PDP interactions are verified on current SHA, and owner visual/manual review is complete.", "Manual screen-reader, physical-device, human RTL/LTR, and ordinary-network/field QA remain release gates."]
    },
    references: [
      { label: { fa: "README و وضعیت", en: "README and status" }, url: "https://github.com/pooya-labs/globalcart/blob/main/README.md" },
      { label: { fa: "PROJECT_CONTEXT", en: "PROJECT_CONTEXT" }, url: "https://github.com/pooya-labs/globalcart/blob/main/PROJECT_CONTEXT.md" },
      { label: { fa: "Architecture", en: "Architecture" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/ARCHITECTURE.md" },
      { label: { fa: "Data sources", en: "Data sources" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/DATA_SOURCES.md" },
      { label: { fa: "Real catalog migration", en: "Real catalog migration" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/REAL_CATALOG_MIGRATION.md" },
      { label: { fa: "تصاویر واقعی رابط دسکتاپ و موبایل", en: "Actual desktop and mobile UI screenshots" }, url: "https://github.com/pooya-labs/globalcart/tree/5ca43e40ff101e673ee7cf261850bff0a679047c/docs/screenshots" },
      { label: { fa: "Database ERD", en: "Database ERD" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/DATABASE_ERD.md" },
      { label: { fa: "HEAD فعلی main", en: "Current main HEAD" }, url: "https://github.com/pooya-labs/globalcart/commit/119afcd4924fbdda0287558d00926ab051255e59" },
      { label: { fa: "انتشار Pages و smoke", en: "Pages deploy and smoke" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42392071302" },
      { label: { fa: "Security scan", en: "Security scan" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42392071307" },
      { label: { fa: "Browser E2E — ۶ شکست دسترس‌پذیری", en: "Browser E2E — six accessibility failures" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42392071315" },
      { label: { fa: "Lighthouse lab budget", en: "Lighthouse lab budget" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42392214241" },
      { label: { fa: "Post-deploy image QA", en: "Post-deploy image QA" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42392214297" },
      { label: { fa: "Shopify catalog smoke", en: "Shopify catalog smoke" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42392214325" },
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
      fa: ["نسخه محصول ۱٫۰٫۰ در ۵ نوامبر ۲۰۲۶ با تأیید مالک منتشر شد؛ تگ رسمی v1.0.0 موجود است.", "سورس Apps Script مقدار APP_VERSION_ = 1.5.3 را گزارش می‌کند؛ این شماره با نسخه محصول ۱٫۰٫۰ متفاوت است.", "CI نسخه نهایی روی commit 56ff5cde با run 42086718663 موفق شد.", "GitHub Pages روی همان commit با run 42086718821 موفق شد؛ smoke زنده و read-only مربوط به relay نیز در همان workflow ثبت شده است.", "مالک پذیرش مسیر عملیاتی، تنظیمات سالن و اعلان مدیر را در release record تأیید کرده است؛ تصویر عمومی همچنان نیازمند redaction و اجازه انتشار است."],
      en: ["Product v1.0.0 was released and owner-accepted on November 5, 2026; the official v1.0.0 tag is published.", "The Apps Script source reports APP_VERSION_ = 1.5.3; this is distinct from product version 1.0.0.", "CI passed on final release commit 56ff5cde in run 42086718663.", "GitHub Pages passed on the same commit in run 42086718821; the workflow also recorded a live, read-only relay smoke.", "The owner confirmed operational setup, salon configuration, and manager notifications in the release record; public screenshots still require redaction and publication permission."],
    },
    references: [
      { label: { fa: "README و معماری", en: "README and architecture" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/README.md" },
      { label: { fa: "API", en: "API" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/API.md" },
      { label: { fa: "Project state", en: "Project state" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/PROJECT-STATE.md" },
      { label: { fa: "Deployment", en: "Deployment" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/DEPLOYMENT.md" },
      { label: { fa: "Roadmap", en: "Roadmap" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/ROADMAP.md" },
      { label: { fa: "انتشار رسمی نسخه ۱٫۰٫۰", en: "Official v1.0.0 release" }, url: "https://github.com/pooya-labs/salon-booking/releases/tag/v1.0.0" },
      { label: { fa: "CI نسخه ۱٫۰٫۰", en: "v1.0.0 CI" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42086718663" },
      { label: { fa: "انتشار Pages و smoke relay", en: "Pages deployment and relay smoke" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42086718821" }
    ]
  }
} as const;
