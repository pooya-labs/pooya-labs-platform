import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectSlugs = [
  'aetherflow', 'orbit', 'pooya-os', 'nexus-canvas',
  'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking',
];
const routes = [
  { label: 'home-en', path: '?qa-locale=en' },
  { label: 'home-fa', path: '?qa-locale=fa' },
  ...projectSlugs.map((slug) => ({ label: slug + '-en', path: 'en/projects/' + slug + '/' })),
];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];
const baseUrl = new URL(process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173/pooya-labs-platform/');
if (!baseUrl.pathname.endsWith('/')) baseUrl.pathname += '/';
const artifactDir = path.resolve(process.env.PORTFOLIO_PERF_ARTIFACT_DIR || 'apps/platform/artifacts/portfolio-browser-qa');
const reportName = process.env.PORTFOLIO_PERF_REPORT_NAME || 'performance-report.json';
const environmentLabel = process.env.PORTFOLIO_PERF_ENVIRONMENT || 'local-build';
const enforceBudgets = process.env.PORTFOLIO_PERF_ENFORCE === '1';
const budgets = {
  ttfbMs: 1200,
  domContentLoadedMs: 3500,
  loadEventMs: 6500,
  largestContentfulPaintMs: 4000,
  javascriptBytes: 700_000,
  stylesheetBytes: 300_000,
  totalResourceBytes: 4_000_000,
};

await mkdir(artifactDir, { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  baseUrl: baseUrl.href,
  environment: environmentLabel,
  mode: enforceBudgets ? 'enforced' : 'baseline-only',
  budgets,
  routes: [],
  failures: [],
  note: 'Cold-context Chromium measurements. Cross-origin resources without Timing-Allow-Origin may expose zero transfer sizes; zero is not interpreted as zero-cost and requires real-device/network review.',
};

const browser = await chromium.launch({ headless: true });
try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      await context.addInitScript(() => {
        const url = new URL(window.location.href);
        const requestedLocale = url.searchParams.get('qa-locale');
        if (requestedLocale === 'fa' || requestedLocale === 'en') {
          try { window.localStorage.setItem('pooya-labs:language-v2', requestedLocale); } catch {}
          url.searchParams.delete('qa-locale');
          window.history.replaceState({}, '', url.pathname + url.search + url.hash);
        }
        window.__portfolioLcp = null;
        window.__portfolioCls = 0;
        window.__portfolioLayoutShifts = [];
        try {
          new PerformanceObserver((list) => {
            const last = list.getEntries().at(-1);
            if (last) window.__portfolioLcp = last.startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                window.__portfolioCls += entry.value;
                window.__portfolioLayoutShifts.push({
                  value: Number(entry.value.toFixed(4)),
                  startTimeMs: Math.round(entry.startTime),
                  sources: (entry.sources || []).slice(0, 5).map((source) => {
                    const node = source.node;
                    return {
                      tag: node?.tagName?.toLowerCase() ?? null,
                      id: node?.id ?? null,
                      className: typeof node?.className === 'string' ? node.className.slice(0, 180) : null,
                      previousRect: source.previousRect ? {
                        x: Math.round(source.previousRect.x),
                        y: Math.round(source.previousRect.y),
                        width: Math.round(source.previousRect.width),
                        height: Math.round(source.previousRect.height),
                      } : null,
                      currentRect: source.currentRect ? {
                        x: Math.round(source.currentRect.x),
                        y: Math.round(source.currentRect.y),
                        width: Math.round(source.currentRect.width),
                        height: Math.round(source.currentRect.height),
                      } : null,
                    };
                  }),
                });
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch {}
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const target = new URL(route.path, baseUrl);
      const startedAt = Date.now();
      let status = null;
      let navigationError = null;
      try {
        const response = await page.goto(target.href, { waitUntil: 'load', timeout: 30000 });
        status = response?.status() ?? null;
        await page.locator('main h1').first().waitFor({ state: 'visible', timeout: 10000 });
        await page.evaluate(() => document.fonts?.ready);
        await page.waitForTimeout(250);
      } catch (error) {
        navigationError = error instanceof Error ? error.message : String(error);
      }
      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        const resources = performance.getEntriesByType('resource');
        const sizeOf = (entries) => entries.reduce((total, entry) =>
          total + (entry.transferSize || entry.encodedBodySize || 0), 0);
        const scripts = resources.filter((entry) => /\.m?js(?:\?|$)/i.test(entry.name));
        const stylesheets = resources.filter((entry) => /\.css(?:\?|$)/i.test(entry.name));
        const images = resources.filter((entry) => /\.(?:png|jpe?g|webp|avif|svg)(?:\?|$)/i.test(entry.name));
        const fonts = resources.filter((entry) => /\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(entry.name));
        const paint = performance.getEntriesByType('paint');
        return {
          title: document.title,
          locale: document.documentElement.lang,
          direction: document.documentElement.dir,
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          ttfbMs: nav ? Math.round(nav.responseStart - nav.startTime) : null,
          domContentLoadedMs: nav?.domContentLoadedEventEnd ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : null,
          loadEventMs: nav?.loadEventEnd ? Math.round(nav.loadEventEnd - nav.startTime) : null,
          firstContentfulPaintMs: Math.round(paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime ?? 0) || null,
          largestContentfulPaintMs: Number.isFinite(window.__portfolioLcp) ? Math.round(window.__portfolioLcp) : null,
          cumulativeLayoutShift: Number(window.__portfolioCls.toFixed(4)),
          layoutShiftEvents: (window.__portfolioLayoutShifts || []).sort((a, b) => b.value - a.value).slice(0, 10),
          resourceCount: resources.length,
          totalResourceBytes: sizeOf(resources),
          javascriptBytes: sizeOf(scripts),
          stylesheetBytes: sizeOf(stylesheets),
          imageBytes: sizeOf(images),
          fontBytes: sizeOf(fonts),
          crossOriginResourcesWithHiddenTransferSize: resources.filter((entry) => {
            try { return new URL(entry.name).origin !== location.origin && entry.transferSize === 0 && entry.encodedBodySize === 0; }
            catch { return false; }
          }).length,
        };
      });
      const record = {
        route: route.label, viewport: viewport.name, url: target.href, status,
        wallClockMs: Date.now() - startedAt, navigationError, pageErrors: errors, metrics,
      };
      report.routes.push(record);
      if (status !== 200) report.failures.push({ route: route.label, viewport: viewport.name, issue: 'HTTP status is not 200.' });
      if (navigationError) report.failures.push({ route: route.label, viewport: viewport.name, issue: navigationError });
      if (errors.length) report.failures.push({ route: route.label, viewport: viewport.name, issue: 'Uncaught page error: ' + errors.join(' | ') });
      if (metrics.horizontalOverflow) report.failures.push({ route: route.label, viewport: viewport.name, issue: 'Horizontal overflow detected.' });
      if (enforceBudgets) {
        for (const key of ['ttfbMs', 'domContentLoadedMs', 'loadEventMs', 'largestContentfulPaintMs', 'javascriptBytes', 'stylesheetBytes', 'totalResourceBytes']) {
          const value = metrics[key];
          if (value !== null && value > budgets[key]) {
            report.failures.push({ route: route.label, viewport: viewport.name, issue: key + ' exceeded budget: ' + value + ' > ' + budgets[key] });
          }
        }
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
}
const numeric = (key) => report.routes.map((route) => route.metrics[key]).filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
const percentile = (values, fraction) => values.length ? values[Math.min(values.length - 1, Math.ceil(values.length * fraction) - 1)] : null;
report.summary = {};
for (const key of ['ttfbMs', 'domContentLoadedMs', 'loadEventMs', 'firstContentfulPaintMs', 'largestContentfulPaintMs', 'cumulativeLayoutShift', 'totalResourceBytes', 'javascriptBytes', 'stylesheetBytes', 'imageBytes', 'fontBytes']) {
  const values = numeric(key);
  report.summary[key] = { p50: percentile(values, .5), p75: percentile(values, .75), max: values.length ? values.at(-1) : null, samples: values.length };
}
await writeFile(path.join(artifactDir, reportName), JSON.stringify(report, null, 2) + '\n');
console.log('Portfolio performance baseline: ' + report.routes.length + '/' + (routes.length * viewports.length) + ' measurements collected.');
console.log('p75 summary: ' + JSON.stringify(Object.fromEntries(Object.entries(report.summary).map(([key, value]) => [key, value.p75]))));
console.log('Failures: ' + report.failures.length + '.');
console.log('Report: ' + path.join(artifactDir, reportName));
if (report.failures.length > 0) process.exitCode = 1;
