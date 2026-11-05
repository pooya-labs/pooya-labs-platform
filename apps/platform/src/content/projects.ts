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
}

const projectEntries: PortfolioProject[] = [
  {
    number: '01',
    slug: 'aetherflow',
    name: 'AetherFlow',
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
    previewUrl: 'https://pooya16pg-spec.github.io/aetherflow/',
  },
  {
    number: '02',
    slug: 'orbit',
    name: 'ORBIT',
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
    slug: 'pooya-os',
    name: 'Pooya.OS',
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
    previewUrl: 'https://pooya16pg-spec.github.io/pooya-os/',
  },
  {
    number: '04',
    slug: 'nexus-canvas',
    name: 'NexusCanvas',
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
    previewUrl: 'https://pooya16pg-spec.github.io/nexus-canvas/',
  },
  {
    number: '05',
    slug: 'lumina-glass',
    name: 'LuminaGlass',
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
    previewUrl: 'https://pooya16pg-spec.github.io/lumina-glass/',
  },
  {
    number: '06',
    slug: 'aura-pulse',
    name: 'AuraPulse',
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
    previewUrl: 'https://pooya16pg-spec.github.io/aurapulse/',
  },
  {
    number: '07',
    slug: 'global-cart',
    name: 'GlobalCart',
    category: { fa: 'شبیه‌ساز مارکت‌پلیس', en: 'Marketplace simulation' },
    description: {
      fa: 'شبیه‌سازی فروشگاه چنددسته‌ای با کاتالوگ محلی، صفحات جزئیات محصول، گالری چندتصویری، جست‌وجو و سبد خرید آزمایشی. فروش، پرداخت، موجودی و ارسال واقعی انجام نمی‌شود.',
      en: 'A commerce-grade marketplace simulation with a local catalog, product detail pages, multi-image galleries, search, and a demo cart. It does not process real sales, payments, inventory reservations, or shipments.',
    },
    status: { fa: 'نسخه آزمایشی · ۰٫۲٫۳', en: 'Development · v0.2.3' },
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    tags: ['Next.js', 'React', 'TypeScript', 'Playwright'],
    repositoryUrl: 'https://github.com/pooya-labs/globalcart',
    previewUrl: 'https://pooya-labs.github.io/globalcart/',
    caseStudyUrl: 'https://pooya-labs.github.io/globalcart/case-study/',
  },
  {
    number: '08',
    slug: 'salon-booking',
    name: 'Salon Booking',
    category: { fa: 'سامانه رزرو نوبت', en: 'Appointment booking' },
    description: {
      fa: 'سامانه رزرو نوبت برای یک آرایشگاه؛ شامل مسیر مشتری و فضای مدیریت مالک، زمان‌بندی شمسی و مهاجرت Backend به Google Apps Script و Sheets. اطلاعات مشتریان واقعی نباید در دموی عمومی وارد شود.',
      en: 'An appointment-booking platform for a barber studio, with a customer journey, owner workspace, Jalali scheduling, and an ongoing Google Apps Script / Sheets backend migration. Real customer data must not be entered in the public demo.',
    },
    status: { fa: 'در حال توسعه · ۰٫۷٫۰', en: 'In development · 0.7.0' },
    statusKey: 'in-development',
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
    slugs.add(project.slug);
    names.add(project.name.toLowerCase());
  }
  return [...entries];
}

export const portfolioProjects = validatePortfolioProjects(projectEntries);
