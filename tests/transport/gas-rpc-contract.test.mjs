import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const gas = await readFile(new URL('../../apps-script/Code.gs', import.meta.url), 'utf8');
const page = await readFile(new URL('../../apps-script/Index.html', import.meta.url), 'utf8');

test('Apps Script serves the primary UI through HtmlService', () => {
  assert.match(gas, /function\s+doGet\s*\(/);
  assert.match(gas, /HtmlService\.createHtmlOutputFromFile\(['"]Index['"]\)/);
});

test('GAS exposes the versioned RPC dispatcher and no cross-origin ContentService endpoint', () => {
  assert.match(gas, /function\s+rpcCall\s*\(request\)/);
  assert.match(gas, /request\.apiVersion\s*!==\s*1/);
  assert.match(gas, /request\.action\s*===\s*['"]health\.check['"]/);
  assert.match(gas, /ACTION_NOT_ALLOWED/);
  assert.doesNotMatch(gas, /function\s+doPost\s*\(/);
  assert.doesNotMatch(gas, /ContentService\\s*\\.\\s*(?:createTextOutput|MimeType)/);
});

test('RPC errors are normalized and internal exceptions are not returned', () => {
  assert.match(gas, /function\s+rpcError_\s*\(/);
  assert.match(gas, /INTERNAL_ERROR/);
  assert.match(gas, /The request could not be completed/);
  assert.doesNotMatch(gas, /error\.stack/);
});

test('HtmlService client invokes rpcCall with both async handlers', () => {
  assert.match(page, /google\.script\.run/);
  assert.match(page, /withSuccessHandler\(resolve\)/);
  assert.match(page, /withFailureHandler\(reject\)/);
  assert.match(page, /\.rpcCall\(request\)/);
  assert.doesNotMatch(page, /fetch\s*\(/);
});
