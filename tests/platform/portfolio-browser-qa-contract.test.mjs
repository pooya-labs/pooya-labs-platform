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
  assert.match(script, /label: 'home-en', path: '', locale: 'en', direction: 'ltr'/);
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
  assert.match(script, /reducedMotion: 'no-preference'/);
  assert.match(script, /page\.emulateMedia\(\{ reducedMotion: 'reduce' \}\)/);
  assert.match(script, /\.portfolio-hero-title/);
  assert.match(script, /scrollWidth > titleMetrics\.width/);
  assert.match(script, /document\.documentElement\.lang === 'fa'/);
  assert.match(script, /document\.documentElement\.lang === 'en'/);
  assert.match(script, /getAttribute\('data-theme'\)/);
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


test('browser QA rejects stale middle-of-page scroll restoration on direct route entry', () => {
  assert.match(script, /initialWindowScrollY: window\.scrollY/);
  assert.match(script, /initialDocumentScrollTop: document\.scrollingElement/);
  assert.match(script, /initialPortfolioScrollTop: document\.querySelector\('\.portfolio-page'\)/);
  assert.match(script, /history\.scrollRestoration/);
  assert.match(script, /direct route did not open at the top of the page/);
});


test('portfolio browser QA verifies vertical scrolling and actual desktop wheel input', () => {
  assert.match(script, /const scrollMetrics = await page\.evaluate/);
  assert.match(script, /scroller\.scrollHeight - scroller\.clientHeight/);
  assert.match(script, /scroller\.scrollTop = Math\.min\(480, maxScrollTop\)/);
  assert.match(script, /page\.mouse\.wheel\(0, 720\)/);
  assert.match(script, /Mouse-wheel input did not scroll the public portfolio/);
  assert.match(portfolioCss, /height:100dvh!important/);
  assert.match(portfolioCss, /overflow-y:auto!important/);
});

test('portfolio scroll reveals are observed inside the same scroll container', () => {
  assert.match(portfolioSource, /root\.scrollTop = 0/);
  assert.match(portfolioSource, /new IntersectionObserver\([\s\S]*?\}, \{ root, threshold: 0\.12/);
});


test('browser QA validates homepage motion sections and bidi-isolated hero headlines', () => {
  assert.match(script, /systemFieldCount: document\.querySelectorAll\('\.portfolio-system-field'\)\.length/);
  assert.match(script, /systemNodeCount: document\.querySelectorAll\('\.system-field-node'\)\.length/);
  assert.match(script, /craftPrincipleCount: document\.querySelectorAll\('\.craft-principle'\)\.length/);
  assert.match(script, /heroTitleRunsIsolated/);
  assert.match(script, /heroCapabilityTitleIsolated/);
  assert.match(script, /first-page headline is not isolated from mixed bidirectional text/);
});


test('thoughtful headline QA measures real text and terminal-glyph bounds after font loading', () => {
  assert.ok(script.includes('document.fonts?.ready'));
  assert.ok(script.includes('document.createRange()'));
  assert.ok(script.includes('lastGlyphRight <= lineRect.right + 1'));
  assert.ok(script.includes('thoughtfulWordLayout'));
  assert.ok(!script.includes('word.scrollWidth <= word.clientWidth'));
  assert.ok(portfolioCss.includes('padding-inline-end:.18em'));
  assert.ok(portfolioCss.includes('margin-inline-end:0'));
});

test('QA stores visual screenshots as workflow artifacts, not public site assets', () => {
  assert.ok(script.includes('shouldCaptureVisual'));
  assert.ok(script.includes('path.join(artifactDir, fileName)'));
  assert.ok(script.includes('routeRecord.visualEvidence'));
  assert.ok(workflow.includes('path: apps/platform/artifacts/portfolio-browser-qa/'));
  assert.ok(script.includes('never published to the website'));
});


test('case-study Browser QA verifies visible active motion and its reduced-motion fallback', () => {
  assert.match(script, /reducedMotion: 'no-preference'/);
  assert.match(script, /art\.getAnimations\(\{ subtree: true \}\)/);
  assert.match(script, /activeAnimationCount < 3/);
  assert.match(script, /await page\.emulateMedia\(\{ reducedMotion: 'reduce' \}\)/);
  assert.match(script, /reducedMotionAnimationName/);
  assert.match(script, /animations: 'allow'/);
});

test('the English headline avoids a gradient-clipped inline wrapper for thoughtful', () => {
  assert.match(portfolioSource, /hero-title-word-line/);
  assert.match(portfolioCss, /-webkit-text-fill-color:#79e5c5!important/);
  assert.match(portfolioCss, /white-space:nowrap!important/);
});
