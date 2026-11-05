import {
  Activity, ArrowDownLeft, ArrowUpRight, Bell, Check, ChevronDown, Clock3,
  Command, Cpu, FileText, Folder, Grid2X2, HardDrive, Home, Languages,
  LayoutDashboard, Maximize2, Minimize2, Monitor, Moon, MoreHorizontal,
  Plus, Search, Send, Settings, ShieldCheck, Sparkles, Sun, TerminalSquare,
  Wifi, X, Zap, type LucideIcon,
} from 'lucide-react';
import {
  useCallback, useEffect, useMemo, useRef, useState,
  type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode,
} from 'react';
import { isHtmlServiceHost, rpcCall, type RpcResponse } from './lib/rpc';

type Language = 'fa' | 'en';
type Theme = 'dark' | 'light';
type AppId = 'overview' | 'files' | 'terminal' | 'settings';

interface AppDefinition {
  id: AppId;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: LucideIcon;
  accent: string;
  shortcut: string;
}

interface AppWindow {
  id: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}

interface DragState {
  id: AppId;
  pointerX: number;
  pointerY: number;
  originX: number;
  originY: number;
}

const appRegistry: AppDefinition[] = [
  { id: 'overview', title: { fa: 'نمای کلی', en: 'Overview' }, description: { fa: 'نمای کلی فضای کاری', en: 'Your workspace at a glance' }, icon: LayoutDashboard, accent: 'cyan', shortcut: '⌘ 1' },
  { id: 'files', title: { fa: 'فایل‌ها', en: 'Files' }, description: { fa: 'فایل‌ها و پروژه‌های اخیر', en: 'Recent files and projects' }, icon: Folder, accent: 'violet', shortcut: '⌘ 2' },
  { id: 'terminal', title: { fa: 'ترمینال', en: 'Terminal' }, description: { fa: 'محیط فرمان محلی و امن', en: 'A safe local command space' }, icon: TerminalSquare, accent: 'mint', shortcut: '⌘ 3' },
  { id: 'settings', title: { fa: 'تنظیمات', en: 'Settings' }, description: { fa: 'ظاهر و ترجیحات محیط', en: 'Appearance and preferences' }, icon: Settings, accent: 'amber', shortcut: '⌘ 4' },
];

