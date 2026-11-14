import { ArrowUpLeft, BookOpen, BookText, ChevronDown, Code2, LoaderCircle, Moon, Sun } from 'lucide-react';
import { useEffect, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

export type NovelLocaleText = { fa: string; en?: string };
export interface NovelRecord {
  slug: string;
  title: NovelLocaleText;
  synopsis?: NovelLocaleText;
  language?: 'fa' | 'en' | 'multi';
  genres?: string[];
  cover: string;
  manuscript: string;
  published: boolean;
}
type Language = 'fa' | 'en';

export function localizedNovelText(value: NovelLocaleText | undefined, language: Language): string {
  if (!value) return '';
  return language === 'en' && value.en?.trim() ? value.en : value.fa;
}
function isSafeNovelPath(value: unknown, prefix: 'covers' | 'manuscripts', extensions: string): value is string {
  if (typeof value !== 'string') return false;
  return new RegExp('^' + prefix + '/[A-Za-z0-9][A-Za-z0-9._-]*\\.(?:' + extensions + ')$').test(value);
}
export function validateNovelCatalog(value: unknown): NovelRecord[] {
  if (!value || typeof value !== 'object') throw new Error('Novel catalog must be an object.');
  const catalog = value as { schemaVersion?: unknown; novels?: unknown };
  if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.novels)) throw new Error('Novel catalog must use schemaVersion 1 and a novels array.');
  const slugs = new Set<string>();
  return catalog.novels.map((item: unknown) => {
    if (!item || typeof item !== 'object') throw new Error('Every novel record must be an object.');
    const novel = item as Record<string, unknown>;
    const title = novel.title as Record<string, unknown> | undefined;
    const synopsis = novel.synopsis as Record<string, unknown> | undefined;
    if (typeof novel.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(novel.slug)) throw new Error('Novel slugs must be lowercase URL-safe identifiers.');
    if (slugs.has(novel.slug)) throw new Error('Novel slugs must be unique.');
    if (!title || typeof title.fa !== 'string' || !title.fa.trim() || (title.en !== undefined && typeof title.en !== 'string')) {
      throw new Error('Every novel requires a Persian title and an optional English title.');
    }
    if (synopsis && (typeof synopsis.fa !== 'string' || (synopsis.en !== undefined && typeof synopsis.en !== 'string'))) {
      throw new Error('Novel synopsis values must be localized strings.');
    }
    if (!isSafeNovelPath(novel.cover, 'covers', 'webp|png|jpe?g')) throw new Error('Novel covers must be image files inside novels/covers/.');
    if (!isSafeNovelPath(novel.manuscript, 'manuscripts', 'md|txt|pdf')) throw new Error('Novel manuscripts must be PDF, Markdown, or text files inside novels/manuscripts/.');
    if (typeof novel.published !== 'boolean') throw new Error('Every novel requires an explicit published flag.');
    if (novel.language !== undefined && !['fa', 'en', 'multi'].includes(String(novel.language))) throw new Error('Novel language must be fa, en, or multi.');
    if (novel.genres !== undefined && (!Array.isArray(novel.genres) || novel.genres.some((genre) => typeof genre !== 'string'))) {
      throw new Error('Novel genres must be an array of strings.');
    }
    slugs.add(novel.slug);
    return {
      slug: novel.slug,
      title: { fa: title.fa, ...(typeof title.en === 'string' ? { en: title.en } : {}) },
      ...(synopsis ? { synopsis: { fa: String(synopsis.fa ?? ''), ...(typeof synopsis.en === 'string' ? { en: synopsis.en } : {}) } } : {}),
      ...(novel.language ? { language: novel.language as NovelRecord['language'] } : {}),
      ...(Array.isArray(novel.genres) ? { genres: novel.genres as string[] } : {}),
      cover: novel.cover,
      manuscript: novel.manuscript,
      published: novel.published,
    } satisfies NovelRecord;
  });
}
export async function loadNovelCatalog(): Promise<NovelRecord[]> {
  const response = await fetch(import.meta.env.BASE_URL + 'novels/catalog.json');
  if (!response.ok) throw new Error('Novel catalog request failed: HTTP ' + response.status);
  return validateNovelCatalog(await response.json());
}
function novelAssetUrl(path: string): string { return import.meta.env.BASE_URL + 'novels/' + path; }

