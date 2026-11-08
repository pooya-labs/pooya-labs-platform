import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const outputRoot = new URL('../../dist/pages/', import.meta.url);
const rootHtml = await readFile(new URL('index.html', outputRoot), 'utf8').catch(() => null);
const slugs = ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking'];

const mainSource = await readFile(new URL('../../apps/platform/src/main.tsx', import.meta.url), 'utf8');
const portfolioSource = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const viteConfig = await readFile(new URL('../../apps/platform/vite.config.ts', import.meta.url), 'utf8');

test('direct case-study routes hydrate the same server-rendered React tree instead of replacing it', () => {
  assert.ok(viteConfig.includes('renderToString(createElement(HydratedCaseStudy'));
  assert.ok(viteConfig.includes("'<div id=\"root\">' + appMarkup + '</div>'"));
  assert.ok(mainSource.includes('hydrateRoot('));
  assert.ok(mainSource.includes('portfolioProjects.find'));
  assert.ok(portfolioSource.includes('export function HydratedCaseStudy'));
  assert.ok(portfolioSource.includes('export function ProjectCaseStudy'));
  const componentStart = portfolioSource.indexOf('export function ProjectCaseStudy');
  const componentEnd = portfolioSource.indexOf('export interface HydratedCaseStudyProps', componentStart);
  const component = portfolioSource.slice(componentStart, componentEnd);
  assert.ok(!component.includes('window.location.pathname'));
  assert.ok(portfolioSource.includes('baseUrl: string'));
});


