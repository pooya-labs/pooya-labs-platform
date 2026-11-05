import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../../apps/platform/src/App.tsx', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
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

test('portfolio project cards expose honest statuses and do not invent links', () => {
  assert.match(portfolio, /status: \{ fa: 'در حال توسعه', en: 'In development' \}/);
  assert.match(portfolio, /status: \{ fa: 'نمونه و آزمایش', en: 'Prototype' \}/);
  assert.match(portfolio, /https:\/\/github\.com\/pooya16pg-spec\/aetherflow/);
  assert.doesNotMatch(portfolio, /github\.com\/pooya16pg-spec\/(?:ORBIT|Pooya\.OS|NexusCanvas|LuminaGlass|AuraPulse|GlobalCart)/);
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
