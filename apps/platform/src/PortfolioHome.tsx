import { Activity, ArrowDown, ArrowUpLeft, ArrowUpRight, BookOpen, Code2, ExternalLink, Layers3, Monitor, Moon, Sun, TerminalSquare } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { portfolioProjects as projects, type PortfolioProject } from './content/projects';
import { coreDossiers } from './content/case-study-dossiers-core';
import { productDossiers } from './content/case-study-dossiers-products';
import { architectureDiagrams } from './content/architecture-diagrams';
import type { CaseStudyDossier } from './content/case-study-dossiers-types';
import { NovelLibrarySection, NovelReader, loadNovelCatalog, localizedNovelText, type NovelRecord } from './NovelLibrary';
import './portfolio-enhancements.css';


function GitHubBrandIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.004 0c2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.623-5.476 5.921.43.372.814 1.103.814 2.222v3.293c0 .32.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" /></svg>;
}
function TelegramBrandIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M23.91 3.79 20.3 20.83c-.27 1.2-.98 1.5-1.98.94l-5.47-4.03-2.64 2.54c-.29.29-.53.53-1.09.53l.39-5.56L19.63 6.1c.42-.38-.09-.59-.65-.21L6.24 13.96.82 12.26c-1.18-.37-1.2-1.18.25-1.75L22.26 2.2c.98-.36 1.84.24 1.65 1.59Z" /></svg>;
}

type Language = 'fa' | 'en';
type Theme = 'dark' | 'light';

function OwnerAttribution({ language, assetBase }: { language: Language; assetBase: string }) {
  const isPersian = language === 'fa';
  const ownerName = isPersian ? 'پویا گودرزی' : 'POOYA GOODARZI';
  const ownerByline = isPersian ? 'ایجاد و نگه‌داری: پویا گودرزی' : 'Created & maintained by Pooya Goodarzi';
  return (
    <a className="portfolio-owner-attribution" href="https://github.com/pooya-labs" target="_blank" rel="noopener noreferrer">
      <img src={`${assetBase}brand/pooya-monogram-tile.svg`} alt="" aria-hidden="true" width={42} height={42} decoding="async" />
      <span className="portfolio-owner-attribution-copy">
        <span className="portfolio-owner-attribution-label">{isPersian ? 'مالک پروژه' : 'PROJECT OWNER'}</span>
        <strong>{ownerName}</strong>
        <span className="portfolio-owner-attribution-byline">{ownerByline}</span>
      </span>
    </a>
  );
}

