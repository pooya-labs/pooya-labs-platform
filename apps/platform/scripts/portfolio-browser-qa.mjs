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
  { label: 'home-fa', path: '?qa-locale=fa', locale: 'fa', direction: 'rtl', mainId: 'top' },
  { label: 'home-en', path: '?qa-locale=en', locale: 'en', direction: 'ltr', mainId: 'top' },
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
await mkdir(artifactDir, { recursive: true });
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
  note: 'Automated Chromium smoke and responsive checks. Homepage and bilingual project desktop/mobile screenshots are retained only as private workflow artifacts, never published to the website. Mobile case-study routes also exercise touch scroll chaining from the full-page screenshot frame to the outer page. This is not a manual screen-reader audit or WCAG certification.',
};

function addFailure(route, viewport, message) {
  report.failures.push({ route: route.label, viewport: viewport ?? null, message });
}

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  await context.addInitScript(() => {
    const url = new URL(window.location.href);
    const requestedLocale = url.searchParams.get('qa-locale');
    if (requestedLocale === 'fa' || requestedLocale === 'en') {
      try {
        window.localStorage.setItem('pooya-labs:language-v2', requestedLocale);
      } catch {
        // The route-level document language still gets checked below.
      }
      url.searchParams.delete('qa-locale');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
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
      await page.locator('.portfolio-owner-attribution img').evaluate(async (image) => {
        if (!(image instanceof HTMLImageElement)) throw new Error('Owner logo is not an image element.');
        await image.decode();
      });
      await page.evaluate(() => document.fonts?.ready);
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
          ownerAttributionCount: document.querySelectorAll('.portfolio-owner-attribution').length,
          ownerAttributionText: document.querySelector('.portfolio-owner-attribution')?.innerText?.replace(/\s+/g, ' ').trim() ?? '',
          ownerAttributionImage: (() => {
            const image = document.querySelector('.portfolio-owner-attribution img');
            return image instanceof HTMLImageElement ? { src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0 && image.naturalHeight > 0 } : null;
          })(),
          initialWindowScrollY: window.scrollY,
          initialDocumentScrollTop: document.scrollingElement?.scrollTop ?? 0,
          initialPortfolioScrollTop: document.querySelector('.portfolio-page')?.scrollTop ?? 0,
          scrollRestoration: history.scrollRestoration,
          systemFieldCount: document.querySelectorAll('.portfolio-system-field').length,
          systemNodeCount: document.querySelectorAll('.system-field-node').length,
          craftSectionCount: document.querySelectorAll('.portfolio-craft').length,
          craftPrincipleCount: document.querySelectorAll('.craft-principle').length,
          heroTitleRunsIsolated: Array.from(document.querySelectorAll('.portfolio-hero-title .hero-title-line')).every((node) => node.getAttribute('dir') === 'auto'),
          thoughtfulWord: (() => {
            const word = document.querySelector('.portfolio-hero-title .hero-title-word');
            const line = word?.closest('.hero-title-word-line');
            const title = word?.closest('.portfolio-hero-title');
            if (!(word instanceof HTMLElement) || !(line instanceof HTMLElement) || !(title instanceof HTMLElement)) return null;
            const range = document.createRange();
            range.selectNodeContents(word);
            const textRect = range.getBoundingClientRect();
            const lineRect = line.getBoundingClientRect();
            const titleRect = title.getBoundingClientRect();
            const textNode = word.firstChild;
            let lastGlyph = null;
            if (textNode instanceof Text && textNode.textContent.length > 0) {
              const glyph = document.createRange();
              glyph.setStart(textNode, textNode.textContent.length - 1);
              glyph.setEnd(textNode, textNode.textContent.length);
              const rect = glyph.getBoundingClientRect();
              lastGlyph = { left: rect.left, right: rect.right, width: rect.width };
            }
            const clippingAncestors = [];
            for (let node = word; node instanceof HTMLElement; node = node.parentElement) {
              const overflowX = getComputedStyle(node).overflowX;
              if (['hidden', 'clip', 'auto', 'scroll'].includes(overflowX)) {
                const rect = node.getBoundingClientRect();
                const left = rect.left + node.clientLeft;
                clippingAncestors.push({ selector: node.className?.toString?.() || node.tagName.toLowerCase(), left, right: left + node.clientWidth });
              }
              if (node === title) break;
            }
            const clippedByAncestor = clippingAncestors.some((ancestor) =>
              textRect.left < ancestor.left - 1 || textRect.right > ancestor.right + 1
            );
            const whiteSpace = getComputedStyle(word).whiteSpace;
            const fullyContained = Boolean(
              range.getClientRects().length === 1 &&
              textRect.width > 0 &&
              lastGlyph?.width > 0 &&
              whiteSpace === 'nowrap' &&
              textRect.left >= lineRect.left - 1 &&
              textRect.right <= lineRect.right + 1 &&
              textRect.left >= titleRect.left - 1 &&
              textRect.right <= titleRect.right + 1 &&
              lastGlyph.right <= lineRect.right + 1 &&
              !clippedByAncestor
            );
            return {
              text: word.textContent?.trim() ?? '',
              direction: getComputedStyle(word).direction,
              whiteSpace,
              rangeCount: range.getClientRects().length,
              rangeWidth: textRect.width,
              textLeft: textRect.left,
              textRight: textRect.right,
              lineLeft: lineRect.left,
              lineRight: lineRect.right,
              titleLeft: titleRect.left,
              titleRight: titleRect.right,
              lastGlyph,
              clippingAncestors,
              clippedByAncestor,
              fullyContained,
            };
          })(),
          caseStudyMotionScene: document.querySelector('.case-study-motion-art')?.className ?? null,
          caseStudyMotionOpacity: (() => {
            const art = document.querySelector('.case-study-motion-art');
            return art ? Number.parseFloat(getComputedStyle(art).opacity) : null;
          })(),
          heroCapabilityTitleIsolated: document.querySelector('.portfolio-capabilities h2')?.getAttribute('dir') === 'auto',
        };
      });
      routeRecord.canonical = semantics.canonical;
      routeRecord.headingCount = semantics.headingCount;
      routeRecord.mainId = semantics.mainId;
      routeRecord.missingImageAltCount = semantics.missingImageAltCount;
      const ownerName = route.locale === 'fa' ? 'پویا مونوگرام' : 'POOYA MONOGRAM';
      if (semantics.ownerAttributionCount !== 1) addFailure(route, null, 'Expected exactly one Pooya Monogram project-owner signature.');
      if (!semantics.ownerAttributionText.includes(ownerName)) addFailure(route, null, 'Project-owner signature does not match the route language.');
      if (!semantics.ownerAttributionImage?.src?.includes('brand/pooya-monogram-tile.svg') || !semantics.ownerAttributionImage.loaded) addFailure(route, null, 'Project-owner monogram tile is missing or failed to load.');
      if (route.label === 'home-en') routeRecord.thoughtfulWordLayout = semantics.thoughtfulWord;

      if (routeRecord.title.trim().length === 0) addFailure(route, null, 'Page title is empty.');
      if (semantics.locale !== route.locale) addFailure(route, null, 'Document language does not match the route.');
      if (semantics.direction !== route.direction) addFailure(route, null, 'Document direction does not match the locale.');
      if (semantics.headingCount !== 1) addFailure(route, null, 'Expected exactly one primary H1 heading.');
      if (semantics.mainCount !== 1 || semantics.mainId !== route.mainId) addFailure(route, null, 'Expected one main landmark with the correct skip-link target.');
      if (!semantics.canonical || new URL(semantics.canonical).pathname !== targetUrl.pathname) addFailure(route, null, 'Canonical URL does not match the current route.');
      if (semantics.missingImageAltCount > 0) addFailure(route, null, 'One or more images have no alt attribute.');
      if (semantics.initialWindowScrollY > 1 || semantics.initialDocumentScrollTop > 1 || semantics.initialPortfolioScrollTop > 1) {
        addFailure(route, null, 'A direct route did not open at the top of the page.');
      }
      if (semantics.scrollRestoration !== 'manual') addFailure(route, null, 'Browser scroll restoration is not disabled for direct entry.');
      if (route.label === 'home-en') {
        if (semantics.systemFieldCount !== 1 || semantics.systemNodeCount !== 3) addFailure(route, null, 'The Systems in Motion section is incomplete.');
        if (semantics.craftSectionCount !== 1 || semantics.craftPrincipleCount !== 4) addFailure(route, null, 'The craft-principles section is incomplete.');
        if (!semantics.heroTitleRunsIsolated || !semantics.heroCapabilityTitleIsolated) addFailure(route, null, 'A first-page headline is not isolated from mixed bidirectional text.');
        if (!semantics.thoughtfulWord || semantics.thoughtfulWord.text !== 'thoughtful' || !semantics.thoughtfulWord.fullyContained) {
          addFailure(route, null, 'The English thoughtful headline word is missing, split, or clipped.');
        }
      }

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const shouldCaptureVisual = route.label.startsWith('home-') || (route.label !== 'home-fa' && route.label !== 'home-en');
        if (shouldCaptureVisual) {
          const fileName = route.label + '-' + viewport.name + '.png';
          await page.screenshot({ path: path.join(artifactDir, fileName), fullPage: false, animations: 'allow' });
          routeRecord.visualEvidence ??= [];
          routeRecord.visualEvidence.push(fileName);
        }
        if (route.label === 'home-en' && viewport.name === 'desktop') {
          const about = page.locator('.portfolio-about');
          const wordmark = page.locator('.portfolio-about .pooya-wordmark');
          await about.scrollIntoViewIfNeeded();
          const wordmarkImage = await wordmark.evaluate(async (image) => {
            if (image instanceof HTMLImageElement) await image.decode().catch(() => undefined);
            return {
              loaded: image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
              naturalWidth: image instanceof HTMLImageElement ? image.naturalWidth : 0,
              naturalHeight: image instanceof HTMLImageElement ? image.naturalHeight : 0,
            };
          });
          routeRecord.ownerWordmark = wordmarkImage;
          if (!wordmarkImage.loaded) addFailure(route, viewport.name, 'The owner-designed POOYA — LABS wordmark did not load in the About section.');
          await page.waitForFunction(() => {
            const section = document.querySelector('.portfolio-about');
            const wordmark = section?.querySelector('.pooya-wordmark');
            const imageSettled = wordmark instanceof HTMLImageElement &&
              wordmark.complete &&
              wordmark.naturalWidth > 0 &&
              wordmark.getAnimations().every((animation) => animation.playState === 'finished');
            return section instanceof HTMLElement &&
              section.classList.contains('is-visible') &&
              Number.parseFloat(getComputedStyle(section).opacity) >= .99 &&
              imageSettled;
          }, undefined, { timeout: 5000 });
          const aboutFile = 'home-en-about-desktop.png';
          await about.screenshot({ path: path.join(artifactDir, aboutFile), animations: 'allow' });
          routeRecord.visualEvidence.push(aboutFile);
          await page.locator('.portfolio-page').evaluate((scroller) => {
            if (scroller instanceof HTMLElement) {
              const previousBehavior = scroller.style.scrollBehavior;
              scroller.style.scrollBehavior = 'auto';
              scroller.scrollTop = 0;
              scroller.style.scrollBehavior = previousBehavior;
            }
          });
          await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        }

        let projectGridMotion = { available: false, passed: true, skippedReason: 'Not the homepage route.' };
        if (route.label.startsWith('home-')) {
          await page.locator('#projects .portfolio-project-card').first().scrollIntoViewIfNeeded();
          await page.waitForTimeout(550);
          const gridState = await page.locator('#projects').evaluate((section) => {
            const cards = Array.from(section.querySelectorAll('.portfolio-project-card'));
            const firstCard = cards[0];
            const heading = section.querySelector('.portfolio-section-heading');
            const firstOpacity = firstCard ? Number.parseFloat(getComputedStyle(firstCard).opacity) : 0;
            const headingOpacity = heading ? Number.parseFloat(getComputedStyle(heading).opacity) : 0;
            return {
              sectionOpacity: Number.parseFloat(getComputedStyle(section).opacity),
              sectionHasRevealGate: section.hasAttribute('data-reveal'),
              headingOpacity,
              headingHasRevealGate: heading?.hasAttribute('data-reveal') ?? false,
              firstCardOpacity: firstOpacity,
              firstCardHasRevealGate: firstCard?.hasAttribute('data-reveal') ?? false,
              firstCardVisible: firstOpacity >= .99,
            };
          });
          const cardStates = await page.locator('#projects .portfolio-project-card').evaluateAll((cards) => cards.map((card) => {
            const motion = card.querySelector('.project-card-motion');
            const active = motion?.getAnimations({ subtree: true }).filter((animation) => animation.playState === 'running' || animation.playState === 'pending') ?? [];
            return {
              title: card.querySelector('.project-card-content h3')?.textContent?.trim() ?? '',
              motionClass: motion?.className ?? null,
              activeAnimationCount: active.length,
              animationNames: [...new Set(active.map((animation) => animation.animationName).filter(Boolean))],
            };
          }));
          const allCardsAnimated = cardStates.length === 8 && cardStates.every((card) => card.motionClass && card.activeAnimationCount > 0);
          const gridVisible = gridState.sectionOpacity >= .99 && !gridState.sectionHasRevealGate && gridState.headingOpacity >= .99 && !gridState.headingHasRevealGate && gridState.firstCardVisible && !gridState.firstCardHasRevealGate;
          projectGridMotion = { available: true, passed: allCardsAnimated && gridVisible, ...gridState, cardCount: cardStates.length, cards: cardStates };
          routeRecord.projectGridMotion ??= [];
          routeRecord.projectGridMotion.push({ viewport: viewport.name, ...projectGridMotion });
          if (!allCardsAnimated) addFailure(route, viewport.name, 'One or more selected-project cards is missing its product-specific animated signature.');
          if (!gridVisible) addFailure(route, viewport.name, 'The homepage Projects section or its first card remained hidden after scrolling into view.');
          const projectGridFile = route.label + '-projects-' + viewport.name + '.png';
          await page.screenshot({ path: path.join(artifactDir, projectGridFile), fullPage: false, animations: 'allow' });
          routeRecord.visualEvidence ??= [];
          routeRecord.visualEvidence.push(projectGridFile);
        }
        const motionState = await page.evaluate(() => {
          const art = document.querySelector('.case-study-motion-art');
          if (!art) return { activeAnimationCount: 0, animationNames: [], opacity: null };
          const active = art.getAnimations({ subtree: true }).filter((animation) => animation.playState === 'running' || animation.playState === 'pending');
          return {
            activeAnimationCount: active.length,
            animationNames: [...new Set(active.map((animation) => animation.animationName).filter(Boolean))],
            opacity: Number.parseFloat(getComputedStyle(art).opacity),
          };
        });
        if (route.label !== 'home-en' && route.label !== 'home-fa') {
          if (motionState.activeAnimationCount < 3) addFailure(route, viewport.name, 'The case-study hero does not expose at least three running visual animations.');
          if ((motionState.opacity ?? 0) < .7) addFailure(route, viewport.name, 'The project motion layer is too faint to be a visible foreground visual.');
        }

        let caseStudyGalleryScroll = { available: false, passed: true, skippedReason: 'Not a mobile case-study route.' };
        if (viewport.name === 'mobile' && route.label !== 'home-en' && route.label !== 'home-fa') {
          const frame = page.locator('.case-study-media-card.device-mobile .case-study-media-frame').first();
          if (await frame.count()) {
            await frame.scrollIntoViewIfNeeded();
            const setup = await frame.evaluate((element) => {
              const pageScroller = document.querySelector('.portfolio-page');
              const image = element.querySelector('img');
              if (!(element instanceof HTMLElement) || !(pageScroller instanceof HTMLElement)) {
                return { available: false, reason: 'Scroll containers not found.' };
              }
              const innerMaxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
              const outerMaxScroll = Math.max(0, pageScroller.scrollHeight - pageScroller.clientHeight);
              element.scrollTop = innerMaxScroll;
              const rect = element.getBoundingClientRect();
              return {
                available: innerMaxScroll > 40 && outerMaxScroll - pageScroller.scrollTop > 40,
                reason: innerMaxScroll <= 40 ? 'The mobile capture has no internal overflow.' : 'No outer page content remains below the capture.',
                innerMaxScroll,
                outerBefore: pageScroller.scrollTop,
                outerMaxScroll,
                viewportHeight: window.innerHeight,
                imageLoaded: image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
                rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
                overflowY: getComputedStyle(element).overflowY,
                overscrollBehaviorY: getComputedStyle(element).overscrollBehaviorY,
                touchAction: getComputedStyle(element).touchAction,
              };
            });
            if (setup.available) {
              const x = Math.round(Math.min(setup.rect.right - 24, Math.max(setup.rect.left + 24, setup.rect.left + (setup.rect.right - setup.rect.left) * .55)));
              const startY = Math.round(Math.min(setup.rect.bottom - 28, setup.viewportHeight - 28));
              const endY = Math.round(Math.max(setup.rect.top + 28, startY - 150));
              const touch = await context.newCDPSession(page);
              try {
                await touch.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
                await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ id: 1, x, y: startY }] });
                for (let step = 1; step <= 5; step += 1) {
                  await touch.send('Input.dispatchTouchEvent', {
                    type: 'touchMove',
                    touchPoints: [{ id: 1, x, y: Math.round(startY + (endY - startY) * step / 5) }],
                  });
                }
                await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
                await page.waitForTimeout(220);
              } finally {
                await touch.send('Emulation.setTouchEmulationEnabled', { enabled: false });
                await touch.detach();
              }
              const after = await frame.evaluate((element) => {
                const pageScroller = document.querySelector('.portfolio-page');
                return {
                  innerScrollTop: element instanceof HTMLElement ? element.scrollTop : 0,
                  outerScrollTop: pageScroller instanceof HTMLElement ? pageScroller.scrollTop : 0,
                };
              });
              caseStudyGalleryScroll = {
                available: true,
                passed: after.outerScrollTop > setup.outerBefore + 4,
                ...setup,
                ...after,
                gesture: 'Chromium touch input at the inner gallery boundary',
              };
              if (!caseStudyGalleryScroll.passed) {
                addFailure(route, viewport.name, 'A touch swipe at the end of the mobile screenshot did not continue scrolling the outer case-study page.');
              }
              if (setup.overflowY !== 'auto' || setup.overscrollBehaviorY !== 'auto' || !setup.touchAction.includes('pan-y')) {
                addFailure(route, viewport.name, 'The mobile gallery does not expose native vertical touch scroll chaining.');
              }
              await page.evaluate(() => {
                const pageScroller = document.querySelector('.portfolio-page');
                if (pageScroller instanceof HTMLElement) {
                  pageScroller.style.scrollBehavior = 'auto';
                  pageScroller.scrollTop = 0;
                }
                const gallery = document.querySelector('.case-study-media-card.device-mobile .case-study-media-frame');
                if (gallery instanceof HTMLElement) gallery.scrollTop = 0;
              });
            } else {
              caseStudyGalleryScroll = { available: false, passed: true, skippedReason: setup.reason, ...setup };
            }
          } else {
            caseStudyGalleryScroll = { available: false, passed: true, skippedReason: 'This project has no published mobile interface capture.' };
          }
        }
        const metrics = await page.evaluate(() => {
          const word = document.querySelector('.portfolio-hero-title .hero-title-word');
          const line = word?.closest('.hero-title-word-line');
          const title = word?.closest('.portfolio-hero-title');
          if (!word || !line || !title) return { headlineWordContained: true };
          const range = document.createRange();
          range.selectNodeContents(word);
          const textRect = range.getBoundingClientRect();
          const lineRect = line.getBoundingClientRect();
          const titleRect = title.getBoundingClientRect();
          const textNode = word.firstChild;
          let lastGlyphRight = null;
          if (textNode instanceof Text && textNode.textContent.length > 0) {
            const glyph = document.createRange();
            glyph.setStart(textNode, textNode.textContent.length - 1);
            glyph.setEnd(textNode, textNode.textContent.length);
            lastGlyphRight = glyph.getBoundingClientRect().right;
          }
          return ({
          headlineWordContained: Boolean(
            range.getClientRects().length === 1 &&
            textRect.width > 0 &&
            getComputedStyle(word).whiteSpace === 'nowrap' &&
            textRect.left >= lineRect.left - 1 &&
            textRect.right <= lineRect.right + 1 &&
            textRect.left >= titleRect.left - 1 &&
            textRect.right <= titleRect.right + 1 &&
            lastGlyphRight !== null &&
            lastGlyphRight <= lineRect.right + 1
          ),
          viewportWidth: window.innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          horizontalOverflow:
            document.documentElement.scrollWidth > window.innerWidth + 1 ||
            document.body.scrollWidth > window.innerWidth + 1,
          });
        });
        const scrollMetrics = await page.evaluate(() => {
          const scroller = document.querySelector('.portfolio-page');
          if (!(scroller instanceof HTMLElement)) {
            return { scrollContainerFound: false, scrollHeight: 0, clientHeight: 0, maxScrollTop: 0, canScroll: false };
          }
          const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
          const previousScrollBehavior = scroller.style.scrollBehavior;
          scroller.style.scrollBehavior = 'auto';
          scroller.scrollTop = 0;
          scroller.scrollTop = Math.min(480, maxScrollTop);
          const measuredScrollTop = scroller.scrollTop;
          const result = {
            scrollContainerFound: true,
            scrollHeight: scroller.scrollHeight,
            clientHeight: scroller.clientHeight,
            maxScrollTop,
            canScroll: maxScrollTop > 100 && measuredScrollTop > 100,
            measuredScrollTop,
          };
          scroller.scrollTop = 0;
          scroller.style.scrollBehavior = previousScrollBehavior;
          return result;
        });
        if (!scrollMetrics.canScroll) {
          addFailure(route, viewport.name, 'The portfolio scroll container cannot move through the page content.');
        }
        if (viewport.name === 'desktop') {
          await page.mouse.move(Math.floor(viewport.width / 2), Math.floor(viewport.height / 2));
          await page.mouse.wheel(0, 720);
          try {
            await page.waitForFunction(() => {
              const scroller = document.querySelector('.portfolio-page');
              return scroller instanceof HTMLElement && scroller.scrollTop > 30;
            }, null, { timeout: 1800 });
          } catch {
            addFailure(route, viewport.name, 'Mouse-wheel input did not scroll the public portfolio.');
          }
          await page.evaluate(() => {
            const scroller = document.querySelector('.portfolio-page');
            if (scroller instanceof HTMLElement) scroller.scrollTop = 0;
          });
        }
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
          motionState,
          scrollMetrics,
          caseStudyGalleryScroll,
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
        if (route.label === 'home-en' && !metrics.headlineWordContained) {
          addFailure(route, viewport.name, 'The thoughtful headline word is clipped or escapes its own line bounds.');
        }
        if (route.label !== 'home-en' && route.label !== 'home-fa') {
          const slug = route.label.replace(/-(fa|en)$/, '');
          if (!semantics.caseStudyMotionScene?.split(' ').includes('scene-' + slug)) {
            addFailure(route, viewport.name, 'The case-study hero is missing its project-specific motion scene.');
          }
        }
      }

      if (route.label === 'aetherflow-en') {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const reducedMotionState = await page.locator('.case-study-motion-art .scene-animated').first().evaluate((node) => getComputedStyle(node).animationName);
        routeRecord.reducedMotionAnimationName = reducedMotionState;
        if (reducedMotionState !== 'none') addFailure(route, null, 'The case-study motion does not respect prefers-reduced-motion.');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
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
    await page.locator('.portfolio-theme').waitFor({ state: 'visible', timeout: 10000 });
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
