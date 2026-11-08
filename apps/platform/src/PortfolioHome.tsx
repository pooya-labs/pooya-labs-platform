import { Activity, ArrowDown, ArrowUpLeft, ArrowUpRight, BookOpen, Code2, ExternalLink, Layers3, Monitor, Moon, Send, Sun, TerminalSquare } from 'lucide-react';
import { useEffect, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { portfolioProjects as projects, type PortfolioProject } from './content/projects';
import { coreDossiers } from './content/case-study-dossiers-core';
import { productDossiers } from './content/case-study-dossiers-products';
import { architectureDiagrams } from './content/architecture-diagrams';
import type { CaseStudyDossier } from './content/case-study-dossiers-types';
import { NovelLibrarySection, NovelReader, loadNovelCatalog, localizedNovelText, type NovelRecord } from './NovelLibrary';

type Language = 'fa' | 'en';
type Theme = 'dark' | 'light';

function getProjectSlugFromLocation(): string | null {
  const querySlug = new URLSearchParams(window.location.search).get('project');
  if (querySlug) return querySlug;
  const match = window.location.pathname.match(/\/(?:en\/)?projects\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

function getNovelSlugFromLocation(): string | null {
  return new URLSearchParams(window.location.search).get('novel');
}

function getProjectRouteHref(slug: string, language: Language, baseUrl = import.meta.env.BASE_URL): string {
  if (baseUrl === './') return `?project=${encodeURIComponent(slug)}`;
  return `${baseUrl}${language === 'en' ? 'en/' : ''}projects/${encodeURIComponent(slug)}/`;
}

const proofRays = Array.from({ length: 112 }, (_, index) => {
  const progress = index / 111;
  const x = 34 + progress * 1132;
  const spread = Math.abs(progress - 0.5) * 2;
  const y = 26 + spread * 112 + ((index * 17) % 9) * 2;
  const bend = (index % 7 - 3) * 7;
  const c1x = 600 + (x - 600) * 0.16 + bend;
  const c2x = 600 + (x - 600) * 0.78 - bend;
  const c2y = y + 88 + ((index * 13) % 20);
  return { id: index, x, y, c1x, c2x, c2y, opacity: 0.2 + ((index * 19) % 55) / 100, width: index % 9 === 0 ? 1.6 : 0.85 };
});
const proofParticles = Array.from({ length: 72 }, (_, index) => {
  const progress = ((index * 37) % 71) / 70;
  const x = 56 + progress * 1088;
  const y = 52 + ((index * 53) % 250);
  return { id: index, x, y, radius: index % 8 === 0 ? 2.1 : 1.1, delay: (index % 13) * -0.43 };
});

interface PortfolioHomeProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onOpenWorkspace: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
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
    headlineWord: '',
    headlineC: 'تبدیل می‌کنم.',
    intro: 'من پویا هستم؛ دانشجوی مهندسی کامپیوتر با تمرکز بر طراحی محصول، مهندسی فرانت‌اند و تفکر سیستمی. اینجا پروژه‌هایی را می‌بینی که می‌سازم، همراه با مسیر فنی، تصمیم‌ها و وضعیت واقعی هرکدام.',
    explore: 'دیدن پروژه‌ها',
    github: 'گیت‌هاب من',
    scroll: 'برای آشنایی بیشتر پایین برو',
    selected: 'کارهای منتخب',
    selectedSub: 'پروژه‌ها و آزمایش‌هایی که بخشی از مسیر یادگیری و مهندسی من هستند.',
    allProjects: '۸ پروژه در ویترین',
    proofEyebrow: 'بنیان مهندسی', proofTitle: 'پشت هر پروژه، یک بنیان مهندسی.', proofSub: 'نرم‌افزار، سیستم و تجربه‌های محصولی که با شواهد واقعی ساخته شده‌اند.', proofStat1: 'پروژه مستقل', proofStat2: 'صفحه مطالعه موردی', proofStat3: 'زبان رابط', proofStat4: 'مسیر انتشار',
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
    contactAction: 'مشاهده پروفایل گیت‌هاب', contactTelegram: 'تلگرام', contactInstagram: 'اینستاگرام',
    footer: 'طراحی و توسعه با کنجکاوی و وسواس مهندسی.',
    workspace: 'ورود به فضای کاری',
    language: 'English',
    themeToggle: 'حالت روشن',
    capabilityEyebrow: 'مهارت‌ها / رویکرد', capabilityTitle: 'مهندسی با تمرکز بر تجربه و جزئیات.', capabilitySub: 'از رابط‌های دقیق تا سیستم‌های قابل اتکا؛ هر لایه با هدف روشن ساخته می‌شود.',
    systemEyebrow: 'جریان سیستم‌ها',
    systemTitle: 'سه لایه، یک تجربه‌ی یکپارچه.',
    systemSub: 'رابط، منطق و زیرساخت وقتی خوب کنار هم قرار می‌گیرند که مسیر داده و رفتارشان روشن باشد.',
    systemStatus: 'یک جریان پیوسته / سه لایه',
    systemNode1: 'تجربه',
    systemNode1Meta: 'طراحی و تعامل',
    systemNode1Body: 'جایی که کاربر با محصول ارتباط می‌گیرد.',
    systemNode2: 'منطق',
    systemNode2Meta: 'مدل و جریان داده',
    systemNode2Body: 'جایی که تصمیم‌ها و رفتار محصول شکل می‌گیرند.',
    systemNode3: 'زیرساخت',
    systemNode3Meta: 'اجرا و مشاهده‌پذیری',
    systemNode3Body: 'جایی که پایداری و وضوح عملیاتی معنا پیدا می‌کند.',
    systemFoot: 'طراحی ← منطق ← اجرا',

    capability1Title: 'تجربه‌های محصولی سنجیده', capability1Body: 'رابط‌هایی سریع، واضح و واکنش‌گرا که جزئیات بصری را با دسترس‌پذیری و رفتار قابل پیش‌بینی همراه می‌کنند.',
    capability2Title: 'سیستم‌های متصل و قابل مشاهده', capability2Body: 'معماری، جریان داده و سیگنال‌های عملیاتی را به ساختارهایی تبدیل می‌کنم که بتوان آن‌ها را فهمید و آزمایش کرد.',
    capability3Title: 'ابزارهای خلاق و تعاملی', capability3Body: 'از canvasهای بصری تا تجربه‌های مرورگری؛ ایده‌ها را به ابزارهایی تبدیل می‌کنم که می‌شود با آن‌ها کار کرد.',
    processEyebrow: 'روش کار', processTitle: 'از مسئله تا جزئیات قابل اعتماد.', processSub: 'یک مسیر روشن برای ساختن، سنجیدن و بهترکردن.',
    process1Title: 'کشف مسئله', process1Body: 'هدف، محدودیت‌ها و تجربه‌ای را که باید بهتر شود مشخص می‌کنم.',
    process2Title: 'طراحی ساختار', process2Body: 'مدل داده، معماری و زبان بصری را پیش از پیچیده‌شدن پیاده‌سازی روشن می‌کنم.',
    process3Title: 'ساخت و اصلاح', process3Body: 'قابلیت‌ها را مرحله‌ای می‌سازم و با بازخورد و تست، لبه‌های ناپیدا را پیدا می‌کنم.',
    process4Title: 'اعتبارسنجی', process4Body: 'رفتار، دسترس‌پذیری و مرزهای واقعی هر خروجی را بررسی و مستند می‌کنم.',
    craftEyebrow: 'اصول ساخت',
    craftTitle: 'تجربه‌ی خوب از تصمیم‌های درست می‌آید.',
    craftSub: 'حرکت، وضوح و جزئیات باید به فهم محصول کمک کنند؛ نه اینکه مزاحم آن شوند.',
    craft1Title: 'وضوح',
    craft1Body: 'هر بخش باید بدون شلوغی، هدف و نقش خودش را نشان دهد.',
    craft2Title: 'حرکت هدفمند',
    craft2Body: 'انیمیشن وقتی ارزش دارد که تغییر را توضیح دهد یا بازخوردی مفید بسازد.',
    craft3Title: 'قابلیت اتکا',
    craft3Body: 'رفتارهای مهم باید قابل مشاهده، آزمون و بازبینی باشند.',
    craft4Title: 'کنجکاوی',
    craft4Body: 'ایده‌ها و ابزارهای تازه را با آزمایش‌های کوچک و قابل سنجش بررسی می‌کنم.',

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
    headlineB: 'into',
    headlineWord: 'thoughtful',
    headlineC: 'digital experiences.',
    intro: 'I’m Pooya, a computer engineering student focused on product design, frontend engineering, and systems thinking. Here I share the projects I build, along with their technical journey, decisions, and honest current status.',
    explore: 'Explore projects',
    github: 'My GitHub',
    scroll: 'Scroll to explore',
    selected: 'Selected work',
    selectedSub: 'Projects and experiments that are part of my engineering journey.',
    allProjects: '8 projects featured',
    proofEyebrow: 'THE ENGINEERING FOUNDATION', proofTitle: 'The foundation behind every project.', proofSub: 'Software, systems, and product experiences built with visible evidence.', proofStat1: 'Independent projects', proofStat2: 'Case-study routes', proofStat3: 'Interface languages', proofStat4: 'Publishing targets',
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
    contactAction: 'View GitHub profile', contactTelegram: 'Telegram', contactInstagram: 'Instagram',
    footer: 'Designed and built with curiosity and engineering care.',
    workspace: 'Open workspace',
    language: 'فارسی',
    themeToggle: 'Switch to light mode',
    capabilityEyebrow: 'CAPABILITIES / APPROACH', capabilityTitle: 'Thoughtful engineering, from interface to infrastructure.', capabilitySub: 'Distinct layers, one clear intent: make complex things feel considered and usable.',
    systemEyebrow: 'SYSTEMS IN MOTION',
    systemTitle: 'Three layers. One coherent experience.',
    systemSub: 'Interface, logic, and infrastructure work best when their data and behavior form one understandable path.',
    systemStatus: 'ONE FLOW / THREE LAYERS',
    systemNode1: 'Experience',
    systemNode1Meta: 'Design & interaction',
    systemNode1Body: 'Where people meet the product.',
    systemNode2: 'Logic',
    systemNode2Meta: 'Models & data flow',
    systemNode2Body: 'Where decisions and product behavior take shape.',
    systemNode3: 'Infrastructure',
    systemNode3Meta: 'Runtime & observability',
    systemNode3Body: 'Where reliability and operational clarity live.',
    systemFoot: 'DESIGN → LOGIC → DELIVERY',

    capability1Title: 'Product experiences with intent', capability1Body: 'Fast, readable, responsive interfaces where visual detail works alongside accessibility and predictable behavior.',
    capability2Title: 'Connected, observable systems', capability2Body: 'Turning architecture, data flow, and operational signals into structures people can understand, inspect, and test.',
    capability3Title: 'Creative tools and interactions', capability3Body: 'From visual canvases to browser-native experiments, ideas become useful tools you can actually work with.',
    processEyebrow: 'THE PROCESS', processTitle: 'A clear path from problem to confidence.', processSub: 'A practical loop for shaping, building, and validating meaningful work.',
    process1Title: 'Understand the problem', process1Body: 'Define the goal, constraints, and the experience that needs to improve.',
    process2Title: 'Shape the system', process2Body: 'Make the data model, architecture, and visual language clear before complexity grows.',
    process3Title: 'Build and refine', process3Body: 'Ship in deliberate steps, then use feedback and tests to uncover the hidden edges.',
    process4Title: 'Validate the details', process4Body: 'Check behavior, accessibility, and real scope, then document what the result does and does not do.',
    craftEyebrow: 'CRAFT PRINCIPLES',
    craftTitle: 'Good experiences come from good decisions.',
    craftSub: 'Motion, clarity, and detail should make a product easier to understand — never harder.',
    craft1Title: 'Clarity',
    craft1Body: 'Every layer should communicate its purpose without adding noise.',
    craft2Title: 'Purposeful motion',
    craft2Body: 'Animation earns its place when it explains change or gives useful feedback.',
    craft3Title: 'Reliability',
    craft3Body: 'Important behavior should be observable, testable, and honest about its limits.',
    craft4Title: 'Curiosity',
    craft4Body: 'New tools and ideas deserve small, measurable experiments.',

    status: 'Project status',
    caseStudy: 'Case study coming soon',
    demo: 'Live demo', source: 'Source', caseStudyReady: 'Case study',
    details: 'Project details', challenge: 'The challenge', approach: 'Approach', highlights: 'Capabilities & implementation', boundaries: 'Scope & boundaries', role: 'Project role', architecture: 'Technical architecture', implementation: 'Implementation details', decisions: 'Engineering decisions', validation: 'Verification & evidence', sources: 'Documentation & sources', interfaceCaptures: 'Interface captures', backProjects: 'Back to projects',
  },
} satisfies Record<Language, Record<string, string>>;


function ProjectMotionScene({ slug, compact = false }: { slug: string; compact?: boolean }): ReactNode {
  if (compact) {
    return (
      <div className={`project-card-motion card-scene-${slug}`} aria-hidden="true">
        {slug === 'aetherflow' && <><i className="mini-flow-node" /><i className="mini-flow-edge" /><i className="mini-flow-node second" /><i className="mini-flow-edge second" /><i className="mini-flow-node third" /><b className="mini-flow-packet" /></>}
        {slug === 'orbit' && <><i className="mini-orbit-ring" /><i className="mini-orbit-ring second" /><b className="mini-orbit-pulse" /><span className="mini-orbit-bars"><i /><i /><i /><i /><i /></span></>}
        {slug === 'pooya-os' && <><i className="mini-os-window back" /><i className="mini-os-window front" /><b className="mini-os-cursor" /></>}
        {slug === 'nexus-canvas' && <><i className="mini-nexus-edge one" /><i className="mini-nexus-edge two" /><i className="mini-nexus-edge three" /><b className="mini-nexus-node one" /><b className="mini-nexus-node two" /><b className="mini-nexus-node three" /><b className="mini-nexus-node four" /></>}
        {slug === 'lumina-glass' && <><i className="mini-glass-orb" /><i className="mini-glass-orbit one" /><i className="mini-glass-orbit two" /><b className="mini-glass-sheen" /></>}
        {slug === 'aura-pulse' && <><span className="mini-market-bars"><i /><i /><i /><i /><i /><i /><i /></span><b className="mini-market-line" /></>}
        {slug === 'global-cart' && <><i className="mini-cart-product one" /><i className="mini-cart-product two" /><i className="mini-cart-product three" /><b className="mini-cart-basket" /></>}
        {slug === 'salon-booking' && <><span className="mini-booking-grid">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</span><b className="mini-booking-slot" /></>}
      </div>
    );
  }

  const shell = (className: string, children: ReactNode) => (
    <div className={`case-study-motion-art scene-${slug} ${className}`} aria-hidden="true">{children}</div>
  );

  switch (slug) {
    case 'aetherflow':
      return shell('flow-scene', <>
        <div className="scene-topline"><span>EXECUTION GRAPH / 01</span><i><b className="scene-animated flow-live-dot" />DURABLE RUN</i></div>
        <div className="flow-sequence">
          <div className="flow-step flow-trigger"><span className="flow-icon">↳</span><strong>TRIGGER</strong><small>event received</small></div>
          <span className="flow-edge"><i className="scene-animated" /><b className="scene-animated flow-packet" /></span>
          <div className="flow-step flow-worker"><span className="flow-icon">01</span><strong>WORKER</strong><small>lease active</small></div>
          <span className="flow-edge"><i className="scene-animated" /><b className="scene-animated flow-packet second" /></span>
          <div className="flow-step flow-commit"><span className="flow-icon">✓</span><strong>COMMIT</strong><small>state persisted</small></div>
        </div>
        <div className="flow-foot"><span>RETRY / RECOVERY</span><div><i /><i /><i /><i /></div><span>AT-LEAST-ONCE</span></div>
        <span className="flow-sweep scene-animated" />
      </>);
    case 'orbit':
      return shell('orbit-scene', <>
        <div className="scene-topline"><span>OBSERVABILITY / SIGNAL MAP</span><i><b className="scene-animated orbit-live-dot" />DEMO SIGNALS</i></div>
        <div className="orbit-dashboard">
          <div className="orbit-health-card"><small>SERVICE HEALTH</small><strong>HEALTHY</strong><span className="scene-animated orbit-health-pulse" /></div>
          <div className="orbit-stat-card"><small>INCIDENT FLOW</small><strong>01 <em>OPEN</em></strong><span>ACK → INVESTIGATE → RESOLVE</span></div>
          <div className="orbit-chart-card">
            <div className="orbit-chart-label"><span>METRICS / LOGS / TRACES</span><b>ILLUSTRATIVE</b></div>
            <svg viewBox="0 0 420 150" preserveAspectRatio="none">
              <path className="orbit-chart-grid" d="M0 30H420 M0 75H420 M0 120H420" />
              <path className="orbit-chart-path scene-animated" d="M0 105 C38 99 48 43 86 58 S140 112 176 82 S224 28 260 48 S309 104 343 72 S389 39 420 24" />
              <circle className="orbit-chart-point scene-animated" cx="343" cy="72" r="5" />
            </svg>
          </div>
          <div className="orbit-log-card"><i /><span>trace.span.completed</span><b>12 ms</b><i /><span>incident.timeline.updated</span><b>now</b></div>
        </div>
        <span className="orbit-signal-ring scene-animated" />
      </>);
    case 'pooya-os':
      return shell('os-scene', <>
        <div className="scene-topline"><span>POOYA.OS / SPATIAL WORKSPACE</span><i>LOCAL PREVIEW</i></div>
        <div className="os-desktop">
          <div className="os-window os-window-back scene-animated"><div className="os-titlebar"><i /><i /><i /><span>FILES / PROJECTS</span></div><div className="os-file-lines"><b /><b /><b /><b /></div></div>
          <div className="os-window os-window-front scene-animated"><div className="os-titlebar"><i /><i /><i /><span>ENGINEERING PROFILE</span></div><div className="os-window-body"><div className="os-avatar">P</div><div className="os-profile-lines"><b /><b /><b /></div></div><div className="os-terminal-line"><span>pooya@workspace</span><i className="scene-animated os-cursor" /></div></div>
          <div className="os-dock"><i /><i /><i /><i /><i /></div>
        </div>
        <span className="os-focus-glow scene-animated" />
      </>);
    case 'nexus-canvas':
      return shell('nexus-scene', <>
        <div className="scene-topline"><span>NEXUS CANVAS / TOPOLOGY</span><i>GRAPH MODEL</i></div>
        <div className="nexus-stage">
          <svg className="nexus-wires" viewBox="0 0 520 300" preserveAspectRatio="none">
            <path className="nexus-edge scene-animated" d="M76 145 C140 145 140 62 218 62 S302 145 386 145" />
            <path className="nexus-edge secondary scene-animated" d="M76 145 C142 145 145 244 232 244 S306 145 386 145" />
            <path className="nexus-edge third scene-animated" d="M218 62 C260 62 272 145 386 145 L462 78" />
          </svg>
          <div className="nexus-node node-gateway"><i />GATEWAY<small>edge</small></div>
          <div className="nexus-node node-service"><i />SERVICE<small>api</small></div>
          <div className="nexus-node node-worker"><i />WORKER<small>async</small></div>
          <div className="nexus-node node-database"><i />DATABASE<small>store</small></div>
          <span className="nexus-focus-ring scene-animated" />
        </div>
        <div className="nexus-toolbar"><span>CANVAS / 04 NODES</span><span>SNAPSHOT READY</span></div>
      </>);
    case 'lumina-glass':
      return shell('glass-scene', <>
        <div className="scene-topline"><span>LUMINAGLASS / OPTICAL STUDIO</span><i>REFRACTION LAB</i></div>
        <div className="glass-stage">
          <div className="glass-orbit glass-orbit-a scene-animated" /><div className="glass-orbit glass-orbit-b scene-animated" />
          <div className="glass-prism scene-animated"><i /><b /></div>
          <span className="glass-light-ray ray-a scene-animated" /><span className="glass-light-ray ray-b scene-animated" />
          <div className="glass-controls"><span>BLUR <b>24 PX</b></span><i /><span>REFRACTION <b>0.72</b></span><i /><div><b /><b /><b /><b /></div></div>
        </div>
        <span className="glass-footnote">LIGHT / DEPTH / MATERIAL</span>
      </>);
    case 'aura-pulse':
      return shell('market-scene', <>
        <div className="scene-topline"><span>AURAPULSE / MARKET VIEW</span><i className="market-simulated">SIMULATED</i></div>
        <div className="market-stage">
          <div className="market-symbol"><strong>BTC / USD</strong><span>PRICE MOVEMENT · SAMPLE DATA</span></div>
          <div className="market-chart">
            <svg viewBox="0 0 520 230" preserveAspectRatio="none">
              <path className="market-grid" d="M0 45H520 M0 92H520 M0 139H520 M0 186H520" />
              <path className="market-line scene-animated" d="M0 175 C38 164 50 128 84 139 S132 170 164 119 S214 92 247 111 S290 72 328 89 S370 123 405 74 S468 58 520 28" />
              <circle className="market-point scene-animated" cx="405" cy="74" r="6" />
            </svg>
            <div className="market-candles">{[34, 54, 42, 72, 49, 88, 62, 96, 71, 110, 84, 126, 103, 138].map((height, index) => <i className="scene-animated" key={index} style={{ height: height + 'px', animationDelay: (index * -0.13) + 's' }} />)}</div>
          </div>
          <div className="market-range"><span>1H</span><span>24H</span><span>7D</span><b>30D</b></div>
        </div>
      </>);
    case 'global-cart':
      return shell('commerce-scene', <>
        <div className="scene-topline"><span>GLOBALCART / PRODUCT DISCOVERY</span><i>CATALOG FLOW</i></div>
        <div className="commerce-stage">
          <div className="commerce-products">
            <div className="commerce-product product-a scene-animated"><span className="commerce-product-art headphones" /><b>Audio</b><small>01 / LISTING</small></div>
            <div className="commerce-product product-b scene-animated"><span className="commerce-product-art device" /><b>Devices</b><small>02 / DETAILS</small></div>
            <div className="commerce-product product-c scene-animated"><span className="commerce-product-art home" /><b>Home</b><small>03 / DISCOVERY</small></div>
          </div>
          <div className="commerce-cart scene-animated"><span>↗</span><b>COMPARE</b><i /></div>
          <span className="commerce-route scene-animated" />
        </div>
        <div className="commerce-foot"><span>SEARCH</span><span>FILTER</span><span>COMPARE</span><span>DETAIL</span></div>
      </>);
    case 'salon-booking':
      return shell('booking-scene', <>
        <div className="scene-topline"><span>SALON BOOKING / APPOINTMENTS</span><i>WEEKLY SCHEDULE</i></div>
        <div className="booking-stage">
          <div className="booking-calendar">
            <div className="booking-calendar-head"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span></div>
            <div className="booking-slots">{Array.from({ length: 25 }, (_, index) => <i key={index} className={index === 11 ? 'selected' : index % 6 === 0 ? 'busy' : ''} />)}</div>
            <span className="booking-sweep scene-animated" />
          </div>
          <div className="booking-confirmation scene-animated"><span>✓</span><div><b>APPOINTMENT</b><small>11:30 / CONFIRMED</small></div><i /></div>
          <span className="booking-orbit-dot scene-animated" />
        </div>
      </>);
    default:
      return shell('generic-scene', <div className="scene-topline"><span>PROJECT / SYSTEM MAP</span><i>READY</i></div>);
  }
}

export function ProjectCaseStudy({ project, language, onLanguageChange, theme, onThemeChange, onBack, baseUrl }: { project: PortfolioProject; language: Language; onLanguageChange: (language: Language) => void; theme: Theme; onThemeChange: (theme: Theme) => void; onBack: () => void; baseUrl: string }): ReactNode {
  const t = text[language];
  const rtl = language === 'fa';
  const dossier = ((coreDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug] ?? (productDossiers as unknown as Record<string, CaseStudyDossier>)[project.slug])!;
  const architectureDiagram = architectureDiagrams[project.slug];
  const architectureImage = baseUrl === './' ? null : `${baseUrl}architecture/${project.slug}${language === 'en' ? '-en' : ''}.svg`;
  const heroVisual = project.caseStudyHeroAsset ?? project.visualAsset;
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
          <button className="portfolio-theme" type="button" onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? (rtl ? 'فعال‌کردن حالت روشن' : 'Switch to light mode') : (rtl ? 'فعال‌کردن حالت تیره' : 'Switch to dark mode')} title={theme === 'dark' ? (rtl ? 'حالت روشن' : 'Light mode') : (rtl ? 'حالت تیره' : 'Dark mode')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}<span>{theme === 'dark' ? (rtl ? 'روشن' : 'Light') : (rtl ? 'تیره' : 'Dark')}</span></button>
          <button className="portfolio-language" onClick={() => { const nextLanguage = rtl ? 'en' : 'fa'; onLanguageChange(nextLanguage); if (baseUrl !== './') { window.history.replaceState({}, '', new URL(getProjectRouteHref(project.slug, nextLanguage, baseUrl), window.location.href)); } }}>{t.language}</button>
          <button className="portfolio-workspace" onClick={onBack} aria-label={t.backProjects} title={t.backProjects}><span>{t.backProjects}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="case-study-main portfolio-container">
        <a className="case-study-back" href={baseUrl} onClick={(event) => { event.preventDefault(); onBack(); }}><ArrowUpLeft size={15} />{t.backProjects}</a>
        <section className="case-study-hero" data-reveal="case-study-hero">
          <div className={`case-study-visual${heroVisual ? ' has-visual' : ''}`}>
            {heroVisual
              ? <img className={`case-study-visual-image visual-${heroVisual.kind}`} src={heroVisual.url} alt={heroVisual.alt[language]} loading="eager" decoding="async" />
              : <ProjectMotionScene slug={project.slug} />}
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
        {mobileCaptures.length > 0 && (
          <section className="case-study-media-section" data-reveal="case-study-media">
            <div className="case-study-media-heading">
              <div className="portfolio-eyebrow"><span className="eyebrow-index">UI /</span>{t.interfaceCaptures}</div>
              <span className="case-study-media-note">{language === 'fa' ? 'نمای کامل محیط / دسکتاپ و موبایل' : 'FULL-PAGE PRODUCT / RESPONSIVE VIEWS'}</span>
            </div>
            <div className="case-study-media-grid">
              {mobileCaptures.map((item) => <figure className={`case-study-media-card device-${item.device}`} key={item.url}><div className="case-study-media-frame" data-gallery-scroll="true" role="region" tabIndex={0} aria-label={language === 'fa' ? `${project.name} — ${item.caption.fa}` : `${project.name} — ${item.caption.en}`}><img src={item.url} alt={item.alt[language]} loading="lazy" decoding="async" /></div><figcaption>{item.caption[language]}{item.device === 'mobile' && <span className="case-study-scroll-note">{language === 'fa' ? 'داخل تصویر اسکرول کن؛ بعد از رسیدن به انتها، صفحه ادامه پیدا می‌کند.' : 'Scroll inside the image; the page continues once the image reaches its end.'}</span>}</figcaption></figure>)}
            </div>
          </section>
        )}
        <section className="case-study-section-grid" data-reveal="case-study-section">
          <article className="case-study-panel">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">01 /</span>{t.challenge}</div>
            <p>{project.caseStudy.challenge[language]}</p>
          </article>
          <article className="case-study-panel">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">02 /</span>{t.approach}</div>
            <p>{project.caseStudy.approach[language]}</p>
          </article>
        </section>
        <section className="case-study-dossier-grid" data-reveal="case-study-dossier">
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
        <section className="case-study-detail-grid" data-reveal="case-study-detail">
          <article className="case-study-highlights">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">05 /</span>{t.implementation}</div>
            <ul>{dossier.implementation[language].map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
          </article>
          <article className="case-study-highlights">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">06 /</span>{t.decisions}</div>
            <ul>{dossier.decisions[language].map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
          </article>
        </section>
        <section className="case-study-detail-grid" data-reveal="case-study-detail">
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
        <section className="case-study-highlights" data-reveal="case-study-highlights">
          <div className="portfolio-eyebrow"><span className="eyebrow-index">09 /</span>{t.highlights}</div>
          <ul>{project.caseStudy.highlights[language].map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
        </section>
        <section className="case-study-boundaries" data-reveal="case-study-boundaries">
          <div className="portfolio-eyebrow"><span className="eyebrow-index">10 /</span>{t.boundaries}</div>
          <p>{project.caseStudy.boundaries[language]}</p>
        </section>
      </main>
      <footer className="portfolio-footer">
        <div className="portfolio-footer-inner portfolio-container">
          <a className="portfolio-brand" href="#top"><span className="portfolio-brand-mark"><img src={`${baseUrl}brand/pooya-monogram.webp`} alt="" aria-hidden="true" /></span><span><strong>POOYA LABS</strong><small>INDEPENDENT SOFTWARE BUILDER</small></span></a>
          <p>{t.footer}</p>
          <div className="portfolio-footer-socials">
            <a href="https://github.com/pooya-labs" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Code2 size={17} /> GitHub</a>
            <a href="https://t.me/pooyayee" target="_blank" rel="noopener noreferrer" aria-label="Telegram @pooyayee"><Send size={16} /> @pooyayee</a>
            <a href="https://instagram.com/_p.ooya" target="_blank" rel="noopener noreferrer" aria-label="Instagram @_p.ooya"><img className="instagram-brand-icon" src={`${baseUrl}brand/instagram-glyph.svg`} alt="" aria-hidden="true" /> @_p.ooya</a>
          </div>
          <small>© {new Date().getFullYear()} POOYA LABS</small>
        </div>
      </footer>
    </div>
  );
}


export interface HydratedCaseStudyProps {
  project: PortfolioProject;
  language: Language;
  baseUrl: string;
}

/**
 * Server and browser share this exact component tree for direct case-study routes.
 * Hydration preserves the crawler-readable HTML instead of clearing it on first paint.
 */
export function HydratedCaseStudy({ project, language: initialLanguage, baseUrl }: HydratedCaseStudyProps): ReactNode {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>('dark');
  const [preferencesReady, setPreferencesReady] = useState(false);
  const rtl = language === 'fa';

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    if (baseUrl !== './') {
      window.history.replaceState({}, '', getProjectRouteHref(project.slug, nextLanguage, baseUrl));
    }
  };

  const returnToPortfolio = () => {
    window.location.href = baseUrl;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    try {
      window.localStorage.setItem('pooya-labs:language-v2', language);
    } catch {
      // Storage may be unavailable in restricted browsing contexts.
    }
    const title = rtl
      ? `${project.name} | مطالعه پروژه در Pooya Labs`
      : `${project.name} | Project Study — Pooya Labs`;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', project.description[language]);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', project.description[language]);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'fa' ? 'fa_IR' : 'en_US');
    const canonicalUrl = new URL(getProjectRouteHref(project.slug, language, baseUrl), window.location.href);
    canonicalUrl.hash = '';
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl.toString());
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl.toString());
  }, [baseUrl, language, project, rtl]);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem('pooya-labs:theme');
      if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
    } catch {
      // Storage may be unavailable in restricted browsing contexts.
    }
    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem('pooya-labs:theme', theme);
    } catch {
      // Storage may be unavailable in restricted browsing contexts.
    }
  }, [preferencesReady, theme]);

  useEffect(() => {
    const syncLanguageFromRoute = () => {
      setLanguage(window.location.pathname.includes('/en/projects/') ? 'en' : 'fa');
    };
    window.addEventListener('popstate', syncLanguageFromRoute);
    return () => window.removeEventListener('popstate', syncLanguageFromRoute);
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.portfolio-case-study');
    if (!root || !('IntersectionObserver' in window)) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;
    root.scrollTop = 0;
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
  }, [project.slug]);

  return (
    <ProjectCaseStudy
      project={project}
      language={language}
      onLanguageChange={changeLanguage}
      theme={theme}
      onThemeChange={setTheme}
      onBack={returnToPortfolio}
      baseUrl={baseUrl}
    />
  );
}

