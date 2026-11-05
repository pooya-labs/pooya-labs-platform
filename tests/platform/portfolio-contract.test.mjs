import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../../apps/platform/src/App.tsx', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const projectData = await readFile(new URL('../../apps/platform/src/content/projects.ts', import.meta.url), 'utf8');
const metadata = await readFile(new URL('../../apps/platform/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');

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
  assert.match(content, /ProjectReviewState = 'needs-owner-review' \| 'owner-reviewed'/);
  assert.equal((content.match(/reviewState: 'needs-owner-review'/g) ?? []).length, 8);
  assert.match(content, /slugs\.has\(project\.slug\)/);
  assert.match(content, /url\.protocol !== 'https:'/);
  assert.equal((content.match(/repositoryUrl: 'https:\/\//g) ?? []).length, 8);
  assert.ok(content.includes("host.startsWith('.')"));
  assert.ok(content.includes('url.hostname.endsWith(host)'));
  assert.ok(content.includes("assertHttpsUrl(project.previewUrl, ['.github.io']"));
});
