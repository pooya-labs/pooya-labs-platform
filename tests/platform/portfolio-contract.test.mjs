import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../../apps/platform/src/App.tsx', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const projectData = await readFile(new URL('../../apps/platform/src/content/projects.ts', import.meta.url), 'utf8');
const metadata = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');
const coreDossiers = await readFile(new URL('../../apps/platform/src/content/case-study-dossiers-core.ts', import.meta.url), 'utf8');
const productDossiers = await readFile(new URL('../../apps/platform/src/content/case-study-dossiers-products.ts', import.meta.url), 'utf8');
const dossierTypes = await readFile(new URL('../../apps/platform/src/content/case-study-dossiers-types.ts', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../../apps/platform/public/sitemap.xml', import.meta.url), 'utf8');

test('the root experience is the personal portfolio and the workspace is secondary', () => {
  assert.match(app, /return <PortfolioHome language=/);
  assert.match(app, /onOpenWorkspace=\{\(\) => setWorkspaceOpen\(true\)\}/);
  assert.match(portfolio, /onOpenWorkspace/);
  assert.match(portfolio, /POOYA LABS/);
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
  assert.match(projectData, /previewUrl: 'https:\/\/pooya16pg-spec\.github\.io\/aetherflow\//);
  assert.match(projectData, /caseStudyUrl: 'https:\/\/pooya-labs\.github\.io\/globalcart\/case-study\//);
  assert.equal((projectData.match(/repositoryUrl: 'https:\/\/github\.com\/pooya-labs\//g) ?? []).length, 8);
  assert.equal((projectData.match(/previewUrl: 'https:\/\/[^']+\.github\.io\//g) ?? []).length, 8);
});

test('portfolio is bilingual, responsive, and honors reduced motion', () => {
  assert.match(portfolio, /language: Language/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /pointer-events: none/);
});

test('HTML metadata introduces a personal portfolio rather than a generic workspace', () => {
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
  assert.match(portfolio, /\?project=\$\{project\.slug\}/);
  assert.match(css, /\.case-study-main/);
});

test('project artwork is sourced from pinned project commits with localized alt text', () => {
  assert.equal((projectData.match(/visualAsset: \{/g) ?? []).length, 7);
  assert.equal((projectData.match(/raw\.githubusercontent\.com\/pooya-labs\//g) ?? []).length, 7);
  assert.equal((projectData.match(/alt: \{ fa: '[^']+', en: '[^']+' \}/g) ?? []).length, 7);
  assert.match(projectData, /Project visual assets must be pinned to an immutable source commit/);
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

test('sitemap lists the public portfolio and all eight shareable case-study URLs', () => {
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, 9);
  assert.ok(locations.includes('https://pooya-labs.github.io/pooya-labs-platform/'));
  for (const slug of ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aura-pulse', 'global-cart', 'salon-booking']) {
    assert.ok(locations.includes('https://pooya-labs.github.io/pooya-labs-platform/?project=' + slug));
  }
});

test('all eight case studies include bilingual roles, architecture, implementation, decisions, verification, and source links', () => {
  const slugs = ['aetherflow', 'orbit', 'pooya-os', 'nexus-canvas', 'lumina-glass', 'aurapulse', 'global-cart', 'salon-booking'];
  for (const slug of slugs) {
    assert.ok(coreDossiers.includes(slug) || productDossiers.includes(slug), 'Missing dossier for ' + slug);
  }
  assert.equal((coreDossiers.match(/^  (?:aetherflow|orbit|"pooya-os"|"nexus-canvas"):\s*\{$/gm) ?? []).length, 4);
  assert.equal((productDossiers.match(/^  (?:"lumina-glass"|aurapulse|"global-cart"|"salon-booking"):\s*\{$/gm) ?? []).length, 4);
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
});

test('portfolio distinguishes in-progress release lines from stable demo releases', () => {
  assert.match(projectData, /In development · v0\.2\.3-dev \/ M09\.6/);
  assert.match(projectData, /Apps Script 1\.4\.0 target/);
  assert.match(productDossiers, /do not process real sales|No real payment/i);
  assert.match(productDossiers, /not assumed successful|not be assumed successful/i);
});
