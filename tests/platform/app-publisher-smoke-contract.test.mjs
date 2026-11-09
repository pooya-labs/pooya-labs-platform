import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workflow = await readFile(new URL('../../.github/workflows/app-publisher-smoke.yml', import.meta.url), 'utf8');

test('manual App permission smoke creates a PR using only a non-product marker file', () => {
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /permissions:\n  contents: read\n  actions: read/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /CAPTURE_PUBLISHER_APP_ID/);
  assert.match(workflow, /CAPTURE_PUBLISHER_APP_PRIVATE_KEY/);
  assert.match(workflow, /uses: actions\/create-github-app-token@v2/);
  assert.match(workflow, /repositories: pooya-labs-platform/);
  assert.match(workflow, /permission-contents: write/);
  assert.match(workflow, /permission-pull-requests: write/);
  assert.match(workflow, /uses: peter-evans\/create-pull-request@v8/);
  assert.match(workflow, /branch: automation\/app-publisher-permission-smoke/);
  assert.match(workflow, /base: main/);
  assert.match(workflow, /add-paths:\n\s+\.github\/app-publisher-smoke\/latest-run\.md/);
  assert.match(workflow, /No application code, screenshots, customer data, or credentials/);
  assert.match(workflow, /Dispatch this smoke test from main only/);
  assert.doesNotMatch(workflow, /apps\/platform\/public\/interface-captures|git push origin HEAD:main|pull_request_target|workflow_run/);
});
