import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../../docs/approved-interface-captures/portfolio-2026-11-08.json', import.meta.url), 'utf8'));
const workflow = await readFile(new URL('../../.github/workflows/publish-portfolio-fullpage-captures.yml', import.meta.url), 'utf8');

test('only visually and privacy reviewed public full-page captures are approved', () => {
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.scope, 'portfolio-fullpage-interface-captures');
  assert.equal(manifest.review.outcome, 'approved-for-portfolio-use');
  assert.equal(manifest.review.visualReviewed, true);
  assert.equal(manifest.review.privacyReviewed, true);
  assert.equal(manifest.artifact.workflowRunId, 42468215117);
  assert.match(manifest.artifact.captureSha, /^[a-f0-9]{40}$/);
  assert.equal(manifest.files.length, 14);
  const expected = new Set(['aetherflow','orbit','pooya-os','nexus-canvas','lumina-glass','aurapulse','salon-booking']);
  for (const project of expected) {
    for (const device of ['desktop','mobile']) {
      const item = manifest.files.find((file) => file.project === project && file.device === device);
      assert.ok(item, 'Missing ' + project + ' ' + device + ' full-page capture');
      assert.equal(item.source, project + '-fullpage-' + device + '.png');
      assert.equal(item.destination, 'apps/platform/public/interface-captures/' + project + '/' + item.source);
      assert.match(item.sha256, /^[a-f0-9]{64}$/);
      assert.ok(item.bytes > 8);
      assert.equal(item.viewport.width, device === 'desktop' ? 1440 : 390);
      assert.ok(item.viewport.height >= (device === 'desktop' ? 1000 : 844));
    }
  }
  assert.doesNotMatch(JSON.stringify(manifest), /global-cart-fullpage/);
});

test('publication workflow downloads the exact artifact and verifies each PNG before committing', () => {
  assert.match(workflow, /portfolio-2026-11-08\.json/);
  assert.match(workflow, /Verify source capture run identity/);
  assert.match(workflow, /gh run view/);
  assert.match(workflow, /gh run download/);
  assert.match(workflow, /SHA-256 mismatch/);
  assert.match(workflow, /PNG dimensions mismatch/);
  assert.match(workflow, /uses: actions\\/create-github-app-token@v2/);
  assert.match(workflow, /uses: peter-evans\\/create-pull-request@v8/);
  assert.match(workflow, /CAPTURE_PUBLISHER_APP_ID/);
  assert.match(workflow, /CAPTURE_PUBLISHER_APP_PRIVATE_KEY/);
  assert.match(workflow, /base: main/);
  assert.match(workflow, /add-paths:/);
  assert.doesNotMatch(workflow, /git push origin HEAD:main/);
  assert.match(JSON.stringify(manifest.review), /Salon Booking customer-facing page only/);
});
