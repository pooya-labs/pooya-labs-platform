import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pagesRoot = new URL('../../dist/pages/', import.meta.url);
const cloudflareRoot = new URL('../../dist/cloudflare/', import.meta.url);
const pagesHome = await readFile(new URL('index.html', pagesRoot), 'utf8').catch(() => null);
const cloudflareHome = await readFile(new URL('index.html', cloudflareRoot), 'utf8').catch(() => null);

test('GitHub Pages and Cloudflare builds keep canonical origins, metadata, routes, and robots independent', {
  skip: !pagesHome || !cloudflareHome
}, async () => {
  const pagesOrigin = 'https://pooya-labs.github.io/pooya-labs-platform/';
  const cloudflareOrigin = 'https://pooya-labs-platform.pages.dev/';

  assert.ok(pagesHome.includes(`<link rel="canonical" href="${pagesOrigin}"`));
  assert.ok(pagesHome.includes(`property="og:url" content="${pagesOrigin}"`));
  assert.ok(pagesHome.includes(`property="og:image" content="${pagesOrigin}og/pooya-labs.png"`));

  assert.ok(cloudflareHome.includes(`<link rel="canonical" href="${cloudflareOrigin}"`));
  assert.ok(cloudflareHome.includes(`property="og:url" content="${cloudflareOrigin}"`));
  assert.ok(cloudflareHome.includes(`property="og:image" content="${cloudflareOrigin}og/pooya-labs.png"`));
  assert.ok(cloudflareHome.includes(`"url": "${cloudflareOrigin}"`), 'Cloudflare Person JSON-LD must use the Cloudflare canonical origin');
  assert.doesNotMatch(cloudflareHome, /pooya-labs\\.github\\.io\\/pooya-labs-platform/);

  for (const route of ['projects/orbit/index.html', 'en/projects/orbit/index.html']) {
    const html = await readFile(new URL(route, cloudflareRoot), 'utf8');
    const canonical = `${cloudflareOrigin}${route.replace('index.html', '')}`;
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `${route} must use its Cloudflare canonical URL`);
    assert.ok(html.includes(`${cloudflareOrigin}og/orbit${route.startsWith('en/') ? '-en' : ''}.png`));
    assert.ok(html.includes('/assets/index-'), 'Cloudflare static page assets must be root-relative');
    assert.ok(html.includes('/architecture/orbit'), 'Cloudflare architecture diagrams must be root-relative');
    assert.doesNotMatch(html, /pooya-labs\\.github\\.io\\/pooya-labs-platform/);
  }

  const cloudflareSitemap = await readFile(new URL('sitemap.xml', cloudflareRoot), 'utf8');
  const cloudflareRobots = await readFile(new URL('robots.txt', cloudflareRoot), 'utf8');
  const locations = [...cloudflareSitemap.matchAll(/<loc>([^<]+)<\\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, 17);
  assert.ok(locations.includes(cloudflareOrigin));
  assert.ok(locations.includes(`${cloudflareOrigin}projects/orbit/`));
  assert.ok(locations.includes(`${cloudflareOrigin}en/projects/orbit/`));
  assert.match(cloudflareRobots, /Sitemap: https:\\/\\/pooya-labs-platform\\.pages\\.dev\\/sitemap\\.xml/);
  assert.doesNotMatch(cloudflareRobots, /pooya-labs\\.github\\.io/);

  const pagesRobots = await readFile(new URL('robots.txt', pagesRoot), 'utf8');
  assert.match(pagesRobots, /Sitemap: https:\\/\\/pooya-labs\\.github\\.io\\/pooya-labs-platform\\/sitemap\\.xml/);
  assert.doesNotMatch(pagesRobots, /pooya-labs-platform\\.pages\\.dev/);
});
