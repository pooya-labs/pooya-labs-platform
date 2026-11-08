import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const runbook = await readFile(new URL('../../docs/STATIC-HOST-DEPLOYMENT.md', import.meta.url), 'utf8');

test('static-host runbook keeps GitHub Pages and Cloudflare deploy/rollback paths separate', () => {
  assert.match(runbook, /dist\/pages/);
  assert.match(runbook, /dist\/cloudflare/);
  assert.match(runbook, /CLOUDFLARE_API_TOKEN/);
  assert.match(runbook, /normal git revert commit/);
  assert.match(runbook, /Never reset or force-push/);
  assert.match(runbook, /A successful GitHub Pages deployment does not prove Cloudflare was updated/);
  assert.match(runbook, /not proof that the procedure has been executed/);
});
