import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const script = await readFile(new URL('../../apps/platform/scripts/portfolio-browser-qa.mjs', import.meta.url), 'utf8');
const workflow = await readFile(new URL('../../.github/workflows/portfolio-browser-qa.yml', import.meta.url), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('../../apps/platform/package.json', import.meta.url), 'utf8'));
const portfolioSource = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const portfolioCss = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');

test('browser QA covers the homepage and every bilingual static case-study route', () => {
  const match = script.match(/const projectSlugs = \[([\s\S]*?)\];/);
  assert.ok(match, 'Missing project slug registry');
  const slugs = [...match[1].matchAll(/'([a-z-]+)'/g)].map((item) => item[1]);
  assert.deepEqual(slugs, ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking']);
  assert.match(script, /path: 'projects\/' \+ slug \+ '\//);
  assert.match(script, /path: 'en\/projects\/' \+ slug \+ '\//);
  assert.match(script, /routeCount: routes\.length/);
});

test('browser QA checks desktop/mobile overflow, page semantics, and keyboard skip navigation', () => {
  assert.match(script, /width: 1440, height: 1000/);
  assert.match(script, /width: 390, height: 844/);
  assert.match(script, /document\.documentElement\.scrollWidth/);
  assert.match(script, /document\.body\.scrollWidth/);
  assert.match(script, /document\.querySelectorAll\('h1'\)\.length/);
  assert.match(script, /link\[rel="canonical"\]/);
  assert.match(script, /img:not\(\[alt\]\)/);
  assert.match(script, /page\.keyboard\.press\('Tab'\)/);
  assert.match(script, /portfolio-skip-link/);
  assert.match(script, /page\.keyboard\.press\('Enter'\)/);
  assert.match(script, /prefers-reduced-motion|reducedMotion: 'reduce'/);
});

test('browser QA is a separate Chromium workflow and uploads a report without publishing screenshots', () => {
  assert.equal(packageJson.scripts.preview, 'vite preview --config vite.config.ts --mode pages');
  assert.equal(packageJson.scripts['qa:portfolio:browser'], 'node scripts/portfolio-browser-qa.mjs');
  assert.match(workflow, /npx playwright install --with-deps chromium/);
  assert.match(workflow, /npm run build:pages/);
  assert.match(workflow, /portfolio-browser-qa-report/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.doesNotMatch(workflow, /deploy-pages|git push|create pull request/i);
  assert.equal(packageJson.devDependencies.playwright, '1.64.1');
});

test('browser QA includes a pinned axe-core Playwright scan for WCAG 2.2 AA and best practices', () => {
  assert.equal(packageJson.devDependencies['@axe-core/playwright'], '4.14.0');
  assert.match(script, /import \{ AxeBuilder \} from '@axe-core\/playwright'/);
  assert.match(script, /wcag2a/);
  assert.match(script, /wcag2aa/);
  assert.match(script, /wcag21aa/);
  assert.match(script, /wcag22aa/);
  assert.match(script, /best-practice/);
  assert.match(script, /axeResults\.violations/);
  assert.match(script, /axeResults\.incomplete/);
  assert.match(script, /finding\.impact === 'critical' \|\| finding\.impact === 'serious'/);
  assert.match(script, /incompleteRules: \[\]/);
  assert.match(script, /axeResults\.incomplete/);
  assert.doesNotMatch(portfolioSource, /aria-label=\"Pooya Labs home\"/);
  assert.match(portfolioSource, /portfolio-hero-art" data-reveal="hero-showcase" aria-hidden="true"/);
  assert.match(portfolioCss, /\.portfolio-header \.portfolio-brand[\s\S]*?min-height: 40px/);
  assert.match(portfolioCss, /\.portfolio-nav a[\s\S]*?min-height: 32px/);
  assert.match(portfolioCss, /\.portfolio-language, \.portfolio-workspace \{\s*min-height: 36px/);
  assert.match(portfolioCss, /\.case-study-back \{ min-height: 36px/);
  assert.match(script, /impactCounts/);
});
