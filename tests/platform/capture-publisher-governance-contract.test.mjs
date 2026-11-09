import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const publishers = [
  { path: '../../.github/workflows/publish-reviewed-captures.yml', branch: 'automation/publish-orbit-reviewed-captures' },
  { path: '../../.github/workflows/publish-reviewed-portfolio-captures.yml', branch: 'automation/publish-reviewed-portfolio-captures' },
  { path: '../../.github/workflows/publish-portfolio-fullpage-captures.yml', branch: 'automation/publish-reviewed-fullpage-captures' },
];

test('all reviewed screenshot publishers create App-authenticated PRs instead of pushing to main', async () => {
  for (const publisher of publishers) {
    const workflow = await readFile(new URL(publisher.path, import.meta.url), 'utf8');
    assert.match(workflow, /workflow_dispatch:/);
    assert.match(workflow, /permissions:\n  contents: read\n  actions: read/);
    assert.match(workflow, /persist-credentials: false/);
    assert.match(workflow, /CAPTURE_PUBLISHER_APP_ID/);
    assert.match(workflow, /CAPTURE_PUBLISHER_APP_PRIVATE_KEY/);
    assert.match(workflow, /uses: actions\/create-github-app-token@v2/);
    assert.match(workflow, /permission-contents: write/);
    assert.match(workflow, /permission-pull-requests: write/);
    assert.match(workflow, /repositories: pooya-labs-platform/);
    assert.match(workflow, /uses: peter-evans\/create-pull-request@v8/);
    assert.ok(workflow.includes('branch: ' + publisher.branch));
    assert.match(workflow, /base: main/);
    assert.match(workflow, /add-paths:/);
    assert.match(workflow, /No image files were published or pushed to main/);
    assert.doesNotMatch(workflow, /git push origin HEAD:main/);
    assert.doesNotMatch(workflow, /pull_request_target|workflow_run/);
  }
});
