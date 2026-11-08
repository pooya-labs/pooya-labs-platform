import { defineConfig, type Plugin, type OutputBundle } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { portfolioProjects, type PortfolioProject } from './src/content/projects';
import { architectureDiagrams } from './src/content/architecture-diagrams';
import { HydratedCaseStudy } from './src/PortfolioHome';

const root = fileURLToPath(new URL('.', import.meta.url));
// Keep each host's build isolated: Cloudflare is root-based, GitHub Pages uses a project subpath, and GAS emits one HtmlService file.
const DEFAULT_SITE_ORIGIN = 'https://pooya-labs.github.io';
const DEFAULT_SITE_BASE = '/pooya-labs-platform/';
let SITE_ORIGIN = DEFAULT_SITE_ORIGIN;
let SITE_BASE = DEFAULT_SITE_BASE;
const SITE_NAME = 'Pooya Labs';

const pageCopy = {
  fa: {
    skipToContent: 'رفتن به محتوای اصلی',
    back: 'بازگشت به پروژه‌ها',
    demo: 'مشاهده دمو',
    source: 'مشاهده سورس',
    challenge: 'مسئله',
    approach: 'راهکار و رویکرد',
    role: 'نقش و انتساب',
    architecture: 'معماری فنی',
    implementation: 'جزئیات پیاده‌سازی',
    decisions: 'تصمیم‌های مهندسی',
    validation: 'تست و شواهد اعتبارسنجی',
    highlights: 'قابلیت‌ها و نکات فنی',
    boundaries: 'محدوده و محدودیت‌ها',
    sources: 'مستندات و منابع',
    interfaceCaptures: 'تصاویر واقعی رابط کاربری',
    portfolio: 'پورتفولیوی مهندسی نرم‌افزار',
    siteDescription: 'پروژه‌ها، تصمیم‌های فنی و آزمایش‌های نرم‌افزاری Pooya Labs.'
  },
  en: {
    skipToContent: 'Skip to main content',
    back: 'Back to projects',
    demo: 'Open demo',
    source: 'View source',
    challenge: 'The challenge',
    approach: 'Approach',
    role: 'Role & attribution',
    architecture: 'Technical architecture',
    implementation: 'Implementation details',
    decisions: 'Engineering decisions',
    validation: 'Verification & evidence',
    highlights: 'Capabilities & highlights',
    boundaries: 'Scope & boundaries',
    sources: 'Documentation & sources',
    interfaceCaptures: 'Interface captures',
    portfolio: 'Software engineering portfolio',
    siteDescription: 'Software projects, engineering decisions, and experiments by Pooya Labs.'
  }
} as const;

type Locale = keyof typeof pageCopy;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character] ?? character);
}

function escapeXml(value: string): string {
  return escapeHtml(value);
}

function replaceTag(html: string, pattern: RegExp, replacement: string, label: string): string {
  if (!pattern.test(html)) throw new Error('Cannot generate static case-study page; missing ' + label);
  return html.replace(pattern, replacement);
}

