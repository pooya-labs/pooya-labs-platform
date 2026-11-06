import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('./external-fetch.html', import.meta.url), 'utf8');

test('external transport harness is served as a standalone HTML page', () => {
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<html[\s>]/i);
  assert.match(html, /External browser/);
});

test('endpoint validation is restricted to the Apps Script /exec route', () => {
  assert.ok(html.includes('script\\.google\\.com'));
  assert.ok(html.includes('\\/macros\\/s\\/'));
  assert.ok(html.includes('\\/exec'));
});

test('transport probe uses a simple text/plain POST with CORS-readable response mode', () => {
  assert.match(html, /method\s*:\s*'POST'/);
  assert.match(html, /mode\s*:\s*'cors'/);
  assert.match(html, /redirect\s*:\s*'follow'/);
  assert.match(html, /Content-Type'\s*:\s*'text\/plain;charset=utf-8'/);
  assert.match(html, /await response\.text\(\)/);
});

test('probe is restricted to the health.check action and does not use opaque no-cors mode', () => {
  assert.match(html, /action\s*:\s*'health\.check'/);
  assert.doesNotMatch(html, /mode\s*:\s*['"]no-cors['"]/);
  assert.doesNotMatch(html, /Authorization\s*:/i);
});

test('failure output preserves a neutral diagnosis instead of claiming a root cause', () => {
  assert.match(html, /do not label this a server outage without evidence/i);
  assert.match(html, /browser TypeError/);
});
