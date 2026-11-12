import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../../', import.meta.url);
const catalogPath = new URL('apps/platform/public/novels/catalog.json', root);
const modulePath = new URL('apps/platform/src/NovelLibrary.tsx', root);
const sourcePath = new URL('apps/platform/src/PortfolioHome.tsx', root);
const guidePath = new URL('docs/NOVELS-GUIDE.md', root);

test('novel catalog publishes the two approved books using the versioned public schema', async () => {
  const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
  assert.equal(catalog.schemaVersion, 1);
  assert.deepEqual(
    catalog.novels.map((novel) => [novel.slug, novel.title.fa, novel.cover, novel.manuscript, novel.published]),
    [
      ['gavazn', 'گوزن', 'covers/gavazn.webp', 'manuscripts/gavazn.pdf', true],
      ['ghazal', 'غزال', 'covers/ghazal.webp', 'manuscripts/ghazal.pdf', true],
    ],
  );
  for (const novel of catalog.novels) {
    assert.equal(novel.language, 'fa');
    assert.deepEqual(novel.genres, []);
  }
});

test('novel library validates unique slugs, safe cover/manuscript paths, and explicit publication state', async () => {
  const source = await readFile(modulePath, 'utf8');
  assert.ok(source.includes('validateNovelCatalog'));
  assert.ok(source.includes('Novel slugs must be unique'));
  assert.ok(source.includes('isSafeNovelPath'));
  assert.ok(source.includes('novels/manuscripts/'));
  assert.ok(source.includes('Every novel requires an explicit published flag'));
  assert.ok(source.includes('novel.published'));
  assert.ok(!source.includes('dangerouslySetInnerHTML'));
});

test('novel reader safely supports the documented Markdown structures', async () => {
  const source = await readFile(modulePath, 'utf8');
  assert.ok(source.includes('parseNovelMarkdown'));
  assert.ok(source.includes("type: 'heading'"));
  assert.ok(source.includes("type: 'list'"));
  assert.ok(source.includes("type: 'quote'"));
  assert.ok(source.includes('renderInline'));
});

test('homepage links the novels section and loads the published catalog', async () => {
  const source = await readFile(sourcePath, 'utf8');
  assert.ok(source.includes('href="#novels"'));
  assert.ok(source.includes('NovelLibrarySection'));
  assert.ok(source.includes('loadNovelCatalog'));
  assert.ok(source.includes('novelCatalog.filter((novel) => novel.published)'));
});

test('GitHub upload guide documents the public paths and privacy boundary', async () => {
  const guide = await readFile(guidePath, 'utf8');
  assert.ok(guide.includes('apps/platform/public/novels/catalog.json'));
  assert.ok(guide.includes('apps/platform/public/novels/covers/'));
  assert.ok(guide.includes('apps/platform/public/novels/manuscripts/'));
  assert.ok(guide.includes('published: false'));
  assert.ok(guide.includes('```text'));
  assert.ok(guide.includes('```json'));
  assert.ok(!guide.includes('\\`'));
  assert.ok(guide.includes('فایل خام همچنان'));
});

test('Pages build copies the catalog into the public output when the artifact is present', async (t) => {
  const output = new URL('../../dist/pages/novels/catalog.json', import.meta.url);
  const built = await readFile(output, 'utf8').catch(() => null);
  if (built === null) { t.skip('Pages build output is not present in this test context.'); return; }
  const sourceCatalog = JSON.parse(await readFile(catalogPath, 'utf8'));
  assert.deepEqual(JSON.parse(built), sourceCatalog);
});
