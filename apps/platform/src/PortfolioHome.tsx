import { ArrowDown, ArrowUpLeft, ArrowUpRight, BookOpen, Code2, ExternalLink, Layers3, Monitor, Sparkles, TerminalSquare, Workflow } from 'lucide-react';
import { useEffect, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { portfolioProjects as projects, type PortfolioProject } from './content/projects';
import { coreDossiers } from './content/case-study-dossiers-core';
import { productDossiers } from './content/case-study-dossiers-products';
import { architectureDiagrams } from './content/architecture-diagrams';
import type { CaseStudyDossier } from './content/case-study-dossiers-types';
import { NovelLibrarySection, NovelReader, loadNovelCatalog, localizedNovelText, type NovelRecord } from './NovelLibrary';

type Language = 'fa' | 'en';

function getProjectSlugFromLocation(): string | null {
  const querySlug = new URLSearchParams(window.location.search).get('project');
  if (querySlug) return querySlug;
  const match = window.location.pathname.match(/\/(?:en\/)?projects\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

function getNovelSlugFromLocation(): string | null {
  return new URLSearchParams(window.location.search).get('novel');
}

function getProjectRouteHref(slug: string, language: Language): string {
  if (import.meta.env.BASE_URL === './') return `?project=${encodeURIComponent(slug)}`;
  return `${import.meta.env.BASE_URL}${language === 'en' ? 'en/' : ''}projects/${encodeURIComponent(slug)}/`;
}

interface PortfolioHomeProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onOpenWorkspace: () => void;
}

const text = {
  fa: {
    skipToContent: 'رفتن به محتوای اصلی',
    navAbout: 'درباره من',
    navWork: 'پروژه‌ها',
    navNovels: 'رمان‌ها',
    navStack: 'فناوری‌ها',
    navContact: 'ارتباط',
    eyebrow: 'مهندسی کامپیوتر · ساخت نرم‌افزار',
    headlineA: 'ایده‌ها را',
    headlineB: 'به تجربه‌های دیجیتال',
    headlineC: 'تبدیل می‌کنم.',
    intro: 'من پویا هستم؛ دانشجوی مهندسی کامپیوتر با تمرکز بر طراحی محصول، مهندسی فرانت‌اند و تفکر سیستمی. اینجا پروژه‌هایی را می‌بینی که می‌سازم، همراه با مسیر فنی، تصمیم‌ها و وضعیت واقعی هرکدام.',
    explore: 'دیدن پروژه‌ها',
    github: 'گیت‌هاب من',
    scroll: 'برای آشنایی بیشتر پایین برو',
    selected: 'کارهای منتخب',
    selectedSub: 'پروژه‌ها و آزمایش‌هایی که بخشی از مسیر یادگیری و مهندسی من هستند.',
    allProjects: '۸ پروژه در ویترین',
    aboutEyebrow: 'کمی درباره من',
    aboutTitle: 'از طراحی محصول تا ساخت سیستم‌های نرم‌افزاری.',
    aboutBody: 'در پروژه‌هایم از رابط‌های تعاملی و ابزارهای بصری تا سیستم‌های توزیع‌شده، داشبوردهای داده و محصولات وب کار کرده‌ام. تلاشم این است که هر پروژه با معماری مشخص، مرزهای روشن، تست و توضیح صادقانه از وضعیت واقعی ارائه شود.',
    focus: 'حوزه‌های تمرکز',
    focus1: 'طراحی محصول و مهندسی فرانت‌اند',
    focus2: 'سیستم‌های توزیع‌شده و مشاهده‌پذیری',
    focus3: 'ابزارهای بصری و تجربه‌های تعاملی',
    focus4: 'محصولات داده‌محور و اتوماسیون',
    stackEyebrow: 'جعبه ابزار',
    stackTitle: 'فناوری‌هایی که با آن‌ها می‌سازم.',
    stackSub: 'فهرست اولیه ابزارهای استفاده‌شده در پروژه‌ها؛ با رشد نمونه‌کارها دقیق‌تر می‌شود.',
    contactEyebrow: 'در تماس باشیم',
    contactTitle: 'ایده‌ای برای ساختن داریم؟',
    contactBody: 'برای دیدن کدها، روند توسعه و پروژه‌های تازه، از گیت‌هاب من شروع کن.',
    contactAction: 'مشاهده پروفایل گیت‌هاب',
    footer: 'طراحی و توسعه با کنجکاوی و وسواس مهندسی.',
    workspace: 'ورود به فضای کاری',
    language: 'English',
    status: 'وضعیت پروژه',
    caseStudy: 'مطالعه موردی به‌زودی',
    demo: 'دمو', source: 'سورس', caseStudyReady: 'مطالعه موردی',
    details: 'جزئیات پروژه', challenge: 'مسئله', approach: 'راهکار و رویکرد', highlights: 'قابلیت‌ها و پیاده‌سازی', boundaries: 'محدوده و محدودیت‌ها', role: 'نقش در پروژه', architecture: 'معماری فنی', implementation: 'جزئیات پیاده‌سازی', decisions: 'تصمیم‌های مهندسی', validation: 'تست و شواهد اعتبارسنجی', sources: 'مستندات و منابع', interfaceCaptures: 'تصاویر واقعی رابط کاربری', backProjects: 'بازگشت به پروژه‌ها',
  },
  en: {
    skipToContent: 'Skip to main content',
    navAbout: 'About',
    navWork: 'Projects',
    navNovels: 'Novels',
    navStack: 'Stack',
    navContact: 'Contact',
    eyebrow: 'Computer engineering · Software builder',
    headlineA: 'Turning ideas',
    headlineB: 'into thoughtful',
    headlineC: 'digital experiences.',
    intro: 'I’m Pooya, a computer engineering student focused on product design, frontend engineering, and systems thinking. Here I share the projects I build, along with their technical journey, decisions, and honest current status.',
    explore: 'Explore projects',
    github: 'My GitHub',
    scroll: 'Scroll to explore',
    selected: 'Selected work',
    selectedSub: 'Projects and experiments that are part of my engineering journey.',
    allProjects: '8 projects featured',
    aboutEyebrow: 'A little about me',
    aboutTitle: 'From product design to building software systems.',
    aboutBody: 'My projects span interactive interfaces and visual tools, distributed systems, data dashboards, and web products. I aim to present each one with a clear architecture, honest boundaries, testing, and an accurate account of its current state.',
    focus: 'Areas of focus',
    focus1: 'Product design and frontend engineering',
    focus2: 'Distributed systems and observability',
    focus3: 'Visual tools and interactive experiences',
    focus4: 'Data-driven products and automation',
    stackEyebrow: 'Toolbox',
    stackTitle: 'Technologies I build with.',
    stackSub: 'An initial list of tools used across these projects; it will become more precise as case studies are published.',
    contactEyebrow: 'Let’s connect',
    contactTitle: 'Have something worth building?',
    contactBody: 'For source code, development updates, and new projects, start with my GitHub profile.',
    contactAction: 'View GitHub profile',
    footer: 'Designed and built with curiosity and engineering care.',
    workspace: 'Open workspace',
    language: 'فارسی',
    status: 'Project status',
    caseStudy: 'Case study coming soon',
    demo: 'Live demo', source: 'Source', caseStudyReady: 'Case study',
    details: 'Project details', challenge: 'The challenge', approach: 'Approach', highlights: 'Capabilities & implementation', boundaries: 'Scope & boundaries', role: 'Project role', architecture: 'Technical architecture', implementation: 'Implementation details', decisions: 'Engineering decisions', validation: 'Verification & evidence', sources: 'Documentation & sources', interfaceCaptures: 'Interface captures', backProjects: 'Back to projects',
  },
} satisfies Record<Language, Record<string, string>>;

function ProjectCaseStudy({ project, language, onLanguageChange, onBack }: { project: PortfolioProject; language: Language; onLanguageChange: (language: Language) => void; onBack: () => void }): ReactNode {
  const t = text[language];
  const rtl = language === 'fa';
  const dossier = ((coreDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug] ?? (productDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug])!;
  const architectureDiagram = architectureDiagrams[project.slug];
  const architectureImage = import.meta.env.BASE_URL === './' ? null : `${import.meta.env.BASE_URL}architecture/${project.slug}${language === 'en' ? '-en' : ''}.svg`;
  return (
    <div className={`portfolio-page portfolio-case-study ${rtl ? 'is-rtl' : 'is-ltr'}`}>
      <a className="portfolio-skip-link" href="#main-content">{t.skipToContent}</a>
      <div className="portfolio-atmosphere atmosphere-a" />
      <div className="portfolio-grid" />
      <header className="portfolio-header">
        <a className="portfolio-brand" href={window.location.pathname} onClick={(event) => { event.preventDefault(); onBack(); }}>
          <span className="portfolio-brand-mark">P<span>.</span></span>
          <span><strong>POOYA</strong><small>PROJECT CASE STUDY</small></span>
        </a>
        <div className="portfolio-header-actions">
          <button className="portfolio-language" onClick={() => { const nextLanguage = rtl ? 'en' : 'fa'; onLanguageChange(nextLanguage); if (import.meta.env.BASE_URL !== './') { window.history.replaceState({}, '', new URL(getProjectRouteHref(project.slug, nextLanguage), window.location.href)); } }}>{t.language}</button>
          <button className="portfolio-workspace" onClick={onBack}><span>{t.backProjects}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="case-study-main portfolio-container">
        <a className="case-study-back" href={window.location.pathname} onClick={(event) => { event.preventDefault(); onBack(); }}><ArrowUpLeft size={15} />{t.backProjects}</a>
        <section className="case-study-hero">
          <div className={'case-study-visual' + ((project.caseStudyHeroAsset ?? project.visualAsset) ? ' has-visual' : '')}>
            {(project.caseStudyHeroAsset ?? project.visualAsset) && <img className={'case-study-visual-image visual-' + (project.caseStudyHeroAsset ?? project.visualAsset)!.kind}
              src={(project.caseStudyHeroAsset ?? project.visualAsset)!.url} alt={(project.caseStudyHeroAsset ?? project.visualAsset)!.alt[language]} loading="eager" decoding="async"
              onError={(event) => { event.currentTarget.remove(); event.currentTarget.parentElement?.classList.remove('has-visual'); }} />}
            <div className="case-study-art-fallback" aria-hidden="true">
              <div className="art-orbit orbit-outer" /><div className="art-orbit orbit-inner" />
              <div className="art-monogram"><span>{project.name.slice(0,1)}</span><i /></div>
            </div>
            <span className="case-study-index">{project.number} / POOYA LABS</span>
          </div>
          <div className="case-study-heading">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">PROJECT / {project.number}</span>{project.category[language]}</div>
            <h1>{project.name}</h1>
            <span className="case-study-status"><i />{project.status[language]}</span>
            <p>{project.description[language]}</p>
            <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="case-study-actions">
              <a className="portfolio-primary" href={project.previewUrl} target="_blank" rel="noreferrer"><Monitor size={14} />{t.demo}<ExternalLink size={12} /></a>
              <a className="portfolio-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer"><Code2 size={14} />{t.source}<ExternalLink size={12} /></a>
              {project.caseStudyUrl && <a className="portfolio-secondary" href={project.caseStudyUrl} target="_blank" rel="noreferrer"><BookOpen size={14} />{t.caseStudyReady}<ExternalLink size={12} /></a>}
            </div>
          </div>
        </section>
        {(project.caseStudyMedia ?? []).filter((item) => item.device !== 'desktop').length > 0 && (
          <section className="case-study-media-section">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">UI /</span>{t.interfaceCaptures}</div>
            <div className="case-study-media-grid">
              {(project.caseStudyMedia ?? []).filter((item) => item.device !== 'desktop').map((item) => (
                <figure className={`case-study-media-card device-${item.device}`} key={item.url}>
                  <img src={item.url} alt={item.alt[language]} loading="lazy" decoding="async" />
                  <figcaption>{item.caption[language]}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        <section className="case-study-section-grid">
          <article className="case-study-panel">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">01 /</span>{t.challenge}</div>
            <p>{project.caseStudy.challenge[language]}</p>
          </article>
          <article className="case-study-panel">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">02 /</span>{t.approach}</div>
            <p>{project.caseStudy.approach[language]}</p>
          </article>
        </section>
        <section className="case-study-dossier-grid">
          <article className="case-study-panel">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">03 /</span>{t.role}</div>
            <p>{dossier.role[language]}</p>
          </article>
          <article className="case-study-panel">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">04 /</span>{t.architecture}</div>
            <p>{dossier.architecture[language]}</p>
          </article>
        </section>
        {architectureImage && architectureDiagram && (
          <figure className="case-study-architecture-figure">
            <img src={architectureImage} alt={architectureDiagram.title[language]} width={1600} height={900} loading="lazy" decoding="async" />
            <figcaption>{architectureDiagram.caption[language]}</figcaption>
          </figure>
        )}
        <section className="case-study-detail-grid">
          <article className="case-study-highlights">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">05 /</span>{t.implementation}</div>
            <ul>{dossier.implementation[language].map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
          </article>
          <article className="case-study-highlights">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">06 /</span>{t.decisions}</div>
            <ul>{dossier.decisions[language].map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
          </article>
        </section>
        <section className="case-study-detail-grid">
          <article className="case-study-highlights">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">07 /</span>{t.validation}</div>
            <ul>{dossier.verification[language].map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
          </article>
          <article className="case-study-panel case-study-source-panel">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">08 /</span>{t.sources}</div>
            <div className="case-study-source-list">
              {dossier.references.map((reference) => (
                <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer">
                  <span>{reference.label[language]}</span><ExternalLink size={13} />
                </a>
              ))}
            </div>
          </article>
        </section>
        <section className="case-study-highlights">
          <div className="portfolio-eyebrow"><span className="eyebrow-index">09 /</span>{t.highlights}</div>
          <ul>{project.caseStudy.highlights[language].map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
        </section>
        <section className="case-study-boundaries">
          <div className="portfolio-eyebrow"><span className="eyebrow-index">10 /</span>{t.boundaries}</div>
          <p>{project.caseStudy.boundaries[language]}</p>
        </section>
      </main>
      <footer className="portfolio-footer portfolio-container">
        <a className="portfolio-brand" href={window.location.pathname} onClick={(event) => { event.preventDefault(); onBack(); }}><span className="portfolio-brand-mark">P<span>.</span></span><span><strong>POOYA LABS</strong><small>PERSONAL PORTFOLIO</small></span></a>
        <span>{project.name} · {project.status[language]}</span>
        <a href={project.repositoryUrl} target="_blank" rel="noreferrer"><Code2 size={16} /> {t.source}</a>
        <small>© {new Date().getFullYear()} POOYA LABS</small>
      </footer>
    </div>
  );
}

export default function PortfolioHome({ language, onLanguageChange, onOpenWorkspace }: PortfolioHomeProps): ReactNode {
  const t = text[language];
  const rtl = language === 'fa';
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(() => {
    const slug = getProjectSlugFromLocation();
    return projects.find((project) => project.slug === slug) ?? null;
  });
  const [selectedNovelSlug, setSelectedNovelSlug] = useState<string | null>(() => getNovelSlugFromLocation());
  const [novelCatalog, setNovelCatalog] = useState<NovelRecord[]>([]);
  const [novelCatalogLoading, setNovelCatalogLoading] = useState(true);
  const [novelCatalogError, setNovelCatalogError] = useState<string | null>(null);
  const selectedNovel = novelCatalog.find((novel) => novel.slug === selectedNovelSlug && novel.published) ?? null;

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
    window.history.pushState({}, '', url);
    setSelectedProject(project);
    setSelectedNovelSlug(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
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

  if (selectedProject) return <ProjectCaseStudy project={selectedProject} language={language} onLanguageChange={onLanguageChange} onBack={closeCaseStudy} />;
  if (selectedNovelSlug) return <NovelReader novel={selectedNovel} language={language} loading={novelCatalogLoading} error={novelCatalogError} onBack={closeNovel} />;

  return (
    <div className={`portfolio-page ${rtl ? 'is-rtl' : 'is-ltr'}`}>
      <a className="portfolio-skip-link" href="#top">{t.skipToContent}</a>
      <div className="portfolio-atmosphere atmosphere-a" />
      <div className="portfolio-atmosphere atmosphere-b" />
      <div className="portfolio-grid" />

      <header className="portfolio-header">
        <a className="portfolio-brand" href="#top">
          <span className="portfolio-brand-mark">P<span>.</span></span>
          <span><strong>POOYA</strong><small>INDEPENDENT BUILDER</small></span>
        </a>
        <nav className="portfolio-nav" aria-label={rtl ? 'ناوبری اصلی' : 'Main navigation'}>
          <a href="#about">{t.navAbout}</a>
          <a href="#projects">{t.navWork}</a>
          <a href="#novels">{t.navNovels}</a>
          <a href="#stack">{t.navStack}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="portfolio-header-actions">
          <button className="portfolio-language" onClick={() => onLanguageChange(rtl ? 'en' : 'fa')}>{t.language}</button>
          <button className="portfolio-workspace" onClick={onOpenWorkspace}><span>{t.workspace}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>

      <main id="top" tabIndex={-1}>
        <section className="portfolio-hero portfolio-container">
          <div className="portfolio-hero-copy">
            <div className="portfolio-eyebrow"><span className="eyebrow-pulse" />{t.eyebrow}</div>
            <h1>{t.headlineA}<br /><span className="hero-gradient">{t.headlineB}</span><br />{t.headlineC}</h1>
            <p className="portfolio-intro">{t.intro}</p>
            <div className="portfolio-hero-actions">
              <a className="portfolio-primary" href="#projects">{t.explore}<ArrowDown size={16} /></a>
              <a className="portfolio-secondary" href="https://github.com/pooya-labs" target="_blank" rel="noreferrer"><Code2 size={17} />{t.github}<ExternalLink size={13} /></a>
            </div>
            <div className="portfolio-social-proof"><span className="proof-line" /><span>POOYA LABS</span><span className="proof-dot">·</span><span>BUILDING IN PUBLIC</span></div>
          </div>

          <div className="portfolio-hero-art" role="img" aria-label={rtl ? 'نشان انتزاعی حرف P' : 'Abstract P monogram artwork'}>
            <div className="art-orbit orbit-outer" /><div className="art-orbit orbit-inner" />
            <div className="art-glass-card glass-card-back"><span>DESIGN</span><Sparkles size={18} /></div>
            <div className="art-glass-card glass-card-front"><span>ENGINEERING</span><Workflow size={20} /></div>
            <div className="art-monogram"><span>P</span><i /></div>
            <div className="art-coordinate coordinate-one">PORTFOLIO / 2026</div>
            <div className="art-coordinate coordinate-two">CREATING / 2026</div>
            <div className="art-star star-one" /><div className="art-star star-two" /><div className="art-star star-three" />
          </div>
          <a className="portfolio-scroll-cue" href="#projects"><span>{t.scroll}</span><ArrowDown size={14} /></a>
        </section>

        <section className="portfolio-projects portfolio-container" id="projects">
          <div className="portfolio-section-heading">
            <div><div className="portfolio-eyebrow"><span className="eyebrow-index">01 /</span>{t.selected}</div><h2>{t.selected}</h2><p>{t.selectedSub}</p></div>
            <span className="portfolio-section-meta">{t.allProjects}</span>
          </div>
          <div className="portfolio-project-grid">
            {projects.map((project) => (
              <article className="portfolio-project-card" key={project.name}>
                <div className="project-card-top"><span className="project-number">{project.number} / POOYA LABS</span><span className="project-status"><i />{project.status[language]}</span></div>
                <div className={'project-art' + (project.visualAsset ? ' has-visual visual-' + project.visualAsset.kind : '')}>
                  {project.visualAsset && <img className="project-art-image" src={project.visualAsset.url}
                    alt={project.visualAsset.alt[language]} loading="lazy" decoding="async"
                    onError={(event) => { event.currentTarget.remove(); event.currentTarget.parentElement?.classList.remove('has-visual'); }} />}
                  <div className="project-art-fallback" aria-hidden="true">
                    <div className={`project-art-orbit art-${project.number}`} />
                    <div className="project-art-core"><span>{project.name.slice(0, 1)}</span></div>
                  </div>
                  <span className="project-art-code">{project.tags[0].toUpperCase()}</span>
                  <span className="project-art-index">{project.number}</span>
                </div>
                <div className="project-card-content">
                  <div className="project-category">{project.category[language]}</div>
                  <h3>{project.name}</h3>
                  <p>{project.description[language]}</p>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-card-footer">
                    <span>{t.status}: {project.status[language]}</span>
                    <div className="project-actions">
                      <a href={project.previewUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} ${t.demo}`}><Monitor size={13} />{t.demo}<ExternalLink size={11} /></a>
                      <a href={getProjectRouteHref(project.slug, language)} onClick={(event) => openCaseStudy(event, project)} aria-label={`${project.name} ${t.details}`}><BookOpen size={13} />{t.details}<ArrowUpRight size={11} /></a>
                      {project.caseStudyUrl && <a href={project.caseStudyUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} ${t.caseStudyReady}`}>{t.caseStudyReady}<ExternalLink size={11} /></a>}
                      <a href={project.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} ${t.source}`}><Code2 size={13} />{t.source}<ExternalLink size={11} /></a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <NovelLibrarySection language={language} novels={novelCatalog.filter((novel) => novel.published)} loading={novelCatalogLoading} error={novelCatalogError} onOpen={openNovel} />

        <section className="portfolio-about portfolio-container" id="about">
          <div className="about-stamp"><div className="stamp-orbit" /><div className="stamp-core">P<span>.</span></div><span>ABOUT / POOYA</span></div>
          <div className="about-content">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">03 /</span>{t.aboutEyebrow}</div>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
            <div className="focus-heading"><Layers3 size={16} />{t.focus}</div>
            <ul className="focus-list">
              <li>{t.focus1}</li><li>{t.focus2}</li><li>{t.focus3}</li><li>{t.focus4}</li>
            </ul>
          </div>
        </section>

        <section className="portfolio-stack portfolio-container" id="stack">
          <div className="portfolio-section-heading compact-heading">
            <div><div className="portfolio-eyebrow"><span className="eyebrow-index">04 /</span>{t.stackEyebrow}</div><h2>{t.stackTitle}</h2><p>{t.stackSub}</p></div>
            <TerminalSquare size={32} strokeWidth={1.2} />
          </div>
          <div className="stack-list">
            {['Rust', 'Next.js', 'React', 'TypeScript', 'Go', 'PostgreSQL', 'NATS JetStream', 'OpenTelemetry', 'Vite', 'Google Apps Script', 'SVG / Canvas', 'Web Audio API'].map((technology, index) => (
              <span key={technology}><small>0{index + 1}</small>{technology}</span>
            ))}
          </div>
        </section>

        <section className="portfolio-contact portfolio-container" id="contact">
          <div className="contact-orbit" />
          <div className="portfolio-eyebrow"><span className="eyebrow-index">05 /</span>{t.contactEyebrow}</div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <a className="portfolio-primary" href="https://github.com/pooya-labs" target="_blank" rel="noreferrer">{t.contactAction}<ArrowUpRight size={16} /></a>
        </section>
      </main>

      <footer className="portfolio-footer portfolio-container">
        <a className="portfolio-brand" href="#top"><span className="portfolio-brand-mark">P<span>.</span></span><span><strong>POOYA LABS</strong><small>PERSONAL PORTFOLIO</small></span></a>
        <span>{t.footer}</span>
        <a href="https://github.com/pooya-labs" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a>
        <small>© {new Date().getFullYear()} POOYA LABS</small>
      </footer>
    </div>
  );
}
