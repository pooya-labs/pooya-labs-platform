export type ProjectStatus = 'in-development' | 'prototype' | 'released' | 'paused';
export type ProjectReviewState = 'needs-owner-review' | 'owner-reviewed';

export interface PortfolioProject {
  number: string;
  slug: string;
  name: string;
  category: { fa: string; en: string };
  description: { fa: string; en: string };
  status: { fa: string; en: string };
  statusKey: ProjectStatus;
  reviewState: ProjectReviewState;
  tags: string[];
  repositoryUrl: string;
  previewUrl: string;
  caseStudyUrl?: string;
  visualAsset?: {
    url: string;
    kind: 'interface' | 'brand' | 'illustration';
    alt: { fa: string; en: string };
  };
  caseStudyHeroAsset?: {
    url: string;
    kind: 'interface';
    alt: { fa: string; en: string };
  };
  caseStudyMedia?: Array<{
    url: string;
    caption: { fa: string; en: string };
    alt: { fa: string; en: string };
    device: 'desktop' | 'mobile' | 'detail';
  }>; 
  caseStudy: {
    challenge: { fa: string; en: string };
    approach: { fa: string; en: string };
    highlights: { fa: string[]; en: string[] };
    boundaries: { fa: string; en: string };
  };
}

const projectEntries: PortfolioProject[] = [
  {
    number: '01',
    slug: 'aetherflow',
    name: 'AetherFlow',
    caseStudy: {
      challenge: { fa: "اجرای گردش‌کار توزیع‌شده با شکست فرایندها، قطع ارتباط و تحویل تکراری پیام روبه‌رو است. مسئله اصلی فقط صف‌کردن کارها نیست؛ وضعیت باید قابل بازیابی و تغییرات قابل ممیزی باشند.", en: "Distributed workflows face process crashes, network partitions, and duplicate delivery. The hard problem is not merely queuing work: state must be recoverable and transitions auditable." },
      approach: { fa: "هسته Rust و Tokio را پیرامون وضعیت پایدار، Workerهای بازیابی‌پذیر و semantics صریح اجرا شکل می‌دهد. PostgreSQL برای ذخیره‌سازی پایدار و NATS JetStream برای انتقال رویداد به‌کار رفته‌اند.", en: "The Rust and Tokio core is organized around durable state, recoverable workers, and explicit execution semantics. PostgreSQL provides durable storage and NATS JetStream provides event transport." },
      highlights: { fa: ["تحویل حداقل یک‌باره همراه با primitiveهای اجرای idempotent","Lease، heartbeat و retry محدود برای بازیابی Workerها","کنترل صریح cancellation، timeout، concurrency و backpressure","API نسخه‌دار، OpenAPI، log ساخت‌یافته، metrics و tracing","تمرین‌های backup/restore و recovery برای شکست‌های عملیاتی"], en: ["At-least-once delivery paired with idempotent execution primitives","Worker recovery through leases, heartbeats, and bounded retries","Explicit cancellation, timeout, concurrency, and backpressure semantics","Versioned API, OpenAPI, structured logs, metrics, and tracing","Operational backup/restore and recovery drills"] },
      boundaries: { fa: "M00 تا M07 تکمیل و M08 در حال توسعه است. پروژه همچنان experimental است؛ تست‌های benchmark و recovery به‌معنای SLO تولیدی یا آمادگی production نیستند و exactly-once عمومی ادعا نمی‌شود.", en: "M00–M07 are complete and M08 is in progress. The project remains experimental; benchmark and recovery tests are not production SLOs or proof of production readiness, and universal exactly-once execution is not claimed." },
    },
    category: { fa: 'سیستم‌های توزیع‌شده و گردش‌کار', en: 'Distributed systems & workflows' },
    description: {
      fa: 'پلتفرم اجرای گردش‌کار توزیع‌شده با Rust؛ با تمرکز بر وضعیت پایدار، بازیابی Workerها، تحویل قابل اتکا و مشاهده‌پذیری. پروژه همچنان در حال توسعه است و هنوز محصول آماده تولید محسوب نمی‌شود.',
      en: 'A Rust-based distributed workflow execution platform focused on durable state, recoverable workers, reliable delivery, and observability. It remains under active development and is not production-ready.',
    },
    status: { fa: 'در حال توسعه · M08', en: 'In development · M08' },
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    tags: ['Rust', 'PostgreSQL', 'NATS JetStream', 'OpenTelemetry'],
    repositoryUrl: 'https://github.com/pooya-labs/aetherflow',
    previewUrl: 'https://pooya-labs.github.io/aetherflow/',
  },
  {
    number: '02',
        visualAsset: { url: 'https://raw.githubusercontent.com/pooya-labs/orbit/a00e8bebcf7b01c40532af169d97b3d64ce5dea4/app/icon.svg', kind: 'brand', alt: { fa: 'نشان گرافیکی پروژه ORBIT', en: 'ORBIT project mark' } },
    slug: 'orbit',
    name: 'ORBIT',
    caseStudyHeroAsset: {
      url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/77bc3ce0c41533661b8970d2527f4cd94b8a4341/apps/platform/public/interface-captures/orbit/orbit-desktop.png',
      kind: 'interface',
      alt: { fa: 'نمای واقعی داشبورد ORBIT در محیط نمونه با داده‌های نمایشی', en: 'Actual ORBIT dashboard in a sample environment with illustrative demo data' },
    },
    caseStudyMedia: [
      {
        url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/77bc3ce0c41533661b8970d2527f4cd94b8a4341/apps/platform/public/interface-captures/orbit/orbit-mobile.png',
        caption: { fa: 'نمای موبایل داشبورد ORBIT', en: 'ORBIT dashboard on mobile' },
        alt: { fa: 'نمای موبایل داشبورد ORBIT', en: 'ORBIT dashboard on mobile' },
        device: 'mobile',
      },
    ],
    caseStudy: {
      challenge: { fa: "در سیستم‌های توزیع‌شده، وضعیت سرویس، رخدادها، هشدارها و سیگنال‌های metrics، logs و traces معمولاً در ابزارهای جداگانه پخش‌اند. ORBIT تلاش می‌کند این دید عملیاتی را در یک فضای کاری منسجم جمع کند.", en: "In distributed systems, service health, incidents, alerts, and metrics, logs, and traces are often scattered across tools. ORBIT brings these operational views into one cohesive workspace." },
      approach: { fa: "داشبورد React به API و مدل داده پشتیبان متصل است و بخش‌هایی مانند incidents، alerts، deployments، SLOs، audit، metrics، logs و traces را ارائه می‌کند. دمو عمومی و stack مهندسی محلی به‌صورت آگاهانه از هم جدا هستند.", en: "A React dashboard connects to API and data models for incidents, alerts, deployments, SLOs, audit, metrics, logs, and traces. The public demo and local engineering stack are deliberately separate." },
      highlights: { fa: ["چرخه عمر رخدادها همراه با timeline تغییرناپذیر","تعریف و ارزیابی محدود alert ruleها و SLOها","جست‌وجوی محدود و هم‌بسته در log و trace","داشبورد فارسی و انگلیسی با ملاحظات دسترس‌پذیری","نسخه پایدار ۱٫۰٫۰ برای محدوده دموی پورتفولیو"], en: ["Incident lifecycle with an immutable timeline","Bounded alert-rule evaluation and SLO workflows","Bounded log and trace search with correlation","Persian/English dashboard with accessibility considerations","Stable v1.0.0 release for the portfolio-demo scope"] },
      boundaries: { fa: "دموی عمومی از داده‌های مصنوعی و ذخیره‌سازی خصوصی Google Sheets استفاده می‌کند؛ stack محلی برای مهندسی از PostgreSQL و ابزارهای telemetry بهره می‌برد. انتشار ۱٫۰٫۰ به‌معنای میزبانی کامل همه اجزا به‌صورت production نیست.", en: "The public demo uses synthetic data and private Google Sheets storage; the local engineering stack uses PostgreSQL and telemetry tooling. The v1.0.0 release does not mean every component is hosted as a production service." },
    },
    category: { fa: 'مانیتورینگ و مشاهده‌پذیری', en: 'Observability & monitoring' },
    description: {
      fa: 'محیط مهندسی برای بررسی سلامت سرویس‌ها، رخدادها و جریان‌های عملیاتی؛ با نماهای Metrics، Logs و Traces. نسخه ۱٫۰٫۰ برای محدوده دموی پورتفولیو منتشر شده است؛ نه به‌عنوان سرویس تولیدی میزبانی‌شده.',
      en: 'An engineering workspace for service health, incidents, and operational workflows across metrics, logs, and traces. Version 1.0.0 is released for the portfolio-demo scope, not as a hosted production service.',
    },
    status: { fa: 'نسخه پایدار ۱٫۰٫۰', en: 'Stable v1.0.0' },
    statusKey: 'released',
    reviewState: 'needs-owner-review',
    tags: ['Go', 'React', 'PostgreSQL', 'Observability'],
    repositoryUrl: 'https://github.com/pooya-labs/orbit',
    previewUrl: 'https://pooya-labs.github.io/orbit/',
  },
  {
    number: '03',
        visualAsset: { url: 'https://raw.githubusercontent.com/pooya-labs/pooya-os/1d408c0881d480db8f1c1a7a9f94272a93d4e617/public/assets/spatial-bg.webp', kind: 'illustration', alt: { fa: 'تصویر محیط فضایی Pooya.OS', en: 'Pooya.OS spatial workspace artwork' } },
    slug: 'pooya-os',
    name: 'Pooya.OS',
    caseStudyHeroAsset: {
      url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/pooya-os/pooya-os-desktop.png',
      kind: 'interface',
      alt: { fa: 'تصویر واقعی محیط دسکتاپ Pooya.OS با پنجره معرفی پروفایل مهندسی', en: 'Actual Pooya.OS desktop workspace with the engineering profile window open' },
    },
    caseStudyMedia: [
      {
        url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/pooya-os/pooya-os-mobile.png',
        caption: { fa: 'نمای موبایل محیط دسکتاپ Pooya.OS', en: 'Pooya.OS desktop-style workspace on mobile' },
        alt: { fa: 'نمای موبایل محیط دسکتاپ Pooya.OS', en: 'Pooya.OS desktop-style workspace on mobile' },
        device: 'mobile',
      },
    ],
    caseStudy: {
      challenge: { fa: "یک پورتفولیوی فنی معمولی ممکن است فقط فهرستی از لینک‌ها باشد. Pooya.OS تلاش می‌کند معرفی مهارت‌ها و پروژه‌ها را در قالب یک محیط دسکتاپ تعاملی و قابل کاوش ارائه کند.", en: "A conventional engineering portfolio can become little more than a list of links. Pooya.OS presents skills and projects through an explorable desktop-style interface." },
      approach: { fa: "یک static export مبتنی بر Next.js، React و TypeScript با مدیریت پنجره‌ها، command sandbox محلی، بازرس Design Token و case studyهای پروژه‌ها ساخته شده است.", en: "A static export built with Next.js, React, and TypeScript combines window management, a local command sandbox, a design-token inspector, and project case studies." },
      highlights: { fa: ["محیط دسکتاپ واکنش‌گرا با مدیریت پنجره","CLI محلی با فرمان‌های allowlist شده و بدون دسترسی shell","نمایش Design Token و مرزهای runtime","مطالعه موردی چهار پروژه با لینک سورس و دمو","Frame monitor مبتنی بر requestAnimationFrame در مرورگر"], en: ["Responsive desktop environment with window management","Local allowlisted CLI with no shell access","Design-token and runtime-boundary inspection","Four project case studies with source and demo links","Browser-side requestAnimationFrame frame monitor"] },
      boundaries: { fa: "این خروجی یک static portfolio است؛ backend، دیتابیس، حساب کاربری، API route یا shell واقعی ندارد. وضعیت و فرمان‌های محلی نباید به‌عنوان قابلیت سمت سرور برداشت شوند.", en: "This is a static portfolio: it has no backend, database, account system, API route, or real shell. Local state and commands must not be mistaken for server-side capabilities." },
    },
    category: { fa: 'پورتفولیو و محیط دسکتاپ تعاملی', en: 'Portfolio & interactive desktop' },
    description: {
      fa: 'پورتفولیویی با ظاهر یک محیط دسکتاپ؛ شامل مطالعه موردی پروژه‌ها، خط فرمان محلی نمایشی، بازرس Design Token و مدیر پنجره. فرمان‌ها داخل مرورگر اجرا می‌شوند و به سیستم‌عامل دسترسی ندارند.',
      en: 'A portfolio presented as an interactive desktop workspace, with project case studies, a local command sandbox, a design-token inspector, and a window manager. Commands run in the browser and do not access the operating system.',
    },
    status: { fa: 'دموی عمومی', en: 'Public demo' },
    statusKey: 'prototype',
    reviewState: 'needs-owner-review',
    tags: ['Next.js', 'React', 'TypeScript', 'Framer Motion'],
    repositoryUrl: 'https://github.com/pooya-labs/pooya-os',
    previewUrl: 'https://pooya-labs.github.io/pooya-os/',
  },
  {
    number: '04',
        visualAsset: { url: 'https://raw.githubusercontent.com/pooya-labs/nexus-canvas/df05f90b0463e5681324efec9083c9fe20c2cc7c/public/assets/nexus-core.webp', kind: 'illustration', alt: { fa: 'تصویر هسته بصری NexusCanvas', en: 'NexusCanvas core visual' } },
    slug: 'nexus-canvas',
    name: 'NexusCanvas',
    caseStudyHeroAsset: {
      url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/nexus-canvas/nexus-canvas-desktop.png',
      kind: 'interface',
      alt: { fa: 'تصویر واقعی NexusCanvas در حال نمایش توپولوژی سرویس و پنل تحلیل گراف', en: 'Actual NexusCanvas interface showing a service topology and graph-analysis panel' },
    },
    caseStudyMedia: [
      {
        url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/nexus-canvas/nexus-canvas-mobile.png',
        caption: { fa: 'نمای موبایل استودیوی معماری NexusCanvas', en: 'NexusCanvas architecture studio on mobile' },
        alt: { fa: 'نمای موبایل استودیوی معماری NexusCanvas', en: 'NexusCanvas architecture studio on mobile' },
        device: 'mobile',
      },
    ],
    caseStudy: {
      challenge: { fa: "در طراحی معماری، ارتباط سرویس‌ها و وابستگی‌های پیچیده می‌توانند مشکلاتی مانند چرخه وابستگی، سرویس جداافتاده یا گلوگاه را پنهان کنند. هدف ابزار تبدیل این ساختار به مدلی بصری و قابل بررسی است.", en: "In system architecture, complex service relationships can hide dependency cycles, isolated services, or bottlenecks. The tool turns those structures into a visual, inspectable model." },
      approach: { fa: "یک canvas سمت مرورگر برای ساخت node و edge، تحلیل ساختار گراف، تغییر نما بین canvas و rack، و export/import snapshot نسخه‌دار پیاده شده است.", en: "A browser-side canvas supports node and edge editing, graph-structure analysis, a canvas/rack view switch, and versioned snapshot import/export." },
      highlights: { fa: ["ساخت gateway، service، AI worker، database و cache","تشخیص node جداافتاده، endpoint نامعتبر و چرخه وابستگی","محاسبه مسیر latency فقط برای گراف بدون چرخه","اعتبارسنجی snapshot JSON پیش از جایگزینی state","تولید starter برای Docker Compose از گراف معتبر"], en: ["Create gateways, services, AI workers, databases, and caches","Detect isolated nodes, invalid endpoints, and dependency cycles","Calculate longest-path latency only for acyclic graphs","Validate JSON snapshots before replacing current state","Generate Docker Compose starters from valid graphs"] },
      boundaries: { fa: "برنامه client-side است و telemetry زیرساخت زنده، collaboration از راه دور، server، حساب کاربری یا room مشترک ندارد. throughput، CPU و latency مقادیر ورودی/شبیه‌سازی هستند، نه اندازه‌گیری container واقعی.", en: "The app is client-side: it has no live infrastructure telemetry, remote collaboration, server, accounts, or shared rooms. Throughput, CPU, and latency are modeled inputs/simulations, not measurements from real containers." },
    },
    category: { fa: 'طراحی بصری معماری سیستم', en: 'Visual system architecture' },
    description: {
      fa: 'استودیوی ترسیم توپولوژی سرویس‌ها؛ برای ساخت گراف معماری، بررسی چرخه‌های وابستگی و نقاط ضعف ساختاری و خروجی گرفتن از Snapshot یا قالب اولیه Docker Compose. اعداد عملکردی آن شبیه‌سازی‌شده‌اند.',
      en: 'A service-topology studio for building architecture graphs, checking dependency cycles and structural risks, and exporting snapshots or Docker Compose starters. Performance values are illustrative simulations.',
    },
    status: { fa: 'دموی عمومی', en: 'Public demo' },
    statusKey: 'prototype',
    reviewState: 'needs-owner-review',
    tags: ['Next.js', 'TypeScript', 'SVG', 'Docker Compose'],
    repositoryUrl: 'https://github.com/pooya-labs/nexus-canvas',
    previewUrl: 'https://pooya-labs.github.io/nexus-canvas/',
  },
  {
    number: '05',
        visualAsset: { url: 'https://raw.githubusercontent.com/pooya-labs/lumina-glass/06fa93428a00442e5ec53d5486c3615048f66842/public/assets/lumina-orb.webp', kind: 'illustration', alt: { fa: 'گوی شیشه‌ای LuminaGlass', en: 'LuminaGlass glass orb artwork' } },
    slug: 'lumina-glass',
    name: 'LuminaGlass',
    caseStudyHeroAsset: {
      url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/lumina-glass/lumina-glass-desktop.png',
      kind: 'interface',
      alt: { fa: 'تصویر واقعی استودیوی Liquid Glass با کنترل‌های اپتیکی و خروجی PNG', en: 'Actual Liquid Glass studio with optical controls and PNG export' },
    },
    caseStudyMedia: [
      {
        url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/lumina-glass/lumina-glass-mobile.png',
        caption: { fa: 'نمای موبایل استودیوی LuminaGlass', en: 'LuminaGlass studio on mobile' },
        alt: { fa: 'نمای موبایل استودیوی LuminaGlass', en: 'LuminaGlass studio on mobile' },
        device: 'mobile',
      },
    ],
    caseStudy: {
      challenge: { fa: "ساختن سطح‌های شیشه‌ای با حس عمق و کنترل‌های بصری، در کنار پردازش صوت، نیازمند آزمایش‌های سریع در خود مرورگر است. LuminaGlass این دو حوزه را در یک آزمایشگاه تعاملی کنار هم قرار می‌دهد.", en: "Creating layered glass surfaces with convincing depth and tuning audio processing both benefit from quick, direct browser experiments. LuminaGlass brings these explorations into one interactive lab." },
      approach: { fa: "کنترل‌های SVG برای تنظیم جلوه‌های اپتیکی و Canvas برای خروجی PNG استفاده می‌شوند. بخش صوت با Web Audio API و زنجیره‌ای از فیلترهای Biquad اجرا می‌شود.", en: "SVG controls tune optical effects and Canvas renders PNG exports. The audio lab uses the Web Audio API with a chain of Biquad filters." },
      highlights: { fa: ["تنظیم iridescence، fluidity و لایه‌های crystal","خروجی PNG از وضعیت فعلی استودیو","پنج فیلتر Biquad برای oscillator، فایل صوتی یا microphone","Presetها و task board محلی در مرورگر","آزادسازی منابع صوتی، trackهای میکروفون و URLهای موقت"], en: ["Tune iridescence, fluidity, and crystal-layer complexity","Export the current studio state as PNG","Five Biquad filters for oscillator, audio file, or microphone sources","Browser-local presets and task board","Release audio resources, microphone tracks, and temporary URLs"] },
      boundaries: { fa: "Presetها و task board در localStorage همین مرورگر ذخیره می‌شوند. پردازش صوت محلی است و به سرویس ابری، AI یا backend متصل نیست.", en: "Presets and the task board are stored in the current browser's localStorage. Audio processing is local and does not use a cloud service, AI, or backend." },
    },
    category: { fa: 'آزمایشگاه شیشه و صوت', en: 'Glass & audio lab' },
    description: {
      fa: 'آزمایشگاه مرورگری برای تنظیم سطوح Liquid Glass و جلوه‌های اپتیکی، خروجی PNG و پردازش صوت با Web Audio API؛ تنظیمات و Presetها به‌صورت محلی در مرورگر ذخیره می‌شوند.',
      en: 'A browser-native lab for tuning Liquid Glass surfaces and optical effects, exporting PNGs, and processing audio with the Web Audio API. Preferences and presets are stored locally in the browser.',
    },
    status: { fa: 'دموی عمومی', en: 'Public demo' },
    statusKey: 'prototype',
    reviewState: 'needs-owner-review',
    tags: ['SVG', 'Canvas', 'Web Audio API', 'TypeScript'],
    repositoryUrl: 'https://github.com/pooya-labs/lumina-glass',
    previewUrl: 'https://pooya-labs.github.io/lumina-glass/',
  },
  {
    number: '06',
        visualAsset: { url: 'https://raw.githubusercontent.com/pooya-labs/aurapulse/7f3611cae0d74e06b6b01af534a5f84a79e5901c/public/assets/quant-core.webp', kind: 'illustration', alt: { fa: 'تصویر هسته داده AuraPulse', en: 'AuraPulse quantitative core artwork' } },
    slug: 'aura-pulse',
    name: 'AuraPulse',
    caseStudyHeroAsset: {
      url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/aura-pulse/aura-pulse-desktop.png',
      kind: 'interface',
      alt: { fa: 'تصویر واقعی محیط شبیه‌سازی AuraPulse با پنل Paper Trading و نمودار نمونه', en: 'Actual AuraPulse simulated workspace with a paper-trading panel and illustrative chart' },
    },
    caseStudyMedia: [
      {
        url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/b0c538b2523daf96700b731a959d690dd3457f7e/apps/platform/public/interface-captures/aura-pulse/aura-pulse-mobile.png',
        caption: { fa: 'نمای موبایل داشبورد شبیه‌سازی AuraPulse', en: 'AuraPulse simulated dashboard on mobile' },
        alt: { fa: 'نمای موبایل داشبورد شبیه‌سازی AuraPulse', en: 'AuraPulse simulated dashboard on mobile' },
        device: 'mobile',
      },
    ],
    caseStudy: {
      challenge: { fa: "نمایش اطلاعات بازار باید تفاوت بین داده عمومی واقعی، داده نمونه و معامله شبیه‌سازی‌شده را روشن کند. این پروژه داشبورد بازار را با یک حساب paper-trading محلی ترکیب می‌کند.", en: "A market dashboard must clearly separate public market data, illustrative sample data, and simulated trades. This project pairs market views with a local paper-trading account." },
      approach: { fa: "رابط مرورگری داده ticker عمومی را در صورت دسترسی دریافت می‌کند و هنگام قطع feed از داده illustrative برچسب‌خورده استفاده می‌کند. محاسبات سفارش‌ها و وضعیت حساب در مرورگر انجام می‌شود.", en: "The browser reads public ticker data when reachable and uses clearly labeled illustrative fallback data when the feed is unavailable. Orders and account calculations run locally." },
      highlights: { fa: ["نمایش tickerهای BTC، ETH و SOL در صورت دسترسی به feed عمومی","نمایش اتصال و fallback شفاف به داده نمونه","شبیه‌سازی سفارش، میانگین ورود و P&L","تاریخچه سفارش و موجودی محلی در localStorage","امکان reset کردن حساب آزمایشی"], en: ["Display BTC, ETH, and SOL tickers when the public feed is reachable","Show connection state and explicit illustrative fallback data","Simulate orders, average entry, and P&L","Keep order history and demo balance in localStorage","Reset the paper-trading account"] },
      boundaries: { fa: "هیچ سفارش واقعی به صرافی ارسال نمی‌شود و API key دریافت نمی‌شود. داده candle، order-book و شاخص‌های دیگر می‌توانند illustrative باشند؛ این پروژه ابزار سرمایه‌گذاری یا اجرای معامله نیست.", en: "No real exchange order is placed and no API key is used. Candle history, order-book depth, and other indicators may be illustrative; this is not an investment or live-trading tool." },
    },
    category: { fa: 'داده بازار و شبیه‌ساز معاملاتی', en: 'Market data & paper trading' },
    description: {
      fa: 'داشبورد داده بازار با یک شبیه‌ساز Paper Trading داخل مرورگر. سفارش‌ها واقعی نیستند، API Key صرافی دریافت نمی‌شود و اطلاعات حساب آزمایشی روی همان مرورگر ذخیره می‌شوند.',
      en: 'A market-data dashboard paired with an in-browser paper-trading simulator. Orders are simulated, no exchange API key is used, and demo account data stays in the current browser.',
    },
    status: { fa: 'دموی عمومی', en: 'Public demo' },
    statusKey: 'prototype',
    reviewState: 'needs-owner-review',
    tags: ['Next.js', 'TypeScript', 'SVG Charts', 'Market Data'],
    repositoryUrl: 'https://github.com/pooya-labs/aurapulse',
    previewUrl: 'https://pooya-labs.github.io/aurapulse/',
  },
  {
    number: '07',
        visualAsset: { url: 'https://raw.githubusercontent.com/pooya-labs/globalcart/5ca43e40ff101e673ee7cf261850bff0a679047c/docs/screenshots/storefront-home-desktop.png', kind: 'interface', alt: { fa: 'تصویر واقعی صفحه اصلی فروشگاه GlobalCart', en: 'Actual GlobalCart storefront homepage screenshot' } },
    slug: 'global-cart',
    name: 'GlobalCart',
    caseStudyMedia: [
      {
        url: 'https://raw.githubusercontent.com/pooya-labs/globalcart/5ca43e40ff101e673ee7cf261850bff0a679047c/docs/screenshots/storefront-home-desktop.png',
        caption: { fa: 'نمای واقعی فروشگاه روی دسکتاپ', en: 'Actual storefront on desktop' },
        alt: { fa: 'تصویر رابط کاربری صفحه اصلی GlobalCart در اندازه دسکتاپ', en: 'GlobalCart storefront homepage interface at desktop size' },
        device: 'desktop',
      },
      {
        url: 'https://raw.githubusercontent.com/pooya-labs/globalcart/5ca43e40ff101e673ee7cf261850bff0a679047c/docs/screenshots/storefront-home-mobile.png',
        caption: { fa: 'نمای واقعی فروشگاه روی موبایل', en: 'Actual storefront on mobile' },
        alt: { fa: 'تصویر رابط کاربری صفحه اصلی GlobalCart در اندازه موبایل', en: 'GlobalCart storefront homepage interface at mobile size' },
        device: 'mobile',
      },
    ],
    caseStudy: {
      challenge: { fa: "ساخت تجربه فروشگاهی قانع‌کننده فقط به کارت محصول محدود نیست؛ جست‌وجو، دسته‌بندی، صفحه جزئیات، گالری تصاویر و رفتار سبد خرید باید در کنار عملکرد و شفافیت منبع داده درست کار کنند.", en: "A convincing storefront is more than product cards: search, categories, detail pages, image galleries, and cart behavior must work alongside performance and transparent data sourcing." },
      approach: { fa: "یک marketplace simulation با Next.js و React ساخته شده که از snapshot محلی کاتالوگ، تصاویر self-host شده و منطق قیمت‌گذاری دقیق استفاده می‌کند. رابط فارسی RTL و انگلیسی LTR دارد.", en: "A marketplace simulation built with Next.js and React uses a local catalog snapshot, self-hosted imagery, and decimal-safe pricing logic. It supports Persian RTL and English LTR." },
      highlights: { fa: ["کاتالوگ محلی ۱۰۰۰ محصول و صفحات جزئیات static","گالری چندتصویری با thumbnail و کنترل قبلی/بعدی","جست‌وجو، فیلتر، مرتب‌سازی، مقایسه و favorites","بارگذاری مستقل پوسته فروشگاه از تصاویر و lazy loading","Case study دو‌زبانه همراه با معماری و ERD"], en: ["Local 1,000-item catalog with static product detail routes","Multi-image galleries with thumbnail and previous/next controls","Search, filters, sorting, comparison, and favorites","Storefront shell loads independently from images with lazy loading","Bilingual case study with architecture and ERD"] },
      boundaries: { fa: "این پروژه شبیه‌ساز مارکت‌پلیس است، نه فروشگاه زنده. پرداخت، موجودی واقعی، رزرو کالا، ارسال، تسویه فروشنده و بازپرداخت پول انجام نمی‌شود؛ نسخه ۰٫۲٫۳ هنوز نیازمند QA دستی پیش از انتشار ۱٫۰ است.", en: "This is a marketplace simulation, not a live retailer. It does not process payments, real inventory reservations, shipping, seller payouts, or refunds. Version 0.2.3 still requires manual QA before a 1.0 release." },
    },
    category: { fa: 'شبیه‌ساز مارکت‌پلیس', en: 'Marketplace simulation' },
    description: {
      fa: 'شبیه‌سازی فروشگاه چنددسته‌ای با کاتالوگ محلی، صفحات جزئیات محصول، گالری چندتصویری، جست‌وجو و سبد خرید آزمایشی. فروش، پرداخت، موجودی و ارسال واقعی انجام نمی‌شود.',
      en: 'A commerce-grade marketplace simulation with a local catalog, product detail pages, multi-image galleries, search, and a demo cart. It does not process real sales, payments, inventory reservations, or shipments.',
    },
    status: { fa: 'در حال توسعه · ۰٫۲٫۳-dev / M09.8', en: 'In development · v0.2.3-dev / M09.8' },
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    tags: ['Next.js', 'React', 'TypeScript', 'Playwright'],
    repositoryUrl: 'https://github.com/pooya-labs/globalcart',
    previewUrl: 'https://pooya-labs.github.io/globalcart/',
    caseStudyUrl: 'https://pooya-labs.github.io/globalcart/case-study/',
  },
  {
    number: '08',
        visualAsset: { url: 'https://raw.githubusercontent.com/pooya-labs/salon-booking/787160782f82929fa0d8395f8f5d067f2f028257/public/images/shayan-barber-logo.webp', kind: 'brand', alt: { fa: 'نشان برند شایان برای پروژه سامانه رزرو نوبت', en: 'Shayan Barber Studio brand mark used by the booking project' } },
    caseStudyHeroAsset: {
      url: 'https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/6deb62f4f4e0c1f1a2e6f4c7f8d9a0b1c2d3e4f5/apps/platform/public/interface-captures/salon-booking/salon-booking-fullpage-desktop.png',
      kind: 'interface',
      alt: { fa: 'تصویر واقعی مسیر رزرو مشتری در شایان سالن', en: 'Actual Shayan Salon public customer booking journey' },
    },
    slug: 'salon-booking',
    name: 'Salon Booking',
    caseStudy: {
      challenge: { fa: "رزرو نوبت به تقویم زمان‌محور، جلوگیری از تداخل، مسیر ساده مشتری و ابزار جداگانه مدیر نیاز دارد. تجربه فارسی باید تاریخ شمسی و timezone ایران را دقیق نگه دارد.", en: "Appointment booking needs time-aware scheduling, conflict prevention, a simple customer journey, and a separate manager workspace. The Persian experience must preserve Jalali dates and Iran's timezone." },
      approach: { fa: "وب‌سایت و پنل مدیریت با React، TypeScript و Vite روی GitHub Pages منتشر شده‌اند. مسیر فعال درخواست‌ها از bridge مخفی به Google Apps Script و Google Sheets خصوصی می‌رسد و اعلان مدیر از Firebase Cloud Messaging استفاده می‌کند.", en: "The public site and owner workspace are published with React, TypeScript, and Vite on GitHub Pages. The active request path uses a hidden bridge to Google Apps Script and private Google Sheets, with Firebase Cloud Messaging for manager notifications." },
      highlights: { fa: ["کاتالوگ سرویس‌ها و slotهای وابسته به مدت زمان","نمایش تقویم شمسی با timezone Asia/Tehran","رزرو با idempotent retry و کد پیگیری","استعلام و لغو مشتری با token یک‌بارمصرف","فضای مدیر برای مدیریت رزرو، سرویس و زمان‌بندی"], en: ["Service catalog and duration-aware availability slots","Jalali calendar with Asia/Tehran timezone handling","Booking with idempotent retries and reference codes","Customer lookup and cancellation using a one-time token","Manager workspace for bookings, services, and scheduling"] },
      boundaries: { fa: "نسخه محصول ۱٫۰٫۰ در ۵ نوامبر ۲۰۲۶ منتشر و توسط مالک پذیرفته شده است. نسخه سورس Backend در Apps Script برابر ۱٫۵٫۳ است و با شماره نسخه محصول یکی نیست. داده مشتریان در تصاویر پورتفولیو منتشر نمی‌شود.", en: "Product version 1.0.0 was released and owner-accepted on November 5, 2026. The Apps Script backend source reports version 1.5.3, which is distinct from the product version. Customer data must not appear in portfolio imagery." },
    },
    category: { fa: 'سامانه رزرو نوبت', en: 'Appointment booking' },
    description: {
      fa: 'سامانه رزرو نوبت منتشرشده برای یک آرایشگاه؛ با مسیر مشتری، پنل مالک، زمان‌بندی شمسی، Google Apps Script، Google Sheets و اعلان‌های مدیر. اطلاعات شخصی مشتریان از پورتفولیوی عمومی حذف می‌شوند.',
      en: 'A released appointment-booking platform for a barber studio, with a customer journey, owner workspace, Jalali scheduling, Google Apps Script, Google Sheets, and manager notifications. Customer personal information is excluded from the public portfolio.',
    },
    status: { fa: 'منتشرشده · نسخه ۱٫۰٫۰', en: 'Released · v1.0.0' },
    statusKey: 'released',
    reviewState: 'needs-owner-review',
    tags: ['React', 'TypeScript', 'Vite', 'Google Apps Script'],
    repositoryUrl: 'https://github.com/pooya-labs/salon-booking',
    previewUrl: 'https://pooya-labs.github.io/salon-booking/',
  },
];

