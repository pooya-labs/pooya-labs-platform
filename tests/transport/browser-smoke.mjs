import { chromium } from 'playwright';

const endpoint = process.env.GAS_WEB_APP_URL;
const harness = process.env.TRANSPORT_HARNESS_URL ??
  'https://pooya-labs.github.io/pooya-labs-platform/tests/transport/external-fetch.html';

if (!endpoint) throw new Error('GAS_WEB_APP_URL is required.');

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const browserErrors = [];
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  page.on('requestfailed', request => {
    browserErrors.push(`REQUEST FAILED ${request.method()} ${request.url()}: ${request.failure()?.errorText ?? 'unknown'}`);
  });

  await page.goto(harness, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.locator('#endpoint').fill(endpoint);
  await page.locator('#run').click();
  await page.locator('#result').waitFor({ state: 'visible' });

  await page.waitForFunction(() => {
    const text = document.querySelector('#result')?.textContent ?? '';
    return text !== 'Sending request…' && text !== 'Not tested yet.';
  }, { timeout: 45000 });

  const output = (await page.locator('#result').innerText()).trim();
  console.log('Browser transport result:');
  console.log(output);
  if (browserErrors.length) {
    console.error('Browser diagnostics:');
    for (const error of browserErrors) console.error(error);
  }

  let result;
  try { result = JSON.parse(output); } catch {
    throw new Error('Harness returned non-JSON output.');
  }
  if (result.ok !== true || result.status !== 200) {
    throw new Error('External browser-to-GAS transport did not return a readable HTTP 200 health response.');
  }
  const body = typeof result.body === 'string' ? JSON.parse(result.body) : result.body;
  if (body?.ok !== true || body?.data?.status !== 'ok' ||
      body?.data?.transport !== 'content-service-post') {
    throw new Error('GAS health response did not match the expected contract.');
  }
  console.log('PASS: GitHub Pages browser origin can read the GAS health response.');
} finally {
  await browser.close();
}
