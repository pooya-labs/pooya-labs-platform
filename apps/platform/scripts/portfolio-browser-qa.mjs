import { AxeBuilder } from '@axe-core/playwright';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectSlugs = [
  'aetherflow',
  'orbit',
  'pooya-os',
  'nexus-canvas',
  'lumina-glass',
  'aura-pulse',
  'global-cart',
  'salon-booking',
];

const routes = [
  { label: 'home-en', path: '', locale: 'en', direction: 'ltr', mainId: 'top' },
  ...projectSlugs.flatMap((slug) => [
    { label: slug + '-fa', path: 'projects/' + slug + '/', locale: 'fa', direction: 'rtl', mainId: 'main-content' },
    { label: slug + '-en', path: 'en/projects/' + slug + '/', locale: 'en', direction: 'ltr', mainId: 'main-content' },
  ]),
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const baseUrl = new URL(process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173/pooya-labs-platform/');
if (!baseUrl.pathname.endsWith('/')) baseUrl.pathname += '/';
const artifactDir = path.resolve(process.env.PORTFOLIO_QA_ARTIFACT_DIR || 'artifacts/portfolio-browser-qa');
const report = {
  generatedAt: new Date().toISOString(),
  baseUrl: baseUrl.href,
  routeCount: routes.length,
  viewportCount: viewports.length,
  checks: [],
  failures: [],
  accessibility: {
    tags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    impactCounts: { critical: 0, serious: 0, moderate: 0, minor: 0, unknown: 0 },
    incompleteRuleChecks: 0,
    incompleteRules: [],
    findings: [],
  },
  note: 'Automated Chromium smoke and responsive checks. This is not a manual screen-reader audit or WCAG certification.',
};

function addFailure(route, viewport, message) {
  report.failures.push({ route: route.label, viewport: viewport ?? null, message });
}

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const route of routes) {
    const targetUrl = new URL(route.path, baseUrl);
    const routeRecord = {
      route: route.label,
      url: targetUrl.href,
      expectedLocale: route.locale,
      expectedDirection: route.direction,
      httpStatus: null,
      title: '',
      canonical: null,
      headingCount: 0,
      mainId: null,
      missingImageAltCount: 0,
      keyboardSkipNavigation: { passed: false, focusTarget: null, visibleOnFocus: false },
      viewportChecks: [],
      pageErrors: [],
    };

    const previousErrorCount = pageErrors.length;
    try {
      const response = await page.goto(targetUrl.href, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      routeRecord.httpStatus = response?.status() ?? null;
      if (!response || !response.ok()) {
        addFailure(route, null, 'Document request did not return a successful HTTP response.');
        report.checks.push(routeRecord);
        continue;
      }

      await page.locator('main h1').first().waitFor({ state: 'visible', timeout: 10000 });
      routeRecord.title = await page.title();
      const semantics = await page.evaluate(() => {
        const main = document.querySelector('main');
        const canonical = document.querySelector('link[rel="canonical"]');
        return {
          locale: document.documentElement.lang,
          direction: document.documentElement.dir,
          headingCount: document.querySelectorAll('h1').length,
          mainId: main?.id ?? null,
          mainCount: document.querySelectorAll('main').length,
          canonical: canonical?.href ?? null,
          missingImageAltCount: document.querySelectorAll('img:not([alt])').length,
        };
      });
      routeRecord.canonical = semantics.canonical;
      routeRecord.headingCount = semantics.headingCount;
      routeRecord.mainId = semantics.mainId;
      routeRecord.missingImageAltCount = semantics.missingImageAltCount;

      if (routeRecord.title.trim().length === 0) addFailure(route, null, 'Page title is empty.');
      if (semantics.locale !== route.locale) addFailure(route, null, 'Document language does not match the route.');
      if (semantics.direction !== route.direction) addFailure(route, null, 'Document direction does not match the locale.');
      if (semantics.headingCount !== 1) addFailure(route, null, 'Expected exactly one primary H1 heading.');
      if (semantics.mainCount !== 1 || semantics.mainId !== route.mainId) addFailure(route, null, 'Expected one main landmark with the correct skip-link target.');
      if (!semantics.canonical || new URL(semantics.canonical).pathname !== targetUrl.pathname) addFailure(route, null, 'Canonical URL does not match the current route.');
      if (semantics.missingImageAltCount > 0) addFailure(route, null, 'One or more images have no alt attribute.');

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const metrics = await page.evaluate(() => ({
          viewportWidth: window.innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          horizontalOverflow:
            document.documentElement.scrollWidth > window.innerWidth + 1 ||
            document.body.scrollWidth > window.innerWidth + 1,
        }));
        const axeResults = await new AxeBuilder({ page }).withTags(report.accessibility.tags).analyze();
        const axeFindings = axeResults.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact ?? 'unknown',
          description: violation.description,
          help: violation.help,
          helpUrl: violation.helpUrl,
          nodes: violation.nodes.slice(0, 12).map((node) => ({
            target: node.target,
            failureSummary: node.failureSummary?.slice(0, 1200) ?? null,
          })),
        }));
        routeRecord.viewportChecks.push({
          ...viewport,
          ...metrics,
          axeViolationCount: axeFindings.length,
          axeIncompleteRuleCount: axeResults.incomplete.length,
        });
        report.accessibility.incompleteRuleChecks += axeResults.incomplete.length;
        for (const rule of axeResults.incomplete) {
          report.accessibility.incompleteRules.push({
            route: route.label,
            viewport: viewport.name,
            id: rule.id,
            impact: rule.impact ?? 'unknown',
            description: rule.description,
            help: rule.help,
            helpUrl: rule.helpUrl,
            nodes: rule.nodes.slice(0, 8).map((node) => ({
              target: node.target,
              failureSummary: node.failureSummary?.slice(0, 1200) ?? null,
            })),
          });
        }
        for (const finding of axeFindings) {
          report.accessibility.impactCounts[finding.impact] =
            (report.accessibility.impactCounts[finding.impact] ?? 0) + 1;
          report.accessibility.findings.push({
            route: route.label,
            viewport: viewport.name,
            ...finding,
          });
          if (finding.impact === 'critical' || finding.impact === 'serious') {
            addFailure(route, viewport.name, 'High-impact axe accessibility violation (' + finding.impact + '): ' + finding.id);
          }
        }
        if (metrics.horizontalOverflow) {
          addFailure(route, viewport.name, 'Horizontal overflow detected at this viewport.');
        }
      }

      // The skip link is the first interactive element in the page DOM.
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.keyboard.press('Tab');
      await page.waitForFunction(() => {
        const active = document.activeElement;
        if (!active?.classList.contains('portfolio-skip-link')) return false;
        const rect = active.getBoundingClientRect();
        return rect.top >= -1 && rect.bottom <= window.innerHeight + 1 && rect.width > 0;
      }, null, { timeout: 2500 });
      routeRecord.keyboardSkipNavigation.visibleOnFocus = true;
      await page.keyboard.press('Enter');
      await page.waitForFunction(
        (mainId) => document.activeElement?.id === mainId,
        route.mainId,
        { timeout: 2500 },
      );
      routeRecord.keyboardSkipNavigation.focusTarget = await page.evaluate(() => document.activeElement?.id ?? null);
      routeRecord.keyboardSkipNavigation.passed = routeRecord.keyboardSkipNavigation.focusTarget === route.mainId;
      if (!routeRecord.keyboardSkipNavigation.passed) {
        addFailure(route, 'mobile', 'Skip link did not move focus to the main content landmark.');
      }
    } catch (error) {
      addFailure(route, null, error instanceof Error ? error.message : String(error));
    }

    if (route.label === 'home-en') {
      const heroTitle = page.locator('.portfolio-hero-title');
      const titleMetrics = await heroTitle.evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return { width: rect.width, scrollWidth: node.scrollWidth, height: rect.height, text: node.textContent?.trim() ?? '' };
      });
      if (!titleMetrics.text || titleMetrics.scrollWidth > titleMetrics.width + 2 || titleMetrics.height < 30) {
        addFailure(route, 'desktop/mobile', 'Hero heading is empty, clipped, or has invalid layout metrics.');
      }
      await page.locator('.portfolio-language').click();
      await page.waitForFunction(() => document.documentElement.lang === 'fa' && document.documentElement.dir === 'rtl');
      if (!await page.locator('.portfolio-hero-title').isVisible()) addFailure(route, null, 'Persian language switch did not keep the hero visible.');
      await page.locator('.portfolio-language').click();
      await page.waitForFunction(() => document.documentElement.lang === 'en' && document.documentElement.dir === 'ltr');
    }
    const themeButton = page.locator('.portfolio-theme');
    if (await themeButton.count()) {
      await themeButton.click();
      if (await page.locator('.portfolio-page').getAttribute('data-theme') !== 'light') addFailure(route, null, 'Light theme toggle did not activate on this route.');
      await themeButton.click();
      if (await page.locator('.portfolio-page').getAttribute('data-theme') !== 'dark') addFailure(route, null, 'Dark theme toggle did not restore the dark theme on this route.');
    } else {
      addFailure(route, null, 'Theme toggle is missing from this public page.');
    }
    routeRecord.pageErrors = pageErrors.slice(previousErrorCount);
    if (routeRecord.pageErrors.length > 0) {
      addFailure(route, null, 'Uncaught browser error: ' + routeRecord.pageErrors.join(' | '));
    }
    report.checks.push(routeRecord);
  }

  await context.close();
} finally {
  await browser.close();
}

await mkdir(artifactDir, { recursive: true });
await writeFile(path.join(artifactDir, 'qa-report.json'), JSON.stringify(report, null, 2) + '\n');

const passedRoutes = report.checks.filter((item) =>
  item.httpStatus === 200 &&
  item.keyboardSkipNavigation.passed &&
  item.viewportChecks.length === viewports.length
).length;
console.log('Portfolio browser QA: ' + passedRoutes + '/' + routes.length + ' routes passed.');
console.log('Viewport checks: ' + report.checks.reduce((sum, item) => sum + item.viewportChecks.length, 0) + '/' + (routes.length * viewports.length) + '.');
console.log('Axe violations by impact: ' + JSON.stringify(report.accessibility.impactCounts) + '.');
console.log('Axe incomplete rule checks: ' + report.accessibility.incompleteRuleChecks + ' (' + report.accessibility.incompleteRules.length + ' records).');
console.log('Failures: ' + report.failures.length + '.');
console.log('Report: ' + path.join(artifactDir, 'qa-report.json'));

if (report.failures.length > 0 || passedRoutes !== routes.length) {
  process.exitCode = 1;
}