interface NovelLibrarySectionProps {
  language: Language;
  novels: NovelRecord[];
  loading: boolean;
  error: string | null;
  onOpen: (event: ReactMouseEvent<HTMLAnchorElement>, novel: NovelRecord) => void;
}
export function NovelLibrarySection({ language, novels, loading, error, onOpen }: NovelLibrarySectionProps): ReactNode {
  const copy = language === 'fa'
    ? { eyebrow: 'روایت‌ها / نوشته‌ها', title: 'رمان‌ها و جهان‌هایی که می‌نویسم.', description: 'آثاری که در کنار مسیر مهندسی، روی کاغذ و در دنیای داستان شکل می‌گیرند.', empty: 'هنوز رمانی در این بخش منتشر نشده است.', emptyHint: 'وقتی نخستین اثر را اضافه کنم، اینجا جلد و متنش را می‌بینی.', loading: 'در حال بارگذاری کتابخانه…', error: 'کتابخانه رمان‌ها بارگذاری نشد.', read: 'خواندن رمان', count: 'اثر منتشرشده' }
    : { eyebrow: 'STORIES / WRITING', title: 'Novels and worlds I write.', description: 'Stories taking shape alongside my engineering work.', empty: 'No novels have been published here yet.', emptyHint: 'When the first story is added, its cover and text will appear here.', loading: 'Loading the library…', error: 'The novel library could not be loaded.', read: 'Read the novel', count: 'published works' };
  return (
    <section className="novel-section portfolio-container" id="novels" aria-labelledby="novel-library-title">
      <div className="portfolio-section-heading">
        <div><div className="portfolio-eyebrow"><span className="eyebrow-index">02 /</span>{copy.eyebrow}</div><h2 id="novel-library-title">{copy.title}</h2><p>{copy.description}</p></div>
        <span className="portfolio-section-meta">{novels.length} {copy.count}</span>
      </div>
      {loading ? <div className="novel-empty-state" role="status"><LoaderCircle size={21} className="novel-spinner" />{copy.loading}</div>
        : error ? <div className="novel-empty-state novel-empty-error" role="status"><BookOpen size={21} />{copy.error}</div>
        : novels.length === 0 ? <div className="novel-empty-state"><BookOpen size={28} strokeWidth={1.4} /><strong>{copy.empty}</strong><p>{copy.emptyHint}</p></div>
        : <div className="novel-grid">{novels.map((novel) => (
          <article className="novel-card" key={novel.slug}>
            <a className="novel-card-link" href={'?novel=' + encodeURIComponent(novel.slug)} onClick={(event) => onOpen(event, novel)}>
              <div className="novel-cover-frame">
                <img src={novelAssetUrl(novel.cover)} alt={localizedNovelText(novel.title, language)} loading="lazy" decoding="async"
                  onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.parentElement?.classList.add('is-missing-cover'); }} />
                <div className="novel-cover-fallback" aria-hidden="true"><BookText size={33} strokeWidth={1.2} /></div><span className="novel-cover-index">POOYA / LIBRARY</span>
              </div>
              <div className="novel-card-content">
                <span className="novel-card-kicker">{novel.language === 'en' ? 'ENGLISH' : novel.language === 'multi' ? 'MULTILINGUAL' : 'PERSIAN'}</span>
                <h3>{localizedNovelText(novel.title, language)}</h3>
                {novel.synopsis && <p>{localizedNovelText(novel.synopsis, language)}</p>}
                {!!novel.genres?.length && <div className="novel-genre-list">{novel.genres.map((genre) => <span key={genre}>{genre}</span>)}</div>}
                <span className="novel-read-link">{copy.read}<ChevronDown size={15} /></span>
              </div>
            </a>
          </article>
        ))}</div>}
    </section>
  );
}

