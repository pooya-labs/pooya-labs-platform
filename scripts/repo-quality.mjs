import { execFileSync, spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const mode = process.argv[2];
if (!['lint', 'format'].includes(mode)) {
  console.error('Usage: node scripts/repo-quality.mjs <lint|format>');
  process.exit(2);
}

const roots = [
  'apps/platform/src/',
  'apps/platform/scripts/',
  'scripts/',
  'tests/',
  '.github/workflows/',
];
const extensions = new Set(['.js', '.mjs', '.ts', '.tsx', '.css', '.json', '.yml', '.yaml']);
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);
const files = tracked.filter((path) =>
  (roots.some((root) => path.startsWith(root)) || path === 'package.json') &&
  extensions.has(extname(path)),
);
const errors = [];

for (const path of files) {
  let source;
  try {
    const bytes = await readFile(path);
    source = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch (error) {
    errors.push(`${path}: could not be read as UTF-8 (${error.message})`);
    continue;
  }

  if (mode === 'format') {
    if (source.includes('\r')) errors.push(`${path}: use LF line endings`);
    if (!source.endsWith('\n')) errors.push(`${path}: missing final newline`);
    if (source.split('\n').some((line) => /[\t ]$/.test(line))) {
      errors.push(`${path}: trailing whitespace found`);
    }
    if (source.split('\n').some((line) => line.startsWith('\t'))) {
      errors.push(`${path}: use spaces, not tabs, for indentation`);
    }
    continue;
  }

  if (/^\s*debugger\s*;/m.test(source)) {
    errors.push(`${path}: remove debugger statements before committing`);
  }

  if (['.js', '.mjs'].includes(extname(path))) {
    const result = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
    if (result.status !== 0) {
      errors.push(`${path}: JavaScript syntax check failed\n${result.stderr || result.stdout}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Repository ${mode} checks failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(
  mode === 'lint'
    ? `JavaScript syntax and debugger checks passed for ${files.length} tracked source/config files.`
    : `Formatting checks passed for ${files.length} tracked source/config files (UTF-8, LF, final newline, no trailing whitespace, space indentation).`,
);