function staticPageHtml(template: string, project: PortfolioProject, locale: Locale): string {
  const t = pageCopy[locale];
  const slug = project.slug;
  const pagePath = locale === 'en' ? `en/projects/${slug}/` : `projects/${slug}/`;
  const canonical = SITE_ORIGIN + SITE_BASE + pagePath;
  const socialImage = SITE_ORIGIN + SITE_BASE + `og/${slug}${locale === 'en' ? '-en' : ''}.png`;
  const title = locale === 'fa'
    ? `${project.name} | مطالعه موردی در Pooya Labs`
    : `${project.name} | Engineering Case Study — Pooya Labs`;
  const description = project.description[locale];
  const htmlLocale = locale === 'fa' ? 'fa' : 'en';
  const direction = locale === 'fa' ? 'rtl' : 'ltr';

  let html = template.replace(/<html lang="[^"]+" dir="[^"]+">/, `<html lang="${htmlLocale}" dir="${direction}">`);
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, 'title');
  html = replaceTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`, 'description');
  html = replaceTag(html, /<meta property="og:type"[^>]*>/, '<meta property="og:type" content="article" />', 'Open Graph type');
  html = replaceTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`, 'Open Graph title');
  html = replaceTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`, 'Open Graph description');
  html = replaceTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`, 'Open Graph URL');
  html = replaceTag(html, /<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${locale === 'fa' ? 'fa_IR' : 'en_US'}" />`, 'Open Graph locale');
  html = replaceTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`, 'canonical link');
  html = replaceTag(html, /<meta name="twitter:card"[^>]*>/, '<meta name="twitter:card" content="summary_large_image" />', 'Twitter card');
  html = html.replace(/<meta property="og:image(?::[^"]+)?"[^>]*>\s*/g, '');
  html = html.replace('</head>', `
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:secure_url" content="${socialImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
    <meta property="og:image:alt" content="${escapeHtml(project.name + ' — ' + t.portfolio)}" />
    <link rel="alternate" hreflang="fa" href="${SITE_ORIGIN + SITE_BASE}projects/${slug}/" />
    <link rel="alternate" hreflang="en" href="${SITE_ORIGIN + SITE_BASE}en/projects/${slug}/" />
    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN + SITE_BASE}projects/${slug}/" />
    </head>`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description,
    url: canonical,
    inLanguage: locale,
    keywords: project.tags.join(', '),
    about: project.category[locale],
    isPartOf: { '@type': 'CollectionPage', name: SITE_NAME, url: SITE_ORIGIN + SITE_BASE }
  };
  html = replaceTag(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`, 'JSON-LD');
  const appMarkup = renderToString(createElement(HydratedCaseStudy, { project, language: locale, baseUrl: SITE_BASE }));
  html = replaceTag(html, /<div id="root"><\\/div>/, `<div id="root">${appMarkup}</div>`, 'root mount');
  return html;
}


function wrapDiagramLabel(value: string, maxChars: number, maxLines = 2): string[] {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';

  const pushWord = (word: string) => {
    if (!line) {
      line = word;
      return;
    }
    if (line.length + 1 + word.length <= maxChars) {
      line += ' ' + word;
      return;
    }
    lines.push(line);
    line = word;
  };

  for (const originalWord of words) {
    if (originalWord.length <= maxChars) {
      pushWord(originalWord);
      continue;
    }
    const chunks = Array.from({ length: Math.ceil(originalWord.length / maxChars) }, (_, index) =>
      originalWord.slice(index * maxChars, (index + 1) * maxChars)
    );
    chunks.forEach((chunk, index) => {
      if (index > 0 || line) {
        lines.push(line);
        line = '';
      }
      line = chunk;
      if (index < chunks.length - 1) {
        lines.push(line);
        line = '';
      }
    });
  }
  if (line) lines.push(line);

  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines);
    const last = visible[maxLines - 1];
    visible[maxLines - 1] = (last.length >= maxChars ? last.slice(0, maxChars - 1) : last) + '…';
    return visible;
  }
  return lines.length ? lines : [''];
}

function renderDiagramTextLines(
  lines: readonly string[],
  x: number,
  firstBaseline: number,
  lineHeight: number,
  locale: Locale,
  fontFamily: string,
  fontSize: number,
  fill: string,
  weight = 400,
): string {
  const direction = locale === 'fa' ? 'rtl' : 'ltr';
  const tspans = lines.map((line, index) =>
    `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`
  ).join('');
  return `<text x="${x}" y="${firstBaseline}" text-anchor="middle" direction="${direction}" unicode-bidi="plaintext" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${weight}" fill="${fill}">${tspans}</text>`;
}

