import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const script = await readFile(new URL('../../apps/platform/scripts/capture-project-previews.mjs', import.meta.url), 'utf8');
const workflow = await readFile(new URL('../../.github/workflows/project-interface-captures.yml', import.meta.url), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('../../apps/platform/package.json', import.meta.url), 'utf8'));

test('preview capture covers only the six public project demos with two responsive viewports', () => {
  const slugs = ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aurapulse'];
  for (const slug of slugs) assert.ok(script.includes(`slug: '${slug}'`), 'Missing preview target ' + slug);
  assert.equal((script.match(/slug: '[a-z-]+'/g) ?? []).length, 6);
  assert.match(script, /width: 1440, height: 1000/);
  assert.match(script, /width: 390, height: 844/);
  assert.match(script, /fullPage: false/);
  assert.match(script, /waitUntil: 'domcontentloaded'/);
  assert.match(script, /timeout: 30000/);
  assert.match(script, /capture-report\.json/);
  assert.match(script, /excluded: \['salon-booking/);
  assert.doesNotMatch(script, /slug: 'salon-booking'/);
});

test('capture is artifact-only and never publishes or commits screenshot files', () => {
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /npx playwright install --with-deps chromium/);
  assert.match(workflow, /npm run capture:projects --workspace @pooya-labs\/platform/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /name: project-interface-captures/);
  assert.match(workflow, /retention-days: 14/);
  assert.doesNotMatch(workflow, /deploy-pages|git push|create pull request/i);
  assert.equal(packageJson.scripts['capture:projects'], 'node scripts/capture-project-previews.mjs');
  assert.equal(packageJson.devDependencies.playwright, '1.64.1');
});