type NovelBlock = { type: 'paragraph' | 'quote'; lines: string[] } | { type: 'heading'; level: 2 | 3 | 4; text: string } | { type: 'list'; ordered: boolean; items: string[] } | { type: 'rule' };
function parseNovelMarkdown(source: string): NovelBlock[] {
  const blocks: NovelBlock[] = [];
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listOrdered: boolean | null = null;
  const flushParagraph = () => { if (paragraph.length) blocks.push({ type: 'paragraph', lines: paragraph }); paragraph = []; };
  const flushList = () => { if (listItems.length) blocks.push({ type: 'list', ordered: Boolean(listOrdered), items: listItems }); listItems = []; listOrdered = null; };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); flushList(); continue; }
    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) { flushParagraph(); flushList(); blocks.push({ type: 'heading', level: (heading[1].length + 1) as 2 | 3 | 4, text: heading[2] }); continue; }
    if (/^[-*_]{3,}$/.test(trimmed)) { flushParagraph(); flushList(); blocks.push({ type: 'rule' }); continue; }
    if (trimmed.startsWith('>')) { flushParagraph(); flushList(); blocks.push({ type: 'quote', lines: [trimmed.slice(1).trim()] }); continue; }
    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) { flushParagraph(); const isOrdered = Boolean(ordered); if (listOrdered !== null && listOrdered !== isOrdered) flushList(); listOrdered = isOrdered; listItems.push((unordered ?? ordered)![1]); continue; }
    flushList(); paragraph.push(line);
  }
  flushParagraph(); flushList(); return blocks;
}
function renderInline(source: string, prefix: string): ReactNode[] {
  const tokens = source.split(/(\*\*[^*]+\*\*|\x60[^\x60]+\x60|\*[^*]+\*)/g);
  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={prefix + index}>{token.slice(2,-2)}</strong>;
    if (token.startsWith('\x60') && token.endsWith('\x60')) return <code key={prefix + index}>{token.slice(1,-1)}</code>;
    if (token.startsWith('*') && token.endsWith('*')) return <em key={prefix + index}>{token.slice(1,-1)}</em>;
    return token;
  });
}
function NovelManuscript({ source }: { source: string }): ReactNode {
  return <div className="novel-manuscript">{parseNovelMarkdown(source).map((block,index) => {
    if (block.type === 'heading') { const Heading = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4'; return <Heading key={index}>{renderInline(block.text,'h'+index)}</Heading>; }
    if (block.type === 'rule') return <hr key={index} />;
    if (block.type === 'list') { const List = block.ordered ? 'ol' : 'ul'; return <List key={index}>{block.items.map((item,itemIndex)=><li key={itemIndex}>{renderInline(item,'l'+index+'-'+itemIndex)}</li>)}</List>; }
    if (block.type === 'quote') return <blockquote key={index}>{block.lines.map((line,lineIndex)=><p key={lineIndex}>{renderInline(line,'q'+index+'-'+lineIndex)}</p>)}</blockquote>;
    return <p key={index}>{block.lines.map((line,lineIndex)=><span key={lineIndex}>{lineIndex>0 && <br />}{renderInline(line,'p'+index+'-'+lineIndex)}</span>)}</p>;
  })}</div>;
}

interface NovelReaderProps { novel: NovelRecord | null; language: Language; onLanguageChange: (language: Language) => void; theme: 'dark' | 'light'; onThemeChange: (theme: 'dark' | 'light') => void; loading: boolean; error: string | null; onBack: () => void; onOpenWorkspace: () => void; }
export function NovelReader({ novel, language, onLanguageChange, theme, onThemeChange, loading, error, onBack, onOpenWorkspace }: NovelReaderProps): ReactNode {
  const rtl = language === 'fa';
  const [manuscript, setManuscript] = useState<string | null>(null);
  const [manuscriptLoading, setManuscriptLoading] = useState(false);
  const [manuscriptError, setManuscriptError] = useState<string | null>(null);
  const [readerTheme, setReaderTheme] = useState<'default' | 'sepia' | 'light'>('default');
  const [fontSizeStep, setFontSizeStep] = useState<number>(0);
  const title = novel ? localizedNovelText(novel.title, language) : '';
  const copy = language === 'fa'
    ? { back: 'بازگشت به کتابخانه', subtitle: 'از کتابخانه داستان‌ها', loading: 'در حال بارگذاری متن…', unavailable: 'متن این رمان هنوز در دسترس نیست.', missing: 'این رمان در کتابخانه پیدا نشد.', retry: 'فایل متن را بررسی کن یا دوباره تلاش کن.' }
    : { back: 'Back to library', subtitle: 'FROM THE STORY LIBRARY', loading: 'Loading the manuscript…', unavailable: 'The manuscript is not available yet.', missing: 'This novel could not be found in the library.', retry: 'Check the manuscript file or try again.' };
  useEffect(() => {
    if (!novel) return;
    if (/\.pdf$/i.test(novel.manuscript)) {
      setManuscript(null); setManuscriptLoading(false); setManuscriptError(null);
      return;
    }
    const controller = new AbortController();
    setManuscript(null); setManuscriptLoading(true); setManuscriptError(null);
    fetch(novelAssetUrl(novel.manuscript), { signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error('HTTP ' + response.status); return response.text(); })
      .then((content) => setManuscript(content))
      .catch((requestError: unknown) => { if (requestError instanceof DOMException && requestError.name === 'AbortError') return; setManuscriptError(requestError instanceof Error ? requestError.message : String(requestError)); })
      .finally(() => { if (!controller.signal.aborted) setManuscriptLoading(false); });
    return () => controller.abort();
  }, [novel?.slug, novel?.manuscript]);
  useEffect(() => {
    if (!novel) return;
    const previousTitle = document.title;
    document.title = title + (rtl ? ' | رمان در Pooya Labs' : ' | Novel — Pooya Labs');
    return () => { document.title = previousTitle; };
  }, [novel, title, rtl]);
  return (
    <div className={'portfolio-page novel-reader ' + (rtl ? 'is-rtl' : 'is-ltr')} data-theme={theme}>
      <a className="portfolio-skip-link" href="#novel-reader-main">{rtl ? 'رفتن به متن رمان' : 'Skip to manuscript'}</a>
      <header className="portfolio-header">
        <a className="portfolio-brand" href={import.meta.env.BASE_URL} onClick={(event) => { event.preventDefault(); onBack(); }}>
          <span className="portfolio-brand-mark"><img src={import.meta.env.BASE_URL + 'brand/pooya-monogram.webp'} alt="" aria-hidden="true" /></span>
          <span><strong>POOYA LABS</strong><small>INDEPENDENT BUILDER</small></span>
        </a>
        <nav className="portfolio-nav" aria-label={rtl ? 'ناوبری اصلی' : 'Main navigation'}>
          <a href={import.meta.env.BASE_URL + '#about'}>{rtl ? 'درباره من' : 'About'}</a>
          <a href={import.meta.env.BASE_URL + '#projects'}>{rtl ? 'پروژه‌ها' : 'Projects'}</a>
          <a href={import.meta.env.BASE_URL + '#novels'}>{rtl ? 'رمان‌ها' : 'Novels'}</a>
          <a href={import.meta.env.BASE_URL + '#stack'}>{rtl ? 'مهارت‌ها' : 'Stack'}</a>
          <a href={import.meta.env.BASE_URL + '#contact'}>{rtl ? 'ارتباط' : 'Contact'}</a>
        </nav>
        <div className="portfolio-header-actions">
          <button className="portfolio-theme" type="button" onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? (rtl ? 'فعال‌کردن حالت روشن' : 'Switch to light mode') : (rtl ? 'فعال‌کردن حالت تیره' : 'Switch to dark mode')} title={theme === 'dark' ? (rtl ? 'حالت روشن' : 'Light mode') : (rtl ? 'حالت تیره' : 'Dark mode')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}<span>{theme === 'dark' ? (rtl ? 'روشن' : 'Light') : (rtl ? 'تیره' : 'Dark')}</span></button>
          <button className="portfolio-language" onClick={() => onLanguageChange(rtl ? 'en' : 'fa')}>{rtl ? 'English' : 'فارسی'}</button>
          <button className="portfolio-workspace" onClick={onOpenWorkspace} aria-label={rtl ? 'ورود به فضای کاری' : 'Open workspace'} title={rtl ? 'ورود به فضای کاری' : 'Open workspace'}><span>{rtl ? 'فضای کاری' : 'Workspace'}</span><ArrowUpLeft size={15} /></button>
        </div>
      </header>
      <main id="novel-reader-main" tabIndex={-1} className="novel-reader-main portfolio-container">
        {loading ? <div className="novel-empty-state" role="status"><LoaderCircle className="novel-spinner" size={22} />{rtl ? 'در حال بارگذاری کتابخانه…' : 'Loading the library…'}</div>
          : !novel ? <div className="novel-empty-state"><BookOpen size={26} /><strong>{error ? copy.retry : copy.missing}</strong><p>{error ?? copy.missing}</p><button onClick={onBack}>{copy.back}</button></div>
          : <>
            <button className="novel-inline-back" onClick={onBack}><ArrowUpLeft size={15} />{copy.back}</button>
            <section className="novel-reader-hero">
              <div className="novel-reader-cover"><img src={novelAssetUrl(novel.cover)} alt={title} onError={(event)=>{event.currentTarget.hidden=true;event.currentTarget.parentElement?.classList.add('is-missing-cover');}}/><div className="novel-cover-fallback" aria-hidden="true"><BookText size={42}/></div></div>
              <div className="novel-reader-intro"><div className="portfolio-eyebrow"><span className="eyebrow-index">NOVEL /</span>{copy.subtitle}</div><h1>{title}</h1>{novel.synopsis && <p>{localizedNovelText(novel.synopsis,language)}</p>}{!!novel.genres?.length && <div className="novel-genre-list">{novel.genres.map((genre)=><span key={genre}>{genre}</span>)}</div>}</div>
            </section>
            <section className={"novel-text-section novel-reader-theme-" + readerTheme} style={{ fontSize: fontSizeStep !== 0 ? `calc(18px + ${fontSizeStep * 2}px)` : undefined }} aria-label={rtl ? 'متن رمان' : 'Novel manuscript'}>
              <div className="novel-reader-toolbar">
                <div className="novel-reading-meta"><BookOpen size={15}/><span>{rtl ? 'زمان تخمینی مطالعه: ۴ ساعت · نسخه کامل' : 'Estimated reading: ~4h · Full manuscript'}</span></div>
                <div className="novel-reader-controls">
                  <div className="novel-font-controls">
                    <button className="novel-font-btn" type="button" onClick={() => setFontSizeStep((s) => Math.max(s - 1, -2))} aria-label="A-">A-</button>
                    <button className="novel-font-btn" type="button" onClick={() => setFontSizeStep(0)} aria-label="Reset font size">A</button>
                    <button className="novel-font-btn" type="button" onClick={() => setFontSizeStep((s) => Math.min(s + 1, 3))} aria-label="A+">A+</button>
                  </div>
                  <div className="novel-reader-themes">
                    <button className={readerTheme === 'default' ? 'novel-theme-btn active' : 'novel-theme-btn'} type="button" onClick={() => setReaderTheme('default')}>{rtl ? 'تیره' : 'Dark'}</button>
                    <button className={readerTheme === 'sepia' ? 'novel-theme-btn active' : 'novel-theme-btn'} type="button" onClick={() => setReaderTheme('sepia')}>{rtl ? 'سپیا' : 'Sepia'}</button>
                    <button className={readerTheme === 'light' ? 'novel-theme-btn active' : 'novel-theme-btn'} type="button" onClick={() => setReaderTheme('light')}>{rtl ? 'روشن' : 'Light'}</button>
                  </div>
                </div>
              </div>
              <div className="novel-text-topline"><BookOpen size={17}/><span>{rtl ? 'متن اثر' : 'THE MANUSCRIPT'}</span><span className="novel-text-rule"/></div>
              {novel.manuscript.toLowerCase().endsWith('.pdf') ? <div className="novel-pdf-viewer">
                  <iframe src={novelAssetUrl(novel.manuscript) + '#toolbar=1&navpanes=0&view=FitH'} title={title} loading="lazy" />
                  <div className="novel-pdf-actions">
                    <a className="novel-pdf-btn" href={novelAssetUrl(novel.manuscript)} target="_blank" rel="noreferrer"><ArrowUpLeft size={14} />{rtl ? 'باز کردن در پنجرهٔ تمام‌صفحه' : 'Open in fullscreen reader'}</a>
                    <a className="novel-pdf-btn" href={novelAssetUrl(novel.manuscript)} download><BookText size={14} />{rtl ? 'دریافت نسخهٔ PDF آفلاین' : 'Download offline PDF'}</a>
                  </div>
                </div>
                : manuscriptLoading ? <div className="novel-empty-state" role="status"><LoaderCircle size={20} className="novel-spinner"/>{copy.loading}</div>
                : manuscriptError ? <div className="novel-empty-state novel-empty-error" role="status"><strong>{copy.unavailable}</strong><p>{copy.retry} ({manuscriptError})</p></div>
                : manuscript?.trim() ? <NovelManuscript source={manuscript}/>
                : <div className="novel-empty-state"><BookText size={25}/><strong>{copy.unavailable}</strong></div>}
            </section>
          </>}
      </main>
      <footer className="portfolio-footer portfolio-container">
        <a className="portfolio-brand" href={import.meta.env.BASE_URL} onClick={(event) => { event.preventDefault(); onBack(); }}>
          <span className="portfolio-brand-mark"><img src={import.meta.env.BASE_URL + 'brand/pooya-monogram.webp'} alt="" aria-hidden="true" /></span>
          <span><strong>POOYA LABS</strong><small>PERSONAL PORTFOLIO</small></span>
        </a>
        <a className="portfolio-owner-attribution" href="https://github.com/pooya-labs" target="_blank" rel="noopener noreferrer">
          <img src={import.meta.env.BASE_URL + 'brand/pooya-monogram-tile.svg'} alt="" aria-hidden="true" width={42} height={42} decoding="async" />
          <span className="portfolio-owner-attribution-copy">
            <span className="portfolio-owner-attribution-label">{rtl ? 'مالک پروژه' : 'PROJECT OWNER'}</span>
            <strong>{rtl ? 'پویا گودرزی' : 'POOYA GOODARZI'}</strong>
            <span className="portfolio-owner-attribution-byline">{rtl ? 'ایجاد و نگه‌داری: پویا گودرزی' : 'Created & maintained by Pooya Goodarzi'}</span>
          </span>
        </a>
        <span>{rtl ? 'طراحی و توسعه با کنجکاوی و وسواس مهندسی.' : 'Designed and built with curiosity and engineering care.'}</span>
        <a href="https://github.com/pooya-labs" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a>
        <small>© {new Date().getFullYear()} POOYA GOODARZI · POOYA LABS</small>
      </footer>
    </div>
  );
}