function renderArchitectureDiagram(slug: string, locale: Locale): string {
  const diagram = architectureDiagrams[slug];
  if (!diagram) throw new Error('Missing architecture diagram for ' + slug);
  const width = 1600;
  const height = 900;
  const nodeWidth = 300;
  const nodeHeight = 172;
  const isRtl = locale === 'fa';
  const fontFamily = isRtl ? 'Amiri,Tahoma,Arial,sans-serif' : 'Inter,Segoe UI,Tahoma,Arial,sans-serif';
  const titleFontSize = isRtl ? 19 : 21;
  const detailFontSize = isRtl ? 12 : 14;
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));

  const edges = diagram.edges.map((edge) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) throw new Error('Invalid architecture edge in ' + slug);
    const fromCenterX = from.x + nodeWidth / 2;
    const fromCenterY = from.y + nodeHeight / 2;
    const toCenterX = to.x + nodeWidth / 2;
    const toCenterY = to.y + nodeHeight / 2;
    const deltaX = toCenterX - fromCenterX;
    const deltaY = toCenterY - fromCenterY;
    let sx: number, sy: number, tx: number, ty: number;
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      sx = deltaX >= 0 ? from.x + nodeWidth : from.x;
      sy = fromCenterY;
      tx = deltaX >= 0 ? to.x : to.x + nodeWidth;
      ty = toCenterY;
    } else {
      sx = fromCenterX;
      sy = deltaY >= 0 ? from.y + nodeHeight : from.y;
      tx = toCenterX;
      ty = deltaY >= 0 ? to.y : to.y + nodeHeight;
    }
    const control = Math.max(48, Math.min(145, Math.hypot(tx - sx, ty - sy) * 0.38));
    const c1x = Math.abs(deltaX) >= Math.abs(deltaY) ? sx + Math.sign(deltaX) * control : sx;
    const c1y = Math.abs(deltaX) >= Math.abs(deltaY) ? sy : sy + Math.sign(deltaY) * control;
    const c2x = Math.abs(deltaX) >= Math.abs(deltaY) ? tx - Math.sign(deltaX) * control : tx;
    const c2y = Math.abs(deltaX) >= Math.abs(deltaY) ? ty : ty - Math.sign(deltaY) * control;
    return `<path d="M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}" fill="none" stroke="#64cfa9" stroke-opacity=".48" stroke-width="2.5" marker-end="url(#arrow)" />`;
  }).join('');

  const headingTitle = renderDiagramTextLines(
    wrapDiagramLabel(diagram.title[locale], 60, 1),
    800, 78, 22, locale, fontFamily, isRtl ? 26 : 30, '#edf6f1', 700
  );
  const headingCaption = renderDiagramTextLines(
    wrapDiagramLabel(diagram.caption[locale], 110, 2),
    800, 120, 17, locale, fontFamily, isRtl ? 13 : 15, '#a1b6ad'
  );
  const nodes = diagram.nodes.map((item, index) => {
    const kind = item.kind ?? 'core';
    const titleLines = wrapDiagramLabel(item.title[locale], 23, 2);
    const detailLines = wrapDiagramLabel(item.detail[locale], isRtl ? 34 : 35, 2);
    const centerX = item.x + nodeWidth / 2;
    const titleBaseline = item.y + 88 - (titleLines.length - 1) * 11;
    const detailBaseline = item.y + 139 - (detailLines.length - 1) * 8;
    const fill = kind === 'storage' ? 'url(#storage)' : kind === 'external' ? 'url(#external)' : kind === 'local' ? 'url(#local)' : 'url(#node)';
    const stroke = kind === 'storage' ? '#69c89f' : kind === 'external' ? '#6baec1' : '#63bda7';
    const dot = kind === 'storage' ? '#78ddb0' : '#7bd9c6';
    const title = renderDiagramTextLines(titleLines, centerX, titleBaseline, 22, locale, fontFamily, titleFontSize, '#f1f7f5', 650);
    const detail = renderDiagramTextLines(detailLines, centerX, detailBaseline, 16, locale, fontFamily, detailFontSize, '#a9c0bb');
    return `<g>
      <rect x="${item.x}" y="${item.y}" width="${nodeWidth}" height="${nodeHeight}" rx="18" fill="${fill}" stroke="${stroke}" stroke-opacity=".62" stroke-width="1.6" />
      <path d="M ${item.x + 18} ${item.y + 1} H ${item.x + nodeWidth - 18}" stroke="#ffffff" stroke-opacity=".08" />
      <circle cx="${item.x + 27}" cy="${item.y + 29}" r="5" fill="${dot}" />
      <text x="${item.x + nodeWidth - 24}" y="${item.y + 37}" text-anchor="end" font-family="Inter,Segoe UI,Tahoma,Arial,sans-serif" font-size="13" letter-spacing="2" fill="#8ba6a0">${String(index + 1).padStart(2, '0')}</text>
      ${title}
      ${detail}
    </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" lang="${locale}" aria-label="${escapeXml(diagram.title[locale])}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#080d12"/><stop offset=".58" stop-color="#101a21"/><stop offset="1" stop-color="#12231f"/></linearGradient>
      <linearGradient id="node" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1b3036"/><stop offset="1" stop-color="#14252a"/></linearGradient>
      <linearGradient id="storage" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1a3730"/><stop offset="1" stop-color="#142821"/></linearGradient>
      <linearGradient id="external" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1a3540"/><stop offset="1" stop-color="#142a31"/></linearGradient>
      <linearGradient id="local" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#293a40"/><stop offset="1" stop-color="#1b2b30"/></linearGradient>
      <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#b9d8e0" stroke-opacity=".045" stroke-width="1"/></pattern>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#7bd8b6"/></marker>
      <radialGradient id="glow"><stop stop-color="#55c69e" stop-opacity=".13"/><stop offset="1" stop-color="#55c69e" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1600" height="900" rx="26" fill="url(#bg)"/><rect width="1600" height="900" rx="26" fill="url(#grid)"/>
    <circle cx="1350" cy="120" r="430" fill="url(#glow)"/>
    ${headingTitle}
    ${headingCaption}
    <path d="M88 164H1512" stroke="#9fc9d1" stroke-opacity=".13"/>
    ${edges}
    ${nodes}
    <text x="88" y="880" font-family="ui-monospace,monospace" font-size="11" letter-spacing="2" fill="#72877f">POOYA LABS · DOCUMENTED SYSTEM VIEW</text>
    <text x="1512" y="880" text-anchor="end" font-family="ui-monospace,monospace" font-size="11" letter-spacing="1.5" fill="#72877f">${slug.toUpperCase()}</text>
  </svg>`;
}

function socialCard(project: PortfolioProject, locale: Locale): string {
  const t = pageCopy[locale];
  const name = escapeXml(project.name);
  const category = escapeXml(project.category[locale]);
  const status = escapeXml(project.status[locale]);
  const description = escapeXml(project.description[locale]);
  const index = escapeXml(project.number + ' / POOYA LABS');
  const isRtl = locale === 'fa';
  const label = isRtl ? 'مطالعه موردی پروژه' : 'ENGINEERING CASE STUDY';
  const textFont = isRtl ? 'Amiri,Tahoma,Arial,sans-serif' : 'Inter,Arial,Tahoma,sans-serif';
  const textX = isRtl ? 1110 : 92;
  const textAnchor = isRtl ? 'end' : 'start';
  const descriptionLimit = isRtl ? 58 : 90;
  const descriptionText = description.length > descriptionLimit ? description.slice(0, descriptionLimit - 1) + '…' : description;
  const chipX = isRtl ? 680 : 90;
  const chipTextX = isRtl ? 1090 : 110;
  const chipAnchor = isRtl ? 'end' : 'start';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627" viewBox="0 0 1200 627" role="img" lang="${locale}" direction="${isRtl ? 'rtl' : 'ltr'}" aria-label="${name} — ${escapeXml(t.portfolio)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#070d15"/><stop offset=".58" stop-color="#10212d"/><stop offset="1" stop-color="#102e2c"/></linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#efffff"/><stop offset=".58" stop-color="#74e5ea"/><stop offset="1" stop-color="#79e1b9"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#42d4d3" stop-opacity=".28"/><stop offset="1" stop-color="#42d4d3" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#b6d9df" stroke-opacity=".07" stroke-width="1"/></pattern>
  </defs>
  <rect width="1200" height="627" fill="url(#bg)"/>
  <rect width="1200" height="627" fill="url(#grid)"/>
  <circle cx="990" cy="115" r="360" fill="url(#glow)"/>
  <circle cx="990" cy="115" r="205" fill="none" stroke="#66e6ee" stroke-opacity=".18" stroke-width="2"/>
  <circle cx="990" cy="115" r="160" fill="none" stroke="#64e0b1" stroke-opacity=".16" stroke-width="1" stroke-dasharray="6 12"/>
  <rect x="78" y="70" width="72" height="72" rx="19" fill="#16313a" stroke="#75e5df" stroke-opacity=".58"/>
  <text x="114" y="122" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="45" font-weight="750" fill="#efffff">P<tspan fill="#64e0b1">.</tspan></text>
  <text x="174" y="103" font-family="Inter,Arial,sans-serif" font-size="18" letter-spacing="5" fill="#dceced">POOYA LABS</text>
  <text x="1110" y="128" text-anchor="end" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 20 : 12}" letter-spacing="${isRtl ? 0 : 3}" fill="#83a3ae">${label}</text>
  <text x="1115" y="102" text-anchor="end" font-family="ui-monospace,monospace" font-size="15" letter-spacing="2" fill="#8ba8b2">${index}</text>
  <text x="88" y="300" font-family="Inter,Arial,Tahoma,sans-serif" font-size="82" font-weight="760" letter-spacing="-3" fill="url(#title)">${name}</text>
  <text x="${textX}" y="358" text-anchor="${textAnchor}" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 29 : 25}" fill="#85d9d8">${category}</text>
  <text x="${textX}" y="423" text-anchor="${textAnchor}" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 18 : 20}" fill="#b5c8ce">${descriptionText}</text>
  <rect x="${chipX}" y="478" width="430" height="38" rx="19" fill="#193b39" stroke="#64e0b1" stroke-opacity=".5"/>
  <text x="${chipTextX}" y="503" text-anchor="${chipAnchor}" direction="${isRtl ? 'rtl' : 'ltr'}" font-family="${textFont}" font-size="${isRtl ? 22 : 17}" fill="#96edc8">${status}</text>
  <path d="M90 560H1110" stroke="#9cc5ce" stroke-opacity=".18"/>
  <text x="90" y="592" font-family="ui-monospace,monospace" font-size="13" letter-spacing="3" fill="#78929c">SOFTWARE / SYSTEMS / PRODUCT ENGINEERING</text>
