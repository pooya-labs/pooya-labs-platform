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
  assert.ok(script.includes("label: 'home-en', path: '?qa-locale=en', locale: 'en', direction: 'ltr'"));
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
  assert.match(workflow, /actions\/upload-artifact@v7/);
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
  assert.match(portfolioSource, /new IntersectionObserver\([\s\S]*?\}, \{ root, threshold: 0/);
});


test('browser QA validates homepage motion sections and bidi-isolated hero headlines', () => {
  assert.match(script, /systemFieldCount: document\.querySelectorAll\('\.portfolio-system-field'\)\.length/);
  assert.match(script, /systemNodeCount: document\.querySelectorAll\('\.system-field-node'\)\.length/);
  assert.match(script, /craftPrincipleCount: document\.querySelectorAll\('\.craft-principle'\)\.length/);
  assert.match(script, /heroTitleRunsIsolated/);
  assert.match(script, /heroCapabilityTitleIsolated/);
  assert.match(script, /first-page headline is not isolated from mixed bidirectional text/);
});


test('intelligent headline QA measures real text and terminal-glyph bounds after font loading', () => {
  assert.ok(script.includes('document.fonts?.ready'));
  assert.ok(script.includes('document.createRange()'));
  assert.ok(script.includes('lastGlyphRight <= lineRect.right + 1'));
  assert.ok(script.includes('heroWordLayout'));
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


test('case-study Browser QA verifies AetherFlow workflow motion and its desktop capture gallery', () => {
  assert.match(script, /reducedMotion: 'no-preference'/);
  assert.match(script, /art\.getAnimations\(\{ subtree: true \}\)/);
  assert.match(script, /activeAnimationCount < 3/);
  assert.match(script, /caseStudyDesktopCapture/);
  assert.match(script, /aetherflowDesktopCapture/);
  assert.match(script, /scene-aetherflow/);
  assert.match(script, /interface-captures\/aetherflow\/aetherflow-fullpage-desktop\.png/);
  assert.match(script, /route\.label === 'orbit-en'/);
  assert.match(script, /await page\.emulateMedia\(\{ reducedMotion: 'reduce' \}\)/);
  assert.match(script, /reducedMotionAnimationName/);
  assert.match(script, /animations: 'allow'/);
});

test('the English intelligent headline avoids a gradient-clipped inline wrapper', () => {
  assert.match(portfolioSource, /hero-title-word-line/);
  assert.match(portfolioCss, /-webkit-text-fill-color:#79e5c5!important/);
  assert.match(portfolioCss, /white-space:nowrap!important/);
});


test('Browser QA captures and verifies the supplied horizontal wordmark in the About section', () => {
  assert.match(script, /\.portfolio-about \.pooya-wordmark/);
  assert.match(script, /image\.decode\(\)/);
  assert.match(script, /ownerWordmark/);
  assert.match(script, /home-en-about-desktop\.png/);
  assert.match(script, /owner-designed POOYA — LABS wordmark did not load/);
  assert.match(portfolioSource, /brand\/pooya-wordmark\.webp/);
});


test('About visual evidence waits for the reveal transition and the supplied wordmark animation to finish', () => {
  assert.match(script, /section\.classList\.contains\('is-visible'\)/);
  assert.match(script, /getComputedStyle\(section\)\.opacity\) >= \.99/);
  assert.match(script, /wordmark\.getAnimations\(\)\.every\(\(animation\) => animation\.playState === 'finished'\)/);
  assert.match(script, /home-en-about-desktop\.png/);
});


test('case-study heroes use AetherFlow workflow motion and authentic project-specific imagery', () => {
  for (const slug of ['orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking']) {
    assert.ok(portfolioCss.includes(`.scene-${slug}`), `Missing dedicated hero scene styles for ${slug}`);
  }
  for (const slug of ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking']) {
    assert.ok(portfolioCss.includes(`.card-scene-${slug}`), `Missing compact project-card motion for ${slug}`);
  }
  assert.match(portfolioSource, /function ProjectMotionScene/);
  assert.match(portfolioSource, /case-study-motion-art scene-\$\{slug\}/);
  assert.ok(portfolioSource.includes('const caseStudyPageAsset = project.caseStudyPageAsset;'));
  assert.ok(portfolioSource.includes("project.slug !== 'aetherflow'"));
  assert.ok(portfolioSource.includes('<img className="case-study-visual-image visual-interface case-study-page-preview"'));
  assert.match(portfolioSource, /<ProjectMotionScene slug=\{project\.slug\} \/>/);
  assert.ok(portfolioSource.includes('case-study-motion-art scene-'));
  assert.match(portfolioSource, /<ProjectMotionScene slug=\{project\.slug\} compact \/>/);
  assert.match(portfolioSource, /market-simulated/);
  assert.match(portfolioSource, /SIMULATED/);
});

test('mobile case-study screenshots allow native Android scroll chaining into the remaining page', () => {
  assert.match(portfolioCss, /overscroll-behavior-y:auto/);
  assert.match(portfolioCss, /touch-action:pan-y pinch-zoom/);
  assert.match(portfolioCss, /-webkit-overflow-scrolling:touch/);
  assert.match(portfolioSource, /data-gallery-scroll="true"/);
  assert.match(portfolioSource, /case-study-scroll-note/);
  assert.match(script, /hasTouch: true/);
  assert.match(script, /Input\.dispatchTouchEvent/);
  assert.match(script, /Emulation\.setTouchEmulationEnabled/);
  assert.match(script, /caseStudyGalleryScroll/);
  assert.match(script, /outerRemaining/);
  assert.match(script, /outerScrollTop > setup\.outerBefore/);
  assert.match(portfolioCss, /overscroll-behavior-y:auto/);
  assert.match(portfolioCss, /touch-action:pan-y pinch-zoom/);
});

test('reduced-motion QA checks the animated AetherFlow scene and its authentic gallery capture', () => {
  assert.match(script, /\.case-study-motion-art \.scene-animated/);
  assert.match(script, /route\.label === 'orbit-en'/);
  assert.match(script, /aetherflowDesktopCapture/);
  assert.match(script, /caseStudyDesktopCapture/);
  assert.match(script, /isAetherFlowPage/);
  assert.match(script, /reducedMotionAnimationName/);
  assert.match(portfolioCss, /\.case-study-motion-art \.scene-animated[\s\S]*?animation:none!important/);
});


test('homepage Browser QA captures and checks all eight animated project cards at desktop and mobile sizes', () => {
  assert.match(script, /#projects \.portfolio-project-card/);
  assert.match(script, /\.project-card-motion/);
  assert.match(script, /projectGridMotion/);
  assert.match(script, /allCardsAnimated/);
  assert.match(script, /route\.label \+ '-projects-'/);
  assert.match(script, /activeAnimationCount > 0/);
});


test('homepage browser QA checks both default Persian and English project grids for visibility', () => {
  assert.ok(script.includes("label: 'home-fa', path: '?qa-locale=fa', locale: 'fa', direction: 'rtl'"));
  assert.ok(script.includes("label: 'home-en', path: '?qa-locale=en', locale: 'en', direction: 'ltr'"));
  assert.match(script, /route\.label\.startsWith\('home-'\)/);
  assert.match(script, /sectionOpacity/);
  assert.match(script, /sectionHasRevealGate/);
  assert.match(script, /firstCardVisible/);
  assert.match(script, /headingOpacity/);
  assert.match(script, /firstCardHasRevealGate/);
  assert.match(script, /Projects section or its first card remained hidden/);
});

test('mobile project grid QA captures the full localized homepage without a tall-section reveal gate', () => {
  assert.match(script, /const projectGridFile = route\.label \+ '-projects-' \+ viewport\.name/);
  assert.match(portfolioSource, /className="portfolio-projects portfolio-container" id="projects"/);
  assert.doesNotMatch(portfolioSource, /className="portfolio-projects portfolio-container" id="projects" data-reveal="projects"/);
});


test('Browser QA uses plain JavaScript DOM selectors in its visibility measurement', () => {
  assert.doesNotMatch(script, /querySelector(?:All)?<HTMLElement>/);
  assert.match(script, /const heading = section\.querySelector\('\.portfolio-section-heading'\)/);
  assert.match(script, /const cards = Array\.from\(section\.querySelectorAll\('\.portfolio-project-card'\)\)/);
});


test('Browser QA audits raw HTML social metadata and locally built preview images under LinkedIn and Facebook crawler User-Agents', () => {
  assert.match(script, /const socialCrawlerAgents = \[/);
  assert.ok(script.includes('LinkedInBot/1.0'));
  assert.ok(script.includes('facebookexternalhit/1.1'));
  assert.match(script, /const socialCrawlerRoutes = \[/);
  assert.match(script, /routeCount: socialCrawlerRoutes\.length/);
  assert.match(script, /expectedChecks: socialCrawlerRoutes\.length \* socialCrawlerAgents\.length/);
  assert.match(script, /userAgent: crawler\.userAgent/);
  assert.match(script, /const rawHtml = response \? await response\.text\(\) : ''/);
  assert.ok(script.includes("new DOMParser().parseFromString(html, 'text/html')"));
  assert.match(script, /meta\('meta\[name="description"\]'\)/);
  assert.match(script, /meta\('meta\[property="og:title"\]'\)/);
  assert.match(script, /meta\('meta\[property="og:description"\]'\)/);
  assert.match(script, /link\[rel="canonical"\]/);
  assert.match(script, /meta\('meta\[property="og:url"\]'\)/);
  assert.match(script, /meta\('meta\[property="og:image"\]'\)/);
  assert.match(script, /declaredOgUrl\.href !== canonicalUrl\.href/);
  assert.match(script, /imageResponse\.headers\(\)\['content-type'\]/);
  assert.match(script, /readUInt32BE\(16\)/);
  assert.match(script, /readUInt32BE\(20\)/);
  assert.match(script, /width !== 1200 \|\| crawlerRecord\.imageDimensions\?\.height !== 627/);
  assert.match(script, /socialCrawlerAudit\.passedChecks/);
  assert.match(script, /socialCrawlerAudit\.expectedChecks/);
});

test('visual evidence waits for the initial reveal, finite entrance animations, and hero images to settle', () => {
  assert.match(script, /async function waitForSettledReveal\(page, selector\)/);
  assert.match(script, /target\.classList\.contains\('is-visible'\)/);
  assert.match(script, /getComputedStyle\(target\)\.opacity/);
  assert.match(script, /target\.getAnimations\(\{ subtree: true \}\)/);
  assert.match(script, /iterations !== Infinity/);
  assert.match(script, /image\.decode\(\)\.catch\(\(\) => undefined\)/);
  assert.match(script, /await waitForSettledReveal\(page, initialRevealSelector\)/);
  assert.match(script, /\.portfolio-hero-copy\[data-reveal="hero-copy"\]/);
  assert.match(script, /\.case-study-hero\[data-reveal="case-study-hero"\]/);
  assert.match(script, /await waitForSettledReveal\(page, '\.portfolio-hero-art\[data-reveal="hero-showcase"\]'\)/);
  assert.ok(script.indexOf('await waitForSettledReveal(page, initialRevealSelector)') < script.indexOf('await page.screenshot('));
});

test('Browser QA runs axe on every route and viewport in both dark and light themes', () => {
  assert.match(script, /lightTheme: \{/);
  assert.match(script, /checks: 0/);
  assert.match(script, /const lightThemeButton = page\.locator\('\.portfolio-theme'\)/);
  assert.match(script, /getAttribute\('data-theme'\) === 'light'/);
  assert.match(script, /getAttribute\('data-theme'\) === 'dark'/);
  assert.match(script, /const lightThemeAxeResults = await new AxeBuilder\(\{ page \}\)/);
  assert.match(script, /report\.accessibility\.lightTheme\.checks \+= 1/);
  assert.match(script, /report\.accessibility\.lightTheme\.incompleteRuleChecks \+= lightThemeAxeResults\.incomplete\.length/);
  assert.match(script, /lightThemeAxeViolationCount/);
  assert.match(script, /lightThemeAxeIncompleteRuleCount/);
  assert.match(script, /High-impact axe accessibility violation in the light theme/);
  assert.ok(script.indexOf('await lightThemeButton.click()') < script.indexOf('const lightThemeAxeResults'));
  assert.ok(script.indexOf('const lightThemeAxeResults') < script.indexOf("await lightThemeButton.click();\n          await page.waitForFunction(() => document.querySelector('.portfolio-page')?.getAttribute('data-theme') === 'dark')"));
});

test('keyboard skip-link audit starts from a fresh route load after theme audits', () => {
  const keyboardReload = script.lastIndexOf('await page.goto(targetUrl.href, {');
  const skipLinkWait = script.indexOf("await page.locator('.portfolio-skip-link').waitFor({ state: 'attached', timeout: 10000 });", keyboardReload);
  const firstTab = script.indexOf("await page.keyboard.press('Tab')", keyboardReload);
  assert.ok(keyboardReload >= 0, 'Browser QA must reload the route after the two-theme audit.');
  assert.ok(skipLinkWait > keyboardReload, 'The skip link must be attached in the fresh document before keyboard input.');
  assert.ok(firstTab > skipLinkWait, 'Keyboard-only navigation must start after a fresh document load.');
});



test('ORBIT homepage artwork ring class cannot collide with the project-art-orbit slug class', () => {
  assert.match(portfolioSource, /project-art-orbit-ring art-\$\{project\.number\}/);
  assert.match(portfolioCss, /\.project-art-orbit-ring \{/);
  assert.doesNotMatch(portfolioCss, /\.project-art-orbit \{ position: absolute; width: 116px/);
  assert.match(script, /const orbitCard = cardStates\.find\(\(card\) => card\.title === 'ORBIT'\)/);
  assert.match(script, /orbitCardImageOk/);
  assert.match(script, /artworkFrame\?\.position === 'relative'/);
  assert.match(script, /The ORBIT homepage project card must show the real dashboard screenshot/);
});


test('light-theme theme-toggle label has an explicit WCAG-safe foreground color', () => {
  assert.match(portfolioCss, /\.portfolio-page\[data-theme="light"\] \.portfolio-theme > span \{ color:#405348; \}/);
});