export default function PortfolioHome({ language, onLanguageChange, theme, onThemeChange, onOpenWorkspace }: PortfolioHomeProps): ReactNode {
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
  const heroPreviewProjects = ['global-cart', 'orbit', 'nexus-canvas', 'lumina-glass', 'aura-pulse']
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is PortfolioProject => Boolean(project && (project.caseStudyHeroAsset || project.visualAsset)));

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.portfolio-page');
    if (!root || !('IntersectionObserver' in window)) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;
    // .portfolio-page owns scrolling; reset it on route changes and observe within that viewport.
    root.scrollTop = 0;
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

  if (selectedProject) return <ProjectCaseStudy project={selectedProject} language={language} onLanguageChange={onLanguageChange} theme={theme} onThemeChange={onThemeChange} onBack={closeCaseStudy} baseUrl={import.meta.env.BASE_URL} />;
  if (selectedNovelSlug) return <NovelReader novel={selectedNovel} language={language} theme={theme} onThemeChange={onThemeChange} loading={novelCatalogLoading} error={novelCatalogError} onBack={closeNovel} />;

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
          <a href="#stack">{t.navStack}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="portfolio-header-actions">
          <button className="portfolio-theme" type="button" onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? t.themeToggle : (rtl ? 'حالت تیره' : 'Switch to dark mode')} title={theme === 'dark' ? t.themeToggle : (rtl ? 'حالت تیره' : 'Dark mode')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}<span>{theme === 'dark' ? (rtl ? 'روشن' : 'Light') : (rtl ? 'تیره' : 'Dark')}</span></button>
          <button className="portfolio-language" onClick={() => onLanguageChange(rtl ? 'en' : 'fa')}>{t.language}</button>
          <button className="portfolio-workspace" onClick={onOpenWorkspace} aria-label={t.workspace} title={t.workspace}><span>{t.workspace}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>

      <main id="top" tabIndex={-1}>
        <section className="portfolio-hero portfolio-container">
          <div className="portfolio-hero-copy" data-reveal="hero-copy">
            <div className="portfolio-eyebrow"><span className="eyebrow-pulse" />{t.eyebrow}</div>
            <h1 className="portfolio-hero-title" dir="auto"><span dir="auto" className="hero-title-line">{t.headlineA}</span><span dir="auto" className={t.headlineWord ? 'hero-title-line hero-title-word-line' : 'hero-title-line hero-gradient'}>{t.headlineWord ? <><bdi dir="ltr" className="hero-title-prefix">{t.headlineB}</bdi><bdi dir="ltr" className="hero-title-word">{t.headlineWord}</bdi></> : t.headlineB}</span><span dir="auto" className="hero-title-line">{t.headlineC}</span></h1>
            <p className="portfolio-intro" dir="auto">{t.intro}</p>
            <div className="portfolio-hero-actions">
              <a className="portfolio-primary" href="#projects">{t.explore}<ArrowDown size={16} /></a>
              <a className="portfolio-secondary portfolio-github-link" href="https://github.com/pooya-labs" target="_blank" rel="noreferrer"><img className="portfolio-github-mark" src={`${import.meta.env.BASE_URL}brand/pooya-monogram.webp`} alt="" aria-hidden="true" />{t.github}<ExternalLink size={13} /></a>
            </div>
            <div className="portfolio-social-proof"><span className="proof-line" /><span>POOYA LABS</span><span className="proof-dot">·</span><span>BUILDING IN PUBLIC</span></div>
          </div>

          <div className="portfolio-hero-art" data-reveal="hero-showcase" aria-hidden="true">
            <div className="hero-preview-backdrop" />
            <div className="hero-preview-orbit hero-preview-orbit-one" />
            <div className="hero-preview-orbit hero-preview-orbit-two" />
            {heroPreviewProjects.map((project, index) => {
              const artwork = project.caseStudyHeroAsset ?? project.visualAsset;
              if (!artwork) return null;
              return (
                <article className={`hero-preview hero-preview-${index + 1}`} key={project.slug}>
                  <div className="hero-preview-toolbar">
                    <span className="hero-preview-window-dots"><i /><i /><i /></span>
                    <strong>{project.name}</strong>
                    <small>{project.tags[0]}</small>
                  </div>
                  <div className="hero-preview-image">
                    <img src={artwork.url} alt="" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                  </div>
                  <div className="hero-preview-caption"><b>{project.name}</b><span>{project.category[language]}</span></div>
                </article>
              );
            })}
            <span className="hero-preview-coordinate coordinate-one">POOYA LABS / SELECTED WORK</span>
            <span className="hero-preview-coordinate coordinate-two">INTERACTIVE SYSTEMS / 2026</span>
          </div>
          <a className="portfolio-scroll-cue" href="#projects"><span>{t.scroll}</span><ArrowDown size={14} /></a>
        </section>

        <div className="portfolio-project-ticker" aria-hidden="true">
          <div className="project-ticker-track">
            {[...projects, ...projects].map((project, index) => (
              <span className="project-ticker-item" key={project.slug + '-' + index}>
                <b>{project.name}</b><i />
              </span>
            ))}
          </div>
        </div>

        <section className="portfolio-proof" aria-labelledby="portfolio-proof-title" data-reveal="portfolio-proof">
          <div className="portfolio-proof-heading">
            <div className="portfolio-eyebrow"><span className="eyebrow-pulse" />{t.proofEyebrow}</div>
            <h2 id="portfolio-proof-title">{t.proofTitle}</h2>
            <p>{t.proofSub}</p>
          </div>
          <div className="portfolio-proof-stats" role="group" aria-label={t.proofEyebrow}>
            <article><strong>08</strong><small>{t.proofStat1}</small></article>
            <article><strong>16</strong><small>{t.proofStat2}</small></article>
            <article><strong>02</strong><small>{t.proofStat3}</small></article>
            <article><strong>03</strong><small>{t.proofStat4}</small></article>
          </div>
          <div className="portfolio-proof-visual" aria-hidden="true">
            <svg className="proof-radial-svg" viewBox="0 0 1200 390" preserveAspectRatio="xMidYMax meet">
              <defs>
                <radialGradient id="proof-core-gradient"><stop stopColor="#bda7ff" stopOpacity=".42" /><stop offset=".42" stopColor="#8f78df" stopOpacity=".16" /><stop offset="1" stopColor="#8f78df" stopOpacity="0" /></radialGradient>
                <linearGradient id="proof-line-gradient" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#8775d8" stopOpacity=".12" /><stop offset=".52" stopColor="#a99df1" stopOpacity=".82" /><stop offset="1" stopColor="#81b7d5" stopOpacity=".18" /></linearGradient>
              </defs>
              <ellipse className="proof-radial-glow" cx="600" cy="365" rx="450" ry="220" fill="url(#proof-core-gradient)" />
              {proofRays.map((ray) => <path key={ray.id} className="proof-ray" d={'M 600 386 C ' + ray.c1x.toFixed(1) + ' 220, ' + ray.c2x.toFixed(1) + ' ' + ray.c2y.toFixed(1) + ', ' + ray.x.toFixed(1) + ' ' + ray.y.toFixed(1)} stroke="url(#proof-line-gradient)" strokeWidth={ray.width} strokeOpacity={ray.opacity} fill="none" />)}
              {proofParticles.map((particle) => <circle key={particle.id} className="proof-particle" cx={particle.x} cy={particle.y} r={particle.radius} style={{ animationDelay: particle.delay + 's' }} />)}
              <path className="proof-baseline" d="M 175 385 Q 600 300 1025 385" fill="none" />
            </svg>
          </div>
        </section>

        <section className="portfolio-capabilities portfolio-container" aria-labelledby="capabilities-title" data-reveal="capabilities">
          <div className="portfolio-section-heading"><div><div className="portfolio-eyebrow"><span className="eyebrow-index">01 /</span>{t.capabilityEyebrow}</div><h2 id="capabilities-title" dir="auto"><bdi dir="auto">{t.capabilityTitle}</bdi></h2><p dir="auto">{t.capabilitySub}</p></div><span className="portfolio-section-meta">DESIGN / SYSTEMS / TOOLS</span></div>
          <div className="capability-grid">
            <article className="capability-card" data-reveal="capability-card">
              <div className="capability-card-top"><span>01 — INTERFACE</span><Layers3 size={17} /></div>
              <div className="capability-visual capability-interface" aria-hidden="true"><div className="capability-window"><div className="capability-window-bar"><i /><i /><i /><span>workspace / overview</span></div><div className="capability-window-body"><div className="capability-sidebar"><b /><i /><i /><i /><i /></div><div className="capability-panels"><div className="capability-panel-wide"><span /><b /><i /></div><div className="capability-panel-row"><i /><i /><i /></div><div className="capability-chart"><b /><b /><b /><b /><b /><b /><b /><b /></div></div></div></div><span className="capability-float-tag">DETAIL / 001</span></div>
              <div className="capability-card-copy"><span className="capability-index">EXPERIENCE DESIGN</span><h3>{t.capability1Title}</h3><p>{t.capability1Body}</p></div>
            </article>
            <article className="capability-card" data-reveal="capability-card">
              <div className="capability-card-top"><span>02 — SYSTEMS</span><Activity size={17} /></div>
              <div className="capability-visual capability-topology" aria-hidden="true"><svg viewBox="0 0 420 220" role="presentation"><path className="topology-path" d="M55 110 L142 55 L235 86 L344 38 M55 110 L145 174 L235 86 L348 174 M142 55 L145 174 M235 86 L344 38 M235 86 L348 174" /><path className="topology-path topology-path-secondary" d="M55 110 L235 86 L348 174" /><circle cx="55" cy="110" r="10" /><circle cx="142" cy="55" r="8" /><circle cx="145" cy="174" r="8" /><circle cx="235" cy="86" r="13" /><circle cx="344" cy="38" r="8" /><circle cx="348" cy="174" r="8" /></svg><span className="topology-label topology-label-a">EVENT / STREAM</span><span className="topology-label topology-label-b">TRACE / 03</span><span className="topology-core">CORE</span></div>
              <div className="capability-card-copy"><span className="capability-index">SYSTEMS THINKING</span><h3>{t.capability2Title}</h3><p>{t.capability2Body}</p></div>
            </article>
            <article className="capability-card" data-reveal="capability-card">
              <div className="capability-card-top"><span>03 — CREATIVE TOOLS</span><TerminalSquare size={17} /></div>
              <div className="capability-visual capability-terminal" aria-hidden="true"><div className="capability-terminal-top"><span>pooya-labs / studio</span><i>● LIVE PREVIEW</i></div><div className="capability-code-lines"><span><b>01</b><code><i>const</i> idea = <em>'make it useful'</em>;</code></span><span><b>02</b><code><i>const</i> system = <em>design(idea)</em>;</code></span><span><b>03</b><code><i>await</i> validate(system);</code></span><span><b>04</b><code className="capability-cursor">ship(system)</code></span></div></div>
              <div className="capability-card-copy"><span className="capability-index">INTERACTIVE EXPERIMENTS</span><h3>{t.capability3Title}</h3><p>{t.capability3Body}</p></div>
            </article>
          </div>
        </section>

        <section className="portfolio-system-field portfolio-container" aria-labelledby="system-field-title" data-reveal="system-field">
          <div className="portfolio-section-heading system-field-heading">
            <div>
              <div className="portfolio-eyebrow"><span className="eyebrow-index">02 /</span>{t.systemEyebrow}</div>
              <h2 id="system-field-title" dir="auto">{t.systemTitle}</h2>
              <p dir="auto">{t.systemSub}</p>
            </div>
            <span className="portfolio-section-meta">DESIGN / LOGIC / DELIVERY</span>
          </div>
          <div className="system-field-panel">
            <div className="system-field-topline">
              <span className="system-field-label">POOYA LABS / SYSTEM MAP</span>
              <span className="system-field-status"><i />{t.systemStatus}</span>
            </div>
            <div className="system-field-stage">
              <svg className="system-field-wires" viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="system-wire-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#47bda0" stopOpacity=".12" />
                    <stop offset=".5" stopColor="#70e6ce" stopOpacity=".9" />
                    <stop offset="1" stopColor="#5d9fe5" stopOpacity=".16" />
                  </linearGradient>
                  <filter id="system-wire-glow" x="-20%" y="-40%" width="140%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <path className="system-wire-base" d="M130 140 C250 28 365 28 500 140 S750 252 870 140" />
                <path className="system-wire-flow" d="M130 140 C250 28 365 28 500 140 S750 252 870 140" filter="url(#system-wire-glow)" />
                <path className="system-wire-orbit" d="M130 140 C250 28 365 28 500 140 S750 252 870 140" />
                <circle className="system-wire-anchor" cx="130" cy="140" r="8" />
                <circle className="system-wire-anchor" cx="500" cy="140" r="8" />
                <circle className="system-wire-anchor" cx="870" cy="140" r="8" />
              </svg>
              <div className="system-field-nodes">
                <article className="system-field-node" data-reveal="system-node">
                  <div className="system-node-top"><span>01 / INPUT</span><Layers3 size={16} /></div>
                  <div className="system-node-mark system-node-mark-interface"><i /><i /><i /></div>
                  <h3>{t.systemNode1}</h3>
                  <strong>{t.systemNode1Meta}</strong>
                  <p>{t.systemNode1Body}</p>
                </article>
                <article className="system-field-node system-field-node-core" data-reveal="system-node">
                  <div className="system-node-top"><span>02 / LOGIC</span><Activity size={16} /></div>
                  <div className="system-node-mark system-node-mark-core"><i /><i /><i /></div>
                  <h3>{t.systemNode2}</h3>
                  <strong>{t.systemNode2Meta}</strong>
                  <p>{t.systemNode2Body}</p>
                </article>
                <article className="system-field-node" data-reveal="system-node">
                  <div className="system-node-top"><span>03 / OUTPUT</span><TerminalSquare size={16} /></div>
                  <div className="system-node-mark system-node-mark-output"><i /><i /><i /></div>
                  <h3>{t.systemNode3}</h3>
                  <strong>{t.systemNode3Meta}</strong>
                  <p>{t.systemNode3Body}</p>
                </article>
              </div>
            </div>
            <div className="system-field-foot"><span>{t.systemFoot}</span><span>01 — 03</span></div>
          </div>
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
                <div className={'project-art' + ((project.caseStudyHeroAsset ?? project.visualAsset) ? ' has-visual visual-' + (project.caseStudyHeroAsset ?? project.visualAsset)!.kind : '')}>
                  {(project.caseStudyHeroAsset ?? project.visualAsset) && <img className="project-art-image" src={(project.caseStudyHeroAsset ?? project.visualAsset)!.url}
                    alt={(project.caseStudyHeroAsset ?? project.visualAsset)!.alt[language]} loading="lazy" decoding="async"
                    onError={(event) => { event.currentTarget.remove(); event.currentTarget.parentElement?.classList.remove('has-visual'); }} />}
                  <ProjectMotionScene slug={project.slug} compact />
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

        <section className="portfolio-process portfolio-container" aria-labelledby="process-title" data-reveal="process">
          <div className="portfolio-section-heading"><div><div className="portfolio-eyebrow"><span className="eyebrow-index">03 /</span>{t.processEyebrow}</div><h2 id="process-title">{t.processTitle}</h2><p>{t.processSub}</p></div><span className="portfolio-section-meta">A CONTINUOUS LOOP</span></div>
          <div className="process-timeline">
            <article className="process-step" data-reveal="process-step"><span className="process-number">01</span><span className="process-marker"><i /></span><div><h3>{t.process1Title}</h3><p>{t.process1Body}</p></div></article>
            <article className="process-step" data-reveal="process-step"><span className="process-number">02</span><span className="process-marker"><i /></span><div><h3>{t.process2Title}</h3><p>{t.process2Body}</p></div></article>
            <article className="process-step" data-reveal="process-step"><span className="process-number">03</span><span className="process-marker"><i /></span><div><h3>{t.process3Title}</h3><p>{t.process3Body}</p></div></article>
            <article className="process-step" data-reveal="process-step"><span className="process-number">04</span><span className="process-marker"><i /></span><div><h3>{t.process4Title}</h3><p>{t.process4Body}</p></div></article>
          </div>
        </section>

        <section className="portfolio-craft portfolio-container" aria-labelledby="craft-title" data-reveal="craft">
          <div className="portfolio-section-heading">
            <div>
              <div className="portfolio-eyebrow"><span className="eyebrow-index">04 /</span>{t.craftEyebrow}</div>
              <h2 id="craft-title" dir="auto">{t.craftTitle}</h2>
              <p dir="auto">{t.craftSub}</p>
            </div>
            <span className="portfolio-section-meta">CLARITY / MOTION / TRUST</span>
          </div>
          <div className="craft-principles-grid">
            <article className="craft-principle" data-reveal="craft-principle">
              <div className="craft-principle-visual craft-visual-clarity" aria-hidden="true"><i /><i /><i /><i /></div>
              <div className="craft-principle-meta"><span>01 / CLARITY</span><span className="craft-principle-pulse" /></div>
              <h3>{t.craft1Title}</h3><p>{t.craft1Body}</p>
            </article>
            <article className="craft-principle" data-reveal="craft-principle">
              <div className="craft-principle-visual craft-visual-motion" aria-hidden="true"><i /><i /><i /><b /></div>
              <div className="craft-principle-meta"><span>02 / MOTION</span><span className="craft-principle-pulse" /></div>
              <h3>{t.craft2Title}</h3><p>{t.craft2Body}</p>
            </article>
            <article className="craft-principle" data-reveal="craft-principle">
              <div className="craft-principle-visual craft-visual-reliability" aria-hidden="true"><i /><b /></div>
              <div className="craft-principle-meta"><span>03 / RELIABILITY</span><span className="craft-principle-pulse" /></div>
              <h3>{t.craft3Title}</h3><p>{t.craft3Body}</p>
            </article>
            <article className="craft-principle" data-reveal="craft-principle">
              <div className="craft-principle-visual craft-visual-curiosity" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="craft-principle-meta"><span>04 / CURIOSITY</span><span className="craft-principle-pulse" /></div>
              <h3>{t.craft4Title}</h3><p>{t.craft4Body}</p>
            </article>
          </div>
        </section>

        <NovelLibrarySection language={language} novels={novelCatalog.filter((novel) => novel.published)} loading={novelCatalogLoading} error={novelCatalogError} onOpen={openNovel} />

        <section className="portfolio-about portfolio-container" id="about" data-reveal="about">
          <div className="about-stamp"><div className="stamp-orbit" /><div className="stamp-core"><img src={`${import.meta.env.BASE_URL}brand/pooya-monogram.webp`} alt="Pooya Labs" /></div><span>ABOUT / POOYA</span></div>
          <div className="about-content">
            <div className="portfolio-eyebrow"><span className="eyebrow-index">03 /</span>{t.aboutEyebrow}</div>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
            <img className="pooya-wordmark" src={`${import.meta.env.BASE_URL}brand/pooya-wordmark.webp`} alt="POOYA — LABS" loading="lazy" decoding="async" />
            <div className="focus-heading"><Layers3 size={16} />{t.focus}</div>
            <ul className="focus-list">
              <li>{t.focus1}</li><li>{t.focus2}</li><li>{t.focus3}</li><li>{t.focus4}</li>
            </ul>
          </div>
        </section>

        <section className="portfolio-stack portfolio-container" id="stack" data-reveal="stack">
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

        <section className="portfolio-contact portfolio-container" id="contact" data-reveal="contact">
          <div className="contact-orbit" />
          <div className="portfolio-eyebrow"><span className="eyebrow-index">05 /</span>{t.contactEyebrow}</div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <div className="portfolio-contact-actions">
            <a className="portfolio-primary portfolio-contact-github" href="https://github.com/pooya-labs" target="_blank" rel="noopener noreferrer"><Code2 size={18} /><span>{t.contactAction}<small>github.com/pooya-labs</small></span><ArrowUpRight size={16} /></a>
            <a className="portfolio-social-button" href="https://t.me/pooyayee" target="_blank" rel="noopener noreferrer" aria-label="Telegram @pooyayee"><Send size={17} /><span>{t.contactTelegram}<small>@pooyayee</small></span><ArrowUpRight size={15} /></a>
            <a className="portfolio-social-button" href="https://instagram.com/_p.ooya" target="_blank" rel="noopener noreferrer" aria-label="Instagram @_p.ooya"><img className="instagram-brand-icon" src={`${import.meta.env.BASE_URL}brand/instagram-glyph.svg`} alt="" aria-hidden="true" /><span>{t.contactInstagram}<small>@_p.ooya</small></span><ArrowUpRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer portfolio-container">
        <a className="portfolio-brand" href="#top"><span className="portfolio-brand-mark"><img src={`${import.meta.env.BASE_URL}brand/pooya-monogram.webp`} alt="" aria-hidden="true" /></span><span><strong>POOYA LABS</strong><small>PERSONAL PORTFOLIO</small></span></a>
        <span>{t.footer}</span>
        <a href="https://github.com/pooya-labs" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a>
        <small>© {new Date().getFullYear()} POOYA LABS</small>
      </footer>
    </div>
  );
}
