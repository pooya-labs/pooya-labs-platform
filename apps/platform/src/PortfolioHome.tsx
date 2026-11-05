import { ArrowDown, ArrowUpLeft, ArrowUpRight, Code2, ExternalLink, Layers3, Sparkles, TerminalSquare, Workflow } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

type Language = 'fa' | 'en';

interface PortfolioHomeProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onOpenWorkspace: () => void;
}

const projects = [
  {
    number: '01',
    name: 'AetherFlow',
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
    category: { fa: 'سامانه رزرو', en: 'Booking system' },
    description: {
      fa: 'سامانه رزرو نوبت با مسیر مشتری و ابزارهای مستقل برای مدیریت درخواست‌ها.',
      en: 'An appointment-booking system with a customer flow and a separate request-management surface.',
    },
    status: { fa: 'در حال توسعه', en: 'In development' },
    tags: ['Web app', 'Operations'],
  },
];

const text = {
  fa: {
    navAbout: 'درباره من',
    navWork: 'پروژه‌ها',
    navStack: 'فناوری‌ها',
    navContact: 'ارتباط',
    eyebrow: 'مهندسی کامپیوتر · ساخت نرم‌افزار',
    headlineA: 'ایده‌ها را',
    headlineB: 'به تجربه‌های دیجیتال',
    headlineC: 'تبدیل می‌کنم.',
    intro: 'من پویا هستم؛ دانشجوی مهندسی کامپیوتر و سازنده پروژه‌های نرم‌افزاری. اینجا مسیر ساخت، آزمایش‌ها و پروژه‌هایی را می‌بینی که روی آن‌ها کار می‌کنم.',
    explore: 'دیدن پروژه‌ها',
    github: 'گیت‌هاب من',
    scroll: 'برای آشنایی بیشتر پایین برو',
    selected: 'کارهای منتخب',
    selectedSub: 'پروژه‌ها و آزمایش‌هایی که بخشی از مسیر یادگیری و مهندسی من هستند.',
    allProjects: '۸ پروژه در ویترین',
    aboutEyebrow: 'کمی درباره من',
    aboutTitle: 'از کنجکاوی فنی تا ساخت محصول.',
    aboutBody: 'برای من برنامه‌نویسی فقط نوشتن کد نیست؛ مسئله را می‌فهمم، راه‌حل را طراحی می‌کنم، رابط را می‌سازم و با تست و بازبینی بهبودش می‌دهم. این وب‌سایت هم قرار است روایت شفاف همین مسیر باشد؛ با نمونه‌های واقعی، تصمیم‌های فنی و پیشرفت پروژه‌ها.',
    focus: 'حوزه‌های تمرکز',
    focus1: 'ساخت رابط‌های مدرن و واکنش‌گرا',
    focus2: 'معماری و توسعه اپلیکیشن‌های وب',
    focus3: 'ابزارهای تعاملی و تجربه‌های بصری',
    focus4: 'اتوماسیون، یکپارچه‌سازی و تحویل نرم‌افزار',
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
  },
  en: {
    navAbout: 'About',
    navWork: 'Projects',
    navStack: 'Stack',
    navContact: 'Contact',
    eyebrow: 'Computer engineering · Software builder',
    headlineA: 'Turning ideas',
    headlineB: 'into thoughtful',
    headlineC: 'digital experiences.',
    intro: 'I’m Pooya, a computer engineering student building software projects. This is where I share the process, experiments, and products I work on.',
    explore: 'Explore projects',
    github: 'My GitHub',
    scroll: 'Scroll to explore',
    selected: 'Selected work',
    selectedSub: 'Projects and experiments that are part of my engineering journey.',
    allProjects: '8 projects featured',
    aboutEyebrow: 'A little about me',
    aboutTitle: 'From technical curiosity to building products.',
    aboutBody: 'For me, software is more than writing code: understand the problem, shape the solution, build the interface, then improve it through testing and review. This site is the transparent story of that process—with real work, engineering decisions, and project progress.',
    focus: 'Areas of focus',
    focus1: 'Modern, responsive interfaces',
    focus2: 'Web application architecture and development',
    focus3: 'Interactive tools and visual experiences',
    focus4: 'Automation, integrations, and software delivery',
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
  },
} satisfies Record<Language, Record<string, string>>;

