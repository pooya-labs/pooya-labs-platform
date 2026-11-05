import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const manifest = await readFile(new URL('../../apps/platform/src/lib/app-manifest.ts', import.meta.url), 'utf8');
const app = await readFile(new URL('../../apps/platform/src/App.tsx', import.meta.url), 'utf8');

test('workspace app registry is sourced from a versioned manifest', () => {
  assert.match(manifest, /manifestVersion: 1/);
  assert.match(manifest, /export const APP_MANIFEST = validateAppManifest\(candidateManifest\)/);
  assert.match(app, /import \{ APP_MANIFEST \} from '\.\/lib\/app-manifest'/);
  assert.match(app, /const appRegistry: AppDefinition\[\] = APP_MANIFEST\.map/);
});

test('manifest validator rejects duplicate IDs and shortcuts and incomplete localization', () => {
  assert.match(manifest, /ids\.has\(entry\.id\)/);
  assert.match(manifest, /shortcuts\.has\(entry\.shortcut\)/);
  assert.match(manifest, /entry\.title\.fa\.trim\(\)/);
  assert.match(manifest, /entry\.description\.en\.trim\(\)/);
  assert.match(manifest, /Unsupported app manifest version/);
});

test('current workspace apps are explicitly owner-workspace scoped', () => {
  assert.equal((manifest.match(/audience: 'owner-workspace', manifestVersion: 1/g) ?? []).length, 4);
  assert.match(manifest, /entry\.audience !== 'owner-workspace'/);
});
