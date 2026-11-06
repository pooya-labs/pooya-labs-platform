import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const targets = [
  { slug: 'aetherflow', url: 'https://pooya-labs.github.io/aetherflow/' },
  { slug: 'orbit', url: 'https://pooya-labs.github.io/orbit/' },
  { slug: 'pooya-os', url: 'https://pooya-labs.github.io/pooya-os/' },
  { slug: 'nexus-canvas', url: 'https://pooya-labs.github.io/nexus-canvas/' },
  { slug: 'lumina-glass', url: 'https://pooya-labs.github.io/lumina-glass/' },
  { slug: 'aurapulse', url: 'https://pooya-labs.github.io/aurapulse/' },
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
        if (viewport.name === 'mobile' && ['nexus-canvas', 'lumina-glass'].includes(target.slug)) {
          const resetResponse = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
          if (!resetResponse || resetResponse.status() >= 400) throw new Error('Could not reset ' + target.slug + ' before mobile feature capture.');
          await page.locator('body').waitFor({ state: 'visible', timeout: 10000 });
          await page.waitForTimeout(1600);
        }
        await page.waitForTimeout(500);
        await page.addStyleTag({
          content: [
            '*, *::before, *::after { caret-color: transparent !important; }',
            'input:not([type=range]):not([type=checkbox]):not([type=radio]):not([type=file]):not(:placeholder-shown), textarea:not(:placeholder-shown) { filter: blur(5px) !important; }',
            '[data-testid*="user"], [data-testid*="account"], [data-private="true"] { filter: blur(8px) !important; }',
            'html { scroll-behavior: auto !important; }',
          ].join('\n'),
        }).catch(() => undefined);

        const captureScenario = async (scenario, activeView) => {
          const viewportDiagnostics = await page.evaluate(() => ({
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            documentWidth: document.documentElement.scrollWidth,
            documentHeight: document.documentElement.scrollHeight,
            hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          }));
          const suffix = scenario === 'overview' ? '' : '-' + scenario;
          const screenshotPath = path.join(outputDir, target.slug + suffix + '-' + viewport.name + '.png');
          await page.screenshot({ path: screenshotPath, type: 'png', fullPage: false, animations: 'disabled', caret: 'hide', timeout: 20000 });
          const screenshotBytes = await readFile(screenshotPath);
          records.push({
            slug: target.slug, scenario, activeView, requestedUrl: target.url, finalUrl, title: pageTitle,
            httpStatus: responseStatus, viewport, viewportDiagnostics, screenshot: path.basename(screenshotPath),
            screenshotBytes: screenshotBytes.byteLength,
            screenshotSha256: createHash('sha256').update(screenshotBytes).digest('hex'),
            visibleTextLength: bodyTextLength, errors: [...errors], failedRequests: [...failedRequests],
            result: 'captured-pending-human-review',
          });
        };

        if (target.slug === 'orbit') {
          const overviewButton = page.locator('.sidebar .nav-item').filter({ hasText: 'Overview' }).first();
          if (await overviewButton.getAttribute('aria-current') !== 'page') {
            const mobileMenu = page.locator('.mobile-menu');
            if (await mobileMenu.isVisible()) await mobileMenu.click();
            await overviewButton.click();
            await page.waitForTimeout(350);
          }
        }
        const defaultView = target.slug === 'nexus-canvas' && viewport.name === 'mobile' ? 'Mobile Rack' : 'Overview';
        await captureScenario('overview', defaultView);

        // Demo mode has seeded incidents, but its incident-management panel intentionally withholds
        // real incident actions until an authenticated API is connected. Metrics/Logs/Traces are also
        // connection prompts, so none of these states are labelled as live telemetry.
        if (target.slug === 'orbit') {
          const mobileMenu = page.locator('.mobile-menu');
          if (await mobileMenu.isVisible()) await mobileMenu.click();
          await page.getByRole('button', { name: 'Incidents', exact: true }).first().click();
          await page.waitForTimeout(650);
          await captureScenario('incidents', 'Incidents · API authentication required');
        }

        // NexusCanvas: capture the interactive mobile-rack view and the export/import modal.
        // No JSON file is imported and no download is triggered by the capture.
        if (target.slug === 'nexus-canvas') {
          // On mobile the application selects Mobile Rack by default; capture it as the base mobile view.
          if (viewport.name !== 'mobile') {
            await page.getByRole('button', { name: /Mobile Rack|نمای رک موبایل/ }).first().click();
            await page.waitForTimeout(600);
            await captureScenario('mobile-rack', 'Mobile Rack');
          }
          await page.getByRole('button', { name: /Export Docker \/ JSON|خروجی Docker \/ JSON/ }).first().click();
          await page.waitForTimeout(500);
          await captureScenario('export-modal', 'Export Docker / JSON');
        }

        // LuminaGlass: capture the Audio EQ and local task-board tabs without starting audio or editing tasks.
        if (target.slug === 'lumina-glass') {
          await page.getByRole('button', { name: /Real WebAudio EQ|استودیو صدا/ }).first().click();
          await page.waitForTimeout(600);
          await captureScenario('audio-lab', 'Real WebAudio EQ · playback stopped');
          await page.getByRole('button', { name: /Sprint Workflow|برد مدیریت تسک/ }).first().click();
          await page.waitForTimeout(500);
          await captureScenario('task-board', 'Sprint Workflow · local-only');
        }
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
      note: 'Screenshots are unreviewed evidence candidates. They are not automatically published or committed. ORBIT includes an Incidents auth-boundary view; NexusCanvas includes Mobile Rack and export/import modal states; LuminaGlass includes Audio EQ and local task-board states. No audio is started, no file is imported, and no task is modified. Metrics/Logs/Traces are not captured from placeholder connect prompts. Each record includes viewport overflow diagnostics, byte size, and SHA-256 for artifact integrity.',
      excluded: ['salon-booking (requires owner-approved, privacy-reviewed capture)'],
      captures: records,
    }, null, 2) + '\n',
  );
} finally {
  await browser.close();
}

const captured = records.filter((record) => record.result === 'captured-pending-human-review').length;
const expectedCaptureCount = targets.length * viewports.length
  + viewports.length // ORBIT Incidents, desktop and mobile
  + 1 // NexusCanvas Mobile Rack, desktop only; mobile uses it as the base view
  + viewports.length // NexusCanvas Export / Import modal, desktop and mobile
  + viewports.length * 2; // LuminaGlass Audio Lab and Task Board, desktop and mobile
console.log(`Capture workflow produced ${captured} of ${expectedCaptureCount} expected viewport/scenario screenshots.`);
if (captured !== expectedCaptureCount) {
  const failed = records.filter((record) => record.result === 'capture-failed');
  throw new Error(`Expected ${expectedCaptureCount} screenshots, captured ${captured}; ${failed.length} target(s) failed. Inspect capture-report.json for diagnostics.`);
}
