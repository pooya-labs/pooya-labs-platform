import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const targets = [
  { slug: 'aetherflow', url: 'https://pooya16pg-spec.github.io/aetherflow/' },
  { slug: 'orbit', url: 'https://pooya-labs.github.io/orbit/' },
  { slug: 'pooya-os', url: 'https://pooya16pg-spec.github.io/pooya-os/' },
  { slug: 'nexus-canvas', url: 'https://pooya16pg-spec.github.io/nexus-canvas/' },
  { slug: 'lumina-glass', url: 'https://pooya16pg-spec.github.io/lumina-glass/' },
  { slug: 'aurapulse', url: 'https://pooya16pg-spec.github.io/aurapulse/' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const outputDir = path.resolve('artifacts/project-interface-captures');
const records = [];
const browser = await chromium.launch({ headless: true });

try {
  await mkdir(outputDir, { recursive: true });

  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      locale: 'en-US',
    });
    const page = await context.newPage();
    const errors = [];
    const failedRequests = [];
    let responseStatus = null;
    let finalUrl = target.url;
    let pageTitle = '';
    let bodyTextLength = 0;

    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text().slice(0, 500));
    });
    page.on('requestfailed', (request) => {
      failedRequests.push({
        url: request.url().slice(0, 500),
        error: request.failure()?.errorText ?? 'request failed',
      });
    });

    try {
      const response = await page.goto(target.url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      responseStatus = response?.status() ?? null;
      finalUrl = page.url();

      await page.locator('body').waitFor({ state: 'visible', timeout: 10000 });
      await page.waitForTimeout(1800);
      await page.evaluate(async () => {
        await Promise.race([
          document.fonts?.ready ?? Promise.resolve(),
          new Promise((resolve) => setTimeout(resolve, 2500)),
        ]);
      });

      pageTitle = await page.title();
      bodyTextLength = await page.locator('body').innerText().then((text) => text.trim().length);

      if (!response || responseStatus >= 400) {
        throw new Error(`Preview returned HTTP ${responseStatus ?? 'no response'}`);
      }
      if (bodyTextLength < 80) {
        throw new Error(`Page appears incomplete: only ${bodyTextLength} characters of visible text`);
      }

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(500);
        await page.addStyleTag({
          content: `
            *, *::before, *::after { caret-color: transparent !important; }
            input, textarea, select { filter: blur(5px) !important; }
            [data-testid*="user"], [data-testid*="account"], [data-private="true"] { filter: blur(8px) !important; }
            html { scroll-behavior: auto !important; }
          `,
        }).catch(() => undefined);

        const screenshotPath = path.join(outputDir, `${target.slug}-${viewport.name}.png`);
        await page.screenshot({
          path: screenshotPath,
          type: 'png',
          fullPage: false,
          animations: 'disabled',
          caret: 'hide',
          timeout: 20000,
        });

        records.push({
          slug: target.slug,
          requestedUrl: target.url,
          finalUrl,
          title: pageTitle,
          httpStatus: responseStatus,
          viewport,
          screenshot: path.basename(screenshotPath),
          visibleTextLength: bodyTextLength,
          errors: [...errors],
          failedRequests: [...failedRequests],
          result: 'captured-pending-human-review',
        });
      }
    } catch (error) {
      records.push({
        slug: target.slug,
        requestedUrl: target.url,
        finalUrl,
        title: pageTitle,
        httpStatus: responseStatus,
        visibleTextLength: bodyTextLength,
        errors: [...errors, error instanceof Error ? error.message : String(error)],
        failedRequests,
        result: 'capture-failed',
      });
    } finally {
      await context.close();
    }
  }

  await writeFile(
    path.join(outputDir, 'capture-report.json'),
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      note: 'Screenshots are unreviewed evidence candidates. They are not automatically published or committed.',
      excluded: ['salon-booking (requires owner-approved, privacy-reviewed capture)'],
      captures: records,
    }, null, 2) + '\n',
  );
} finally {
  await browser.close();
}

const captured = records.filter((record) => record.result === 'captured-pending-human-review').length;
console.log(`Capture workflow produced ${captured} of ${targets.length * viewports.length} viewport screenshots.`);
if (captured === 0) {
  throw new Error('No project preview screenshots could be captured.');
}
