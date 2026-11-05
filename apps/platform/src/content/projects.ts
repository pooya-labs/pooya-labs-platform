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
  href?: string;
}

const projectEntries: PortfolioProject[] = [
  {
    number: '01',
    name: 'AetherFlow',
    slug: 'aetherflow',
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    category: { fa: 'مهندسی نرم‌افزار', en: 'Software engineering' },
    description: {
      fa: 'یک پروژه مستقل در حال توسعه؛ تمرکز این ویترین روی تصمیم‌های فنی، روند ساخت و خروجی‌های قابل ارائه آن خواهد بود.',
      en: 'An independent project in active development. Its case study will focus on engineering decisions, the build process, and demonstrable outcomes.',
    },
    status: { fa: 'در حال توسعه', en: 'In development' },
    tags: ['Engineering', 'Workflow'],
    href: 'https://github.com/pooya16pg-spec/aetherflow',
  },
  {
    number: '02',
    name: 'ORBIT',
    slug: 'orbit',
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    category: { fa: 'محصول نرم‌افزاری', en: 'Software product' },
    description: {
      fa: 'پروژه‌ای مستقل با نقشه راه مرحله‌ای؛ جزئیات قابلیت‌ها و نسخه‌های تکمیل‌شده در مطالعه موردی آن ثبت می‌شود.',
      en: 'An independently developed product with a staged roadmap. Its case study will document capabilities and completed releases.',
    },
    status: { fa: 'در حال توسعه', en: 'In development' },
    tags: ['Product design', 'Systems'],
  },
  {
    number: '03',
    name: 'Pooya.OS',
    slug: 'pooya-os',
    statusKey: 'prototype',
    reviewState: 'needs-owner-review',
    category: { fa: 'رابط و تجربه کاربری', en: 'Interface & experience' },
    description: {
      fa: 'کاوشی در ساخت یک محیط کاری دسکتاپ با رابط مدرن، پنجره‌های تعاملی و تجربه‌ای منسجم.',
      en: 'An exploration of a modern desktop workspace with interactive windows and a cohesive interface.',
    },
    status: { fa: 'نمونه و آزمایش', en: 'Prototype' },
    tags: ['UI engineering', 'Interaction'],
  },
  {
    number: '04',
    name: 'NexusCanvas',
    slug: 'nexus-canvas',
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    category: { fa: 'ابزار بصری', en: 'Visual tool' },
    description: {
      fa: 'ابزاری برای نمایش و کار با ساختارها و ارتباطات به‌شکل بصری و قابل تعامل.',
      en: 'A visual tool for exploring structures and relationships through an interactive canvas.',
    },
    status: { fa: 'در حال توسعه', en: 'In development' },
    tags: ['Canvas', 'Visualization'],
  },
  {
    number: '05',
    name: 'LuminaGlass',
    slug: 'lumina-glass',
    statusKey: 'prototype',
    reviewState: 'needs-owner-review',
    category: { fa: 'آزمایشگاه رابط', en: 'Interface lab' },
    description: {
      fa: 'آزمایش جلوه‌های شیشه‌ای، لایه‌بندی و تعاملات بصری برای تجربه‌های دیجیتال.',
      en: 'An exploration of glass surfaces, layered interfaces, and visual interactions for digital experiences.',
    },
    status: { fa: 'نمونه و آزمایش', en: 'Prototype' },
    tags: ['Visual design', 'Motion'],
  },
  {
    number: '06',
    name: 'AuraPulse',
    slug: 'aura-pulse',
    statusKey: 'prototype',
    reviewState: 'needs-owner-review',
    category: { fa: 'داشبورد و داده', en: 'Dashboards & data' },
    description: {
      fa: 'تمرکز بر نمایش داده، مؤلفه‌های نموداری و ابزارهای تعاملی در یک تجربه منسجم.',
      en: 'A focused exploration of data presentation, chart components, and interactive tooling.',
    },
    status: { fa: 'نمونه و آزمایش', en: 'Prototype' },
    tags: ['Data UI', 'Components'],
  },
  {
    number: '07',
    name: 'GlobalCart',
    slug: 'global-cart',
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    category: { fa: 'تجربه تجارت الکترونیک', en: 'Commerce experience' },
    description: {
      fa: 'دموی فروشگاه آنلاین با تمرکز بر مرور محصولات، صفحه جزئیات و تجربه خرید یکپارچه.',
      en: 'An online storefront demo focused on product discovery, detail pages, and a cohesive shopping experience.',
    },
    status: { fa: 'در حال توسعه', en: 'In development' },
    tags: ['E-commerce', 'Frontend'],
  },
  {
    number: '08',
    name: 'Salon Booking',
    slug: 'salon-booking',
    statusKey: 'in-development',
    reviewState: 'needs-owner-review',
    category: { fa: 'سامانه رزرو', en: 'Booking system' },
    description: {
      fa: 'سامانه رزرو نوبت با مسیر مشتری و ابزارهای مستقل برای مدیریت درخواست‌ها.',
      en: 'An appointment-booking system with a customer flow and a separate request-management surface.',
    },
    status: { fa: 'در حال توسعه', en: 'In development' },
    tags: ['Web app', 'Operations'],
  },
];

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
    if (project.href) {
      const url = new URL(project.href);
      if (url.protocol !== 'https:' || !['github.com', 'gitlab.com'].includes(url.hostname)) {
        throw new Error('Public source links must use HTTPS on an approved source host.');
      }
    }
    slugs.add(project.slug);
    names.add(project.name.toLowerCase());
  }
  return [...entries];
}

export const portfolioProjects = validatePortfolioProjects(projectEntries);
