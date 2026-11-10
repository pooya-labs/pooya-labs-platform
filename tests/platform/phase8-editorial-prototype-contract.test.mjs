import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const main = await readFile(new URL('../../apps/platform/src/main.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/phase8-editorial.css', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');

test('Phase 8 editorial prototype is loaded after the existing portfolio and novel styles', () => {
  const portfolioIndex = main.indexOf("import './portfolio.css'");
  const novelsIndex = main.indexOf("import './novels.css'");
  const prototypeIndex = main.indexOf("import './phase8-editorial.css'");
  assert.ok(portfolioIndex >= 0 && novelsIndex > portfolioIndex && prototypeIndex > novelsIndex);
});

test('Phase 8 prototype preserves the original project data and actual interface images', () => {
  assert.match(portfolio, /portfolioProjects as projects/);
  assert.match(portfolio, /project\.caseStudyHeroAsset \?\? project\.visualAsset/);
  assert.match(portfolio, /project-art-image/);
  assert.match(portfolio, /project\.repositoryUrl/);
  assert.match(portfolio, /project\.previewUrl/);
  assert.match(css, /\.project-art-image/);
  assert.match(css, /\.case-study-media-frame img/);
});

test('Phase 8 editorial system defines paired dark and light palettes with readable foregrounds', () => {
  assert.match(css, /\.portfolio-page \{[\s\S]*?--pf-bg: #101411/);
  assert.match(css, /\.portfolio-page\[data-theme="light"\] \{[\s\S]*?--pf-bg: #f4f3ee/);
  assert.match(css, /--pf-text:/);
  assert.match(css, /--pf-muted:/);
  assert.match(css, /\.portfolio-page\[data-theme="light"\] \.portfolio-theme > span/);
});

test('Phase 8 prototype retains bilingual and case-study layouts at mobile sizes', () => {
  assert.match(css, /\.portfolio-page\.is-rtl/);
  assert.match(css, /\.case-study-hero/);
  assert.match(css, /\.case-study-media-grid/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(max-width: 400px\)/);
  assert.match(css, /\.portfolio-page\.is-rtl \.portfolio-hero h1/);
});

test('Phase 8 motion remains restrained and respects reduced-motion preferences', () => {
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation-duration:\.01ms!important/);
  assert.match(css, /\.portfolio-project-card:hover/);
  assert.doesNotMatch(css, /cursor-follow|pointer-lens|mouse-refraction/i);
});

test('Phase 8 keeps the existing novel empty state and reader presentation available', () => {
  assert.match(portfolio, /NovelLibrarySection/);
  assert.match(css, /\.novel-section/);
  assert.match(css, /\.novel-empty-state/);
  assert.match(css, /\.novel-reader-main/);
});
