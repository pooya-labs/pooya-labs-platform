import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const publicDir = join(root, 'apps/platform/public');

test('root-relative portfolio image URLs resolve to committed public assets', async () => {
  const source = await readFile(join(root, 'apps/platform/src/content/projects.ts'), 'utf8');
  const urls = [...source.matchAll(/\\burl:\\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  const localUrls = urls.filter((url) => url.startsWith('/') && !url.startsWith('//'));

  for (const url of localUrls) {
    const publicPath = url.replace(/^\\/pooya-labs-platform\\//, '').replace(/^\\/+/, '');
    const candidate = resolve(publicDir, publicPath);
    assert.ok(
      candidate === publicDir || candidate.startsWith(publicDir + sep),
      `Local media URL escaped the public asset directory: ${url}`,
    );
    await access(candidate);
  }
});

test('dedicated case-study hero assets require immutable source URLs and localized alt text', async () => {
  const source = await readFile(join(root, 'apps/platform/src/content/projects.ts'), 'utf8');
  assert.match(source, /assertHttpsUrl\\(project\\.caseStudyHeroAsset\\.url, \\['raw\\.githubusercontent\\.com'\\]/);
  assert.match(source, /Case-study hero assets must be pinned to an immutable source commit/);
  assert.match(source, /Every case-study hero asset requires Persian and English alternative text/);
});

test('project screenshot workflow keeps captures as review-only artifacts', async () => {
  const workflow = await readFile(join(root, '.github/workflows/project-interface-captures.yml'), 'utf8');
  assert.match(workflow, /permissions:\\n  contents: read/);
  assert.match(workflow, /Upload unreviewed screenshot evidence/);
  assert.doesNotMatch(workflow, /git push origin HEAD:main|Publish only the visually approved|gh workflow run/);
});
