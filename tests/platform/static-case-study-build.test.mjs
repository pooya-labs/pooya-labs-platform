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
      assert.ok(social.includes(slug === 'aura-pulse' ? 'AuraPulse' : slug === 'global-cart' ? 'GlobalCart' : slug === 'salon-booking' ? 'Salon Booking' : slug === 'pooya-os' ? 'Pooya.OS' : slug === 'nexus-canvas' ? 'NexusCanvas' : slug === 'lumina-glass' ? 'LuminaGlass' : slug === 'aetherflow' ? 'AetherFlow' : 'ORBIT'));
      const architectureFile = locale === 'en' ? `architecture/${slug}-en.svg` : `architecture/${slug}.svg`;
      const architecture = await readFile(new URL(architectureFile, outputRoot), 'utf8');
      assert.match(architecture, /width="1600" height="900"/);
      assert.match(architecture, /marker-end="url\(#arrow\)"/);
    }
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