function assertHttpsUrl(value: string, allowedHosts: readonly string[], label: string): void {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !allowedHosts.some((host) => host.startsWith('.') ? url.hostname.endsWith(host) : url.hostname === host)) {
    throw new Error(label + ' must use HTTPS on an approved host.');
  }
}

export function validatePortfolioProjects(entries: readonly PortfolioProject[]): PortfolioProject[] {
  const slugs = new Set<string>();
  const names = new Set<string>();
  for (const project of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
      throw new Error('Project slugs must be lowercase URL-safe identifiers.');
    }
    if (slugs.has(project.slug) || names.has(project.name.toLowerCase())) {
      throw new Error('Project slugs and names must be unique.');
    }
    if (!project.name.trim() || !project.category.fa.trim() || !project.category.en.trim()) {
      throw new Error('Every project requires a name and localized category.');
    }
    if (!project.description.fa.trim() || !project.description.en.trim()) {
      throw new Error('Every project requires Persian and English descriptions.');
    }
    if (!project.tags.length || project.tags.some((tag) => !tag.trim())) {
      throw new Error('Every project requires non-empty technology or focus tags.');
    }
    if (!['in-development', 'prototype', 'released', 'paused'].includes(project.statusKey)) {
      throw new Error('Unsupported project status.');
    }
    assertHttpsUrl(project.repositoryUrl, ['github.com'], 'Source repository URL');
    assertHttpsUrl(project.previewUrl, ['.github.io'], 'Project preview URL');
    if (project.caseStudyUrl) {
      assertHttpsUrl(project.caseStudyUrl, ['.github.io'], 'Project case-study URL');
    }
    if (project.visualAsset) {
      assertHttpsUrl(project.visualAsset.url, ['raw.githubusercontent.com'], 'Project visual asset URL');
      const assetPath = new URL(project.visualAsset.url).pathname;
      if (!/^\/pooya-labs\/[a-z0-9-]+\/[a-f0-9]{40}\//.test(assetPath)) {
        throw new Error('Project visual assets must be pinned to an immutable source commit.');
      }
      if (!project.visualAsset.alt.fa.trim() || !project.visualAsset.alt.en.trim()) {
        throw new Error('Every project visual asset requires Persian and English alternative text.');
      }
    }
    if (project.caseStudyHeroAsset) {
      assertHttpsUrl(project.caseStudyHeroAsset.url, ['raw.githubusercontent.com'], 'Case-study hero asset URL');
      const heroPath = new URL(project.caseStudyHeroAsset.url).pathname;
      if (!/^\/pooya-labs\/[a-z0-9-]+\/[a-f0-9]{40}\//.test(heroPath)) {
        throw new Error('Case-study hero assets must be pinned to an immutable source commit.');
      }
      if (!project.caseStudyHeroAsset.alt.fa.trim() || !project.caseStudyHeroAsset.alt.en.trim()) {
        throw new Error('Every case-study hero asset requires Persian and English alternative text.');
      }
    }
    if (project.caseStudyMedia) {
      if (!project.caseStudyMedia.length) throw new Error('Case-study media lists cannot be empty.');
      for (const media of project.caseStudyMedia) {
        assertHttpsUrl(media.url, ['raw.githubusercontent.com'], 'Case-study media URL');
        const mediaPath = new URL(media.url).pathname;
        if (!/^\/pooya-labs\/[a-z0-9-]+\/[a-f0-9]{40}\//.test(mediaPath)) {
          throw new Error('Case-study media must be pinned to an immutable source commit.');
        }
        if (!media.alt.fa.trim() || !media.alt.en.trim() || !media.caption.fa.trim() || !media.caption.en.trim()) {
          throw new Error('Every case-study media item requires localized captions and alternative text.');
        }
      }
    }
    slugs.add(project.slug);
    names.add(project.name.toLowerCase());
  }
  return [...entries];
}

