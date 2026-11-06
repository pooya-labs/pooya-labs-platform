import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../../', import.meta.url);
const catalogPath = new URL('apps/platform/public/novels/catalog.json', root);
const modulePath = new URL('apps/platform/src/NovelLibrary.tsx', root);
const sourcePath = new URL('apps/platform/src/PortfolioHome.tsx', root);
const guidePath = new URL('docs/NOVELS-GUIDE.md', root);

test('novel catalog starts empty and uses the versioned public schema', async () => {
  const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
  assert.deepEqual(catalog, { schemaVersion: 1, novels: [] });
});

test('novel library validates unique slugs, safe cover/manuscript paths, and explicit publication state', async () => {
  const source = await readFile(modulePath, 'utf8');
  assert.match(source, /validateNovelCatalog/);
  assert.match(source, /Novel slugs must be unique/);
  assert.match(source, /isSafeNovelPath/);
  assert.match(source, /Novel manuscripts must be Markdown or text files inside novels\\/manuscripts/);
  assert.match(source, /Every novel requires an explicit published flag/);
  assert.match(source, /novel\\.published/);
  assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
});

test('novel reader safely supports the documented Markdown structures', async () => {
  const source = await readFile(modulePath, 'utf8');
  assert.match(source, /parseNovelMarkdown/);
  assert.match(source, /type: 'heading'/);
  assert.match(source, /type: 'list'/);
  assert.match(source, /type: 'quote'/);
  assert.match(source, /renderInline/);
});

test('homepage links the novels section and loads the published catalog', async () => {
  const source = await readFile(sourcePath, 'utf8');
  assert.match(source, /href="#novels"/);
  assert.match(source, /NovelLibrarySection/);
  assert.match(source, /loadNovelCatalog/);
  assert.match(source, /novelCatalog\\.filter\\(\\(novel\\) => novel\\.published\\)/);
});

test('GitHub upload guide documents the public paths and privacy boundary', async () => {
  const guide = await readFile(guidePath, 'utf8');
  assert.match(guide, /apps\\/platform\\/public\\/novels\\/catalog\\.json/);
  assert.match(guide, /apps\\/platform\\/public\\/novels\\/covers/);
  assert.match(guide, /apps\\/platform\\/public\\/novels\\/manuscripts/);
  assert.match(guide, /published: false/);
  assert.match(guide, /فایل خام همچنان/);
});

test('Pages build copies the catalog into the public output when the artifact is present', async (t) => {
  const output = new URL('../../dist/pages/novels/catalog.json', import.meta.url);
  const built = await readFile(output, 'utf8').catch(() => null);
  if (built === null) { t.skip('Pages build output is not present in this test context.'); return; }
  assert.deepEqual(JSON.parse(built), { schemaVersion: 1, novels: [] });
});
