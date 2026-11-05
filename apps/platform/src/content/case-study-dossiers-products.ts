import type { CaseStudyDossier } from './case-study-dossiers-types';

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
  aurapulse: {
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
      fa: ["فروشگاه زنده نیست و checkout سفارش واقعی نمی‌سازد یا stock فروشنده را رزرو نمی‌کند.", "snapshot ABO با attribution و مجوز CC BY 4.0 ارائه می‌شود؛ فیلدهای غایب جعل نمی‌شوند.", "Shopify runtime discovery با سیاست no-cache/no-rehost کار می‌کند؛ seller identity و listing link پنهان نمی‌شود.", "translation خودکار paused است؛ feed جدید نیازمند بررسی حقوق، terms، quality و freshness است.", "Go/PostgreSQL هنوز local/CI است و hosted production API ادعا نمی‌شود."],
      en: ["This is not a live retailer; checkout does not create real orders or reserve merchant inventory.", "The ABO snapshot is attributed under CC BY 4.0; absent fields are not invented.", "Shopify discovery follows no-cache/no-rehost rules; seller identity and listing links remain visible.", "Automatic translation is paused; new feeds require rights, terms, quality, and freshness review.", "Go/PostgreSQL remains local/CI; no hosted production API is claimed."]
    },
    verification: {
      fa: ["README وضعیت 0.2.3-dev و مرحله M09.6 را نشان می‌دهد؛ 1.0.0 تا تأیید و QA دستی ممنوع است.", "Lighthouse lab run 42054988939 و Shopify Catalog Smoke run 42054988648 روی HEAD فعلی موفق بودند؛ Lighthouse نتایج lab است نه Core Web Vitals میدانی.", "Browser E2E run 42054626880 روی commit پیشین هنگام بررسی هنوز در حال اجرا بود؛ Pages run 42054627186 همان commit پیشین را منتشر کرد.", "manual screen reader، دستگاه فیزیکی، RTL/LTR انسانی و شبکه/field QA همچنان release gate هستند."],
      en: ["The README reports v0.2.3-dev and M09.6; v1.0.0 is blocked by owner approval and manual QA.", "Lighthouse lab run 42054988939 and Shopify Catalog Smoke run 42054988648 passed on current HEAD; lab scores are not field Core Web Vitals.", "Browser E2E run 42054626880 was still in progress on the prior commit when reviewed; Pages run 42054627186 deployed that prior commit.", "Manual screen reader, physical-device, human RTL/LTR, and field-network QA remain release gates."]
    },
    references: [
      { label: { fa: "README و وضعیت", en: "README and status" }, url: "https://github.com/pooya-labs/globalcart/blob/main/README.md" },
      { label: { fa: "PROJECT_CONTEXT", en: "PROJECT_CONTEXT" }, url: "https://github.com/pooya-labs/globalcart/blob/main/PROJECT_CONTEXT.md" },
      { label: { fa: "Architecture", en: "Architecture" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/ARCHITECTURE.md" },
      { label: { fa: "Data sources", en: "Data sources" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/DATA_SOURCES.md" },
      { label: { fa: "Real catalog migration", en: "Real catalog migration" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/REAL_CATALOG_MIGRATION.md" },
      { label: { fa: "Database ERD", en: "Database ERD" }, url: "https://github.com/pooya-labs/globalcart/blob/main/docs/DATABASE_ERD.md" },
      { label: { fa: "Lighthouse lab", en: "Lighthouse lab" }, url: "https://github.com/pooya-labs/globalcart/actions/runs/42054988939" },
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
      fa: ["Cloudflare/D1 دیگر مسیر فعال نیست؛ داده قدیمی بدون تصمیم مالک حذف/منتقل نمی‌شود.", "تا پذیرش relay، نسخه Apps Script و تنظیمات واقعی سالن، demo برای رزرو واقعی نیست.", "timezone، ساعت کاری، خدمات و قیمت باید توسط صاحب سالن تأیید شوند.", "داده مشتری در screenshot یا پورتفولیو منتشر نمی‌شود."],
      en: ["Cloudflare/D1 is no longer active; legacy data is not deleted/migrated without owner approval.", "Until relay, Apps Script version, and real salon configuration are accepted, the demo is not for real bookings.", "Timezone, hours, services, and prices must be approved by the salon owner.", "Customer data must not appear in screenshots or the portfolio."]
    },
    verification: {
      fa: ["نسخه جاری 0.7.0 است؛ backend هدف 1.4.0 با rolling 30-day owner session است.", "CI و Pages برای commit 3d9a7ff هنگام بررسی در صف بودند و موفق فرض نمی‌شوند.", "visual/browser QA قبلی در CI 42013839983 موفق بوده، اما smoke نسخه جدید Apps Script جداست.", "مالک استقرار Web App و SALON_RELAY_URL را گزارش کرده؛ ارتقای 1.4.0، TimeBlocks، bootstrap/login و رزرو end-to-end شواهد جاری می‌خواهند.", "Firebase/FCM، VAPID و push واقعی هنوز باید روی دستگاه مدیر تأیید شوند."],
      en: ["The current release line is 0.7.0; backend target 1.4.0 includes rolling 30-day owner sessions.", "CI and Pages for commit 3d9a7ff were queued when reviewed and are not assumed to have passed.", "Earlier visual/browser QA passed in CI 42013839983, but the new Apps Script version needs a separate smoke test.", "The owner reported Web App deployment and SALON_RELAY_URL setup; v1.4.0, TimeBlocks, bootstrap/login, and end-to-end booking need current evidence.", "Firebase/FCM, VAPID, and real push delivery still need verification on the manager's device."]
    },
    references: [
      { label: { fa: "README و معماری", en: "README and architecture" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/README.md" },
      { label: { fa: "API", en: "API" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/API.md" },
      { label: { fa: "Project state", en: "Project state" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/PROJECT-STATE.md" },
      { label: { fa: "Deployment", en: "Deployment" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/docs/DEPLOYMENT.md" },
      { label: { fa: "Roadmap", en: "Roadmap" }, url: "https://github.com/pooya-labs/salon-booking/blob/main/ROADMAP.md" },
      { label: { fa: "آخرین CI؛ pending هنگام بررسی", en: "Latest CI; pending at review" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42055499309" },
      { label: { fa: "آخرین Pages؛ pending هنگام بررسی", en: "Latest Pages; pending at review" }, url: "https://github.com/pooya-labs/salon-booking/actions/runs/42055499405" }
    ]
  }
} as const;
