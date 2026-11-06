import { chromium } from 'playwright';
import { appendFile, mkdir, writeFile } from 'node:fs/promises';

const endpoint = process.env.GAS_WEB_APP_URL;
const harness = process.env.TRANSPORT_HARNESS_URL ??
  'https://pooya-labs.github.io/pooya-labs-platform/tests/transport/external-fetch.html';
if (!endpoint) throw new Error('GAS_WEB_APP_URL is required.');

const redact = value => String(value ?? '').replace(
  /https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec/g,
  'https://script.google.com/macros/s/[REDACTED]/exec'
);

const browser = await chromium.launch({ headless: true });
const browserConsole = [];
const failedRequests = [];
const observedPosts = [];
let fetchOutput = null;
let classification = 'unknown_failure';

try {
  const page = await browser.newPage();
  page.on('console', message => {
    if (message.type() === 'error') browserConsole.push(redact(message.text()));
  });
  page.on('request', request => {
    if (request.method() === 'POST' && request.url().startsWith('https://script.google.com/')) {
      observedPosts.push({
        method: 'POST',
        host: new URL(request.url()).host,
        path: '/macros/s/[REDACTED]/exec'
      });
    }
  });
  page.on('requestfailed', request => {
    failedRequests.push({
      method: request.method(),
      host: new URL(request.url()).host,
      error: redact(request.failure()?.errorText ?? 'unknown')
    });
  });

  await page.goto(harness, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.locator('#endpoint').fill(endpoint);
  await page.locator('#run').click();
  await page.waitForFunction(() => {
    const text = document.querySelector('#result')?.textContent ?? '';
    return text !== 'Sending request…' && text !== 'Not tested yet.';
  }, { timeout: 45000 });

  const output = (await page.locator('#result').innerText()).trim();
  try { fetchOutput = JSON.parse(output); }
  catch { fetchOutput = { raw: redact(output) }; }

  if (fetchOutput?.ok === true && fetchOutput?.status === 200) {
    let body = fetchOutput.body;
    if (typeof body === 'string') body = JSON.parse(body);
    classification = body?.ok === true &&
      body?.data?.status === 'ok' &&
      body?.data?.transport === 'content-service-post'
      ? 'passed'
      : 'unexpected_response';
  } else if (browserConsole.some(message =>
    /blocked by CORS policy|Access-Control-Allow-Origin/i.test(message))) {
    classification = 'blocked_by_cors';
  } else {
    classification = 'unclassified_transport_failure';
  }
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  classification,
  harnessOrigin: new URL(harness).origin,
  endpoint: 'https://script.google.com/macros/s/[REDACTED]/exec',
  fetchOutput,
  observedPosts,
  failedRequests,
  browserConsole
};

await mkdir('artifacts/transport', { recursive: true });
await writeFile('artifacts/transport/browser-diagnostic.json',
  JSON.stringify(report, null, 2) + '\n');

const explanation = classification === 'blocked_by_cors'
  ? 'Chromium explicitly reported that the Apps Script response lacked Access-Control-Allow-Origin. This is an observed browser CORS block, not proof that the Apps Script server was down.'
  : classification === 'passed'
    ? 'Chromium read the expected health response successfully.'
    : 'The browser test did not produce a confirmed success or a specific CORS diagnosis.';

const summary = [
  '# External GAS browser transport diagnostic',
  '',
  '**Classification:** `' + classification + '`',
  '',
  explanation,
  '',
  'The full Apps Script deployment identifier is redacted from the diagnostic artifact.'
].join('\n');

console.log(summary);
console.log('Diagnostic artifact: artifacts/transport/browser-diagnostic.json');
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + '\n');
}
if (classification !== 'passed' && classification !== 'blocked_by_cors') {
  process.exitCode = 1;
}
