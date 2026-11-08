import test from 'node:test';
import assert from 'node:assert/strict';
import { isSensitivePath, scanText } from '../../scripts/secret-scan.mjs';

test('detects high-confidence provider credential formats without returning secret values', () => {
  const samples = [
    ['private-key-block', '-----BEGIN PRIVATE KEY-----'],
    ['aws-access-key-id', ['AK', 'IA', 'A'.repeat(16)].join('')],
    ['github-token', ['ghp_', 'a'.repeat(36)].join('')],
    ['google-api-key', ['AIza', 'A'.repeat(35)].join('')],
    ['slack-token', ['xoxb-', 'a'.repeat(24)].join('')],
    ['stripe-live-secret', ['sk_live_', 'a'.repeat(28)].join('')],
  ];
  for (const [expectedRule, value] of samples) {
    const findings = scanText('safe header\\n' + value);
    assert.ok(findings.some((finding) => finding.rule === expectedRule), 'Expected ' + expectedRule);
    assert.ok(findings.every((finding) => !('value' in finding)), 'Secret values must never be returned');
    assert.ok(findings.every((finding) => !('match' in finding)), 'Raw matches must never be returned');
    assert.equal(findings[0].line, 2);
  }
});

test('detects long quoted credential assignments while allowing documented placeholders', () => {
  const key = 'CLOUDFLARE' + '_API_TOKEN';
  const secret = 'a'.repeat(40);
  const finding = scanText(key + ' = "' + secret + '"');
  assert.equal(finding.length, 1);
  assert.equal(finding[0].rule, 'credential-assignment');
  assert.deepEqual(scanText(key + ' = "your_api_token_goes_here"'), []);
  assert.deepEqual(scanText(key + ' = "${{ secrets.CLOUDFLARE_API_TOKEN }}"'), []);
});

test('flags common credential and private-key files but permits safe templates and public keys', () => {
  for (const path of ['.env', '.env.production', '.clasp.json', '.clasprc.json', 'id_rsa', 'keys/private.key', 'certs/client.p12', 'service-account.json']) {
    assert.equal(isSensitivePath(path), true, 'Expected sensitive path: ' + path);
  }
  for (const path of ['.env.example', 'keys/id_rsa.pub', 'apps/platform/public/brand/pooya-monogram.webp', 'docs/SECURITY-MODEL.md']) {
    assert.equal(isSensitivePath(path), false, 'Unexpected sensitive path: ' + path);
  }
});

test('does not classify ordinary project links, commit identifiers, or owner contact details as credentials', () => {
  const source = [
    'https://github.com/pooya-labs/pooya-labs-platform',
    'https://t.me/pooyayee',
    'commit_sha = "95e2726849a2793a126ea8a4d9755ab214df327e"',
    'GAS_DEPLOYMENT_ID: ${{ secrets.GAS_DEPLOYMENT_ID }}',
  ].join('\\n');
  assert.deepEqual(scanText(source), []);
});