test('Vite emits crawler-readable Persian and English case-study pages', { skip: !rootHtml }, async () => {
  assert.match(rootHtml, /og:image/);
  assert.match(rootHtml, /og:image:type" content="image\/png/);
  assert.match(rootHtml, /og:image:height" content="627/);
  const homePng = await readFile(new URL('og/pooya-labs.png', outputRoot));
  assert.deepEqual(homePng.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(homePng.readUInt32BE(16), 1200);
  assert.equal(homePng.readUInt32BE(20), 627);

  assert.match(rootHtml, /og\/pooya-labs\.png/);
  assert.match(rootHtml, /og:image:type" content="image\/png/);
  assert.match(rootHtml, /og:image:height" content="627/);
  for (const slug of slugs) {
    for (const locale of ['fa', 'en']) {
      const route = locale === 'en' ? `en/projects/${slug}/index.html` : `projects/${slug}/index.html`;
      const html = await readFile(new URL(route, outputRoot), 'utf8');
      const canonical = `https://pooya-labs.github.io/pooya-labs-platform/${route.replace('index.html', '')}`;
      const rootIndex = html.indexOf('<div id="root">');
      const renderedPageIndex = html.indexOf('<div class="portfolio-page portfolio-case-study', rootIndex);
      const skipIndex = html.indexOf('<a class="portfolio-skip-link" href="#main-content">', rootIndex);
      const mainIndex = html.indexOf('<main id="main-content" tabindex="-1" class="case-study-main', rootIndex);
      assert.ok(rootIndex >= 0 && renderedPageIndex > rootIndex && skipIndex > renderedPageIndex && mainIndex > skipIndex, `${route} must contain the complete server-rendered interactive case study before JavaScript`);
      assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${route} must have a canonical URL`);
      assert.ok(html.includes(`og:image`), `${route} must declare a social preview image`);
      assert.ok(html.includes(`/pooya-labs-platform/og/${slug}${locale === 'en' ? '-en' : ''}.png`), `${route} must point to its own PNG social card`);
      assert.ok(html.includes('og:image:type" content="image/png'), `${route} must declare a PNG social preview`);
      assert.ok(html.includes('og:image:height" content="627'), `${route} must use the 1.91:1 LinkedIn-compatible height`);
      assert.ok(html.includes('application/ld+json'), `${route} must contain structured metadata`);
      assert.ok(html.includes('summary_large_image'), `${route} must declare a large social card`);
      assert.ok(html.includes('rel="alternate" hreflang="fa"'), `${route} must link its Persian alternate`);
      assert.ok(html.includes('rel="alternate" hreflang="en"'), `${route} must link its English alternate`);
      assert.ok(html.includes('case-study-source-list'), `${route} must expose source references in static HTML`);
      assert.ok(html.includes('case-study-architecture-figure'), `${route} must include its architecture diagram`);
      assert.ok(html.includes(`/pooya-labs-platform/architecture/${slug}${locale === 'en' ? '-en' : ''}.svg`), `${route} must use the locale-specific architecture diagram`);
      assert.ok(html.includes('assets/index-'), `${route} must load the built portfolio application`);

      const socialFile = locale === 'en' ? `og/${slug}-en.svg` : `og/${slug}.svg`;
      const social = await readFile(new URL(socialFile, outputRoot), 'utf8');
      const pngFile = locale === 'en' ? `og/${slug}-en.png` : `og/${slug}.png`;
      const png = await readFile(new URL(pngFile, outputRoot));
      assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), `${pngFile} must be a valid PNG`);
      assert.equal(png.readUInt32BE(16), 1200, `${pngFile} must be 1200 px wide`);
      assert.equal(png.readUInt32BE(20), 627, `${pngFile} must be 627 px high`);
      assert.match(social, /width="1200" height="627"/);
      assert.match(social, locale === 'fa' ? /font-family="Amiri,Tahoma,Arial,sans-serif"/ : /font-family="Inter,Arial,Tahoma,sans-serif"/, `${socialFile} must use a script-appropriate font stack`);
      assert.ok(social.includes(slug === 'aura-pulse' ? 'AuraPulse' : slug === 'global-cart' ? 'GlobalCart' : slug === 'salon-booking' ? 'Salon Booking' : slug === 'pooya-os' ? 'Pooya.OS' : slug === 'nexus-canvas' ? 'NexusCanvas' : slug === 'lumina-glass' ? 'LuminaGlass' : slug === 'aetherflow' ? 'AetherFlow' : 'ORBIT'));
      const architectureFile = locale === 'en' ? `architecture/${slug}-en.svg` : `architecture/${slug}.svg`;
      const architecture = await readFile(new URL(architectureFile, outputRoot), 'utf8');
      assert.match(architecture, /width="1600" height="900"/);
      assert.match(architecture, locale === 'fa' ? /font-family="Amiri,Tahoma,Arial,sans-serif"/ : /font-family="Inter,Segoe UI,Tahoma,Arial,sans-serif"/, `${architectureFile} must use a script-appropriate font stack`);
      assert.match(architecture, /text-anchor="end" font-family="Inter,Segoe UI,Tahoma,Arial,sans-serif" font-size="13"/);
      assert.match(architecture, /marker-end="url\(#arrow\)"/);
    }
  }
});

test('reviewed project interface screenshots are embedded in both static case-study locales', { skip: !rootHtml }, async () => {
  const projects = ['orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'salon-booking'];
  for (const slug of projects) {
    for (const route of [`projects/${slug}/index.html`, `en/projects/${slug}/index.html`]) {
      const html = await readFile(new URL(route, outputRoot), 'utf8');
      const sourceRoot = new RegExp(
        `https://raw\\\\.githubusercontent\\\\.com/pooya-labs/pooya-labs-platform/[a-f0-9]{40}/apps/platform/public/interface-captures/${slug === 'aura-pulse' ? 'aurapulse' : slug}/`,
      );
      assert.match(html, sourceRoot, `${route} must use an immutable portfolio commit for interface evidence`);
      const desktopImage = html.match(/case-study-media-card device-desktop[^]*?<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/);
      const mobileImage = html.match(/case-study-media-card device-mobile[^]*?<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/);
      assert.ok(desktopImage, `${route} must include desktop interface evidence with localized alternative text`);
      assert.ok(mobileImage, `${route} must include mobile interface evidence with localized alternative text`);
      assert.match(desktopImage[1], /^https:\\/\\/raw\\.githubusercontent\\.com\\/pooya-labs\\/pooya-labs-platform\\/[a-f0-9]{40}\\/apps\\/platform\\/public\\/interface-captures\\/[^"]+\\.png$/, `${route} desktop evidence must use a pinned raw asset URL`);
      assert.match(mobileImage[1], /^https:\\/\\/raw\\.githubusercontent\\.com\\/pooya-labs\\/pooya-labs-platform\\/[a-f0-9]{40}\\/apps\\/platform\\/public\\/interface-captures\\/[^"]+\\.png$/, `${route} mobile evidence must use a pinned raw asset URL`);
      assert.ok(desktopImage[2].trim().length > 0, `${route} desktop evidence must have alternative text`);
      assert.ok(mobileImage[2].trim().length > 0, `${route} mobile evidence must have alternative text`);
    }
  }
  const aetherFlow = await readFile(new URL('projects/aetherflow/index.html', outputRoot), 'utf8');
  assert.ok(!aetherFlow.includes('interface-captures/aetherflow/aetherflow-desktop.png'));
  assert.ok(!aetherFlow.includes('interface-captures/aetherflow/aetherflow-mobile.png'));
});

test('case-study image evidence uses immutable source URLs without relying on screenshot basenames', { skip: !rootHtml }, async () => {
  const orbit = await readFile(new URL('projects/orbit/index.html', outputRoot), 'utf8');
  const captures = [...orbit.matchAll(/<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/g)]
    .filter((match) => match[1].includes('/interface-captures/orbit/'));
  assert.ok(captures.some((match) => match[1].includes('-desktop.png')), 'The desktop capture must remain available from its immutable source');
  assert.ok(captures.some((match) => match[1].includes('-mobile.png')), 'The mobile capture must remain available from its immutable source');
  for (const capture of captures) {
    assert.match(capture[1], /^https:\\/\\/raw\\.githubusercontent\\.com\\/pooya-labs\\/pooya-labs-platform\\/[a-f0-9]{40}\\/apps\\/platform\\/public\\/interface-captures\\/orbit\\/[^"]+\\.png$/);
    assert.ok(capture[2].trim().length > 0);
  }
});

test('GlobalCart static case studies include real pinned desktop and mobile storefront screenshots', { skip: !rootHtml }, async () => {
  for (const route of ['projects/global-cart/index.html', 'en/projects/global-cart/index.html']) {
    const html = await readFile(new URL(route, outputRoot), 'utf8');
    assert.ok(html.includes('storefront-home-desktop.png'), 'GlobalCart hero must use the actual desktop screenshot');
    assert.ok(html.includes('storefront-home-mobile.png'), 'GlobalCart case study must include the actual mobile screenshot');
    assert.ok(html.includes('case-study-media-grid'), 'GlobalCart mobile screenshot must be visible in the media gallery');
    assert.ok(html.includes('5ca43e40ff101e673ee7cf261850bff0a679047c'), 'Screenshot assets must be pinned to an immutable source commit');
  }
  const unrelated = await readFile(new URL('projects/aura-pulse/index.html', outputRoot), 'utf8');
  assert.ok(!unrelated.includes('storefront-home-mobile.png'), 'GlobalCart screenshots must not appear on another project');
});

test('GlobalCart case study includes pinned desktop and mobile interface captures', { skip: !rootHtml }, async () => {
  const faPage = await readFile(new URL('projects/global-cart/index.html', outputRoot), 'utf8');
  const enPage = await readFile(new URL('en/projects/global-cart/index.html', outputRoot), 'utf8');
  for (const html of [faPage, enPage]) {
    assert.ok(html.includes('storefront-home-desktop.png'), 'The desktop storefront screenshot must remain the hero media.');
    assert.ok(html.includes('case-study-media-section'), 'The case study must include the interface-capture section.');
    assert.ok(html.includes('storefront-home-mobile.png'), 'The mobile storefront screenshot must be rendered in the capture section.');
    assert.ok(html.includes('Actual storefront on mobile') || html.includes('نمای واقعی فروشگاه روی موبایل'));
  }
});

test('built sitemap and robots file advertise the new static routes', { skip: !rootHtml }, async () => {
  const sitemap = await readFile(new URL('sitemap.xml', outputRoot), 'utf8');
  const robots = await readFile(new URL('robots.txt', outputRoot), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, 17);
  const lastmodDates = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
  assert.equal(lastmodDates.length, 17, 'Every sitemap URL must include a lastmod date');
  assert.equal(new Set(lastmodDates).size, 1, 'All routes generated in one build must share the same sitemap date');
  assert.equal(lastmodDates[0], new Date().toISOString().slice(0, 10), 'Sitemap lastmod must reflect the current static build date');
  for (const slug of slugs) {
    assert.ok(locations.includes(`https://pooya-labs.github.io/pooya-labs-platform/projects/${slug}/`));
    assert.ok(locations.includes(`https://pooya-labs.github.io/pooya-labs-platform/en/projects/${slug}/`));
  }
  assert.match(robots, /Sitemap: https:\/\/pooya-labs\.github\.io\/pooya-labs-platform\/sitemap\.xml/);
});


test('generated bilingual architecture SVGs wrap labels inside centered node bounds', { skip: !rootHtml }, async () => {
  for (const locale of ['fa', 'en']) {
    const suffix = locale === 'en' ? '-en' : '';
    const svg = await readFile(new URL('architecture/orbit' + suffix + '.svg', outputRoot), 'utf8');
    assert.match(svg, /width="1600" height="900"/);
    assert.match(svg, /text-anchor="middle" direction="(?:rtl|ltr)" unicode-bidi="plaintext"/);
    assert.match(svg, /<tspan x="\d+" dy="22">/);
    assert.match(svg, /height="172"/);
    assert.match(svg, /stroke="#64cfa9"/);
  }
});