function getProjectSlugFromLocation(): string | null {
  const querySlug = new URLSearchParams(window.location.search).get('project');
  if (querySlug) return querySlug;
  const match = window.location.pathname.match(/\/(?:en\/)?projects\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

function getNovelSlugFromLocation(): string | null {
  const querySlug = new URLSearchParams(window.location.search).get('novel');
  if (querySlug) return querySlug;
  const match = window.location.pathname.match(/\/(?:en\/)?novels\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

function getProjectRouteHref(slug: string, language: Language, baseUrl = import.meta.env.BASE_URL): string {
  if (baseUrl === './') {
    const params = new URLSearchParams(window.location.search);
    params.set('project', slug);
    return `${window.location.pathname}?${params.toString()}`;
  }
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return language === 'en' ? `${prefix}en/projects/${slug}/` : `${prefix}projects/${slug}/`;
}

function getNovelRouteHref(slug: string, language: Language, baseUrl = import.meta.env.BASE_URL): string {
  if (baseUrl === './') {
    const params = new URLSearchParams(window.location.search);
    params.set('novel', slug);
    return `${window.location.pathname}?${params.toString()}`;
  }
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return language === 'en' ? `${prefix}en/novels/${slug}/` : `${prefix}novels/${slug}/`;
}

const text = {
  fa: {
    language: 'English',
    heroEyebrow: 'استودیوی مهندسی و هوش مصنوعی پویا لبز',
    headlineA: 'intelligent systems',
    headlineB: 'meets expressive',
    headlineWord: 'intelligent',
    headlineTail: 'design',
    intro: 'سلام، من پویا هستم. طراح و توسعه‌دهنده سیستم‌های نرم‌افزاری، موتورهای رندر تعاملی و راهکارهای هوش مصنوعی کاربردی. تمرکز من بر خلق محصولاتی با عملکرد بالا، تایپوگرافی اصیل و ساختار داده‌ای امن و شفاف است.',
    proofEyebrow: 'بنیان مهندسی',
    proofTitle: 'دقت در مقیاس خرد، پایدار در معماری کلان',
    proofNote: 'هر تعامل محصول، بازتابی از تعهد مهندسی به کارایی، سرعت پاسخگویی و امنیت پایدار داده‌هاست.',
    selectedEyebrow: 'نمونه پروژه‌ها',
    selectedTitle: 'پروژه‌های منتخب',
    selectedSub: 'مجموعه‌ای از سامانه‌های عملیاتی، چارچوب‌های متن‌باز و ابزارهای خلاقانه در اکوسیستم پویا لبز.',
    aboutEyebrow: 'دیدگاه و تخصص',
    aboutTitle: 'طراحی همگام با معماری سیستم',
    aboutBody: 'من نرم‌افزار را نقطه تلاقی منطق دقیق محاسباتی و تجربه بی‌نقص انسانی می‌دانم. از پایپ‌لاین‌های مقیاس‌پذیر گرفته تا جزئی‌ترین رفتار فریم‌های تعاملی، هدف من ساخت تجربه‌ای منسجم و سریع در بستر پلتفرم وب مدرن است.',
    skillLabel: 'مهارت‌ها و فناوری‌ها',
    principlesEyebrow: 'اصول توسعه',
    principlesTitle: 'اصول پایه‌ای ما',
    navAbout: 'درباره من',
    navWork: 'پروژه‌ها',
    navNovels: 'کتاب‌ها',
    navContact: 'ارتباط',
    openWorkspace: 'ورود به پلتفرم',
    viewAllWork: 'کاوش در پروژه‌ها',
    viewDemo: 'مشاهده پیش‌نمایش زنده',
    viewSource: 'کد منبع در گیت‌هاب',
    readCaseStudy: 'مطالعه مستندات فنی',
    statusStable: 'پایدار و منتشرشده',
    statusProgress: 'در حال توسعه فعال',
    backProjects: 'بازگشت به پروژه‌ها',
    roleLabel: 'مسئولیت و نقش',
    archLabel: 'معماری و جریان سیستم',
    implLabel: 'پیاده‌سازی و یکپارچه‌سازی',
    decisionLabel: 'تصمیمات کلیدی فنی',
    verificationLabel: 'اعتبارسنجی و تست‌ها',
    outcomesLabel: 'نتایج و دستاوردها',
    stackLabel: 'فناوری‌های به‌کاررفته',
    linksLabel: 'پیوندهای پروژه',
    skipToContent: 'رفتن به محتوای اصلی',
  },
  en: {
    language: 'فارسی',
    heroEyebrow: 'Pooya Labs Engineering & AI Studio',
    headlineA: 'intelligent systems',
    headlineB: 'meets expressive',
    headlineWord: 'intelligent',
    headlineTail: 'design',
    intro: "I am Pooya. I design and build production-grade software platforms, expressive web interfaces, and applied AI systems. Pooya Labs unites scalable technical architecture with high-craft digital product execution.",
    proofEyebrow: 'ENGINEERING FOUNDATION',
    proofTitle: 'Architecture with measurable speed, clarity, and security',
    proofNote: 'Every surface is shaped through verified constraints: sub-millisecond interaction budgets, deterministic state engines, and zero telemetry tracking.',
    selectedEyebrow: 'SELECTED WORK',
    selectedTitle: 'Selected Projects',
    selectedSub: 'Production systems, open-source architectures, and high-performance design toolkits.',
    aboutEyebrow: 'PERSPECTIVE',
    aboutTitle: 'Engineering software from systems to the final pixel',
    aboutBody: 'I build software as an interconnected system where architecture, accessibility, interface ergonomics, and deterministic performance reinforce one another. Every component is designed to remain verifiable, resilient, and responsive under real production demands.',
    skillLabel: 'CORE STACK & DOMAINS',
    principlesEyebrow: 'CRAFT DISCIPLINE',
    principlesTitle: 'Our Core Principles',
    navAbout: 'About',
    navWork: 'Work',
    navNovels: 'Novels',
    navContact: 'Contact',
    openWorkspace: 'Open Workspace',
    viewAllWork: 'Explore Projects',
    viewDemo: 'Live Demo',
    viewSource: 'GitHub Source',
    readCaseStudy: 'Read Technical Case Study',
    statusStable: 'Stable release',
    statusProgress: 'In active development',
    backProjects: 'Back to Projects',
    roleLabel: 'Role & Scope',
    archLabel: 'System Architecture',
    implLabel: 'Implementation Details',
    decisionLabel: 'Key Technical Decisions',
    verificationLabel: 'Verification & Testing',
    outcomesLabel: 'Outcomes & Metrics',
    stackLabel: 'Stack & Infrastructure',
    linksLabel: 'Project Links',
    skipToContent: 'Skip to main content',
  },
};

const proofMetrics = [
  {
    fa: { value: '۱۰۰٪', label: 'حریم خصوصی داده‌ها', detail: 'رمزنگاری سمت کاربر بدون ردیابی و ذخیره واسط' },
    en: { value: '100%', label: 'Zero-Telemetry', detail: 'Local execution with zero tracking and deterministic client state' },
  },
  {
    fa: { value: '۶۰ FPS', label: 'روانی تعاملات بصری', detail: 'رندرینگ بهینه‌سازی‌شده برای سخت‌افزارهای گوناگون' },
    en: { value: '60 FPS', label: 'Frame-Budget Adherence', detail: 'Hardware-accelerated CSS and Canvas rendering workflows' },
  },
  {
    fa: { value: '< ۱۰۰ms', label: 'پاسخ‌دهی تعاملی', detail: 'مدیریت داده‌های کلاینت‌محور برای اجرای آنی' },
    en: { value: '< 100ms', label: 'Interaction Response', detail: 'Optimistic local transactions and low-overhead reactive state' },
  },
  {
    fa: { value: 'A11y', label: 'دسترس‌پذیری همگانی', detail: 'پشتیبانی کامل از صفحه‌خوان‌ها و استانداردهای کیبورد' },
    en: { value: 'A11y', label: 'Universal Usability', detail: 'Contrast-verified themes, skip links, and full keyboard coverage' },
  },
];

const principles = [
  {
    num: '01',
    fa: { title: 'معماری قبل از فریم‌ورک', body: 'انتخاب ابزارها بر اساس نیازهای واقعی محصول انجام می‌شود، نه هیجانات گذرای بازار تکنولوژی.' },
    en: { title: 'Architecture Precedes Tooling', body: 'We align design systems, data flow, and runtime constraints before adopting libraries or runtime abstractions.' },
  },
  {
    num: '02',
    fa: { title: 'سرعت و پاسخ‌دهی قطعی', body: 'رابط کاربری باید بدون تاخیر و با پاسخ‌های پیش‌بینی‌پذیر به هر کنش کاربر واکنش نشان دهد.' },
    en: { title: 'Deterministic Performance', body: 'Sub-second interaction loops, light payloads, and aggressive lazy loading preserve smooth execution.' },
  },
  {
    num: '03',
    fa: { title: 'احترام به حریم خصوصی کاربر', body: 'ارزش محصول در اعتماد کاربران نهفته است؛ حفظ امنیت و استقلال داده‌ها اصل اول ماست.' },
    en: { title: 'Respect for Privacy by Design', body: 'Data stays in the browser wherever possible; zero third-party trackers and audited client storage.' },
  },
  {
    num: '04',
    fa: { title: 'تایپوگرافی و هویت بصری فاخر', body: 'طراحی بصری و فونت‌های استاندارد، زبان پیوند دهنده ساختار منطقی به ادراک احساسی مخاطب است.' },
    en: { title: 'Typographic & Visual Cohesion', body: 'Every curve, contrast ratio, and font scale contributes to a clear, authoritative, and elegant identity.' },
  },
];

const skills = [
  'TypeScript', 'React', 'Node.js', 'Next.js', 'Vite', 'Tailwind CSS',
  'PostgreSQL', 'SQLite', 'Docker', 'REST & GraphQL', 'Playwright', 'Web Audio API',
  'Responsive UI', 'WCAG AA', 'Design Systems', 'Performance Profiling',
];

export function ProjectCaseStudy({
  project,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  onBack,
  baseUrl = import.meta.env.BASE_URL,
}: {
  project: PortfolioProject;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onBack: () => void;
  baseUrl?: string;
}) {
  const t = text[language];
  const rtl = language === 'fa';
  const dossier = ((coreDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug] ?? (productDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug])!;
  const architectureDiagram = architectureDiagrams[project.slug];
  const architectureImage = baseUrl === './' ? null : `${baseUrl}architecture/${project.slug}${language === 'en' ? '-en' : ''}.svg`;
  const caseStudyPageAsset = project.caseStudyPageAsset;
  const showCaseStudyPageAsset = Boolean(caseStudyPageAsset && project.slug !== 'aetherflow');
  const desktopCapture = project.caseStudyMedia?.find((item) => item.device === 'desktop') ?? project.caseStudyHeroAsset;
  const mobileCaptures = (project.caseStudyMedia ?? []).filter((item) => item.device !== 'desktop');
  return (
    <div className={`portfolio-page portfolio-case-study ${rtl ? 'is-rtl' : 'is-ltr'}`} data-theme={theme}>
      <a className="portfolio-skip-link" href="#main-content">{t.skipToContent}</a>
      <div className="portfolio-atmosphere atmosphere-a" />
      <div className="portfolio-grid" />
      <header className="portfolio-header">
        <a className="portfolio-brand" href={baseUrl} onClick={(event) => { event.preventDefault(); onBack(); }}>
          <span className="portfolio-brand-mark"><img src={`${baseUrl}brand/pooya-monogram.webp`} alt="" aria-hidden="true" /></span>
          <span><strong>POOYA LABS</strong><small>PROJECT CASE STUDY</small></span>
        </a>
        <div className="portfolio-header-actions">
          <button className="portfolio-cmd-btn" type="button" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))} aria-label={rtl ? 'جستجو و پالت دستورات' : 'Search and command palette'} title={rtl ? 'جستجو (⌘K)' : 'Search (⌘K)'}>
            <span>{rtl ? 'جستجو' : 'Search'}</span>
            <kbd>⌘K</kbd>
          </button>
          <button className="portfolio-theme" type="button" onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? (rtl ? 'فعال‌کردن حالت روشن' : 'Switch to light mode') : (rtl ? 'فعال‌کردن حالت تیره' : 'Switch to dark mode')} title={theme === 'dark' ? (rtl ? 'حالت روشن' : 'Light mode') : (rtl ? 'حالت تیره' : 'Dark mode')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}<span>{theme === 'dark' ? (rtl ? 'روشن' : 'Light') : (rtl ? 'تیره' : 'Dark')}</span></button>
          <button className="portfolio-language" onClick={() => { const nextLanguage = rtl ? 'en' : 'fa'; onLanguageChange(nextLanguage); if (baseUrl !== './') { window.history.replaceState({}, '', new URL(getProjectRouteHref(project.slug, nextLanguage, baseUrl), window.location.href)); } }}>{t.language}</button>
          <button className="portfolio-workspace" onClick={onBack} aria-label={t.backProjects} title={t.backProjects}><span>{t.backProjects}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="case-study-main portfolio-container">
        <a className="case-study-back" href={baseUrl} onClick={(event) => { event.preventDefault(); onBack(); }}><ArrowUpLeft size={15} />{t.backProjects}</a>
        <section className="case-study-hero" data-reveal="case-study-hero">
          <div className="case-study-hero-copy">
            <span className="portfolio-eyebrow">{dossier.badge[language]}</span>
            <h1 className="case-study-title">{project.name}</h1>
            <p className="case-study-lead">{dossier.summary[language]}</p>
            <div className="case-study-hero-links">
              {project.demoUrl ? <a className="portfolio-cta portfolio-cta-primary" href={project.demoUrl} target="_blank" rel="noreferrer"><ExternalLink size={16} />{t.viewDemo}</a> : null}
              {project.repoUrl ? <a className="portfolio-cta portfolio-cta-secondary" href={project.repoUrl} target="_blank" rel="noreferrer"><GitHubBrandIcon size={16} />{t.viewSource}</a> : null}
            </div>
          </div>
          {desktopCapture ? (
            <div className="case-study-hero-media">
              <img src={desktopCapture.src} alt={desktopCapture.alt[language]} loading="eager" decoding="async" />
            </div>
          ) : null}
        </section>

        {/* Section 01 */}
        <section className="case-study-section" data-reveal="case-study-section-01">
          <div className="case-study-section-header">
            <span className="case-study-step">01</span>
            <div>
              <h2 className="case-study-heading">{t.roleLabel}</h2>
              <p className="case-study-subheading">{dossier.role[language].title}</p>
            </div>
          </div>
          <div className="case-study-prose">
            <p>{dossier.role[language].overview}</p>
            <ul className="case-study-list">
              {dossier.role[language].responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </section>

        {/* Section 02 */}
        <section className="case-study-section" data-reveal="case-study-section-02">
          <div className="case-study-section-header">
            <span className="case-study-step">02</span>
            <div>
              <h2 className="case-study-heading">{t.archLabel}</h2>
              <p className="case-study-subheading">{dossier.architecture[language].headline}</p>
            </div>
          </div>
          <div className="case-study-prose">
            <p>{dossier.architecture[language].narrative}</p>
            {architectureImage ? (
              <div className="case-study-diagram-wrap">
                <img className="case-study-diagram-image" src={architectureImage} alt={`${project.name} architecture diagram`} loading="lazy" decoding="async" />
              </div>
            ) : null}
            {architectureDiagram ? (
              <div className="case-study-diagram" aria-label={architectureDiagram.title[language]}>
                <div className="case-study-diagram-lanes">
                  {architectureDiagram.lanes.map((lane) => (
                    <div key={lane.id} className="case-study-diagram-lane">
                      <span className="case-study-diagram-lane-title">{lane.title[language]}</span>
                      <div className="case-study-diagram-nodes">
                        {lane.nodes.map((node) => (
                          <div key={node.id} className="case-study-diagram-node">
                            <strong>{node.title[language]}</strong>
                            <small>{node.description[language]}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* Section 03 */}
        <section className="case-study-section" data-reveal="case-study-section-03">
          <div className="case-study-section-header">
            <span className="case-study-step">03</span>
            <div>
              <h2 className="case-study-heading">{t.implLabel}</h2>
              <p className="case-study-subheading">{dossier.implementation[language].focus}</p>
            </div>
          </div>
          <div className="case-study-prose">
            <p>{dossier.implementation[language].deepDive}</p>
            {showCaseStudyPageAsset && caseStudyPageAsset ? (
              <div className="case-study-inline-preview">
                <img src={caseStudyPageAsset.src} alt={caseStudyPageAsset.alt[language]} loading="lazy" decoding="async" />
              </div>
            ) : null}
          </div>
        </section>

        {/* Section 04 */}
        <section className="case-study-section" data-reveal="case-study-section-04">
          <div className="case-study-section-header">
            <span className="case-study-step">04</span>
            <div>
              <h2 className="case-study-heading">{t.decisionLabel}</h2>
              <p className="case-study-subheading">{rtl ? 'انتخاب‌های کلیدی ساختاری' : 'Architectural trade-offs'}</p>
            </div>
          </div>
          <div className="case-study-decisions">
            {dossier.decisions.map((dec, i) => (
              <div key={i} className="case-study-decision-card">
                <div className="case-study-decision-problem">
                  <strong>{dec[language].context}</strong>
                  <p>{dec[language].decision}</p>
                </div>
                <div className="case-study-decision-rationale">
                  <span className="case-study-decision-tag">{rtl ? 'دلیل انتخاب' : 'Rationale'}</span>
                  <p>{dec[language].rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05 */}
        <section className="case-study-section" data-reveal="case-study-section-05">
          <div className="case-study-section-header">
            <span className="case-study-step">05</span>
            <div>
              <h2 className="case-study-heading">{t.verificationLabel}</h2>
              <p className="case-study-subheading">{dossier.verification[language].framework}</p>
            </div>
          </div>
          <div className="case-study-prose">
            <p>{dossier.verification[language].methodology}</p>
            <div className="case-study-metrics-grid">
              {dossier.verification[language].metrics.map((m, i) => (
                <div key={i} className="case-study-metric-card">
                  <span className="case-study-metric-value">{m.value}</span>
                  <span className="case-study-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 06 */}
        <section className="case-study-section" data-reveal="case-study-section-06">
          <div className="case-study-section-header">
            <span className="case-study-step">06</span>
            <div>
              <h2 className="case-study-heading">{t.outcomesLabel}</h2>
              <p className="case-study-subheading">{rtl ? 'نتایج و ارزیابی عینی' : 'Concrete impact and learnings'}</p>
            </div>
          </div>
          <div className="case-study-prose">
            <p>{dossier.outcomes[language].narrative}</p>
            <ul className="case-study-list">
              {dossier.outcomes[language].takeaways.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </section>

        {/* Section 07 */}
        <section className="case-study-section" data-reveal="case-study-section-07">
          <div className="case-study-section-header">
            <span className="case-study-step">07</span>
            <div>
              <h2 className="case-study-heading">{t.stackLabel}</h2>
              <p className="case-study-subheading">{rtl ? 'اجزای فنی و ابزارها' : 'Stack components'}</p>
            </div>
          </div>
          <div className="portfolio-skills-cloud">
            {project.technologies.map((tech) => <span key={tech} className="portfolio-skill-chip">{tech}</span>)}
          </div>
        </section>

        {/* Section 08 */}
        <section className="case-study-section" data-reveal="case-study-section-08">
          <div className="case-study-section-header">
            <span className="case-study-step">08</span>
            <div>
              <h2 className="case-study-heading">{t.linksLabel}</h2>
              <p className="case-study-subheading">{rtl ? 'منابع در دسترس' : 'Live links & repositories'}</p>
            </div>
          </div>
          <div className="case-study-hero-links">
            {project.demoUrl ? <a className="portfolio-cta portfolio-cta-primary" href={project.demoUrl} target="_blank" rel="noreferrer"><ExternalLink size={16} />{t.viewDemo}</a> : null}
            {project.repoUrl ? <a className="portfolio-cta portfolio-cta-secondary" href={project.repoUrl} target="_blank" rel="noreferrer"><GitHubBrandIcon size={16} />{t.viewSource}</a> : null}
          </div>
        </section>

        {/* Section 09 */}
        {mobileCaptures.length > 0 ? (
          <section className="case-study-section" data-reveal="case-study-section-09">
            <div className="case-study-section-header">
              <span className="case-study-step">09</span>
              <div>
                <h2 className="case-study-heading">{rtl ? 'واکنش‌گرایی روی موبایل' : 'Mobile Interface Capture'}</h2>
                <p className="case-study-subheading">{rtl ? 'تطبیق ارگونومیک برای ابعاد گوناگون' : 'Responsive ergonomic verification'}</p>
              </div>
            </div>
            <div className="case-study-mobile-grid">
              {mobileCaptures.map((item, i) => (
                <div key={i} className="case-study-mobile-card">
                  <img src={item.src} alt={item.alt[language]} loading="lazy" decoding="async" />
                  <span className="case-study-mobile-caption">{item.alt[language]}</span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="case-study-section" data-reveal="case-study-section-09">
            <div className="case-study-section-header">
              <span className="case-study-step">09</span>
              <div>
                <h2 className="case-study-heading">{rtl ? 'محیط اجرای زنده' : 'Runtime Verification'}</h2>
                <p className="case-study-subheading">{rtl ? 'آزمایش در شرایط واقعی مرورگر' : 'Live browser execution assertions'}</p>
              </div>
            </div>
            <div className="case-study-prose">
              <p>{dossier.verification[language].framework}</p>
            </div>
          </section>
        )}

        {/* Section 10 */}
        <section className="case-study-section" data-reveal="case-study-section-10">
          <div className="case-study-section-header">
            <span className="case-study-step">10</span>
            <div>
              <h2 className="case-study-heading">{rtl ? 'جمع‌بندی و مسیر پیش‌رو' : 'Summary & Future Trajectory'}</h2>
              <p className="case-study-subheading">{rtl ? 'گسترش در نسخه‌های بعدی' : 'Next development milestones'}</p>
            </div>
          </div>
          <div className="case-study-prose">
            <p>{dossier.outcomes[language].narrative}</p>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <div className="portfolio-footer-inner portfolio-container">
          <OwnerAttribution language={language} assetBase={baseUrl} />
          <p className="portfolio-footer-copy">Pooya Labs Platform &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export function HydratedCaseStudy({
  project,
  language,
  baseUrl = import.meta.env.BASE_URL,
}: {
  project: PortfolioProject;
  language: Language;
  baseUrl?: string;
}) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentLang, setCurrentLang] = useState<Language>(language);

  useEffect(() => {
    const savedTheme = localStorage.getItem('pooya-labs-theme') as Theme | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem('pooya-labs-theme', nextTheme);
  };

  const handleLanguageChange = (nextLang: Language) => {
    setCurrentLang(nextLang);
  };

  return (
    <ProjectCaseStudy
      project={project}
      language={currentLang}
      onLanguageChange={handleLanguageChange}
      theme={theme}
      onThemeChange={handleThemeChange}
      onBack={() => { window.location.href = baseUrl; }}
      baseUrl={baseUrl}
    />
  );
}

export default function PortfolioHome({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  onOpenWorkspace,
}: {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onOpenWorkspace: () => void;
}) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedNovelSlug, setSelectedNovelSlug] = useState<string | null>(null);
  const [novelCatalog, setNovelCatalog] = useState<NovelRecord[]>([]);
  const [novelCatalogLoading, setNovelCatalogLoading] = useState(true);
  const [novelCatalogError, setNovelCatalogError] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const t = text[language];
  const rtl = language === 'fa';

  useEffect(() => {
    const slug = getProjectSlugFromLocation();
    if (slug) {
      const match = projects.find((project) => project.slug === slug);
      if (match) setSelectedProject(match);
    }
    const novelSlug = getNovelSlugFromLocation();
    if (novelSlug) setSelectedNovelSlug(novelSlug);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(104, 221, 220, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p2.y - p.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(104, 221, 220, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const selectedNovel = novelCatalog.find((novel) => novel.slug === selectedNovelSlug && novel.published) ?? null;
  const heroPreviewProjects = ['global-cart', 'orbit', 'nexus-canvas', 'lumina-glass', 'aura-pulse']
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is PortfolioProject => Boolean(project && (project.caseStudyHeroAsset || project.visualAsset)));

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.portfolio-page');
    if (!root || !('IntersectionObserver' in window)) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;
    // .portfolio-page owns scrolling. Keep the list position when returning from a
    // project or novel, rather than sending the reader back to the top.
    const isDetailRoute = Boolean(selectedProject?.slug || selectedNovelSlug);
    if (isDetailRoute) {
      root.scrollTop = 0;
    } else {
      try {
        const savedPosition = window.sessionStorage.getItem('pooya-labs:portfolio-return-scroll');
        if (savedPosition !== null) {
          root.scrollTop = Math.max(0, Number(savedPosition) || 0);
          window.sessionStorage.removeItem('pooya-labs:portfolio-return-scroll');
        }
      } catch {
        // Session storage may be unavailable in restricted browsing contexts.
      }
    }
    root.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { root, threshold: 0, rootMargin: '0px 0px -3% 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
    };
  }, [selectedProject?.slug, selectedNovelSlug]);

  useEffect(() => {
    let active = true;
    loadNovelCatalog()
      .then((entries) => { if (active) setNovelCatalog(entries); })
      .catch((error: unknown) => { if (active) setNovelCatalogError(error instanceof Error ? error.message : String(error)); })
      .finally(() => { if (active) setNovelCatalogLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const pageTitle = selectedProject
      ? (rtl ? `${selectedProject.name} | مطالعه پروژه در Pooya Labs` : `${selectedProject.name} | Project Study — Pooya Labs`)
      : selectedNovel
        ? `${localizedNovelText(selectedNovel.title, language)} | ${rtl ? 'رمان در Pooya Labs' : 'A novel on Pooya Labs'}`
        : (rtl ? 'پویا | مهندسی نرم‌افزار و پروژه‌ها — Pooya Labs' : 'Pooya | Software Engineering & Projects — Pooya Labs');
    const pageDescription = selectedProject ? selectedProject.description[language]
      : selectedNovel ? localizedNovelText(selectedNovel.synopsis, language) : text[language].intro;
    const canonicalUrl = new URL(window.location.href);
    canonicalUrl.hash = '';
    document.title = pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageDescription);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl.toString());
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'fa' ? 'fa_IR' : 'en_US');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl.toString());
  }, [selectedProject, selectedNovel, language, rtl]);

  useEffect(() => {
    const syncProjectRoute = () => {
      const slug = getProjectSlugFromLocation();
      setSelectedProject(projects.find((project) => project.slug === slug) ?? null);
      setSelectedNovelSlug(getNovelSlugFromLocation());
      if (/\/en\/projects\//.test(window.location.pathname)) onLanguageChange('en');
      else if (/\/projects\//.test(window.location.pathname)) onLanguageChange('fa');
    };
    window.addEventListener('popstate', syncProjectRoute);
    return () => window.removeEventListener('popstate', syncProjectRoute);
  }, [onLanguageChange]);

  const openCaseStudy = (event: ReactMouseEvent<HTMLAnchorElement>, project: PortfolioProject) => {
    event.preventDefault();
    const url = new URL(getProjectRouteHref(project.slug, language), window.location.href);
    try {
      const page = document.querySelector<HTMLElement>('.portfolio-page');
      window.sessionStorage.setItem('pooya-labs:portfolio-return-scroll', String(page?.scrollTop ?? 0));
    } catch {
      // Session storage may be unavailable in restricted browsing contexts.
    }
    window.history.pushState({}, '', url);
    setSelectedProject(project);
    setSelectedNovelSlug(null);

  };

  const closeCaseStudy = () => {
    const url = new URL(window.location.href);
    url.search = '';
    if (import.meta.env.BASE_URL !== './') url.pathname = import.meta.env.BASE_URL;
    window.history.pushState({}, '', url);
    setSelectedProject(null);
    setSelectedNovelSlug(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const openNovel = (event: ReactMouseEvent<HTMLAnchorElement>, novel: NovelRecord) => {
    event.preventDefault();
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    url.searchParams.set('novel', novel.slug);
    try {
      const page = document.querySelector<HTMLElement>('.portfolio-page');
      window.sessionStorage.setItem('pooya-labs:portfolio-return-scroll', String(page?.scrollTop ?? 0));
    } catch {
      // Session storage may be unavailable in restricted browsing contexts.
    }
    window.history.pushState({}, '', url);
    setSelectedProject(null);
    setSelectedNovelSlug(novel.slug);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const closeNovel = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('novel');
    url.searchParams.delete('project');
    url.hash = '';
    if (import.meta.env.BASE_URL !== './') url.pathname = import.meta.env.BASE_URL;
    window.history.pushState({}, '', url);
    setSelectedNovelSlug(null);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [language, rtl]);

  if (selectedProject) return <ProjectCaseStudy project={selectedProject} language={language} onLanguageChange={onLanguageChange} theme={theme} onThemeChange={onThemeChange} onBack={closeCaseStudy} baseUrl={import.meta.env.BASE_URL} />;
  if (selectedNovelSlug) return <NovelReader novel={selectedNovel} language={language} onLanguageChange={onLanguageChange} theme={theme} onThemeChange={onThemeChange} loading={novelCatalogLoading} error={novelCatalogError} onBack={closeNovel} onOpenWorkspace={onOpenWorkspace} />;

  return (
    <div className={`portfolio-page ${rtl ? 'is-rtl' : 'is-ltr'}`} data-theme={theme}>
      <a className="portfolio-skip-link" href="#top">{t.skipToContent}</a>
      <div className="portfolio-atmosphere atmosphere-a" />
      <div className="portfolio-atmosphere atmosphere-b" />
      <div className="portfolio-grid" />

      <header className="portfolio-header">
        <a className="portfolio-brand" href="#top">
          <span className="portfolio-brand-mark"><img src={`${import.meta.env.BASE_URL}brand/pooya-monogram.webp`} alt="" aria-hidden="true" /></span>
          <span><strong>POOYA LABS</strong><small>INDEPENDENT BUILDER</small></span>
        </a>
        <nav className="portfolio-nav" aria-label={rtl ? 'ناوبری اصلی' : 'Main navigation'}>
          <a href="#about">{t.navAbout}</a>
          <a href="#projects">{t.navWork}</a>
          <a href="#novels">{t.navNovels}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="portfolio-header-actions">
          <button
            className="portfolio-cmd-btn"
            type="button"
            onClick={() => setCmdOpen(true)}
            aria-label={rtl ? 'جستجو و پالت دستورات' : 'Search and command palette'}
            title={rtl ? 'جستجو (⌘K)' : 'Search (⌘K)'}
          >
            <span>{rtl ? 'جستجو' : 'Search'}</span>
            <kbd>⌘K</kbd>
          </button>
          <button className="portfolio-theme" type="button" onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? (rtl ? 'فعال‌کردن حالت روشن' : 'Switch to light mode') : (rtl ? 'فعال‌کردن حالت تیره' : 'Switch to dark mode')} title={theme === 'dark' ? (rtl ? 'حالت روشن' : 'Light mode') : (rtl ? 'حالت تیره' : 'Dark mode')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}<span>{theme === 'dark' ? (rtl ? 'روشن' : 'Light') : (rtl ? 'تیره' : 'Dark')}</span></button>
          <button className="portfolio-language" onClick={() => onLanguageChange(rtl ? 'en' : 'fa')}>{t.language}</button>
          <button className="portfolio-workspace" onClick={onOpenWorkspace}><span>{t.openWorkspace}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>

      <main id="top" tabIndex={-1} className="portfolio-main">
        {/* HERO SECTION */}
        <section className="portfolio-hero portfolio-container" data-reveal="hero">
          <canvas ref={heroCanvasRef} className="hero-mesh-canvas" aria-hidden="true" />
          <div className="portfolio-hero-inner">
            <div className="portfolio-hero-brand-top">
              <span className="portfolio-eyebrow">{t.heroEyebrow}</span>
            </div>
            <h1 className="portfolio-headline">
              <span className="portfolio-headline-en" dir="ltr" lang="en">
                <span className="portfolio-headline-light">{t.headlineA}</span>
                <span className="portfolio-headline-break">{t.headlineB} <span className="portfolio-headline-accent">{t.headlineWord}</span> {t.headlineTail}</span>
              </span>
            </h1>
            <p className="portfolio-intro">{t.intro}</p>
            <div className="portfolio-hero-actions">
              <a className="portfolio-cta portfolio-cta-primary" href="#projects"><ArrowDown size={16} />{t.viewAllWork}</a>
              <button className="portfolio-cta portfolio-cta-secondary" type="button" onClick={onOpenWorkspace}><TerminalSquare size={16} />{t.openWorkspace}</button>
            </div>
          </div>

          <div className="portfolio-preview-cluster" aria-hidden="true">
            {heroPreviewProjects.map((project, index) => {
              const asset = project.caseStudyHeroAsset || project.visualAsset;
              if (!asset) return null;
              return (
                <div key={project.slug} className={`portfolio-preview-card portfolio-preview-${index + 1}`}>
                  <img src={asset.src} alt="" aria-hidden="true" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                  <span className="portfolio-preview-caption">{project.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROOF METRICS SECTION */}
        <section className="portfolio-proof-section portfolio-container" data-reveal="proof">
          <div className="portfolio-proof-header">
            <span className="portfolio-eyebrow">{t.proofEyebrow}</span>
            <h2 className="portfolio-proof-title">{t.proofTitle}</h2>
            <p className="portfolio-proof-note">{t.proofNote}</p>
          </div>
          <div className="portfolio-proof-metrics">
            {proofMetrics.map((item, idx) => (
              <div key={idx} className="portfolio-metric-card">
                <span className="portfolio-metric-num">{item[language].value}</span>
                <strong className="portfolio-metric-heading">{item[language].label}</strong>
                <p className="portfolio-metric-desc">{item[language].detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="portfolio-about-section portfolio-container" data-reveal="about">
          <div className="portfolio-about-grid">
            <div className="portfolio-about-lead">
              <span className="portfolio-eyebrow">{t.aboutEyebrow}</span>
              <h2 className="portfolio-section-title">{t.aboutTitle}</h2>
              <p className="portfolio-about-text">{t.aboutBody}</p>
              <div className="portfolio-skills-block">
                <span className="portfolio-skills-label">{t.skillLabel}</span>
                <div className="portfolio-skills-cloud" role="group" aria-label={t.skillLabel}>
                  {skills.map((skill) => (
                    <span key={skill} className="portfolio-skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="portfolio-craft-principles">
              <span className="portfolio-eyebrow">{t.principlesEyebrow}</span>
              <h3 className="portfolio-principles-title">{t.principlesTitle}</h3>
              <div className="portfolio-principles-list">
                {principles.map((p) => (
                  <div key={p.num} className="portfolio-principle-item">
                    <span className="portfolio-principle-num">{p.num}</span>
                    <div className="portfolio-principle-body">
                      <strong>{p[language].title}</strong>
                      <p>{p[language].body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="portfolio-projects-section portfolio-container" data-reveal="projects">
          <div className="portfolio-section-header">
            <div>
              <span className="portfolio-eyebrow">{t.selectedEyebrow}</span>
              <h2 className="portfolio-section-title">{t.selectedTitle}</h2>
              <p className="portfolio-section-sub">{t.selectedSub}</p>
            </div>
          </div>
          <div className="portfolio-project-grid">
            {projects.map((project) => {
              const dossier = ((coreDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug] ?? (productDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug]);
              const asset = project.caseStudyHeroAsset || project.visualAsset;
              const isStable = project.status === 'production' || project.status === 'live' || Boolean(project.demoUrl);
              return (
                <article key={project.slug} className="portfolio-project-card" data-slug={project.slug}>
                  {asset ? (
                    <div className="portfolio-project-media">
                      <img src={asset.src} alt={asset.alt[language]} loading="lazy" decoding="async" />
                      <div className="portfolio-project-status-pill">
                        <span className={`status-dot ${isStable ? 'status-dot-stable' : 'status-dot-progress'}`} />
                        <span>{isStable ? t.statusStable : t.statusProgress}</span>
                      </div>
                    </div>
                  ) : null}
                  <div className="portfolio-project-body">
                    <span className="portfolio-project-badge">{dossier?.badge[language] ?? project.category}</span>
                    <h3 className="portfolio-project-title">{project.name}</h3>
                    <p className="portfolio-project-desc">{project.description[language]}</p>
                    <div className="portfolio-project-tags">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="portfolio-tag-pill">{tech}</span>
                      ))}
                    </div>
                    <div className="portfolio-project-actions">
                      <a
                        className="portfolio-btn-primary"
                        href={getProjectRouteHref(project.slug, language)}
                        onClick={(event) => openCaseStudy(event, project)}
                      >
                        <BookOpen size={15} />
                        <span>{t.readCaseStudy}</span>
                      </a>
                      {project.demoUrl ? (
                        <a className="portfolio-btn-ghost" href={project.demoUrl} target="_blank" rel="noreferrer" title={t.viewDemo}>
                          <ExternalLink size={15} />
                        </a>
                      ) : null}
                      {project.repoUrl ? (
                        <a className="portfolio-btn-ghost" href={project.repoUrl} target="_blank" rel="noreferrer" title={t.viewSource}>
                          <GitHubBrandIcon size={15} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* NOVELS SECTION */}
        <section id="novels" className="portfolio-novels-section portfolio-container" data-reveal="novels">
          <NovelLibrarySection
            novels={novelCatalog}
            language={language}
            loading={novelCatalogLoading}
            error={novelCatalogError}
            onSelectNovel={openNovel}
          />
        </section>

        {/* CONTACT / FOOTER SECTION */}
        <section id="contact" className="portfolio-contact-section portfolio-container" data-reveal="contact">
          <div className="portfolio-contact-card">
            <span className="portfolio-eyebrow">{t.navContact}</span>
            <h2 className="portfolio-contact-title">{rtl ? 'همکاری و ارتباط مستقیم' : 'Start a Conversation'}</h2>
            <p className="portfolio-contact-lead">
              {rtl
                ? 'پویا لبز آماده همکاری در پروژه‌های پیشرو، توسعه زیرساخت‌های نرم‌افزاری و مشاوره تخصصی در زمینه وب و هوش مصنوعی است.'
                : 'Pooya Labs collaborates on ambitious software systems, interactive digital products, and production web architectures.'}
            </p>
            <div className="portfolio-contact-links">
              <a className="portfolio-contact-pill" href="https://github.com/pooya-labs" target="_blank" rel="noreferrer">
                <GitHubBrandIcon size={18} />
                <span>GitHub</span>
              </a>
              <a className="portfolio-contact-pill" href="https://t.me/pooya_goodarzi" target="_blank" rel="noreferrer">
                <TelegramBrandIcon size={18} />
                <span>Telegram</span>
              </a>
              <a className="portfolio-contact-pill" href="https://instagram.com/pooya_goodarzi" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}brand/instagram-glyph.svg`} alt="" aria-hidden="true" width={18} height={18} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <div className="portfolio-footer-inner portfolio-container">
          <OwnerAttribution language={language} assetBase={import.meta.env.BASE_URL} />
          <p className="portfolio-footer-copy">Pooya Labs Platform &copy; {new Date().getFullYear()} &middot; Built with modern web craft</p>
        </div>
      </footer>

      {/* SPOTLIGHT COMMAND PALETTE */}
      {cmdOpen && (
        <div className="cmd-palette-backdrop" onClick={() => setCmdOpen(false)}>
          <div className="cmd-palette-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-palette-input-wrap">
              <Activity size={18} className="cmd-palette-search-icon" />
              <input
                autoFocus
                className="cmd-palette-input"
                placeholder={rtl ? 'جستجوی پروژه، کتاب یا بخش‌های سایت... (Esc برای خروج)' : 'Type to search projects, novels, or actions... (Esc to exit)'}
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
              />
            </div>
            <div className="cmd-palette-list">
              <div className="cmd-palette-group-title">{rtl ? 'پروژه‌ها' : 'Projects'}</div>
              {projects
                .filter((p) => p.name.toLowerCase().includes(cmdQuery.toLowerCase()) || p.description[language].toLowerCase().includes(cmdQuery.toLowerCase()))
                .slice(0, 5)
                .map((p) => (
                  <button
                    key={p.slug}
                    className="cmd-palette-item"
                    type="button"
                    onClick={() => {
                      setCmdOpen(false);
                      openCaseStudy({ preventDefault: () => {} } as ReactMouseEvent<HTMLAnchorElement>, p);
                    }}
                  >
                    <div className="cmd-palette-item-main">
                      <Code2 size={16} className="cmd-palette-item-icon" />
                      <div className="cmd-palette-item-info">
                        <span className="cmd-palette-item-title">{p.name}</span>
                        <span className="cmd-palette-item-subtitle">{p.description[language].slice(0, 60)}...</span>
                      </div>
                    </div>
                    <span className="cmd-palette-item-tag">Project</span>
                  </button>
                ))}

              <div className="cmd-palette-group-title">{rtl ? 'کتابخانه رمان' : 'Novels'}</div>
              {novelCatalog
                .filter((n) => localizedNovelText(n.title, language).toLowerCase().includes(cmdQuery.toLowerCase()))
                .map((n) => (
                  <button
                    key={n.slug}
                    className="cmd-palette-item"
                    type="button"
                    onClick={() => {
                      setCmdOpen(false);
                      openNovel({ preventDefault: () => {} } as ReactMouseEvent<HTMLAnchorElement>, n);
                    }}
                  >
                    <div className="cmd-palette-item-main">
                      <BookOpen size={16} className="cmd-palette-item-icon" />
                      <div className="cmd-palette-item-info">
                        <span className="cmd-palette-item-title">{localizedNovelText(n.title, language)}</span>
                        <span className="cmd-palette-item-subtitle">{localizedNovelText(n.synopsis, language).slice(0, 60)}...</span>
                      </div>
                    </div>
                    <span className="cmd-palette-item-tag">Novel</span>
                  </button>
                ))}

              <div className="cmd-palette-group-title">{rtl ? 'عملیات سریع' : 'Quick Actions'}</div>
              <button
                className="cmd-palette-item"
                type="button"
                onClick={() => {
                  setCmdOpen(false);
                  onLanguageChange(rtl ? 'en' : 'fa');
                }}
              >
                <div className="cmd-palette-item-main">
                  <Activity size={16} className="cmd-palette-item-icon" />
                  <div className="cmd-palette-item-info">
                    <span className="cmd-palette-item-title">{rtl ? 'تغییر زبان به English' : 'Switch language to فارسی'}</span>
                    <span className="cmd-palette-item-subtitle">{rtl ? 'Language switcher' : 'تغییر زبان'}</span>
                  </div>
                </div>
                <span className="cmd-palette-item-tag">Action</span>
              </button>
              <button
                className="cmd-palette-item"
                type="button"
                onClick={() => {
                  setCmdOpen(false);
                  onThemeChange(theme === 'dark' ? 'light' : 'dark');
                }}
              >
                <div className="cmd-palette-item-main">
                  <Sun size={16} className="cmd-palette-item-icon" />
                  <div className="cmd-palette-item-info">
                    <span className="cmd-palette-item-title">{theme === 'dark' ? (rtl ? 'فعال‌سازی حالت روشن' : 'Switch to Light mode') : (rtl ? 'فعال‌سازی حالت تیره' : 'Switch to Dark mode')}</span>
                    <span className="cmd-palette-item-subtitle">Theme</span>
                  </div>
                </div>
                <span className="cmd-palette-item-tag">Action</span>
              </button>
            </div>
            <div className="cmd-palette-footer">
              <div className="cmd-palette-hints">
                <span><kbd>Esc</kbd> {rtl ? 'بستن' : 'Close'}</span>
                <span><kbd>↵</kbd> {rtl ? 'انتخاب' : 'Select'}</span>
              </div>
              <span>Pooya Labs Platform</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
