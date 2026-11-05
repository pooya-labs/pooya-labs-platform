import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const outputRoot = new URL('../../dist/pages/', import.meta.url);
const rootHtml = await readFile(new URL('index.html', outputRoot), 'utf8').catch(() => null);
const slugs = ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking'];

test('Vite emits crawler-readable Persian and English case-study pages', { skip: !rootHtml }, async () => {
  assert.match(rootHtml, /og:image/);
  assert.match(rootHtml, /og\/pooya-labs\.svg/);
  for (const slug of slugs) {
    for (const locale of ['fa', 'en']) {
      const route = locale === 'en' ? `en/projects/${slug}/index.html` : `projects/${slug}/index.html`;
      const html = await readFile(new URL(route, outputRoot), 'utf8');
      const canonical = `https://pooya-labs.github.io/pooya-labs-platform/${route.replace('index.html', '')}`;
      assert.ok(html.includes('<div id="root"><main'), `${route} must contain static article markup before JavaScript`);
      assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${route} must have a canonical URL`);
      assert.ok(html.includes(`og:image`), `${route} must declare a social preview image`);
      assert.ok(html.includes(`/pooya-labs-platform/og/${slug}${locale === 'en' ? '-en' : ''}.svg`), `${route} must point to its own social card`);
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
      assert.match(social, /width="1200" height="630"/);
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
  for (const slug of slugs) {
    assert.ok(locations.includes(`https://pooya-labs.github.io/pooya-labs-platform/projects/${slug}/`));
    assert.ok(locations.includes(`https://pooya-labs.github.io/pooya-labs-platform/en/projects/${slug}/`));
  }
  assert.match(robots, /Sitemap: https:\/\/pooya-labs\.github\.io\/pooya-labs-platform\/sitemap\.xml/);
});