const copy = {
  fa: {
    workspace: 'فضای کاری', personalWorkspace: 'فضای شخصی', goodMorning: 'صبح بخیر', goodAfternoon: 'وقت بخیر', goodEvening: 'عصر بخیر',
    welcome: 'به فضای کاری خودت خوش آمدی.', welcomeSub: 'ایده‌ها، ابزارها و آزمایش‌هایت را در یک محیط یکپارچه مدیریت کن.',
    launch: 'شروع سریع', launchSub: 'مستقیم به سراغ کاری برو که می‌خواهی انجام بدهی.', openWorkspace: 'باز کردن فضای کاری',
    exploreApps: 'ابزارهای محیط', exploreSub: 'ابزارهای اصلی Pooya Labs', recent: 'فعالیت‌های اخیر', recentSub: 'نمونه‌ای از اتفاقات فضای کاری',
    noActivity: 'هنوز فعالیتی ثبت نشده است.', localPreview: 'پیش‌نمایش محلی', liveRpc: 'اتصال سرور فعال',
    notConnected: 'این نسخه هنوز به داده‌های زنده متصل نیست.', hostHtml: 'در محیط Google Apps Script اجرا می‌شود.',
    hostPreview: 'در حالت پیش‌نمایش مرورگر اجرا می‌شود.', quickStatus: 'وضعیت محیط', runtime: 'محیط اجرا',
    transport: 'روش ارتباط', transportValue: 'google.script.run', uiReady: 'رابط کاربری آماده است',
    localState: 'تنظیمات در همین مرورگر ذخیره می‌شوند.', search: 'جست‌وجو یا اجرای فرمان…', commandPalette: 'مرکز فرمان',
    commandHint: 'برای جست‌وجو میان ابزارها تایپ کن', noResults: 'موردی پیدا نشد.', open: 'باز کردن',
    close: 'بستن', minimize: 'کوچک کردن', maximize: 'بزرگ‌نمایی', restore: 'بازگردانی',
    fileName: 'نام', fileType: 'نوع', modified: 'آخرین تغییر', state: 'وضعیت', sample: 'نمونه',
    folder: 'پوشه', document: 'سند', code: 'کد', today: 'امروز', about: 'درباره محیط',
    aboutText: 'یک فضای کاری شخصی برای ساختن، آزمایش کردن و مدیریت ابزارها.', version: 'نسخه آزمایشی ۰٫۲',
    appearance: 'ظاهر محیط', language: 'زبان', darkMode: 'تیره', lightMode: 'روشن', preferenceNote: 'این تنظیمات فقط در همین مرورگر ذخیره می‌شوند.',
    theme: 'پوسته', terminalTitle: 'ترمینال محلی', terminalSafety: 'این ترمینال فقط فرمان‌های نمایشی داخلی را اجرا می‌کند؛ به سیستم‌عامل یا سرور فرمان نمی‌فرستد.',
    terminalPlaceholder: 'یک فرمان بنویس…', terminalWelcome: 'به ترمینال Pooya Labs خوش آمدی. برای دیدن فرمان‌ها help را اجرا کن.',
    terminalHelp: 'فرمان‌های مجاز: help، about، apps، whoami، date، clear', terminalUnknown: 'این فرمان در محیط نمایشی پشتیبانی نمی‌شود.',
    terminalAbout: 'Pooya Labs Spatial Workspace — Local Preview', terminalUser: 'پویا · مالک فضای کاری',
    terminalApps: 'ابزارهای فعال: نمای کلی، فایل‌ها، ترمینال، تنظیمات', send: 'اجرا',
    connected: 'متصل', offlinePreview: 'بدون اتصال زنده', systemOverview: 'نمای سیستم', projects: 'پروژه‌ها',
    tools: 'ابزارها', uptime: 'وضعیت', ready: 'آماده', allApps: 'همه ابزارها', quickActions: 'دسترسی سریع',
    viewFiles: 'مشاهده فایل‌ها', openTerminal: 'اجرای ترمینال', languageSwitch: 'English',
  },
  en: {
    workspace: 'Workspace', personalWorkspace: 'Personal workspace', goodMorning: 'Good morning', goodAfternoon: 'Good afternoon', goodEvening: 'Good evening',
    welcome: 'Welcome back to your workspace.', welcomeSub: 'Bring your ideas, tools, and experiments into one calm, connected space.',
    launch: 'Quick launch', launchSub: 'Jump straight into what you want to work on.', openWorkspace: 'Open workspace',
    exploreApps: 'Workspace apps', exploreSub: 'The essential Pooya Labs tools', recent: 'Recent activity', recentSub: 'A small snapshot of this workspace',
    noActivity: 'Nothing here yet.', localPreview: 'Local preview', liveRpc: 'Server connection active',
    notConnected: 'This build is not connected to live workspace data yet.', hostHtml: 'Running inside Google Apps Script.',
    hostPreview: 'Running in browser preview mode.', quickStatus: 'Workspace status', runtime: 'Runtime',
    transport: 'Transport', transportValue: 'google.script.run', uiReady: 'Interface is ready',
    localState: 'Preferences are stored in this browser.', search: 'Search or run a command…', commandPalette: 'Command center',
    commandHint: 'Type to search workspace tools', noResults: 'No matching tools.', open: 'Open',
    close: 'Close', minimize: 'Minimize', maximize: 'Maximize', restore: 'Restore',
    fileName: 'Name', fileType: 'Type', modified: 'Modified', state: 'State', sample: 'Sample',
    folder: 'Folder', document: 'Document', code: 'Code', today: 'Today', about: 'About this workspace',
    aboutText: 'A personal workspace for building, testing, and operating useful tools.', version: 'Experimental build 0.2',
    appearance: 'Appearance', language: 'Language', darkMode: 'Dark', lightMode: 'Light', preferenceNote: 'These preferences are stored in this browser only.',
    theme: 'Theme', terminalTitle: 'Local terminal', terminalSafety: 'This terminal runs a small set of local demo commands. It does not execute shell commands or contact a server.',
    terminalPlaceholder: 'Enter a command…', terminalWelcome: 'Welcome to Pooya Labs Terminal. Run help to see available commands.',
    terminalHelp: 'Allowed commands: help, about, apps, whoami, date, clear', terminalUnknown: 'That command is not available in this preview.',
    terminalAbout: 'Pooya Labs Spatial Workspace — Local Preview', terminalUser: 'Pooya · Workspace owner',
    terminalApps: 'Available apps: Overview, Files, Terminal, Settings', send: 'Run',
    connected: 'Connected', offlinePreview: 'No live connection', systemOverview: 'System overview', projects: 'Projects',
    tools: 'Tools', uptime: 'Status', ready: 'Ready', allApps: 'All apps', quickActions: 'Quick actions',
    viewFiles: 'Browse files', openTerminal: 'Open terminal', languageSwitch: 'فارسی',
  },
} satisfies Record<Language, Record<string, string>>;

