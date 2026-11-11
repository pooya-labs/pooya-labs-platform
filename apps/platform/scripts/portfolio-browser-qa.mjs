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

const socialCrawlerAgents = [
  { label: 'linkedin', userAgent: 'LinkedInBot/1.0' },
  { label: 'facebook', userAgent: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' },
];

const socialCrawlerRoutes = [
  { label: 'home', path: '' },
  ...projectSlugs.flatMap((slug) => [
    { label: slug + '-fa', path: 'projects/' + slug + '/' },
    { label: slug + '-en', path: 'en/projects/' + slug + '/' },
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
  socialCrawlerAudit: {
    routeCount: socialCrawlerRoutes.length,
    agents: socialCrawlerAgents.map((crawler) => ({ label: crawler.label, userAgent: crawler.userAgent })),
    expectedChecks: socialCrawlerRoutes.length * socialCrawlerAgents.length,
    checks: [],
  },
  accessibility: {
    tags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    impactCounts: { critical: 0, serious: 0, moderate: 0, minor: 0, unknown: 0 },
    incompleteRuleChecks: 0,
    incompleteRules: [],
    findings: [],
    lightTheme: {
      checks: 0,
      impactCounts: { critical: 0, serious: 0, moderate: 0, minor: 0, unknown: 0 },
      incompleteRuleChecks: 0,
      incompleteRules: [],
      findings: [],
    },
  },
  note: 'Automated Chromium smoke and responsive checks. Homepage and bilingual project desktop/mobile screenshots are retained only as private workflow artifacts, never published to the website. Mobile case-study routes also exercise touch scroll chaining from the full-page screenshot frame to the outer page. This is not a manual screen-reader audit or WCAG certification.',
};

function addFailure(route, viewport, message) {
  report.failures.push({ route: route.label, viewport: viewport ?? null, message });
}

async function waitForSettledReveal(page, selector) {
  await page.waitForFunction((targetSelector) => {
    const target = document.querySelector(targetSelector);
    if (!(target instanceof HTMLElement) || !target.classList.contains('is-visible')) return false;
    if (Number.parseFloat(getComputedStyle(target).opacity) < 0.99) return false;

    const unfinishedFiniteAnimations = target.getAnimations({ subtree: true }).filter((animation) => {
      const iterations = animation.effect?.getTiming().iterations ?? 1;
      return iterations !== Infinity && animation.playState !== 'finished';
    });
    return unfinishedFiniteAnimations.length === 0;
  }, selector, { timeout: 8000 });

  console.log('[portfolio-browser-qa] image decode start: ' + selector);
  const imageDecode = await page.locator(selector).evaluate(async (target) => {
    const images = Array.from(target.querySelectorAll('img'));
    for (const image of images) {
      if (!image.complete && image.loading === 'lazy') image.loading = 'eager';
    }

    let timeoutId;
    const result = await Promise.race([
      Promise.all(images.map(async (image) => {
        const src = image.currentSrc || image.src;
        try {
          await image.decode();
          return { src, loaded: image.complete && image.naturalWidth > 0 };
        } catch (error) {
          return { src, loaded: false, error: error instanceof Error ? error.message : String(error) };
        }
      })).then((records) => ({ timedOut: false, records })),
      new Promise((resolve) => {
        timeoutId = window.setTimeout(() => resolve({ timedOut: true, records: [] }), 10000);
      }),
    ]);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    return result;
  });

  if (imageDecode.timedOut) {
    throw new Error('Image decode exceeded 10 seconds for ' + selector + '.');
  }
  const failedImages = imageDecode.records.filter((image) => !image.loaded);
  if (failedImages.length > 0) {
    throw new Error('One or more reveal images failed to decode: ' + JSON.stringify(failedImages.slice(0, 5)));
  }
  console.log('[portfolio-browser-qa] image decode complete: ' + selector + ' (' + imageDecode.records.length + ' images)');
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
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
    console.log('[portfolio-browser-qa] route start: ' + route.label);
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
    console.log('[portfolio-browser-qa] route complete: ' + route.label + ' (' + report.checks.length + '/' + routes.length + ')');
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
          caseStudyPageImage: (() => {
            const image = document.querySelector('.case-study-visual-image.case-study-page-preview');
            return image instanceof HTMLImageElement ? { alt: image.alt, src: image.getAttribute('src') } : null;
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
        console.log('[portfolio-browser-qa] viewport start: ' + route.label + ' / ' + viewport.name);
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

        const initialRevealSelector = route.label.startsWith('home-')
          ? '.portfolio-hero-copy[data-reveal="hero-copy"]'
          : '.case-study-hero[data-reveal="case-study-hero"]';
        console.log('[portfolio-browser-qa] reveal wait start: ' + route.label + ' / ' + viewport.name + ' / ' + initialRevealSelector);
        await waitForSettledReveal(page, initialRevealSelector);
        console.log('[portfolio-browser-qa] reveal wait complete: ' + route.label + ' / ' + viewport.name + ' / ' + initialRevealSelector);
        if (route.label.startsWith('home-') && viewport.name === 'desktop') {
          const heroShowcaseSelector = '.portfolio-hero-art[data-reveal="hero-showcase"]';
          console.log('[portfolio-browser-qa] reveal wait start: ' + route.label + ' / ' + viewport.name + ' / ' + heroShowcaseSelector);
          await waitForSettledReveal(page, heroShowcaseSelector);
          console.log('[portfolio-browser-qa] reveal wait complete: ' + route.label + ' / ' + viewport.name + ' / ' + heroShowcaseSelector);
        }

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
          const cardStates = await page.locator('#projects .portfolio-project-card').evaluateAll(async (cards) => Promise.all(cards.map(async (card) => {
            const motion = card.querySelector('.project-card-motion');
            const active = motion?.getAnimations({ subtree: true }).filter((animation) => animation.playState === 'running' || animation.playState === 'pending') ?? [];
            const image = card.querySelector('.project-art > .project-art-image');
            if (image instanceof HTMLImageElement) await image.decode().catch(() => undefined);
            const art = card.querySelector('.project-art');
            const artRect = art?.getBoundingClientRect();
            return {
              title: card.querySelector('.project-card-content h3')?.textContent?.trim() ?? '',
              motionClass: motion?.className ?? null,
              activeAnimationCount: active.length,
              animationNames: [...new Set(active.map((animation) => animation.animationName).filter(Boolean))],
              projectImage: image instanceof HTMLImageElement ? {
                src: image.getAttribute('src') ?? '',
                alt: image.alt,
                loaded: image.complete && image.naturalWidth > 0,
                naturalWidth: image.naturalWidth,
                objectPosition: getComputedStyle(image).objectPosition,
              } : null,
              artworkFrame: art && artRect ? {
                width: Math.round(artRect.width),
                height: Math.round(artRect.height),
                position: getComputedStyle(art).position,
              } : null,
            };
          })));
          const aetherflowCard = cardStates.find((card) => card.title === 'AetherFlow');
          const aetherflowCardImageOk = Boolean(aetherflowCard?.projectImage?.loaded &&
            aetherflowCard.projectImage.naturalWidth >= 1000 &&
            aetherflowCard.projectImage.src.endsWith('/aetherflow-fullpage-desktop.png') &&
            ['50% 0%', 'center top', 'top center'].includes(aetherflowCard.projectImage.objectPosition));
          const orbitCard = cardStates.find((card) => card.title === 'ORBIT');
          const orbitCardImageOk = Boolean(orbitCard?.projectImage?.loaded &&
            orbitCard.projectImage.naturalWidth >= 1000 &&
            orbitCard.projectImage.src.endsWith('/orbit-desktop.png') &&
            orbitCard.artworkFrame?.position === 'relative' &&
            orbitCard.artworkFrame.width >= 250 &&
            orbitCard.artworkFrame.height >= 140);
          routeRecord.aetherflowProjectCardImage = aetherflowCard?.projectImage ?? null;
          routeRecord.orbitProjectCardImage = orbitCard ? {
            ...orbitCard.projectImage,
            artworkFrame: orbitCard.artworkFrame,
          } : null;
          const allCardsAnimated = cardStates.length === 8 && cardStates.every((card) => card.motionClass && card.activeAnimationCount > 0);
          const gridVisible = gridState.sectionOpacity >= .99 && !gridState.sectionHasRevealGate && gridState.headingOpacity >= .99 && !gridState.headingHasRevealGate && gridState.firstCardVisible && !gridState.firstCardHasRevealGate;
          projectGridMotion = { available: true, passed: allCardsAnimated && gridVisible && aetherflowCardImageOk && orbitCardImageOk, ...gridState, cardCount: cardStates.length, cards: cardStates };
          routeRecord.projectGridMotion ??= [];
          routeRecord.projectGridMotion.push({ viewport: viewport.name, ...projectGridMotion });
          if (!allCardsAnimated) addFailure(route, viewport.name, 'One or more selected-project cards is missing its product-specific animated signature.');
          if (!gridVisible) addFailure(route, viewport.name, 'The homepage Projects section or its first card remained hidden after scrolling into view.');
          if (!aetherflowCardImageOk) addFailure(route, viewport.name, 'The AetherFlow homepage project card must load the real desktop product screenshot, not its logo.');
          if (!orbitCardImageOk) addFailure(route, viewport.name, 'The ORBIT homepage project card must show the real dashboard screenshot inside a full-width project-art frame.');
          const projectGridFile = route.label + '-projects-' + viewport.name + '.png';
          await page.screenshot({ path: path.join(artifactDir, projectGridFile), fullPage: false, animations: 'allow' });
          routeRecord.visualEvidence ??= [];
          routeRecord.visualEvidence.push(projectGridFile);
        }
        const isAetherFlowPage = route.label.startsWith('aetherflow-');
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
        if (isAetherFlowPage) {
          const heroImageState = await page.locator('.case-study-visual-image.case-study-page-preview').evaluate(async (image) => {
            if (!(image instanceof HTMLImageElement)) return { loaded: false, naturalWidth: 0, src: '' };
            await image.decode().catch(() => undefined);
            return { loaded: image.complete && image.naturalWidth > 0, naturalWidth: image.naturalWidth, src: image.getAttribute('src') ?? '' };
          });
          routeRecord.aetherflowHeroImage = heroImageState;
          if (!heroImageState.loaded || heroImageState.naturalWidth < 1000) {
            addFailure(route, viewport.name, 'The AetherFlow product screenshot did not load as a full-width local asset.');
          }
        } else if (route.label !== 'home-en' && route.label !== 'home-fa') {
          if (motionState.activeAnimationCount < 3) addFailure(route, viewport.name, 'The case-study hero does not expose at least three running visual animations.');
          if ((motionState.opacity ?? 0) < .7) addFailure(route, viewport.name, 'The project motion layer is too faint to be a visible foreground visual.');
        }

        let caseStudyGalleryScroll = { available: false, passed: true, skippedReason: 'Not a mobile case-study route.' };
        if (viewport.name === 'mobile' && route.label !== 'home-en' && route.label !== 'home-fa') {
          const frame = page.locator('.case-study-media-card.device-mobile .case-study-media-frame').first();
          if (await frame.count()) {
            await frame.scrollIntoViewIfNeeded();
            const setup = await frame.evaluate(async (element) => {
              const pageScroller = document.querySelector('.portfolio-page');
              const image = element.querySelector('img');
              if (!(element instanceof HTMLElement) || !(pageScroller instanceof HTMLElement)) {
                return { available: false, reason: 'Scroll containers not found.' };
              }
              const innerMaxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
              const outerMaxScroll = Math.max(0, pageScroller.scrollHeight - pageScroller.clientHeight);
              element.scrollTop = innerMaxScroll;
              await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
              const rect = element.getBoundingClientRect();
              const gestureX = Math.round(Math.min(rect.right - 24, Math.max(rect.left + 24, rect.left + (rect.right - rect.left) * .55)));
              const gestureStartY = Math.round(Math.min(rect.bottom - 28, window.innerHeight - 28));
              const hitTarget = document.elementFromPoint(gestureX, gestureStartY);
              const galleryHitTargetInsideFrame = hitTarget === element || (hitTarget instanceof Node && element.contains(hitTarget));
              return {
                available: innerMaxScroll > 40 && outerMaxScroll - pageScroller.scrollTop > 40,
                reason: innerMaxScroll <= 40 ? 'The mobile capture has no internal overflow.' : 'No outer page content remains below the capture.',
                innerMaxScroll,
                innerScrollTopBeforeGesture: element.scrollTop,
                galleryCardOverflowY: getComputedStyle(element.parentElement).overflowY,
                gallerySectionOverflowY: getComputedStyle(element.closest('.case-study-media-section')).overflowY,
                outerBefore: pageScroller.scrollTop,
                outerMaxScroll,
                viewportHeight: window.innerHeight,
                imageLoaded: image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
                imageDraggable: image instanceof HTMLImageElement && image.draggable,
                imagePointerEvents: image instanceof HTMLImageElement ? getComputedStyle(image).pointerEvents : null,
                ancestorScrollChain: (() => {
                  const chain = [];
                  for (let current = element; current && chain.length < 8; current = current.parentElement) {
                    const style = getComputedStyle(current);
                    chain.push({
                      tag: current.tagName,
                      className: typeof current.className === 'string' ? current.className : '',
                      overflowX: style.overflowX,
                      overflowY: style.overflowY,
                      overscrollBehaviorY: style.overscrollBehaviorY,
                      touchAction: style.touchAction,
                      pointerEvents: style.pointerEvents,
                      position: style.position,
                      transform: style.transform,
                      scrollHeight: current instanceof HTMLElement ? current.scrollHeight : 0,
                      clientHeight: current instanceof HTMLElement ? current.clientHeight : 0,
                      scrollTop: current instanceof HTMLElement ? current.scrollTop : 0,
                    });
                    if (current.classList?.contains('portfolio-page')) break;
                  }
                  return chain;
                })(),
                rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
                gestureX,
                gestureStartY,
                galleryHitTargetInsideFrame,
                galleryHitTargetTag: hitTarget instanceof Element ? hitTarget.tagName : null,
                galleryHitTargetClass: hitTarget instanceof HTMLElement ? String(hitTarget.className) : '',
                galleryHitTargetTouchAction: hitTarget instanceof Element ? getComputedStyle(hitTarget).touchAction : null,
                overflowY: getComputedStyle(element).overflowY,
                overscrollBehaviorY: getComputedStyle(element).overscrollBehaviorY,
                touchAction: getComputedStyle(element).touchAction,
              };
            });
            if (setup.available) {
              // Diagnostic experiment: disable native image dragging on the touched screenshot only.
              await frame.evaluate((element) => {
                const image = element.querySelector('img');
                if (image instanceof HTMLImageElement) image.draggable = false;
              });
              const x = setup.gestureX;
              const startY = setup.gestureStartY;
              const endY = Math.round(Math.max(setup.rect.top + 28, startY - 150));
              await frame.evaluate((element) => {
                const records = [];
                const describe = (event, listener) => ({
                  type: event.type,
                  listener,
                  phase: event.eventPhase,
                  cancelable: event.cancelable,
                  defaultPrevented: event.defaultPrevented,
                  targetTag: event.target instanceof Element ? event.target.tagName : null,
                  targetClass: event.target instanceof HTMLElement ? String(event.target.className) : '',
                  clientY: event.touches?.[0]?.clientY ?? event.changedTouches?.[0]?.clientY ?? null,
                  timeStamp: Math.round(event.timeStamp),
                });
                const frameCapture = (event) => records.push(describe(event, 'frame-capture'));
                const frameBubble = (event) => records.push(describe(event, 'frame-bubble'));
                const documentCapture = (event) => records.push(describe(event, 'document-capture'));
                const documentBubble = (event) => records.push(describe(event, 'document-bubble'));
                element.addEventListener('touchstart', frameCapture, true);
                element.addEventListener('touchmove', frameCapture, true);
                element.addEventListener('touchmove', frameBubble, false);
                element.addEventListener('touchend', frameBubble, false);
                document.addEventListener('touchstart', documentCapture, true);
                document.addEventListener('touchmove', documentCapture, true);
                document.addEventListener('touchmove', documentBubble, false);
                document.addEventListener('touchend', documentBubble, false);
                window.__portfolioGalleryTouchTrace = {
                  records,
                  cleanup: () => {
                    element.removeEventListener('touchstart', frameCapture, true);
                    element.removeEventListener('touchmove', frameCapture, true);
                    element.removeEventListener('touchmove', frameBubble, false);
                    element.removeEventListener('touchend', frameBubble, false);
                    document.removeEventListener('touchstart', documentCapture, true);
                    document.removeEventListener('touchmove', documentCapture, true);
                    document.removeEventListener('touchmove', documentBubble, false);
                    document.removeEventListener('touchend', documentBubble, false);
                  },
                };
              });
              const touch = await context.newCDPSession(page);
              const readScrollPosition = () => frame.evaluate((element) => {
                const pageScroller = document.querySelector('.portfolio-page');
                return {
                  innerScrollTop: element instanceof HTMLElement ? element.scrollTop : 0,
                  outerScrollTop: pageScroller instanceof HTMLElement ? pageScroller.scrollTop : 0,
                };
              });
              let after = {
                innerScrollTop: setup.innerScrollTopBeforeGesture,
                outerScrollTop: setup.outerBefore,
              };
              let gesture = 'Input.dispatchTouchEvent';
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
                after = await readScrollPosition();

                if (after.outerScrollTop <= setup.outerBefore + 4) {
                  let gestureTimeout;
                  const synthesizedGesture = await Promise.race([
                    touch.send('Input.synthesizeScrollGesture', {
                      x,
                      y: startY,
                      // A negative distance moves the emulated finger upward, matching the primary swipe.
                      yDistance: -180,
                      speed: 900,
                      gestureSourceType: 'touch',
                      preventFling: true,
                    }).then(() => 'completed'),
                    new Promise((resolve) => {
                      gestureTimeout = setTimeout(() => resolve('timed-out'), 4000);
                    }),
                  ]);
                  if (gestureTimeout !== undefined) clearTimeout(gestureTimeout);
                  if (synthesizedGesture === 'completed') {
                    await page.waitForTimeout(220);
                    after = await readScrollPosition();
                    gesture = 'Input.dispatchTouchEvent + Input.synthesizeScrollGesture(touch)';
                  } else {
                    after = await readScrollPosition();
                    gesture = 'Input.dispatchTouchEvent + Input.synthesizeScrollGesture(touch) timed out after 4s';
                  }
                }
              } finally {
                await touch.send('Emulation.setTouchEmulationEnabled', { enabled: false });
                await touch.detach();
              }
              const touchTrace = await frame.evaluate(() => {
                const trace = window.__portfolioGalleryTouchTrace;
                trace?.cleanup?.();
                window.__portfolioGalleryTouchTrace = undefined;
                return trace?.records ?? [];
              });
              caseStudyGalleryScroll = {
                available: true,
                passed: after.outerScrollTop > setup.outerBefore + 4,
                ...setup,
                ...after,
                gesture,
                touchTrace,
              };
              if (!caseStudyGalleryScroll.passed) {
                addFailure(route, viewport.name, 'A touch swipe at the end of the mobile screenshot did not continue scrolling the outer case-study page.');
              }
              if (setup.overflowY !== 'auto' || setup.overscrollBehaviorY !== 'auto' || !setup.touchAction.includes('pan-y')) {
                addFailure(route, viewport.name, 'The mobile gallery does not expose native vertical touch scroll chaining.');
              }
              if (setup.galleryCardOverflowY !== 'clip') {
                addFailure(route, viewport.name, 'The mobile gallery card wrapper must clip its corners without creating an intermediate scroll container.');
              }
              if (setup.gallerySectionOverflowY !== 'clip') {
                addFailure(route, viewport.name, 'The mobile gallery section wrapper must clip its panel without creating an intermediate scroll container.');
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
        const axeResults = await new AxeBuilder({ page }).withTags(report.accessibility.tags).options({ resultTypes: ['violations', 'incomplete'] }).analyze();
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
        const lightThemeAxeSummary = { checked: false, violationCount: 0, incompleteRuleCount: 0 };
        const lightThemeButton = page.locator('.portfolio-theme');
        if (await lightThemeButton.count()) {
          await lightThemeButton.click();
          await page.waitForFunction(() => document.querySelector('.portfolio-page')?.getAttribute('data-theme') === 'light');
          await page.waitForTimeout(400);

          const lightThemeAxeResults = await new AxeBuilder({ page }).withTags(report.accessibility.tags).options({ resultTypes: ['violations', 'incomplete'] }).analyze();
          const lightThemeAxeFindings = lightThemeAxeResults.violations.map((violation) => ({
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
          lightThemeAxeSummary.checked = true;
          lightThemeAxeSummary.violationCount = lightThemeAxeFindings.length;
          lightThemeAxeSummary.incompleteRuleCount = lightThemeAxeResults.incomplete.length;
          report.accessibility.lightTheme.checks += 1;

          for (const rule of lightThemeAxeResults.incomplete) {
            report.accessibility.lightTheme.incompleteRules.push({
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
          report.accessibility.lightTheme.incompleteRuleChecks += lightThemeAxeResults.incomplete.length;

          for (const finding of lightThemeAxeFindings) {
            report.accessibility.lightTheme.impactCounts[finding.impact] =
              (report.accessibility.lightTheme.impactCounts[finding.impact] ?? 0) + 1;
            report.accessibility.lightTheme.findings.push({
              route: route.label,
              viewport: viewport.name,
              ...finding,
            });
            if (finding.impact === 'critical' || finding.impact === 'serious') {
              addFailure(route, viewport.name, 'High-impact axe accessibility violation in the light theme (' + finding.impact + '): ' + finding.id);
            }
          }

          await lightThemeButton.click();
          await page.waitForFunction(() => document.querySelector('.portfolio-page')?.getAttribute('data-theme') === 'dark');
          await page.waitForTimeout(400);
        } else {
          addFailure(route, viewport.name, 'Theme toggle is missing; light-theme accessibility could not be audited.');
        }

        routeRecord.viewportChecks.push({
          ...viewport,
          ...metrics,
          motionState,
          scrollMetrics,
          caseStudyGalleryScroll,
          axeViolationCount: axeFindings.length,
          axeIncompleteRuleCount: axeResults.incomplete.length,
          lightThemeAxeViolationCount: lightThemeAxeSummary.violationCount,
          lightThemeAxeIncompleteRuleCount: lightThemeAxeSummary.incompleteRuleCount,
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
        if (isAetherFlowPage) {
          if (!semantics.caseStudyPageImage?.src?.includes('interface-captures/aetherflow/aetherflow-fullpage-desktop.png') || !semantics.caseStudyPageImage.alt) {
            addFailure(route, viewport.name, 'The AetherFlow product screenshot or its localized alternative text is missing.');
          }
        } else if (route.label !== 'home-en' && route.label !== 'home-fa') {
          const slug = route.label.replace(/-(fa|en)$/, '');
          if (!semantics.caseStudyMotionScene?.split(' ').includes('scene-' + slug)) {
            addFailure(route, viewport.name, 'The case-study hero is missing its project-specific motion scene.');
          }
        }
        console.log('[portfolio-browser-qa] viewport complete: ' + route.label + ' / ' + viewport.name);
      }

      if (route.label === 'orbit-en') {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const reducedMotionState = await page.locator('.case-study-motion-art .scene-animated').first().evaluate((node) => getComputedStyle(node).animationName);
        routeRecord.reducedMotionAnimationName = reducedMotionState;
        if (reducedMotionState !== 'none') addFailure(route, null, 'The case-study motion does not respect prefers-reduced-motion.');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
      }

      // Re-enter the route in a fresh document so keyboard focus starts from the first page control.
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(targetUrl.href, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      await page.locator('.portfolio-skip-link').waitFor({ state: 'attached', timeout: 10000 });
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
      console.error('[portfolio-browser-qa] route error: ' + route.label + ': ' + (error instanceof Error ? error.stack ?? error.message : String(error)));
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
    console.log('[portfolio-browser-qa] route complete: ' + route.label + ' (' + report.checks.length + '/' + routes.length + ')');
  }

  for (const crawler of socialCrawlerAgents) {
    const crawlerContext = await browser.newContext({
      userAgent: crawler.userAgent,
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
    });
    try {
      for (const route of socialCrawlerRoutes) {
        const targetUrl = new URL(route.path, baseUrl);
        const crawlerRecord = {
          crawler: crawler.label,
          userAgent: crawler.userAgent,
          route: route.label,
          url: targetUrl.href,
          httpStatus: null,
          canonical: null,
          ogUrl: null,
          ogImage: null,
          imageStatus: null,
          imageContentType: null,
          imageDimensions: null,
          failures: [],
          passed: false,
        };
        const fail = (message) => crawlerRecord.failures.push(message);
        const crawlerPage = await crawlerContext.newPage();
        try {
          const response = await crawlerPage.goto(targetUrl.href, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
          });
          crawlerRecord.httpStatus = response?.status() ?? null;
          const rawHtml = response ? await response.text() : '';
          const metadata = await crawlerPage.evaluate((html) => {
            const parsed = new DOMParser().parseFromString(html, 'text/html');
            const meta = (selector) => parsed.querySelector(selector)?.getAttribute('content')?.trim() ?? '';
            return {
              documentTitle: parsed.title?.trim() ?? '',
              description: meta('meta[name="description"]'),
              ogTitle: meta('meta[property="og:title"]'),
              ogDescription: meta('meta[property="og:description"]'),
              canonical: parsed.querySelector('link[rel="canonical"]')?.getAttribute('href')?.trim() ?? '',
              ogUrl: meta('meta[property="og:url"]'),
              ogImage: meta('meta[property="og:image"]'),
            };
          }, rawHtml);

          if (!response || !response.ok()) fail('Crawler document response was not successful.');
          if (!metadata.documentTitle || !metadata.description || !metadata.ogTitle || !metadata.ogDescription) {
            fail('Raw HTML is missing a document title, description, or Open Graph title/description.');
          }

          let canonicalUrl = null;
          try {
            if (!metadata.canonical) throw new Error('Canonical link is missing.');
            canonicalUrl = new URL(metadata.canonical, targetUrl);
            crawlerRecord.canonical = canonicalUrl.href;
          } catch {
            fail('Raw HTML has no valid canonical URL.');
          }
          if (canonicalUrl && (
            canonicalUrl.pathname !== targetUrl.pathname ||
            canonicalUrl.protocol !== 'https:'
          )) {
            fail('Canonical URL does not use HTTPS or does not match the requested static route.');
          }

          let declaredOgUrl = null;
          try {
            if (!metadata.ogUrl) throw new Error('og:url is missing.');
            declaredOgUrl = new URL(metadata.ogUrl, targetUrl);
            crawlerRecord.ogUrl = declaredOgUrl.href;
          } catch {
            fail('Raw HTML has no valid og:url.');
          }
          if (canonicalUrl && declaredOgUrl && declaredOgUrl.href !== canonicalUrl.href) {
            fail('og:url does not exactly match the canonical URL.');
          }

          let ogImageUrl = null;
          try {
            if (!metadata.ogImage) throw new Error('og:image is missing.');
            ogImageUrl = new URL(metadata.ogImage, targetUrl);
            crawlerRecord.ogImage = ogImageUrl.href;
          } catch {
            fail('Raw HTML has no valid og:image URL.');
          }
          if (ogImageUrl && canonicalUrl && (
            ogImageUrl.origin !== canonicalUrl.origin ||
            !ogImageUrl.pathname.startsWith(baseUrl.pathname)
          )) {
            fail('og:image is not on the canonical host and Pages base path.');
            ogImageUrl = null;
          }

          if (ogImageUrl) {
            const localAssetUrl = new URL(ogImageUrl.pathname + ogImageUrl.search, baseUrl.origin);
            const imageResponse = await crawlerContext.request.get(localAssetUrl.href, { timeout: 20000 });
            crawlerRecord.imageStatus = imageResponse.status();
            crawlerRecord.imageContentType = imageResponse.headers()['content-type']?.split(';')[0] ?? '';
            const imageBytes = await imageResponse.body();
            const pngSignature = imageBytes.length >= 24 && imageBytes.subarray(0, 8).equals(
              Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
            );
            if (pngSignature) {
              crawlerRecord.imageDimensions = {
                width: imageBytes.readUInt32BE(16),
                height: imageBytes.readUInt32BE(20),
              };
            }
            if (!imageResponse.ok()) fail('The locally built Open Graph image did not return HTTP 200.');
            if (crawlerRecord.imageContentType !== 'image/png') fail('The Open Graph image is not served as image/png.');
            if (!pngSignature) fail('The Open Graph image response is not a valid PNG file.');
            if (crawlerRecord.imageDimensions?.width !== 1200 || crawlerRecord.imageDimensions?.height !== 627) {
              fail('The Open Graph PNG dimensions are not 1200×627.');
            }
          }
        } catch (error) {
          fail(error instanceof Error ? error.message : String(error));
        } finally {
          await crawlerPage.close();
        }

        crawlerRecord.passed = crawlerRecord.failures.length === 0;
        for (const message of crawlerRecord.failures) {
          addFailure(
            { label: route.label },
            'crawler:' + crawler.label,
            crawler.label + ' social-preview audit: ' + message,
          );
        }
        report.socialCrawlerAudit.checks.push(crawlerRecord);
      }
    } finally {
      await crawlerContext.close();
    }
  }
  report.socialCrawlerAudit.passedChecks = report.socialCrawlerAudit.checks.filter((item) => item.passed).length;

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
console.log(
  'Social crawler checks: ' + report.socialCrawlerAudit.passedChecks + '/' +
  report.socialCrawlerAudit.expectedChecks + ' (' + report.socialCrawlerAudit.agents.length + ' User-Agents).',
);
console.log('Failures: ' + report.failures.length + '.');
console.log('Report: ' + path.join(artifactDir, 'qa-report.json'));

if (
  report.failures.length > 0 ||
  passedRoutes !== routes.length ||
  report.socialCrawlerAudit.passedChecks !== report.socialCrawlerAudit.expectedChecks
) {
  process.exitCode = 1;
}
