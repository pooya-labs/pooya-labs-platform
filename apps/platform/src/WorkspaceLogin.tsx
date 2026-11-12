import { useState, type FormEvent } from 'react';
import { ArrowLeft, Languages, LockKeyhole, Moon, ShieldCheck, Sun } from 'lucide-react';

type Language = 'fa' | 'en';
type Theme = 'dark' | 'light';

interface WorkspaceLoginProps {
  language: Language;
  theme: Theme;
  checking: boolean;
  onLanguageChange: (language: Language) => void;
  onThemeChange: (theme: Theme) => void;
  onAuthenticated: () => void;
  onBack: () => void;
}

const labels = {
  fa: {
    eyebrow: 'OWNER ACCESS', title: 'ورود به فضای کاری',
    subtitle: 'این بخش خصوصی است. برای ادامه، اطلاعات ورود خودت را وارد کن.',
    username: 'نام کاربری', password: 'رمز عبور',
    usernamePlaceholder: 'نام کاربری را وارد کن', passwordPlaceholder: 'رمز عبور را وارد کن',
    submit: 'ورود به فضای کاری', checking: 'در حال بررسی نشست…', signingIn: 'در حال ورود…',
    invalid: 'نام کاربری یا رمز عبور درست نیست.',
    unavailable: 'سرویس ورود در دسترس نیست. تنظیمات محرمانهٔ میزبان را بررسی کن.',
    back: 'بازگشت به وب‌سایت', privateNote: 'نشست ورود روی همین مرورگر نگه داشته می‌شود.',
  },
  en: {
    eyebrow: 'OWNER ACCESS', title: 'Sign in to Workspace',
    subtitle: 'This area is private. Enter your owner credentials to continue.',
    username: 'Username', password: 'Password',
    usernamePlaceholder: 'Enter your username', passwordPlaceholder: 'Enter your password',
    submit: 'Enter workspace', checking: 'Checking your session…', signingIn: 'Signing in…',
    invalid: 'The username or password is incorrect.',
    unavailable: 'Sign-in service is unavailable. Check the host secret settings.',
    back: 'Back to portfolio', privateNote: 'Your sign-in session stays in this browser.',
  },
} satisfies Record<Language, Record<string, string>>;

export default function WorkspaceLogin({ language, theme, checking, onLanguageChange, onThemeChange, onAuthenticated, onBack }: WorkspaceLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const t = labels[language];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || checking) return;
    setBusy(true);
    setError('');
    try {
      if (username.trim() === 'pooya' && password === 'pooya1234') {
        try {
          window.sessionStorage.setItem('pooya-labs:workspace-demo-auth', '1');
        } catch {
          // The in-memory login still works for this tab if storage is unavailable.
        }
        onAuthenticated();
      } else {
        setError(t.invalid);
      }
    } catch {
      setError(t.unavailable);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="platform-shell workspace-auth-shell" data-theme={theme} dir={language === 'fa' ? 'rtl' : 'ltr'} lang={language}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient-grid" />
      <header className="workspace-auth-header">
        <a className="workspace-auth-brand" href="/" onClick={(event) => { event.preventDefault(); onBack(); }}>
          <img src="/brand/pooya-monogram-tile.svg" alt="" />
          <span><strong>Pooya Labs</strong><small>PRIVATE WORKSPACE</small></span>
        </a>
        <div className="workspace-auth-controls">
          <button type="button" onClick={() => onLanguageChange(language === 'fa' ? 'en' : 'fa')} aria-label={language === 'fa' ? 'Switch language to English' : 'تغییر زبان به فارسی'}>
            <Languages size={16} /><span>{language === 'fa' ? 'EN' : 'FA'}</span>
          </button>
          <button type="button" onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? (language === 'fa' ? 'فعال‌کردن حالت روشن' : 'Switch to light mode') : (language === 'fa' ? 'فعال‌کردن حالت تاریک' : 'Switch to dark mode')}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>
      <section className="workspace-auth-stage">
        <div className="workspace-auth-card">
          <div className="workspace-auth-icon"><LockKeyhole size={23} strokeWidth={1.7} /></div>
          <div className="workspace-auth-eyebrow"><span />{t.eyebrow}</div>
          <h1>{t.title}</h1>
          <p className="workspace-auth-subtitle">{t.subtitle}</p>
          {checking ? (
            <div className="workspace-auth-checking" role="status">{t.checking}</div>
          ) : (
            <form className="workspace-auth-form" onSubmit={submit}>
              <label>
                <span>{t.username}</span>
                <input type="text" name="username" autoComplete="username" autoCapitalize="none" spellCheck={false} dir="ltr" value={username} onChange={(event) => setUsername(event.target.value)} placeholder={t.usernamePlaceholder} required />
              </label>
              <label>
                <span>{t.password}</span>
                <input type="password" name="password" autoComplete="current-password" dir="ltr" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.passwordPlaceholder} required />
              </label>
              {error && <p className="workspace-auth-error" role="alert">{error}</p>}
              <button className="workspace-auth-submit" type="submit" disabled={busy || !username.trim() || !password}>
                <ShieldCheck size={17} />{busy ? t.signingIn : t.submit}
              </button>
            </form>
          )}
          <div className="workspace-auth-note">{t.privateNote}</div>
          <button className="workspace-auth-back" type="button" onClick={onBack}><ArrowLeft size={15} />{t.back}</button>
        </div>
      </section>
    </main>
  );
}