const FULL_PAGE_CAPTURE_COMMIT = 'eba5e2d02047375ae8a42514f7bbb58c75106ba7';
const projectsWithFullPageCaptures = projectEntries.map((project) => {
  // GlobalCart's latest full-page catalog capture is intentionally held back until its empty collection grid is repaired.
  if (project.slug === 'global-cart') return project;
  const assetSlug = project.slug === 'aura-pulse' ? 'aurapulse' : project.slug;
  const projectLabelFa = project.slug === 'salon-booking'
    ? 'صفحه عمومی رزرو سالن'
    : project.slug === 'aura-pulse'
      ? 'داشبورد شبیه‌سازی‌شده AuraPulse'
      : `محیط پروژه ${project.name}`;
  const projectLabelEn = project.slug === 'salon-booking'
    ? 'public Salon Booking flow'
    : project.slug === 'aura-pulse'
      ? 'AuraPulse simulated dashboard'
      : `${project.name} interface`;
  const capture = (device: 'desktop' | 'mobile') => ({
    url: `https://raw.githubusercontent.com/pooya-labs/pooya-labs-platform/${FULL_PAGE_CAPTURE_COMMIT}/apps/platform/public/interface-captures/${assetSlug}/${assetSlug}-fullpage-${device}.png`,
    caption: {
      fa: `نمای کامل ${projectLabelFa} در ${device === 'desktop' ? 'دسکتاپ' : 'موبایل'}`,
      en: `Full-page ${projectLabelEn} — ${device}`,
    },
    alt: {
      fa: `تصویر کامل ${projectLabelFa} در اندازه ${device === 'desktop' ? 'دسکتاپ' : 'موبایل'}`,
      en: `Full-page screenshot of the ${projectLabelEn} on ${device}`,
    },
    device,
  });
  return {
    ...project,
    caseStudyMedia: [capture('desktop'), capture('mobile'), ...(project.caseStudyMedia ?? [])],
  };
});

export const portfolioProjects = validatePortfolioProjects(projectsWithFullPageCaptures);
