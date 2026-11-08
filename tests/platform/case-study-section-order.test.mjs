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
  return [...fragment.matchAll(/(?:className|class)="eyebrow-index">(\d{2}) \//g)].map((match) => match[1]);
}

test('the shared hydratable case-study component uses continuous 01–10 section numbering', () => {
  const interactive = sectionNumbers(
    portfolio,
    'export function ProjectCaseStudy',
    'export interface HydratedCaseStudyProps',
  );

  assert.deepEqual(interactive, expected, 'Case-study sections must be numbered 01 through 10 exactly once');
  assert.ok(viteConfig.includes('renderToString(createElement(HydratedCaseStudy'), 'Static pages must server-render the same component that the browser hydrates');
  assert.ok(portfolio.includes('<ProjectCaseStudy'), 'The hydration wrapper must render the shared case-study component');
});
