import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../../apps/platform/src/App.tsx', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const novelReader = await readFile(new URL('../../apps/platform/src/NovelLibrary.tsx', import.meta.url), 'utf8');
const projectData = await readFile(new URL('../../apps/platform/src/content/projects.ts', import.meta.url), 'utf8');
const metadata = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');
const coreDossiers = await readFile(new URL('../../apps/platform/src/content/case-study-dossiers-core.ts', import.meta.url), 'utf8');
const productDossiers = await readFile(new URL('../../apps/platform/src/content/case-study-dossiers-products.ts', import.meta.url), 'utf8');
const dossierTypes = await readFile(new URL('../../apps/platform/src/content/case-study-dossiers-types.ts', import.meta.url), 'utf8');
const architectureData = await readFile(new URL('../../apps/platform/src/content/architecture-diagrams.ts', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../../dist/pages/sitemap.xml', import.meta.url), 'utf8');

test('the root experience is the personal portfolio and the workspace is secondary', () => {
  assert.match(app, /return <PortfolioHome language=/);
  assert.match(app, /onOpenWorkspace=\{\(\) => setWorkspaceOpen\(true\)\}/);
  assert.match(portfolio, /onOpenWorkspace/);
  assert.match(portfolio, /POOYA LABS/);
  assert.match(app, /readPreference\('language-v2', 'en'\)/);
  assert.match(app, /writePreference\('language-v2', language\)/);
  assert.match(portfolio, /theme=\{theme\} onThemeChange=\{onThemeChange\}/);
});

test('portfolio contains the core personal introduction and project sections', () => {
  for (const section of ['id="projects"', 'id="about"', 'id="stack"', 'id="contact"']) {
    assert.ok(portfolio.includes(section), 'Missing section ' + section);
  }
  assert.match(portfolio, /headlineA/);
  assert.match(portfolio, /selectedSub/);
});

test('portfolio project cards expose verified demos and source repositories', () => {
  assert.match(projectData, /status: \{ fa: 'در حال توسعه · M08', en: 'In development · M08' \}/);
  assert.match(projectData, /status: \{ fa: 'نسخه پایدار ۱٫۰٫۰', en: 'Stable v1.0.0' \}/);
  assert.match(projectData, /repositoryUrl: 'https:\/\/github\.com\/pooya-labs\/aetherflow'/);
  assert.match(projectData, /previewUrl: 'https:\/\/pooya-labs\.github\.io\/aetherflow\//);
  assert.match(projectData, /caseStudyUrl: 'https:\/\/pooya-labs\.github\.io\/globalcart\/case-study\//);
  assert.equal((projectData.match(/repositoryUrl: 'https:\/\/github\.com\/pooya-labs\//g) ?? []).length, 8);
  assert.equal((projectData.match(/previewUrl: 'https:\/\/[^']+\.github\.io\//g) ?? []).length, 8);
});

test('portfolio is bilingual, responsive, and honors reduced motion', () => {
  assert.match(portfolio, /language: Language/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /pointer-events: none/);
  assert.match(portfolio, /data-theme=\{theme\}/);
  assert.match(portfolio, /className="portfolio-theme"/);
  assert.match(novelReader, /data-theme=\{theme\}/);
  assert.match(novelReader, /className="portfolio-theme"/);
});

test('the light theme provides readable surfaces and accessible theme controls', () => {
  assert.match(css, /\.portfolio-page\[data-theme="light"\]/);
  assert.match(css, /--pf-bg: #f6f8fc/);
  assert.match(css, /\.portfolio-page\[data-theme="light"\] \.case-study-panel/);
  assert.match(css, /\.portfolio-page\[data-theme="light"\] \.novel-text-section/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(portfolio, /aria-label=\{theme === 'dark' \? t\.themeToggle/);
  assert.match(novelReader, /onThemeChange\(theme === 'dark' \? 'light' : 'dark'\)/);
});

test('HTML metadata introduces an English-first personal portfolio', () => {
  assert.match(metadata, /<html lang="en" dir="ltr">/);
  assert.match(metadata, /og:locale" content="en_US"/);
  assert.match(metadata, /Personal Portfolio & Projects/);
  assert.match(metadata, /computer engineering student and software builder/);
});

test('projects live in a typed registry with unique slugs and editorial review state', async () => {
  const content = projectData;
  assert.match(portfolio, /portfolioProjects as projects/);
  assert.match(portfolio, /project\.previewUrl/);
  assert.match(portfolio, /project\.repositoryUrl/);
  assert.match(portfolio, /project\.caseStudyUrl/);
  assert.match(content, /export function validatePortfolioProjects/);
  assert.match(content, /challenge: \{ fa: string; en: string \}/);
  assert.match(content, /approach: \{ fa: string; en: string \}/);
  assert.match(content, /highlights: \{ fa: string\[\]; en: string\[\] \}/);
  assert.equal((content.match(/^    caseStudy: \{$/gm) ?? []).length, 8);
  assert.match(content, /ProjectReviewState = 'needs-owner-review' \| 'owner-reviewed'/);
  assert.equal((content.match(/reviewState: 'needs-owner-review'/g) ?? []).length, 8);
  assert.match(content, /slugs\.has\(project\.slug\)/);
  assert.match(content, /url\.protocol !== 'https:'/);
  assert.equal((content.match(/repositoryUrl: 'https:\/\//g) ?? []).length, 8);
  assert.ok(content.includes("host.startsWith('.')"));
  assert.ok(content.includes('url.hostname.endsWith(host)'));
  assert.ok(content.includes("assertHttpsUrl(project.previewUrl, ['.github.io']"));
});

test('project cards and shareable query routes expose in-site case studies', () => {
  assert.match(portfolio, /function ProjectCaseStudy/);
  assert.match(portfolio, /URLSearchParams\(window\.location\.search\)\.get\('project'\)/);
  assert.match(portfolio, /window\.history\.pushState/);
  assert.match(portfolio, /project\.caseStudy\.challenge\[language\]/);
  assert.match(portfolio, /project\.caseStudy\.approach\[language\]/);
  assert.match(portfolio, /project\.caseStudy\.highlights\[language\]/);
  assert.match(portfolio, /project\.caseStudy\.boundaries\[language\]/);
  assert.match(portfolio, /\?project=\$\{encodeURIComponent\(slug\)\}/);
  assert.match(css, /\.case-study-main/);
});

test('project artwork and interface screenshots are sourced from pinned commits with localized alt text', () => {
  assert.equal((projectData.match(/visualAsset: \{/g) ?? []).length, 7);
  assert.equal((projectData.match(/caseStudyHeroAsset: \{/g) ?? []).length, 6);
  assert.equal((projectData.match(/caseStudyMedia: \[/g) ?? []).length, 8);
  assert.equal((projectData.match(/^\s+device: '(?:desktop|mobile|detail)',?$/gm) ?? []).length, 8);
  assert.ok((projectData.match(/raw\.githubusercontent\.com\/pooya-labs\//g) ?? []).length >= 19);
  assert.ok((projectData.match(/alt: \{ fa: '[^']+', en: '[^']+' \}/g) ?? []).length >= 19);
  for (const slug of ['orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse']) {
    const projectBlock = projectData.slice(projectData.indexOf(`slug: '${slug}'`));
    assert.match(projectBlock, /caseStudyHeroAsset: \{[\s\S]*?raw\.githubusercontent\.com\/pooya-labs\/pooya-labs-platform\/[a-f0-9]{40}\//);
    assert.match(projectBlock, /caseStudyMedia: \[[\s\S]*?raw\.githubusercontent\.com\/pooya-labs\/pooya-labs-platform\/[a-f0-9]{40}\//);
  }
  assert.match(projectData, /Project visual assets must be pinned to an immutable source commit/);
  assert.match(projectData, /Case-study hero assets must be pinned to an immutable source commit/);
  assert.match(projectData, /Project visual asset URL/);
  assert.match(portfolio, /project-art-image/);
  assert.match(portfolio, /case-study-visual-image/);
  assert.match(portfolio, /loading="lazy"/);
  assert.match(portfolio, /onError=\{\(event\) => \{ event\.currentTarget\.remove\(\)/);
  assert.match(css, /\.project-art\.visual-interface \.project-art-image/);
  assert.match(css, /\.case-study-visual\.has-visual \.case-study-art-fallback/);
});

test('portfolio includes canonical, social, structured-data, and brand metadata', () => {
  assert.match(metadata, /property="og:title"/);
  assert.match(metadata, /property="og:description"/);
  assert.match(metadata, /name="twitter:card"/);
  assert.match(metadata, /rel="canonical"/);
  assert.match(metadata, /application\/ld\+json/);
  assert.match(metadata, /favicon\.svg/);
  assert.match(portfolio, /document\.title = pageTitle/);
  assert.match(portfolio, /og:url/);
  assert.match(portfolio, /link\[rel="canonical"\]/);
});

test('sitemap lists canonical Persian and English static case-study routes', () => {
  assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, 17);
  const base = 'https://pooya-labs.github.io/pooya-labs-platform/';
  assert.ok(locations.includes(base));
  for (const slug of ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking']) {
    assert.ok(locations.includes(base + 'projects/' + slug + '/'));
    assert.ok(locations.includes(base + 'en/projects/' + slug + '/'));
  }
  assert.match(sitemap, /hreflang="x-default"/);
  assert.match(sitemap, /hreflang="en"/);
});

test('all eight case studies include bilingual roles, architecture, implementation, decisions, verification, and source links', () => {
  const slugs = ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking'];
  for (const slug of slugs) {
    assert.ok(coreDossiers.includes(slug) || productDossiers.includes(slug), 'Missing dossier for ' + slug);
  }
  assert.equal((coreDossiers.match(/^  (?:aetherflow|orbit|"pooya-os"|"nexus-canvas"):\s*\{$/gm) ?? []).length, 4);
  assert.equal((productDossiers.match(/^  "[a-z-]+": \{$/gm) ?? []).length, 4);
  for (const field of ['role:', 'architecture:', 'implementation:', 'decisions:', 'verification:', 'references:']) {
    assert.ok(coreDossiers.includes(field), 'Core dossier missing ' + field);
    assert.ok(productDossiers.includes(field), 'Product dossier missing ' + field);
  }
  assert.match(dossierTypes, /export interface CaseStudyDossier/);
  assert.match(portfolio, /dossier\.role\[language\]/);
  assert.match(portfolio, /dossier\.architecture\[language\]/);
  assert.match(portfolio, /dossier\.implementation\[language\]/);
  assert.match(portfolio, /dossier\.decisions\[language\]/);
  assert.match(portfolio, /dossier\.verification\[language\]/);
  assert.match(portfolio, /dossier\.references\.map/);
  assert.match(css, /\.case-study-dossier-grid/);
  assert.match(css, /\.case-study-source-list/);
  assert.match(portfolio, /caseStudyMedia \?\? \[\]/);
  assert.match(portfolio, /case-study-media-section/);
  assert.match(css, /\.case-study-media-grid/);
  assert.match(projectData, /storefront-home-desktop\.png/);
  assert.match(projectData, /storefront-home-mobile\.png/);
  assert.match(projectData, /5ca43e40ff101e673ee7cf261850bff0a679047c/);

  assert.match(portfolio, /architectureDiagrams\[project\.slug\]/);
  assert.match(portfolio, /case-study-architecture-figure/);
  for (const slug of ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking']) {
    assert.ok(architectureData.includes(`  \"${slug}\": {`) || architectureData.includes(`  '${slug}': {`) || architectureData.includes(`  ${slug}: {`), 'Missing architecture graph for ' + slug);
  }
});

test('portfolio distinguishes in-progress release lines from stable demo releases', () => {
  assert.match(projectData, /In development · v0\.2\.3-dev \/ M09\.8/);
  assert.match(projectData, /Released · v1\.0\.0/);
  assert.match(productDossiers, /APP_VERSION_ = 1\.5\.3/);
  assert.match(productDossiers, /42086718663/);
  assert.match(productDossiers, /42086718821/);
  assert.match(productDossiers, /do not process real sales|No real payment/i);
  assert.match(productDossiers, /the 1\.0\.0 release remains blocked/i);
  assert.match(productDossiers, /M09\.8/);
  assert.match(coreDossiers, /Cloudflare Worker/);
  assert.match(coreDossiers, /ORBIT_GATEWAY_SECRET/);
  assert.match(coreDossiers, /workers\.dev route is disabled/);
  assert.match(architectureData, /node\('apps-script'/);
  assert.match(architectureData, /node\('worker'/);
  assert.match(architectureData, /Three independent ORBIT paths/);
});

test('portfolio routes static bilingual case studies and updates the URL without a reload', () => {
  assert.match(portfolio, /function getProjectSlugFromLocation/);
  assert.match(portfolio, /pathname\.match/);
  assert.match(portfolio, /function getProjectRouteHref/);
  assert.match(portfolio, /import\.meta\.env\.BASE_URL/);
  assert.match(portfolio, /new URL\(getProjectRouteHref\(project\.slug, language\)/);
  assert.match(portfolio, /onLanguageChange\('en'\)/);
  assert.match(portfolio, /onLanguageChange\('fa'\)/);
});


test('homepage motion design is screenshot-led, progressive, and reduced-motion aware', () => {
  assert.match(portfolio, /heroPreviewProjects/);
  assert.match(portfolio, /hero-preview-image/);
  assert.match(portfolio, /project-ticker-track/);
  assert.match(portfolio, /data-reveal/);
  assert.match(portfolio, /IntersectionObserver/);
  assert.match(css, /@keyframes hero-preview-float/);
  assert.match(css, /@keyframes project-ticker-flow/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.portfolio-page\.motion-ready \[data-reveal\]\.is-visible/);
  assert.match(portfolio, /portfolio-hero-title/);
  assert.match(portfolio, /capability-grid/);
  assert.match(portfolio, /process-timeline/);
  assert.match(css, /@keyframes capability-bars/);
  assert.match(css, /@keyframes process-travel/);
  assert.match(css, /\.portfolio-hero-copy \.portfolio-hero-title[\s\S]*?animation: none !important/);
});

test('project evidence capture records private desktop/mobile screenshots and motion reels', async () => {
  const capture = await readFile(new URL('../../apps/platform/scripts/capture-project-previews.mjs', import.meta.url), 'utf8');
  assert.match(capture, /slug: 'global-cart'/);
  assert.match(capture, /recordVideo/);
  assert.match(capture, /motionVideo\.saveAs/);
  assert.match(capture, /captured-pending-human-review/);
  assert.match(capture, /salon-booking/);
  assert.match(capture, /connection required/);
});
