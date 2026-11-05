export interface LocalizedText { fa: string; en: string }
export interface CaseStudyReference { label: LocalizedText; url: string }
export interface CaseStudyDossier {
  role: LocalizedText;
  architecture: LocalizedText;
  implementation: { fa: string[]; en: string[] };
  decisions: { fa: string[]; en: string[] };
  verification: { fa: string[]; en: string[] };
  references: CaseStudyReference[];
}

export const coreDossiers = {
  aetherflow: {
    role: { fa: "پروژه در سازمان عمومی Pooya Labs نگه‌داری می‌شود؛ README فعلی نویسنده و تفکیک سهم شخصی را مشخص نکرده است.", en: "Maintained in the public Pooya Labs organization; the current README does not identify an individual author or contribution split." },
    architecture: { fa: "هسته ناهمگام Rust/Tokio و کنترل‌پلین Axum روی PostgreSQL پایدار و NATS JetStream قرار دارند. Outbox/Inbox تحویل حداقل یک‌باره را ممکن می‌کند؛ Wasmtime، CLI، SDK تایپ‌شده Rust، OpenAPI و OpenTelemetry لایه‌های توسعه و عملیات‌اند.", en: "An asynchronous Rust/Tokio core and Axum control plane sit over durable PostgreSQL and NATS JetStream. Outbox/Inbox supports at-least-once delivery; Wasmtime, a CLI, typed Rust SDK, OpenAPI, and OpenTelemetry provide extension and operations layers." },
    implementation: {
      fa: ["چرخه عمر پایدار Workflow/Task، رویدادهای قابل ممیزی و aggregation تراکنشی.", "Workerهای بازیابی‌پذیر با lease، heartbeat، epoch fencing و retry محدود.", "API نسخه‌دار برای workflow، task، worker و tenant؛ ده جدول با FORCE RLS.", "تفکیک نقش migration از runtime و اعتبارنامه‌های operator/tenant.", "لاگ JSON، tracing هم‌بسته، metrics محدود و خروجی اختیاری OTLP."],
      en: ["Durable workflow/task lifecycles, auditable events, and transactional aggregation.", "Recoverable workers with leases, heartbeats, epoch fencing, and bounded retries.", "Versioned workflow/task/worker/tenant API; ten tables with FORCE RLS.", "Separate migration/runtime roles and operator/tenant credentials.", "JSON logs, correlated tracing, bounded metrics, and opt-in OTLP."]
    },
    decisions: {
      fa: ["تضمین at-least-once است، نه exactly-once عمومی؛ اثر جانبی بیرونی به idempotency برنامه نیاز دارد.", "پروژه experimental است؛ Compose و CI به معنی میزبانی production نیستند.", "بنچمارک فقط روی fingerprint منطبق مقایسه می‌شود و SLO تولیدی نیست.", "RPO/RTO، PITR/WAL archive و آزمون‌های عملیاتی بیشتر هنوز باز هستند."],
      en: ["The guarantee is at-least-once, not universal exactly-once; external effects need application-level idempotency.", "The project remains experimental; Compose and CI are not production hosting.", "Benchmarks compare only matching fingerprints and are not production SLOs.", "RPO/RTO, PITR/WAL archiving, and more operational drills remain open."]
    },
    verification: {
      fa: ["M00–M07 کامل‌اند؛ M08 هنوز در جریان است.", "restore-to-runtime در run 41882781118 و API restart در run 42011508896 موفق شدند.", "دو جلسه پنج‌تکراری EPYC 9V45 هرکدام 896 رویداد در هر workload را بدون duplicate/error تطبیق دادند.", "سناریوی in-flight worker هنگام قطعی API، failure injectionهای بیشتر و تأیید comparator روی SHA نهایی بازند."],
      en: ["M00–M07 are complete; M08 remains in progress.", "Restore-to-runtime passed in run 41882781118 and API restart recovery passed in run 42011508896.", "Two five-repeat EPYC 9V45 sessions reconciled 896 events per workload with zero duplicates/errors.", "In-flight worker/API outage, additional failure injections, and final-SHA comparator verification remain open."]
    },
    references: [
      { label: { fa: "README و وضعیت", en: "README and status" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/README.md" },
      { label: { fa: "نقشه راه", en: "Roadmap" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/ROADMAP.md" },
      { label: { fa: "OpenAPI", en: "OpenAPI" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/docs/api/openapi.yaml" },
      { label: { fa: "گزارش بنچمارک", en: "Benchmark report" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/docs/performance/end-to-end-load.md" },
      { label: { fa: "تست API restart", en: "API restart recovery test" }, url: "https://github.com/pooya-labs/aetherflow/actions/runs/42011508896" }
    ]
  },
  orbit: {
    role: { fa: "README، پویا را مالک پروژه و نگه‌دارنده معرفی می‌کند.", en: "The README identifies Pooya as project owner and maintainer." },
    architecture: { fa: "داشبورد Next.js روی Pages به‌صورت static منتشر می‌شود. دمو تعاملی از Apps Script Web App، iframe با origin ثابت و bridge مبتنی بر postMessage/google.script.run استفاده می‌کند و فقط داده مصنوعی را در Spreadsheet خصوصی نگه می‌دارد. stack مهندسی محلی جداگانه شامل Go API، PostgreSQL و OpenTelemetry Collector با Prometheus/Loki/Tempo است.", en: "The Next.js dashboard is static on Pages. The interactive demo uses an Apps Script Web App, fixed-origin iframe, and postMessage/google.script.run bridge, storing synthetic data in a private spreadsheet. A separate local engineering stack uses Go, PostgreSQL, and an OpenTelemetry Collector with Prometheus/Loki/Tempo." },
    implementation: {
      fa: ["ده نما: Overview، Incidents، Alerts، Notifications، Deployments، SLOs، Audit، Metrics، Logs و Traces.", "چرخه عمر incident و timeline، ruleهای alert محدود و SLOهای HTTP success.", "جست‌وجوی محدود و هم‌بسته در telemetry؛ بدون PromQL/LogQL دلخواه.", "فارسی/انگلیسی، RTL، تم روشن/تیره، responsive، صفحه‌کلید و جدول جایگزین chart.", "CI مسیر OTLP و جداسازی workspace A/B را در stack محلی بررسی می‌کند."],
      en: ["Ten views: Overview, Incidents, Alerts, Notifications, Deployments, SLOs, Audit, Metrics, Logs, and Traces.", "Incident lifecycle/timeline, bounded alert rules, and HTTP-success SLOs.", "Bounded correlated telemetry search; no arbitrary PromQL/LogQL.", "Persian/English, RTL, light/dark, responsive, keyboard, and chart table alternatives.", "CI verifies the local OTLP path and workspace A/B isolation."]
    },
    decisions: {
      fa: ["دموی عمومی فقط داده مصنوعی دارد؛ اعلان‌ها شبیه‌سازی‌اند و پیام واقعی ارسال نمی‌شود.", "Pages فقط frontend است؛ Go/Postgres/Prometheus/Loki/Tempo سرویس production میزبانی‌شده نیستند.", "Redis و NATS در Compose هستند اما integration کاربردی‌شان deferred است.", "نسخه ۱٫۰٫۰ محدوده portfolio-demo را پایدار می‌کند، نه SaaS تولیدی."],
      en: ["The public demo uses synthetic data only; notifications are simulated and send no real messages.", "Pages serves only the frontend; Go/Postgres/Prometheus/Loki/Tempo are not hosted production services.", "Redis and NATS are in Compose but application integration is deferred.", "v1.0.0 stabilizes the portfolio-demo scope, not a production SaaS."]
    },
    verification: {
      fa: ["نسخه پایدار v1.0.0 منتشر شده؛ release workflow، CI، Security و Pages روی commit انتشار موفق بوده‌اند.", "CI انتشار ۴/۴ job و Security سیزده/سیزده job را گذرانده‌اند؛ Playwright/axe و NVDA شواهد خودکار دارند.", "bootstrap، mutation و refresh persistence زنده Apps Script نیازمند smoke مالک است؛ TalkBack/VoiceOver و review انسانی کامل هم بازند."],
      en: ["Stable v1.0.0 is published; release workflow, CI, Security, and Pages succeeded on the release commit.", "Release CI passed 4/4 jobs and Security passed 13/13; Playwright/axe and NVDA evidence is recorded.", "Live Apps Script bootstrap/mutation/refresh persistence need owner smoke testing; TalkBack/VoiceOver and full human review remain open."]
    },
    references: [
      { label: { fa: "README و محدوده v1", en: "README and v1 scope" }, url: "https://github.com/pooya-labs/orbit/blob/main/README.md" },
      { label: { fa: "معماری", en: "Architecture" }, url: "https://github.com/pooya-labs/orbit/blob/main/docs/architecture.md" },
      { label: { fa: "یادداشت v1.0.0", en: "v1.0.0 release notes" }, url: "https://github.com/pooya-labs/orbit/blob/main/docs/releases/v1.0.0.md" },
      { label: { fa: "CI انتشار", en: "Release CI" }, url: "https://github.com/pooya-labs/orbit/actions/runs/42046685272" },
      { label: { fa: "Security", en: "Security" }, url: "https://github.com/pooya-labs/orbit/actions/runs/42046685929" }
    ]
  },
  "pooya-os": {
    role: { fa: "README، پویا را نویسنده/سازنده معرفی می‌کند.", en: "The README identifies Pooya as the author/creator." },
    architecture: { fa: "static export مبتنی بر Next.js 16، React 19 و TypeScript؛ Zustand وضعیت، Tailwind CSS ظاهر و Framer Motion حرکت‌ها را مدیریت می‌کنند. همه‌چیز در مرورگر اجرا می‌شود.", en: "A static export built with Next.js 16, React 19, and TypeScript; Zustand manages state, Tailwind CSS styling, and Framer Motion transitions. Everything runs in the browser." },
    implementation: {
      fa: ["محیط دسکتاپ واکنش‌گرا و window manager.", "چهار مطالعه موردی پروژه با مسئله، approach و لینک سورس/دمو.", "CLI محلی help/whoami/stack/projects/status/xray/hire بدون اجرای shell.", "Design Token inspector و X-Ray labels.", "Frame monitor مبتنی بر requestAnimationFrame برای همین تب."],
      en: ["Responsive desktop workspace and window manager.", "Four project case studies with problem, approach, and source/demo links.", "Local help/whoami/stack/projects/status/xray/hire CLI with no shell execution.", "Design-token inspector and X-Ray labels.", "requestAnimationFrame frame monitor for this tab only."]
    },
    decisions: {
      fa: ["backend، database، account، API route یا shell واقعی ندارد.", "state و FPS محلی نباید telemetry سرور معرفی شوند.", "یک تجربه تعاملی پورتفولیو است و جایگزین سایت اصلی Pooya Labs نیست."],
      en: ["There is no backend, database, account system, API route, or real shell.", "Local state and FPS must not be presented as server telemetry.", "It is an interactive portfolio experience, not a replacement for the main Pooya Labs site."]
    },
    verification: {
      fa: ["انتشار Pages روی commit 1d408c0 در ۱ نوامبر ۲۰۲۶ موفق بود.", "README گزارش تجمیعی جدیدی از browser/accessibility/performance tests ارائه نمی‌کند."],
      en: ["Pages deployment for commit 1d408c0 succeeded on November 1, 2026.", "The README does not provide a consolidated recent browser/accessibility/performance test report."]
    },
    references: [
      { label: { fa: "README", en: "README" }, url: "https://github.com/pooya-labs/pooya-os/blob/main/README.md" },
      { label: { fa: "انتشار Pages", en: "Pages deployment" }, url: "https://github.com/pooya-labs/pooya-os/actions/runs/41255778903" }
    ]
  },
  "nexus-canvas": {
    role: { fa: "README، پویا را نویسنده معرفی می‌کند.", en: "The README identifies Pooya as the author." },
    architecture: { fa: "ابزار browser-side بر پایه Next.js 16، React 19، TypeScript، Tailwind و SVG؛ BroadcastChannel فقط تب‌های هم‌مبدأ را sync می‌کند و JSON نسخه‌دار برای انتقال دستی snapshot است.", en: "A browser-side tool built with Next.js 16, React 19, TypeScript, Tailwind, and SVG; BroadcastChannel syncs only same-origin tabs and versioned JSON provides manual snapshot portability." },
    implementation: {
      fa: ["ساخت Gateway، Service، AI Worker، Database و Cache و اتصال dependencyها.", "نمای canvas دوبعدی و rack view موبایل‌پسند.", "تشخیص node جداافتاده، endpoint نامعتبر، چرخه، replica ناکافی و bottleneck مدل‌شده.", "محاسبه latency path فقط برای گراف بدون چرخه.", "stress simulation محلی ۲٫۲× با بازگردانی baseline.", "import/export snapshot نسخه‌دار و ساخت Docker Compose starter از گراف معتبر."],
      en: ["Create gateways, services, AI workers, databases, and caches with dependencies.", "2D canvas and mobile-friendly rack view.", "Detect isolated nodes, invalid endpoints, cycles, under-replication, and modeled bottlenecks.", "Compute latency path only for acyclic graphs.", "Local 2.2× stress simulation with baseline restoration.", "Versioned snapshot import/export and Docker Compose starter generation."]
    },
    decisions: {
      fa: ["CPU/throughput/latency ورودی‌های شبیه‌سازی‌اند نه measurement واقعی.", "BroadcastChannel collaboration راه دور یا sync بین دستگاه‌ها نیست.", "Compose output یک starter است و قبل از deploy باید secrets، ports، networks و volumes بررسی شوند."],
      en: ["CPU/throughput/latency are simulated inputs, not real measurements.", "BroadcastChannel is not remote collaboration or cross-device sync.", "Compose output is a starter; review secrets, ports, networks, and volumes before deployment."]
    },
    verification: {
      fa: ["انتشار Pages روی commit df05f90 در ۱ نوامبر ۲۰۲۶ موفق بود.", "README گزارش یکپارچه جدیدی از browser/accessibility/performance tests ندارد."],
      en: ["Pages deployment for commit df05f90 succeeded on November 1, 2026.", "The README has no consolidated recent browser/accessibility/performance test report."]
    },
    references: [
      { label: { fa: "README و محدودیت‌ها", en: "README and boundaries" }, url: "https://github.com/pooya-labs/nexus-canvas/blob/main/README.md" },
      { label: { fa: "انتشار Pages", en: "Pages deployment" }, url: "https://github.com/pooya-labs/nexus-canvas/actions/runs/41255794349" }
    ]
  }
} as const;
