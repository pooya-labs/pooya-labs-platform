import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const script = await readFile(new URL('../../apps/platform/scripts/portfolio-performance-qa.mjs', import.meta.url), 'utf8');
const workflow = await readFile(new URL('../../.github/workflows/portfolio-browser-qa.yml', import.meta.url), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));

test('portfolio performance QA measures the homepage and all eight project routes at desktop and mobile sizes', () => {
  for (const slug of ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking']) {
    assert.ok(script.includes("'" + slug + "'"));
  }
  assert.match(script, /width: 1440, height: 1000/);
  assert.match(script, /width: 390, height: 844/);
  assert.match(script, /largest-contentful-paint/);
  assert.match(script, /cumulativeLayoutShift/);
  assert.match(script, /layoutShiftEvents/);
  assert.match(script, /previousRect/);
  assert.match(script, /currentRect/);
  assert.match(script, /javascriptBytes/);
  assert.match(script, /totalResourceBytes/);
});

test('performance baseline is part of Browser QA and can be enforced after baseline review', () => {
  assert.match(workflow, /qa:portfolio:performance/);
  assert.match(workflow, /PORTFOLIO_PERF_ARTIFACT_DIR/);
  assert.match(script, /PORTFOLIO_PERF_ENFORCE/);
  assert.match(script, /PORTFOLIO_PERF_REPORT_NAME/);
  assert.match(workflow, /performance-local\\.json/);
  assert.match(workflow, /performance-github-pages\\.json/);
  assert.match(workflow, /performance-cloudflare-pages\\.json/);
  assert.ok(packageJson.scripts['qa:portfolio:performance']);
});
