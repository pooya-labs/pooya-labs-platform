import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const portfolio = await readFile(new URL('../../apps/platform/src/PortfolioHome.tsx', import.meta.url), 'utf8');
const viteConfig = await readFile(new URL('../../apps/platform/vite.config.ts', import.meta.url), 'utf8');
const css = await readFile(new URL('../../apps/platform/src/portfolio.css', import.meta.url), 'utf8');

test('Persian and English pages expose visible-on-focus skip navigation', () => {
  assert.ok(portfolio.includes("skipToContent: 'رفتن به محتوای اصلی'"));
  assert.ok(portfolio.includes("skipToContent: 'Skip to main content'"));
  assert.ok(portfolio.includes('className="portfolio-skip-link" href="#top">{t.skipToContent}')));
  assert.ok(portfolio.includes('<main id="top" tabIndex={-1}>'));
  assert.ok(portfolio.includes('className="portfolio-skip-link" href="#main-content">{t.skipToContent}')));
  assert.ok(portfolio.includes('<main id="main-content" tabIndex={-1} className="case-study-main'));
  assert.ok(viteConfig.includes("skipToContent: 'رفتن به محتوای اصلی'"));
  assert.ok(viteConfig.includes("skipToContent: 'Skip to main content'"));
  assert.ok(viteConfig.includes('<a class="portfolio-skip-link" href="#main-content">${t.skipToContent}</a>'));
  assert.ok(viteConfig.includes('<main id="main-content" tabindex="-1" class="case-study-main'));
  assert.ok(css.includes('.portfolio-skip-link:focus, .portfolio-skip-link:focus-visible'));
  assert.ok(css.includes('transform: translateY(0)'));
  assert.ok(css.includes('prefers-reduced-motion: reduce) { .portfolio-skip-link { transition: none'));
});