const sampleFiles = [
  { name: 'Pooya Labs', type: 'folder', modified: 'today' },
  { name: 'Platform roadmap.md', type: 'document', modified: 'today' },
  { name: 'Workspace shell.tsx', type: 'code', modified: 'yesterday' },
  { name: 'Design tokens.css', type: 'code', modified: 'yesterday' },
];

function readPreference<T extends string>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem('pooya-labs:' + key);
    return value ? value as T : fallback;
  } catch {
    return fallback;
  }
}

function writePreference(key: string, value: string): void {
  try {
    window.localStorage.setItem('pooya-labs:' + key, value);
  } catch {
    // Storage may be unavailable in restricted browsing contexts.
  }
}

function getGreeting(language: Language, hour: number): string {
  if (hour < 12) return copy[language].goodMorning;
  if (hour < 18) return copy[language].goodAfternoon;
  return copy[language].goodEvening;
}

function getClock(language: Language, date: Date): string {
  return new Intl.DateTimeFormat(language === 'fa' ? 'fa-IR' : 'en-GB', { hour: '2-digit', minute: '2-digit' }).format(date);
}

function getDate(language: Language, date: Date): string {
  return new Intl.DateTimeFormat(language === 'fa' ? 'fa-IR' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}

function App(): ReactNode {
  const [language, setLanguage] = useState<Language>(() => readPreference('language', 'fa'));
  const [theme, setTheme] = useState<Theme>(() => readPreference('theme', 'dark'));
  const [now, setNow] = useState(() => new Date());
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<AppId | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [rpcHealth, setRpcHealth] = useState<RpcResponse | null>(null);
  const [rpcError, setRpcError] = useState<string | null>(null);
  const [rpcChecking, setRpcChecking] = useState(false);
  const dragRef = useRef<DragState | null>(null);
  const paletteInputRef = useRef<HTMLInputElement>(null);
  const isRtl = language === 'fa';
  const t = copy[language];
  const htmlServiceHost = isHtmlServiceHost();

  useEffect(() => {
    writePreference('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [language, isRtl]);

  useEffect(() => {
    writePreference('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const openApp = useCallback((id: AppId) => {
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      const top = Math.max(1, ...current.map((item) => item.zIndex)) + 1;
      if (existing) {
        return current.map((item) => item.id === id ? { ...item, minimized: false, zIndex: top } : item);
      }
      const width = Math.min(980, Math.max(340, window.innerWidth - 72));
      const height = Math.min(680, Math.max(380, window.innerHeight - 150));
      const offset = current.length % 5;
      return [...current, {
        id,
        x: Math.max(20, Math.round((window.innerWidth - width) / 2) + offset * 24),
        y: Math.max(82, Math.round((window.innerHeight - height) / 2) + offset * 18),
        width, height, zIndex: top, minimized: false, maximized: false,
      }];
    });
    setActiveWindow(id);
    setPaletteOpen(false);
    setPaletteQuery('');
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows((current) => {
      const next = current.filter((item) => item.id !== id);
      if (activeWindow === id) {
        const nextActive = [...next].sort((a, b) => b.zIndex - a.zIndex)[0];
        setActiveWindow(nextActive?.id ?? null);
      }
      return next;
    });
  }, [activeWindow]);

  const focusApp = useCallback((id: AppId) => {
    setWindows((current) => {
      const top = Math.max(1, ...current.map((item) => item.zIndex)) + 1;
      return current.map((item) => item.id === id ? { ...item, zIndex: top, minimized: false } : item);
    });
    setActiveWindow(id);
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, minimized: true } : item));
    setActiveWindow((current) => current === id ? null : current);
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, maximized: !item.maximized } : item));
    setActiveWindow(id);
  }, []);

  const updatePosition = useCallback((id: AppId, x: number, y: number) => {
    setWindows((current) => current.map((item) => item.id === id
      ? { ...item, x: Math.max(0, Math.min(x, window.innerWidth - 280)), y: Math.max(64, Math.min(y, window.innerHeight - 180)) }
      : item));
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    updatePosition(drag.id, drag.originX + event.clientX - drag.pointerX, drag.originY + event.clientY - drag.pointerY);
  }, [updatePosition]);

  const stopDragging = useCallback(() => {
    dragRef.current = null;
    document.body.classList.remove('is-dragging-window');
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointercancel', stopDragging);
    };
  }, [handlePointerMove, stopDragging]);

  const startDragging = (event: ReactPointerEvent<HTMLElement>, id: AppId) => {
    if (event.button !== 0 || window.matchMedia('(max-width: 760px)').matches) return;
    if ((event.target as HTMLElement).closest('button')) return;
    const item = windows.find((candidate) => candidate.id === id);
    if (!item || item.maximized) return;
    dragRef.current = { id, pointerX: event.clientX, pointerY: event.clientY, originX: item.x, originY: item.y };
    document.body.classList.add('is-dragging-window');
    focusApp(id);
  };

  const checkRpc = async () => {
    setRpcChecking(true);
    setRpcError(null);
    try {
      const response = await rpcCall('health.check');
      setRpcHealth(response);
      if (!response.ok) setRpcError(response.error?.message ?? 'Health check did not pass.');
    } catch (error) {
      setRpcError(error instanceof Error ? error.message : String(error));
    } finally {
      setRpcChecking(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
        return;
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setNotificationsOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && /^[1-4]$/.test(event.key)) {
        event.preventDefault();
        const id = appRegistry[Number(event.key) - 1]?.id;
        if (id) openApp(id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openApp]);

  useEffect(() => {
    if (!paletteOpen) return undefined;
    const frame = window.requestAnimationFrame(() => paletteInputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [paletteOpen]);

  const filteredApps = useMemo(() => {
    const query = paletteQuery.trim().toLocaleLowerCase();
    if (!query) return appRegistry;
    return appRegistry.filter((item) => [item.title[language], item.description[language], item.id].join(' ').toLocaleLowerCase().includes(query));
  }, [language, paletteQuery]);

  const visibleWindows = windows.filter((item) => !item.minimized);
  const topWindow = [...visibleWindows].sort((a, b) => b.zIndex - a.zIndex)[0];
  const greeting = getGreeting(language, now.getHours());

  const executeTerminal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') {
      setTerminalLines([]);
      setTerminalInput('');
      return;
    }
    const output = (() => {
      switch (command) {
        case 'help': return t.terminalHelp;
        case 'about': return t.terminalAbout;
        case 'apps': return t.terminalApps;
        case 'whoami': return t.terminalUser;
        case 'date': return getDate(language, new Date());
        default: return t.terminalUnknown;
      }
    })();
    setTerminalLines((current) => [...current, '$ ' + command, output].slice(-24));
    setTerminalInput('');
  };

  return (
    <div className="platform-shell" data-theme={theme}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient-grid" />

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span>P</span><i /></div>
          <div className="brand-copy"><strong>Pooya Labs</strong><span>{t.personalWorkspace}</span></div>
        </div>
        <button className="global-search" onClick={() => setPaletteOpen(true)} aria-label={t.search}>
          <Search size={16} /><span>{t.search}</span><kbd><Command size={11} /> K</kbd>
        </button>
        <div className="topbar-actions">
          <div className={'connection-pill ' + (htmlServiceHost ? 'is-live' : '')}>
            <span className="status-dot" /><span>{htmlServiceHost ? t.liveRpc : t.localPreview}</span>
          </div>
          <button className="icon-button" onClick={() => setNotificationsOpen((value) => !value)} aria-label={t.recent}>
            <Bell size={17} /><i className="notification-dot" />
          </button>
          <div className="topbar-divider" />
          <div className="profile-chip">
            <div className="profile-avatar">P</div>
            <div className="profile-copy"><strong>{language === 'fa' ? 'پویا' : 'Pooya'}</strong><span>Owner</span></div>
            <ChevronDown size={14} />
          </div>
        </div>
      </header>

      <div className="workspace-layout">
        <aside className="side-rail" aria-label={t.allApps}>
          <div className="rail-group">
            <button className="rail-button active" onClick={() => setWindows([])} aria-label={t.workspace}><Home size={19} /></button>
            <div className="rail-separator" />
            {appRegistry.map((item) => {
              const Icon = item.icon;
              const isOpen = windows.some((win) => win.id === item.id);
              return (
                <button key={item.id} className={'rail-button ' + (activeWindow === item.id ? 'selected' : '')}
                  onClick={() => openApp(item.id)} aria-label={item.title[language]} title={item.title[language]}>
                  <Icon size={18} />{isOpen && <i className="rail-indicator" />}
                </button>
              );
            })}
          </div>
          <div className="rail-bottom">
            <button className="rail-button" onClick={() => setLanguage((value) => value === 'fa' ? 'en' : 'fa')} aria-label={t.language}><Languages size={18} /></button>
            <button className="rail-button" onClick={() => openApp('settings')} aria-label={t.appearance}><Settings size={18} /></button>
          </div>
        </aside>

        <main className="desktop-stage">
          <div className="desktop-scroll">
            <section className="welcome-row">
              <div>
                <div className="eyebrow"><Sparkles size={13} /> {t.workspace}</div>
                <h1>{greeting}، <span>{language === 'fa' ? 'پویا' : 'Pooya'}</span></h1>
                <p>{t.welcomeSub}</p>
              </div>
              <div className="date-card">
                <div className="date-icon"><Clock3 size={17} /></div>
                <div><strong>{getClock(language, now)}</strong><span>{getDate(language, now)}</span></div>
              </div>
            </section>

            <section className="hero-panel">
              <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-glow" />
              <div className="hero-content">
                <div className="hero-label"><span className="hero-label-dot" /> POOYA LABS / SPATIAL OS</div>
                <h2>{language === 'fa' ? 'ایده‌هایت را به جریان بینداز.' : 'Make room for what’s next.'}</h2>
                <p>{t.welcome}</p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => openApp('overview')}><Sparkles size={15} /> {t.openWorkspace} <ArrowUpRight size={15} /></button>
                  <button className="quiet-button" onClick={() => setPaletteOpen(true)}><Command size={15} /> {t.allApps}</button>
                </div>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <div className="visual-ring ring-one" /><div className="visual-ring ring-two" />
                <div className="visual-core"><span>P</span><i /></div>
                <div className="visual-satellite satellite-one"><Zap size={16} /></div>
                <div className="visual-satellite satellite-two"><Activity size={15} /></div>
                <div className="visual-satellite satellite-three"><Cpu size={14} /></div>
              </div>
              <div className="hero-bottomline"><span><ShieldCheck size={14} /> {t.uiReady}</span><span className="hero-bottom-divider" /><span>{t.version}</span></div>
            </section>

            <section className="section-heading">
              <div><h2>{t.exploreApps}</h2><p>{t.exploreSub}</p></div>
              <button className="text-button" onClick={() => setPaletteOpen(true)}>{t.allApps} <ArrowDownLeft size={14} /></button>
            </section>

            <section className="app-grid">
              {appRegistry.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} className={'app-card accent-' + item.accent} onClick={() => openApp(item.id)}>
                    <div className="app-card-top"><div className="app-icon"><Icon size={20} /></div><span className="app-shortcut">{item.shortcut}</span></div>
                    <div className="app-card-copy"><strong>{item.title[language]}</strong><span>{item.description[language]}</span></div>
                    <div className="app-card-arrow"><ArrowUpRight size={15} /></div>
                  </button>
                );
              })}
            </section>

            <section className="bottom-grid">
              <div className="surface-card recent-card">
                <div className="surface-heading"><div><h3>{t.recent}</h3><p>{t.recentSub}</p></div><button className="subtle-icon" aria-label={t.recent}><MoreHorizontal size={17} /></button></div>
                <div className="empty-state"><div className="empty-icon"><Activity size={19} /></div><span>{t.noActivity}</span><small>{t.localState}</small></div>
              </div>
              <div className="surface-card status-card">
                <div className="surface-heading"><div><h3>{t.quickStatus}</h3><p>{t.runtime}</p></div><div className="status-symbol"><Activity size={17} /></div></div>
                <div className="status-list">
                  <div><span><Monitor size={15} /> {t.runtime}</span><strong>{htmlServiceHost ? 'HtmlService' : 'Browser'}</strong></div>
                  <div><span><Wifi size={15} /> {t.transport}</span><strong>{htmlServiceHost ? t.transportValue : t.offlinePreview}</strong></div>
                  <div><span><ShieldCheck size={15} /> {t.state}</span><strong className="state-ready">{t.ready}</strong></div>
                </div>
                <button className="health-action" onClick={checkRpc} disabled={!htmlServiceHost || rpcChecking}>
                  <Activity size={14} /> {rpcChecking ? '…' : language === 'fa' ? 'بررسی اتصال' : 'Check live RPC'}
                </button>
                {rpcHealth?.ok && <div className="rpc-result success"><Check size={13} /> {language === 'fa' ? 'اتصال RPC موفق بود' : 'RPC health check passed'}</div>}
                {rpcError && <div className="rpc-result error">{rpcError}</div>}
              </div>
            </section>

            <footer className="desktop-footer"><span>POOYA LABS <i>·</i> SPATIAL WORKSPACE</span><span>{htmlServiceHost ? t.hostHtml : t.hostPreview}</span></footer>
          </div>

          <div className="window-layer">
            {visibleWindows.map((item) => (
              <WindowFrame key={item.id} app={appRegistry.find((candidate) => candidate.id === item.id)!}
                windowState={item} language={language} theme={theme} active={topWindow?.id === item.id}
                onPointerDown={startDragging} onFocus={() => focusApp(item.id)} onClose={() => closeApp(item.id)}
                onMinimize={() => minimizeApp(item.id)} onMaximize={() => toggleMaximize(item.id)}
                onThemeChange={setTheme} onLanguageChange={setLanguage}
                terminalInput={terminalInput} terminalLines={terminalLines}
                onTerminalInput={setTerminalInput} onTerminalSubmit={executeTerminal} />
            ))}
          </div>

          <nav className="dock" aria-label={t.allApps}>
            <div className="dock-glass">
              {appRegistry.map((item) => {
                const Icon = item.icon;
                const opened = windows.some((win) => win.id === item.id);
                const minimized = windows.some((win) => win.id === item.id && win.minimized);
                let dockClass = 'dock-item';
                if (activeWindow === item.id) dockClass += ' active';
                if (opened) dockClass += ' opened';
                return (
                  <button key={item.id} className={dockClass}
                    onClick={() => activeWindow === item.id && opened && !minimized ? minimizeApp(item.id) : openApp(item.id)}
                    aria-label={item.title[language]} title={item.title[language]}>
                    <span className={'dock-icon accent-' + item.accent}><Icon size={19} /></span>
                    {opened && <i className="dock-indicator" />}
                  </button>
                );
              })}
              <span className="dock-divider" />
              <button className="dock-add" onClick={() => setPaletteOpen(true)} aria-label={t.allApps}><Plus size={18} /></button>
            </div>
          </nav>
        </main>
      </div>

      <div className="mobile-dock">
        {appRegistry.map((item) => {
          const Icon = item.icon;
          return <button key={item.id} onClick={() => openApp(item.id)} className={activeWindow === item.id ? 'active' : ''}><Icon size={19} /><span>{item.title[language]}</span></button>;
        })}
      </div>

      {paletteOpen && (
        <div className="palette-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false); }}>
          <section className="command-palette" role="dialog" aria-modal="true" aria-label={t.commandPalette}>
            <div className="palette-search"><Search size={19} /><input ref={paletteInputRef} value={paletteQuery}
              onChange={(event) => setPaletteQuery(event.target.value)} placeholder={t.commandHint}
              onKeyDown={(event) => { if (event.key === 'Enter' && filteredApps[0]) openApp(filteredApps[0].id); }} /><kbd>ESC</kbd></div>
            <div className="palette-section-label">{t.allApps}</div>
            <div className="palette-results">
              {filteredApps.length === 0 && <div className="palette-empty">{t.noResults}</div>}
              {filteredApps.map((item) => {
                const Icon = item.icon;
                return <button key={item.id} className="palette-result" onClick={() => openApp(item.id)}>
                  <span className={'palette-result-icon accent-' + item.accent}><Icon size={18} /></span>
                  <span className="palette-result-copy"><strong>{item.title[language]}</strong><small>{item.description[language]}</small></span>
                  <kbd>{item.shortcut}</kbd><ArrowDownLeft size={14} />
                </button>;
              })}
            </div>
            <div className="palette-footer"><span><kbd>↵</kbd> {t.open}</span><span><kbd>⌘ K</kbd> {t.commandPalette}</span></div>
          </section>
        </div>
      )}

      {notificationsOpen && <div className="notification-popover">
        <div className="popover-heading"><strong>{t.recent}</strong><button onClick={() => setNotificationsOpen(false)} aria-label={t.close}><X size={15} /></button></div>
        <div className="notification-empty"><Bell size={18} /><span>{t.noActivity}</span></div>
      </div>}

      <div className="language-switcher"><button onClick={() => setLanguage((value) => value === 'fa' ? 'en' : 'fa')} aria-label={t.languageSwitch}><Languages size={14} /> {t.languageSwitch}</button></div>
    </div>
  );
}

