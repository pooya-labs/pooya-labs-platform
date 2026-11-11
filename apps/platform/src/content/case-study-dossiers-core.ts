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
    role: { fa: "AetherFlow یکی از پروژه‌های مهندسی سازمان Pooya Labs است؛ محدوده و پیشرفت آن در README و نقشه راه مخزن ثبت می‌شود.", en: "AetherFlow is a Pooya Labs engineering project; its scope and progress are documented in the repository README and roadmap." },
    architecture: { fa: "هسته ناهمگام Rust/Tokio و کنترل‌پلین Axum روی PostgreSQL پایدار و NATS JetStream قرار دارند. Outbox/Inbox تحویل حداقل یک‌باره را ممکن می‌کند؛ Wasmtime، CLI، SDK تایپ‌شده Rust، OpenAPI و OpenTelemetry لایه‌های توسعه و عملیات‌اند.", en: "An asynchronous Rust/Tokio core and Axum control plane sit over durable PostgreSQL and NATS JetStream. Outbox/Inbox supports at-least-once delivery; Wasmtime, a CLI, typed Rust SDK, OpenAPI, and OpenTelemetry provide extension and operations layers." },
    implementation: {
      fa: ["چرخه عمر پایدار Workflow/Task، رویدادهای قابل ممیزی و aggregation تراکنشی.", "Workerهای بازیابی‌پذیر با lease، heartbeat، epoch fencing و retry محدود.", "API نسخه‌دار برای workflow، task، worker و tenant؛ ده جدول با FORCE RLS.", "تفکیک نقش migration از runtime و اعتبارنامه‌های operator/tenant.", "لاگ JSON، tracing هم‌بسته، metrics محدود و خروجی اختیاری OTLP.", "endpoint اختیاری Prometheus برای Worker مستقل Rust؛ فقط loopback، احراز هویت‌شده و به‌صورت پیش‌فرض خاموش.", "شمارنده‌های چرخه عمر اتصال NATS در سطح همان process؛ بدون ادعای metrics مربوط به API یا تجمیع بین replicaها."],
      en: ["Durable workflow/task lifecycles, auditable events, and transactional aggregation.", "Recoverable workers with leases, heartbeats, epoch fencing, and bounded retries.", "Versioned workflow/task/worker/tenant API; ten tables with FORCE RLS.", "Separate migration/runtime roles and operator/tenant credentials.", "JSON logs, correlated tracing, bounded metrics, and opt-in OTLP.", "Optional Prometheus endpoint for the standalone Rust worker; loopback-only, authenticated, and disabled by default.", "Process-local NATS connection lifecycle counters; no claim of API-process metrics or cross-replica aggregation."]
    },
    decisions: {
      fa: ["تضمین at-least-once است، نه exactly-once عمومی؛ اثر جانبی بیرونی به idempotency برنامه نیاز دارد.", "پروژه experimental است؛ Compose و CI به معنی میزبانی production نیستند.", "بنچمارک فقط روی fingerprint منطبق مقایسه می‌شود و SLO تولیدی نیست.", "RPO/RTO، PITR/WAL archive و آزمون‌های عملیاتی بیشتر هنوز باز هستند."],
      en: ["The guarantee is at-least-once, not universal exactly-once; external effects need application-level idempotency.", "The project remains experimental; Compose and CI are not production hosting.", "Benchmarks compare only matching fingerprints and are not production SLOs.", "RPO/RTO, PITR/WAL archiving, and more operational drills remain open."]
    },
    verification: {
      fa: ["M00 تا M07 تکمیل شده‌اند و M08 همچنان تنها مسیر توسعهٔ فعال پروژه است؛ نسخه ۱٫۰٫۰ منتشر نشده است.", "PR #32 endpoint اختیاری Prometheus را برای Worker مستقل Rust اضافه کرد؛ endpoint فقط روی loopback، با Bearer token و به‌صورت پیش‌فرض خاموش است و digest توکن نگه‌داری می‌شود.", "PR #33 شمارنده‌های چرخه عمر اتصال NATS را در سطح process اضافه کرد؛ این داده‌ها metrics مربوط به API یا تجمیع بین replicaها نیستند.", "PR #34 پوشش CI برای احراز هویت mutual TLS سمت client در NATS را اضافه کرد؛ این تغییر به معنی تنظیم policy سمت سرور در production نیست.", "ماتریس دقیق main روی commit نهایی: Rust CI با ۲۱/۲۱ مرحله، PostgreSQL/JetStream با ۳۵/۳۵ مرحله، Security و Pages موفق شدند.", "باقی‌مانده‌های M08 شامل سناریوهای عملیاتی و بازیابی بیشتر است؛ پروژه همچنان experimental است و آماده‌بودن production ادعا نمی‌شود."],
      en: ["M00–M07 are complete; M08 remains the only active development track. AetherFlow has not released v1.0.0.", "PR #32 added an opt-in Prometheus endpoint for the standalone Rust worker; it is loopback-only, Bearer-authenticated, disabled by default, and stores a token digest.", "PR #33 exposed NATS connection lifecycle counters at process scope; these are not API-process metrics or cross-replica aggregation.", "PR #34 added CI coverage for NATS client mutual-TLS authentication; it does not establish production server-side NATS policy.", "The exact final-main matrix passed: Rust CI 21/21 quality steps, PostgreSQL/JetStream 35/35 steps, Security, and Pages.", "Further operational and recovery scenarios remain part of M08. The project remains experimental and is not described as production-ready."]
    },
    references: [
      { label: { fa: "README و وضعیت", en: "README and status" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/README.md" },
      { label: { fa: "نقشه راه", en: "Roadmap" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/ROADMAP.md" },
      { label: { fa: "OpenAPI", en: "OpenAPI" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/docs/api/openapi.yaml" },
      { label: { fa: "گزارش بنچمارک", en: "Benchmark report" }, url: "https://github.com/pooya-labs/aetherflow/blob/main/docs/performance/end-to-end-load.md" },
      { label: { fa: "PR #32 — Prometheus برای Worker", en: "PR #32 — Worker Prometheus endpoint" }, url: "https://github.com/pooya-labs/aetherflow/pull/32" },
      { label: { fa: "PR #33 — شمارنده‌های اتصال NATS", en: "PR #33 — NATS connection counters" }, url: "https://github.com/pooya-labs/aetherflow/pull/33" },
      { label: { fa: "PR #34 — آزمون mutual TLS", en: "PR #34 — mutual TLS tests" }, url: "https://github.com/pooya-labs/aetherflow/pull/34" },
      { label: { fa: "Rust CI", en: "Rust CI" }, url: "https://github.com/pooya-labs/aetherflow/actions/runs/43041020304" },
      { label: { fa: "PostgreSQL و JetStream CI", en: "PostgreSQL and JetStream CI" }, url: "https://github.com/pooya-labs/aetherflow/actions/runs/43041020474" },
      { label: { fa: "Security", en: "Security" }, url: "https://github.com/pooya-labs/aetherflow/actions/runs/43041020411" },
      { label: { fa: "انتشار Pages", en: "Pages deployment" }, url: "https://github.com/pooya-labs/aetherflow/actions/runs/43041018506" }
    ]
  },
  orbit: {
    role: { fa: "README، پویا را مالک پروژه و نگه‌دارنده معرفی می‌کند.", en: "The README identifies Pooya as project owner and maintainer." },
    architecture: { fa: "داشبورد Next.js به‌صورت static روی GitHub Pages می‌ماند. مسیر دموی کم‌حجم Apps Script با Web App، iframe با origin ثابت و bridge مبتنی بر postMessage/google.script.run فقط داده مصنوعی را در Spreadsheet خصوصی نگه می‌دارد. نسخه Local Work v1.1.0 نیز به‌صورت runtime محلی تک‌کاربره با Go API، PostgreSQL، OTLP احراز هویت‌شده، Prometheus، Loki و Tempo منتشر شده و سرویس میزبانی‌شده نیست. مسیر توسعه‌یافته Cloudflare یک Worker باریک به‌عنوان Edge Gateway جلوی Go API اصلی است؛ Worker توکن Bearer را برای اعتبارسنجی به Go عبور می‌دهد و نقش یا هویت موازی نمی‌سازد. Go با OIDC/Keycloak، نقش‌ها و workspaceها کار می‌کند و PostgreSQL مرجع داده canonical است. telemetry از مسیرهای جداگانه OTLP/HTTP و OTLP/gRPC به Collector خصوصی و Prometheus/Loki/Tempo می‌رود. در وضعیت فعلی، route مربوط به workers.dev غیرفعال است و Origin و ORBIT_GATEWAY_SECRET هنوز به Worker متصل نشده‌اند؛ بنابراین مسیر Cloudflare هنوز اتصال زنده و پذیرفته‌شده نیست.", en: "The Next.js dashboard remains a static GitHub Pages app. The low-volume Apps Script Web App path uses a fixed-origin iframe and postMessage/google.script.run bridge for synthetic records in a private spreadsheet. A separate Local Work v1.1.0 is published as a single-user local runtime with the Go API, PostgreSQL, authenticated OTLP, Prometheus, Loki, and Tempo; it is not a hosted service. The expanded Cloudflare path is a narrow Worker edge gateway in front of the canonical Go API; it forwards the Bearer token to Go and does not create a parallel identity or role system. Go remains responsible for OIDC/Keycloak, roles, and workspace authorization, with PostgreSQL as the canonical data store. Telemetry follows separate authenticated OTLP/HTTP and OTLP/gRPC routes into a private Collector and Prometheus/Loki/Tempo. At the current checkpoint, the workers.dev route is disabled and the origin plus ORBIT_GATEWAY_SECRET are not configured on the Worker, so the Cloudflare path is not yet a live, accepted connection." },
    implementation: {
      fa: ["ده نما: Overview، Incidents، Alerts، Notifications، Deployments، SLOs، Audit، Metrics، Logs و Traces.", "چرخه عمر incident و timeline، ruleهای alert محدود و SLOهای HTTP success.", "جست‌وجوی محدود و هم‌بسته در telemetry؛ بدون PromQL/LogQL دلخواه.", "فارسی/انگلیسی، RTL، تم روشن/تیره، responsive، صفحه‌کلید و جدول جایگزین chart.", "CI مسیر OTLP و جداسازی workspace A/B را در stack محلی بررسی می‌کند.", "Local Work v1.1.0 یک runtime تک‌کاربره برای اجرای محلی Go API، PostgreSQL و ابزارهای telemetry است.", "Worker کلاودفلر فقط مسیرهای مجاز API و health را عبور می‌دهد و Bearer token را برای اعتبارسنجی به Go می‌فرستد.", "مسیر Apps Script و Cloudflare از نظر داده، هویت و نشست مستقل‌اند؛ پذیرش dual-runtime هنوز به تست زنده نیاز دارد."],
      en: ["Ten views: Overview, Incidents, Alerts, Notifications, Deployments, SLOs, Audit, Metrics, Logs, and Traces.", "Incident lifecycle/timeline, bounded alert rules, and HTTP-success SLOs.", "Bounded correlated telemetry search; no arbitrary PromQL/LogQL.", "Persian/English, RTL, light/dark, responsive, keyboard, and chart table alternatives.", "CI verifies the local OTLP path and workspace A/B isolation.", "Local Work v1.1.0 packages a single-user local Go API, PostgreSQL, and telemetry runtime.", "The Cloudflare Worker allows only approved API/health paths and forwards the Bearer token to Go for validation.", "Apps Script and Cloudflare retain separate data, identity, and session boundaries; live dual-runtime acceptance is still pending."]
    },
    decisions: {
      fa: ["دموی Apps Script فقط داده مصنوعی دارد؛ اعلان‌ها شبیه‌سازی‌اند و پیام واقعی ارسال نمی‌شود.", "Cloudflare نقش Edge Gateway دارد؛ D1، هویت موازی یا ذخیره‌سازی نشست در Worker ایجاد نمی‌شود.", "Go/PostgreSQL و telemetry stack مرجع canonical مسیر کامل‌اند؛ Pages صرفاً frontend است.", "تا نصب Origin و ORBIT_GATEWAY_SECRET و فعال‌شدن route، درخواست‌های Worker fail-closed می‌مانند و نباید اتصال زنده معرفی شوند.", "نسخه ۱٫۰٫۰ محدوده portfolio-demo را پایدار می‌کند؛ گسترش Cloudflare یک مسیر runtime جداگانه پس از v1 است."],
      en: ["The Apps Script demo uses synthetic data only; notifications are simulated and send no real messages.", "Cloudflare is an edge gateway only; no D1 database, parallel identity system, or Worker session store is introduced.", "Go/PostgreSQL and the telemetry stack remain canonical for the full path; Pages is frontend-only.", "Until the origin and ORBIT_GATEWAY_SECRET are installed and the route is enabled, Worker requests remain fail-closed and must not be described as live connectivity.", "v1.0.0 stabilizes the portfolio-demo scope; Cloudflare expansion is a separate post-v1 runtime path."]
    },
    verification: {
      fa: ["نسخه پایدار v1.0.0 برای محدوده portfolio-demo منتشر شده است؛ CI روی main پس از ادغام dual-runtime (run 42223939950)، Security (run 42223939967) و Pages (run 42223939898) روی commit 2680173 موفق شدند.", "PR #136 معماری Edge Gateway را به main اضافه کرد؛ Worker نسخه 0.2.3 deploy شده، اما workers.dev route غیرفعال است و secret/origin هنوز تنظیم نشده‌اند؛ API routeها fail-closed هستند.", "bootstrap، mutation و refresh persistence زنده Apps Script هنوز به smoke مالک نیاز دارد؛ اتصال واقعی Worker به Origin، عبور تمام routeهای API، PKCE و تست viewer/operator/admin و workspace A/B نیز در CF01–CF04 باز هستند.", "Local Work v1.1.0 در انتشار جداگانه ارائه شده و runtime تک‌کاربرهٔ محلی است، نه سرویس تولیدی میزبانی‌شده.", "TalkBack/VoiceOver و review انسانی کامل دستگاه‌ها همچنان خارج از پوشش آزمون‌های خودکار باقی می‌مانند."],
      en: ["Stable v1.0.0 is published for the portfolio-demo scope; mainline CI after the dual-runtime merge (run 42223939950), Security (run 42223939967), and Pages (run 42223939898) passed on commit 2680173.", "PR #136 added the edge-gateway architecture to main. Worker version 0.2.3 is deployed, but the workers.dev route is disabled and its secret/origin are not configured; API routes remain fail-closed.", "Live Apps Script bootstrap/mutation/refresh persistence still needs owner smoke testing. Connecting the Worker to the origin, exercising all API routes, PKCE, viewer/operator/admin behavior, and workspace A/B isolation remain open under CF01–CF04.", "Local Work v1.1.0 is a separate single-user local runtime, not a hosted production service.", "Human TalkBack/VoiceOver and complete device accessibility reviews remain outside the recorded automated checks."]
    },
    references: [
      { label: { fa: "README و محدوده v1", en: "README and v1 scope" }, url: "https://github.com/pooya-labs/orbit/blob/main/README.md" },
      { label: { fa: "معماری اصلی", en: "Core architecture" }, url: "https://github.com/pooya-labs/orbit/blob/main/docs/architecture.md" },
      { label: { fa: "معماری Cloudflare و وضعیت runtime", en: "Cloudflare runtime architecture and state" }, url: "https://github.com/pooya-labs/orbit/blob/main/docs/cloudflare-runtime.md" },
      { label: { fa: "قرارداد Worker", en: "Worker contract" }, url: "https://github.com/pooya-labs/orbit/blob/main/cloudflare/README.md" },
      { label: { fa: "ادغام Edge Gateway در main", en: "Edge Gateway merge" }, url: "https://github.com/pooya-labs/orbit/pull/136" },
      { label: { fa: "یادداشت v1.0.0", en: "v1.0.0 release notes" }, url: "https://github.com/pooya-labs/orbit/blob/main/docs/releases/v1.0.0.md" },
      { label: { fa: "CI انتشار", en: "Release CI" }, url: "https://github.com/pooya-labs/orbit/actions/runs/42046685272" },
      { label: { fa: "Security", en: "Security" }, url: "https://github.com/pooya-labs/orbit/actions/runs/42046685929" }
    ]
  },
  "pooya-os": {
    role: { fa: "README، پویا را نویسنده/سازنده معرفی می‌کند.", en: "The README identifies Pooya as the author/creator." },
    architecture: { fa: "static export مبتنی بر Next.js 16، React 19 و TypeScript؛ Zustand وضعیت، Tailwind CSS ظاهر و Framer Motion حرکت‌ها را مدیریت می‌کنند. همه‌چیز در مرورگر اجرا می‌شود.", en: "A static export built with Next.js 16, React 19, and TypeScript; Zustand manages state, Tailwind CSS styling, and Framer Motion transitions. Everything runs in the browser." },
    implementation: {
      fa: ["محیط دسکتاپ واکنش‌گرا و window manager.", "نه پروفایل دو‌زبانه پروژه با مسئله، رویکرد، قابلیت‌های کاربردی و لینک سورس/دمو.", "CLI محلی help/whoami/stack/projects/status/xray/hire بدون اجرای shell.", "Design Token inspector و X-Ray labels.", "Frame monitor مبتنی بر requestAnimationFrame برای همین تب."],
      en: ["Responsive desktop workspace and window manager.", "Nine bilingual project profiles with problem statements, engineering approaches, practical features, and source/demo links.", "Local help/whoami/stack/projects/status/xray/hire CLI with no shell execution.", "Design-token inspector and X-Ray labels.", "requestAnimationFrame frame monitor for this tab only."]
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