</svg>`;
}

function renderSocialPng(svg: string): Uint8Array {
  const rendered = new Resvg(svg, { font: { loadSystemFonts: true } }).render();
  return rendered.asPng();
}

function staticCaseStudyPages(): Plugin {
  let outputDirectory = root;
  return {
    name: 'pooya-labs-static-case-study-pages',
    apply: 'build',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      return html.replaceAll(DEFAULT_SITE_ORIGIN + DEFAULT_SITE_BASE, SITE_ORIGIN + SITE_BASE);
    },
    generateBundle(_options, bundle: OutputBundle) {
      const entry = Object.values(bundle).find((item) => item.type === 'chunk' && item.isEntry);
      if (!entry || entry.type !== 'chunk') {
        this.error('Expected a JavaScript entry chunk before generating static case-study pages.');
      }
      const cssFiles = Object.values(bundle)
        .filter((item) => item.type === 'asset' && item.fileName.endsWith('.css'))
        .map((item) => item.fileName);
      let template = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
      template = template.replaceAll(DEFAULT_SITE_ORIGIN + DEFAULT_SITE_BASE, SITE_ORIGIN + SITE_BASE);
      template = template.replace('src="/src/main.tsx"', `crossorigin src="${SITE_BASE}${entry.fileName}"`);
      template = template.replace('href="%BASE_URL%favicon.svg"', `href="${SITE_BASE}favicon.svg"`);
      template = template.replace('</head>', `${cssFiles.map((file) => `<link rel="stylesheet" crossorigin href="${SITE_BASE}${file}" />`).join('')}\n</head>`);
      const homeWithSocial = template;

      for (const project of portfolioProjects) {
        for (const locale of ['fa', 'en'] as const) {
          const route = locale === 'en' ? `en/projects/${project.slug}/index.html` : `projects/${project.slug}/index.html`;
          this.emitFile({ type: 'asset', fileName: route, source: staticPageHtml(homeWithSocial, project, locale) });
          const socialSvg = socialCard(project, locale);
          const socialName = `og/${project.slug}${locale === 'en' ? '-en' : ''}`;
          this.emitFile({ type: 'asset', fileName: `${socialName}.svg`, source: socialSvg });
          this.emitFile({ type: 'asset', fileName: `${socialName}.png`, source: renderSocialPng(socialSvg) });
          this.emitFile({ type: 'asset', fileName: `architecture/${project.slug}${locale === 'en' ? '-en' : ''}.svg`, source: renderArchitectureDiagram(project.slug, locale) });
        }
      }
      const homeSocialSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627" viewBox="0 0 1200 627"><defs><linearGradient id="b" x2="1" y2="1"><stop stop-color="#070d15"/><stop offset="1" stop-color="#102e2c"/></linearGradient><linearGradient id="t"><stop stop-color="#efffff"/><stop offset="1" stop-color="#79e1b9"/></linearGradient></defs><rect width="1200" height="627" fill="url(#b)"/><circle cx="900" cy="130" r="350" fill="#43d4d3" opacity=".09"/><text x="90" y="160" font-family="Arial,sans-serif" font-size="28" letter-spacing="8" fill="#dceced">POOYA LABS</text><text x="90" y="330" font-family="Arial,sans-serif" font-size="100" font-weight="700" fill="url(#t)">Pooya</text><text x="96" y="405" font-family="Arial,sans-serif" font-size="34" fill="#9bb4be">Software engineering &amp; selected projects</text><path d="M90 500H1110" stroke="#8fe8d5" opacity=".35"/><text x="90" y="555" font-family="monospace" font-size="18" letter-spacing="5" fill="#80a0aa">PRODUCT / SYSTEMS / ENGINEERING</text></svg>`;
      this.emitFile({ type: 'asset', fileName: 'og/pooya-labs.svg', source: homeSocialSvg });
      this.emitFile({ type: 'asset', fileName: 'og/pooya-labs.png', source: renderSocialPng(homeSocialSvg) });

      // The sitemap is emitted from the same static build as the pages, so lastmod cannot drift behind deployed content.
      const sitemapLastmod = new Date().toISOString().slice(0, 10);
      const sitemapEntries = [
        {
          loc: SITE_ORIGIN + SITE_BASE,
          priority: '1.0',
          alternates: [] as Array<{ locale: string; href: string }>
        },
        ...portfolioProjects.flatMap((project) => {
          const faUrl = SITE_ORIGIN + SITE_BASE + `projects/${project.slug}/`;
          const enUrl = SITE_ORIGIN + SITE_BASE + `en/projects/${project.slug}/`;
          const alternates = [
            { locale: 'fa', href: faUrl },
            { locale: 'en', href: enUrl },
            { locale: 'x-default', href: faUrl }
          ];
          return [
            { loc: faUrl, priority: '0.8', alternates },
            { loc: enUrl, priority: '0.7', alternates }
          ];
        })
      ];
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.map((entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${sitemapLastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
    ${entry.alternates.map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate.locale}" href="${escapeXml(alternate.href)}" />`).join('\n    ')}
  </url>`).join('\n')}
</urlset>
`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
    },
    closeBundle() {
      const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_ORIGIN + SITE_BASE}sitemap.xml\n`;
      writeFileSync(resolve(outputDirectory, 'robots.txt'), robots, 'utf8');
    }
  };
}

export default defineConfig(({ mode }) => {
  const gasBuild = mode === 'gas';
  const cloudflareBuild = mode === 'cloudflare';
  SITE_ORIGIN = cloudflareBuild ? 'https://pooya-labs-platform.pages.dev' : DEFAULT_SITE_ORIGIN;
  SITE_BASE = cloudflareBuild ? '/' : DEFAULT_SITE_BASE;

  return {
    root,
    base: gasBuild ? './' : SITE_BASE,
    plugins: [
      react(),
      ...(gasBuild ? [viteSingleFile({ removeViteModuleLoader: true })] : [staticCaseStudyPages()]),
    ],
    build: {
      outDir: gasBuild ? '../../dist/gas' : cloudflareBuild ? '../../dist/cloudflare' : '../../dist/pages',
      emptyOutDir: true,
      sourcemap: !gasBuild,
      cssCodeSplit: !gasBuild,
      target: 'es2022',
      reportCompressedSize: true,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
  };
});
