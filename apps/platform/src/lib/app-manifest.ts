export type AppId = 'overview' | 'files' | 'terminal' | 'settings';
export type AppAccent = 'cyan' | 'violet' | 'mint' | 'amber';

export interface AppManifestEntry {
  id: AppId;
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  iconKey: AppId;
  accent: AppAccent;
  shortcut: string;
  audience: 'owner-workspace';
  manifestVersion: 1;
}

const candidateManifest: AppManifestEntry[] = [
  { id: 'overview', title: { fa: 'نمای کلی', en: 'Overview' }, description: { fa: 'نمای کلی فضای کاری', en: 'Your workspace at a glance' }, iconKey: 'overview', accent: 'cyan', shortcut: '⌘ 1', audience: 'owner-workspace', manifestVersion: 1 },
  { id: 'files', title: { fa: 'فایل‌ها', en: 'Files' }, description: { fa: 'فایل‌ها و پروژه‌های اخیر', en: 'Recent files and projects' }, iconKey: 'files', accent: 'violet', shortcut: '⌘ 2', audience: 'owner-workspace', manifestVersion: 1 },
  { id: 'terminal', title: { fa: 'ترمینال', en: 'Terminal' }, description: { fa: 'محیط فرمان محلی و امن', en: 'A safe local command space' }, iconKey: 'terminal', accent: 'mint', shortcut: '⌘ 3', audience: 'owner-workspace', manifestVersion: 1 },
  { id: 'settings', title: { fa: 'تنظیمات', en: 'Settings' }, description: { fa: 'ظاهر و ترجیحات محیط', en: 'Appearance and preferences' }, iconKey: 'settings', accent: 'amber', shortcut: '⌘ 4', audience: 'owner-workspace', manifestVersion: 1 },
];

export function validateAppManifest(entries: readonly AppManifestEntry[]): AppManifestEntry[] {
  const ids = new Set<string>();
  const shortcuts = new Set<string>();
  for (const entry of entries) {
    if (entry.manifestVersion !== 1) throw new Error('Unsupported app manifest version.');
    if (!entry.id || ids.has(entry.id)) throw new Error('App manifest IDs must be present and unique.');
    if (!entry.shortcut || shortcuts.has(entry.shortcut)) throw new Error('App shortcuts must be present and unique.');
    if (!entry.title.fa.trim() || !entry.title.en.trim() || !entry.description.fa.trim() || !entry.description.en.trim()) {
      throw new Error('Every app requires Persian and English title and description.');
    }
    if (entry.audience !== 'owner-workspace') throw new Error('This registry only accepts owner-workspace apps.');
    ids.add(entry.id);
    shortcuts.add(entry.shortcut);
  }
  return [...entries];
}

export const APP_MANIFEST = validateAppManifest(candidateManifest);
