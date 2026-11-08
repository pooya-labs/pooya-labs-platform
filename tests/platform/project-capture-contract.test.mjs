import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const script = await readFile(new URL('../../apps/platform/scripts/capture-project-previews.mjs', import.meta.url), 'utf8');
const workflow = await readFile(new URL('../../.github/workflows/project-interface-captures.yml', import.meta.url), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('../../apps/platform/package.json', import.meta.url), 'utf8'));

test('preview capture covers eight public project demos with two responsive viewports and full-page evidence', () => {
  const slugs = ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aurapulse', 'global-cart', 'salon-booking'];
  for (const slug of slugs) assert.ok(script.includes(`slug: '${slug}'`), 'Missing preview target ' + slug);
  assert.equal((script.match(/slug: '[a-z-]+'/g) ?? []).length, 8);
  assert.match(script, /width: 1440, height: 1000/);
  assert.match(script, /width: 390, height: 844/);
  assert.match(script, /fullPage, animations: 'disabled'/);
  assert.match(script, /waitUntil: 'domcontentloaded'/);
  assert.match(script, /timeout: 30000/);
  assert.match(script, /capture-report\.json/);
  assert.match(script, /excluded: \['salon-booking/);
  assert.match(script, /slug: 'salon-booking'/);
  assert.match(script, /const defaultView = target\.slug === 'nexus-canvas' && viewport\.name === 'mobile' \? 'Mobile Rack' : 'Overview'/);
  assert.match(script, /captureScenario\('overview', defaultView\)/);
  assert.match(script, /captureScenario\('fullpage', 'Full page \/ all sections', true\)/);
  assert.match(script, /[Pp]ublic customer booking journey only/);
  assert.ok(script.includes("captureScenario('incidents', 'Incidents · API authentication required')"));
  assert.ok(script.includes("captureScenario(view.toLowerCase() + '-connection'"));
  assert.match(script, /Metrics/);
  assert.match(script, /Logs/);
  assert.match(script, /Traces/);
  assert.match(script, /captureScenario\('mobile-rack', 'Mobile Rack'\)/);
  assert.match(script, /captureScenario\('export-modal', 'Export Docker \/ JSON'\)/);
  assert.match(script, /captureScenario\('audio-lab', 'Real WebAudio EQ/);
  assert.match(script, /captureScenario\('task-board', 'Sprint Workflow/);
  assert.match(script, /No JSON file is imported and no download is triggered/);
  assert.match(script, /without starting audio or editing tasks/);

  assert.match(script, /target\.slug === 'orbit'/);
  assert.match(script, /real incident actions until an authenticated API is connected/);
  assert.match(script, /NexusCanvas Mobile Rack, desktop only/);
  assert.match(script, /viewport\.name !== 'mobile'/);
  assert.ok(script.includes('requiredCaptureCount = targets.length * viewports.length * 2'));
  assert.match(script, /recordVideo/);
  assert.ok(script.includes('motionVideo.saveAs'));
  assert.match(script, /page\.locator\('\.sidebar \.nav-item'\)/);
  assert.match(script, /captured < requiredCaptureCount/);
  assert.match(workflow, /name: Upload unreviewed screenshot evidence\n        if: always\(\)/);
});

test('capture is artifact-only and never publishes or commits screenshot files', () => {
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /image: mcr\.microsoft\.com\/playwright:v1\.64\.1-noble/);
  assert.doesNotMatch(workflow, /playwright install --with-deps/);
  assert.match(workflow, /npm run capture:projects --workspace @pooya-labs\/platform/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /name: project-interface-captures/);
  assert.match(workflow, /retention-days: 14/);
  assert.doesNotMatch(workflow, /deploy-pages|git push|create pull request/i);
  assert.equal(packageJson.scripts['capture:projects'], 'node scripts/capture-project-previews.mjs');
  assert.equal(packageJson.devDependencies.playwright, '1.64.1');
});