function PointerLens(): ReactNode {
  const glowRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let glowX = targetX;
    let glowY = targetY;
    let lensX = targetX;
    let lensY = targetY;
    let frame = 0;

    const render = () => {
      glowX += (targetX - glowX) * 0.16;
      glowY += (targetY - glowY) * 0.16;
      lensX += (targetX - lensX) * 0.3;
      lensY += (targetY - lensY) * 0.3;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glowX - 170}px, ${glowY - 170}px, 0)`;
      if (lensRef.current) lensRef.current.style.transform = `translate3d(${lensX - 52}px, ${lensY - 52}px, 0)`;
      const moving = Math.abs(targetX - glowX) + Math.abs(targetY - glowY) + Math.abs(targetX - lensX) + Math.abs(targetY - lensY) > 0.5;
      frame = moving ? window.requestAnimationFrame(render) : 0;
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="portfolio-pointer" aria-hidden="true"><div ref={glowRef} className="portfolio-pointer-glow" /><div ref={lensRef} className="portfolio-pointer-lens" /></div>;
}

export default function PortfolioHome({ language, onLanguageChange, onOpenWorkspace }: PortfolioHomeProps): ReactNode {
  const t = text[language];
  const rtl = language === 'fa';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [language, rtl]);

  return (
    <div className={`portfolio-page ${rtl ? 'is-rtl' : 'is-ltr'}`}>
      <PointerLens />
      <div className="portfolio-atmosphere atmosphere-a" />
      <div className="portfolio-atmosphere atmosphere-b" />
      <div className="portfolio-grid" />

      <header className="portfolio-header">
        <a className="portfolio-brand" href="#top" aria-label="Pooya Labs home">
          <span className="portfolio-brand-mark">P<span>.</span></span>
          <span><strong>POOYA</strong><small>INDEPENDENT BUILDER</small></span>
        </a>
        <nav className="portfolio-nav" aria-label={rtl ? 'ناوبری اصلی' : 'Main navigation'}>
          <a href="#about">{t.navAbout}</a>
          <a href="#projects">{t.navWork}</a>
          <a href="#stack">{t.navStack}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="portfolio-header-actions">
          <button className="portfolio-language" onClick={() => onLanguageChange(rtl ? 'en' : 'fa')}>{t.language}</button>
          <button className="portfolio-workspace" onClick={onOpenWorkspace}><span>{t.workspace}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>

      <main id="top">
        <section className="portfolio-hero portfolio-container">
          <div className="portfolio-hero-copy">
            <div className="portfolio-eyebrow"><span className="eyebrow-pulse" />{t.eyebrow}</div>
            <h1>{t.headlineA}<br /><span className="hero-gradient">{t.headlineB}</span><br />{t.headlineC}</h1>
            <p className="portfolio-intro">{t.intro}</p>
            <div className="portfolio-hero-actions">
              <a className="portfolio-primary" href="#projects">{t.explore}<ArrowDown size={16} /></a>
              <a className="portfolio-secondary" href="https://github.com/pooya16pg-spec" target="_blank" rel="noreferrer"><Code2 size={17} />{t.github}<ExternalLink size={13} /></a>
            </div>
            <div className="portfolio-social-proof"><span className="proof-line" /><span>POOYA LABS</span><span className="proof-dot">·</span><span>BUILDING IN PUBLIC</span></div>
          </div>

          <div className="portfolio-hero-art" aria-label="Abstract P monogram artwork">
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
                <div className="project-art" aria-hidden="true">
                  <div className={`project-art-orbit art-${project.number}`} />
                  <div className="project-art-core"><span>{project.name.slice(0, 1)}</span></div>
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
                    {project.href ? <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub repository`}><Code2 size={15} /> <ArrowUpRight size={14} /></a> : <span className="project-coming-soon">{t.caseStudy}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-about portfolio-container" id="about">
          <div className="about-stamp"><div className="stamp-orbit" /><div className="stamp-core">P<span>.</span></div><span>ABOUT / POOYA</span></div>
          <div className="about-content">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">02 /</span>{t.aboutEyebrow}</div>
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
            <div><div className="portfolio-eyebrow"><span className="eyebrow-index">03 /</span>{t.stackEyebrow}</div><h2>{t.stackTitle}</h2><p>{t.stackSub}</p></div>
            <TerminalSquare size={32} strokeWidth={1.2} />
          </div>
          <div className="stack-list">
            {['React', 'TypeScript', 'JavaScript', 'Vite', 'HTML & CSS', 'Google Apps Script', 'GitHub Actions', 'Node.js'].map((technology, index) => (
              <span key={technology}><small>0{index + 1}</small>{technology}</span>
            ))}
          </div>
        </section>

        <section className="portfolio-contact portfolio-container" id="contact">
          <div className="contact-orbit" />
          <div className="portfolio-eyebrow"><span className="eyebrow-index">04 /</span>{t.contactEyebrow}</div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <a className="portfolio-primary" href="https://github.com/pooya16pg-spec" target="_blank" rel="noreferrer">{t.contactAction}<ArrowUpRight size={16} /></a>
        </section>
      </main>

      <footer className="portfolio-footer portfolio-container">
        <a className="portfolio-brand" href="#top"><span className="portfolio-brand-mark">P<span>.</span></span><span><strong>POOYA LABS</strong><small>PERSONAL PORTFOLIO</small></span></a>
        <span>{t.footer}</span>
        <a href="https://github.com/pooya16pg-spec" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a>
        <small>© {new Date().getFullYear()} POOYA LABS</small>
      </footer>
    </div>
  );
}