interface WindowFrameProps {
  app: AppDefinition;
  windowState: AppWindow;
  language: Language;
  theme: Theme;
  active: boolean;
  onPointerDown: (event: ReactPointerEvent<HTMLElement>, id: AppId) => void;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (language: Language) => void;
  terminalInput: string;
  terminalLines: string[];
  onTerminalInput: (value: string) => void;
  onTerminalSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function WindowFrame(props: WindowFrameProps): ReactNode {
  const { app, windowState, language, theme, active, onPointerDown, onFocus, onClose, onMinimize, onMaximize,
    onThemeChange, onLanguageChange, terminalInput, terminalLines, onTerminalInput, onTerminalSubmit } = props;
  const Icon = app.icon;
  const t = copy[language];
  const windowStyle = windowState.maximized ? { zIndex: windowState.zIndex } : {
    left: windowState.x, top: windowState.y, width: windowState.width, height: windowState.height, zIndex: windowState.zIndex,
  };
  let sectionClass = 'app-window';
  if (active) sectionClass += ' is-active';
  if (windowState.maximized) sectionClass += ' is-maximized';

  return (
    <section className={sectionClass} style={windowStyle} onPointerDown={onFocus} aria-label={app.title[language]}>
      <header className="window-titlebar" onPointerDown={(event) => onPointerDown(event, app.id)}>
        <div className="window-title">
          <span className={'window-app-icon accent-' + app.accent}><Icon size={15} /></span>
          <strong>{app.title[language]}</strong><span className="window-title-dot" /><small>{t.localPreview}</small>
        </div>
        <div className="window-controls">
          <button onClick={onMinimize} aria-label={t.minimize}><Minimize2 size={14} /></button>
          <button onClick={onMaximize} aria-label={windowState.maximized ? t.restore : t.maximize}><Maximize2 size={13} /></button>
          <button className="window-close" onClick={onClose} aria-label={t.close}><X size={15} /></button>
        </div>
      </header>
      <div className="window-content">
        {app.id === 'overview' && <div className="mini-overview">
          <div className="mini-heading"><div className="mini-eyebrow">{t.systemOverview}</div>
            <h2>{language === 'fa' ? 'همه‌چیز در جای خودش.' : 'Everything in its place.'}</h2><p>{t.aboutText}</p></div>
          <div className="mini-stats">
            <div><span><Folder size={16} /></span><strong>08</strong><small>{t.projects}</small></div>
            <div><span><Grid2X2 size={16} /></span><strong>04</strong><small>{t.tools}</small></div>
            <div><span><Activity size={16} /></span><strong>{t.ready}</strong><small>{t.uptime}</small></div>
          </div>
          <div className="mini-callout"><Sparkles size={18} /><div><strong>{t.about}</strong><small>{t.notConnected}</small></div></div>
        </div>}

        {app.id === 'files' && <div className="files-app">
          <div className="app-toolbar"><div><strong>{language === 'fa' ? 'فضای کاری من' : 'My workspace'}</strong><small>{t.localPreview}</small></div>
            <button className="small-action"><Plus size={14} /> {language === 'fa' ? 'پوشه جدید' : 'New folder'}</button></div>
          <div className="file-table">
            <div className="file-row file-header"><span>{t.fileName}</span><span>{t.fileType}</span><span>{t.modified}</span><span>{t.state}</span></div>
            {sampleFiles.map((file) => <div className="file-row" key={file.name}>
              <span className="file-name"><i>{file.type === 'folder' ? <Folder size={16} /> : <FileText size={16} />}</i>{file.name}</span>
              <span>{file.type === 'folder' ? t.folder : file.type === 'code' ? t.code : t.document}</span>
              <span>{file.modified === 'today' ? t.today : language === 'fa' ? 'دیروز' : 'Yesterday'}</span>
              <span className="file-sample"><i />{t.sample}</span>
            </div>)}
          </div>
          <div className="files-footnote"><HardDrive size={14} /> {t.localState}</div>
        </div>}

        {app.id === 'terminal' && <div className="terminal-app">
          <div className="terminal-topline"><span /><span /><span /><small>pooya@workspace — local preview</small></div>
          <div className="terminal-output"><p className="terminal-welcome">{t.terminalWelcome}</p>
            {terminalLines.map((line, index) => <div key={index} className={line.startsWith('$ ') ? 'terminal-command' : 'terminal-response'}>{line}</div>)}
          </div>
          <form className="terminal-form" onSubmit={onTerminalSubmit}><span>›</span>
            <input value={terminalInput} onChange={(event) => onTerminalInput(event.target.value)} placeholder={t.terminalPlaceholder} aria-label={t.terminalPlaceholder} />
            <button type="submit" aria-label={t.send}><Send size={15} /></button></form>
          <div className="terminal-safe-note"><ShieldCheck size={13} /> {t.terminalSafety}</div>
        </div>}

        {app.id === 'settings' && <div className="settings-app">
          <div className="settings-heading"><h2>{t.appearance}</h2><p>{t.preferenceNote}</p></div>
          <div className="settings-block"><div className="settings-label"><Monitor size={16} /><strong>{t.theme}</strong></div>
            <div className="theme-options">
              <button className={theme === 'dark' ? 'chosen' : ''} onClick={() => onThemeChange('dark')}><Moon size={17} /><span>{t.darkMode}</span>{theme === 'dark' && <Check size={14} />}</button>
              <button className={theme === 'light' ? 'chosen' : ''} onClick={() => onThemeChange('light')}><Sun size={17} /><span>{t.lightMode}</span>{theme === 'light' && <Check size={14} />}</button>
            </div>
          </div>
          <div className="settings-block"><div className="settings-label"><Languages size={16} /><strong>{t.language}</strong></div>
            <div className="theme-options language-options">
              <button className={language === 'fa' ? 'chosen' : ''} onClick={() => onLanguageChange('fa')}><span>فارسی</span>{language === 'fa' && <Check size={14} />}</button>
              <button className={language === 'en' ? 'chosen' : ''} onClick={() => onLanguageChange('en')}><span>English</span>{language === 'en' && <Check size={14} />}</button>
            </div>
          </div>
          <div className="settings-info"><Sparkles size={16} /><span>{t.aboutText}</span></div>
        </div>}
      </div>
      <div className="window-resize-corner" aria-hidden="true" />
    </section>
  );
}

export default App;
