import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const viteConfig = await readFile(new URL('../../apps/platform/vite.config.ts', import.meta.url), 'utf8');
const expected = Array.from({ length: 10 }, (_, index) => String(index + 1).padStart(2, '0'));

function sectionNumbers(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `Missing start marker: ${startMarker}`);
  assert.notEqual(end, -1, `Missing end marker: ${endMarker}`);
  const fragment = source.slice(start, end);
  return [...fragment.matchAll(/(?:className|class)="eyebrow-index">(\\d{2}) \\//g)].map((match) => match[1]);
}

test('interactive and static case studies use the same continuous 01–10 section numbering', () => {
  const interactive = sectionNumbers(
    portfolio,
    'function ProjectCaseStudy',
    'export default function PortfolioHome',
  );
  const staticPage = sectionNumbers(
    viteConfig,
    'function renderStaticCaseStudy',
    'function replaceTag',
  );

  assert.deepEqual(interactive, expected, 'Interactive case-study sections must be numbered 01 through 10 exactly once');
  assert.deepEqual(staticPage, expected, 'Static case-study sections must be numbered 01 through 10 exactly once');
});
