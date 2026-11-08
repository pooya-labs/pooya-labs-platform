import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const secretRules = [
  { id: 'private-key-block', pattern: /-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/i },
  { id: 'pgp-private-key', pattern: /-----BEGIN PGP PRIVATE KEY BLOCK-----/i },
  { id: 'aws-access-key-id', pattern: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/ },
  { id: 'github-token', pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b/ },
  { id: 'google-api-key', pattern: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { id: 'slack-token', pattern: /\bxox[baprs]-[0-9A-Za-z-]{20,}\b/ },
  { id: 'stripe-live-secret', pattern: /\bsk_live_[0-9A-Za-z]{24,}\b/ },
  {
    id: 'credential-assignment',
    pattern: /\b[A-Z0-9_]*(?:API[_-]?KEY|CLIENT[_-]?SECRET|ACCESS[_-]?TOKEN|REFRESH[_-]?TOKEN|PRIVATE[_-]?KEY|TOKEN|PASSWORD|PASSWD)[A-Z0-9_]*\b\s*[:=]\s*["']([^"'\r\n]{24,})["']/i,
  },
];

const sensitiveFileNames = [
  /^\.env(?:\..+)?$/i,
  /^\.clasp\.json$/i,
  /^\.clasprc\.json$/i,
  /^id_(?:rsa|dsa|ecdsa|ed25519)(?:\..*)?$/i,
  /^(?:credentials|service-account|client-secret|oauth-token|token)(?:[._-].*)?\.json$/i,
  /\.(?:pem|p12|pfx|p8|jks|keystore|key)$/i,
  /\.tfstate(?:\.backup)?$/i,
];

function isPlaceholder(value) {
  return /^(?:\$\{|<|your(?:[_ -]|$)|replace(?:[_ -]|$)|example(?:[_ -]|$)|sample(?:[_ -]|$)|dummy(?:[_ -]|$)|placeholder(?:[_ -]|$)|changeme|redacted|not-a-real|x{24,}|\*{8,})/i.test(value.trim());
}

export function isSensitivePath(filePath) {
  const normalized = filePath.replaceAll('\\', '/');
  const fileName = normalized.split('/').at(-1) ?? '';
  if (fileName.toLowerCase() === '.env.example') return false;
  if (/^id_(?:rsa|dsa|ecdsa|ed25519)\.pub$/i.test(fileName)) return false;
  return sensitiveFileNames.some((pattern) => pattern.test(fileName));
}

export function scanText(source) {
  const findings = [];
  const lines = source.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    for (const rule of secretRules) {
      const match = lines[index].match(rule.pattern);
      if (!match) continue;
      if (rule.id === 'credential-assignment' && isPlaceholder(match[1] ?? '')) continue;
      findings.push({ rule: rule.id, line: index + 1 });
    }
  }
  return findings;
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(absolutePath));
    else if (entry.isFile()) files.push(absolutePath);
  }
  return files;
}

async function readTextFile(filePath) {
  const bytes = await readFile(filePath);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

export async function scanRepository() {
  const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
  const buildRoots = ['dist/pages', 'dist/cloudflare'];
  const buildFiles = [];
  for (const root of buildRoots) {
    const absoluteRoot = resolve(root);
    try {
      buildFiles.push(...await listFiles(absoluteRoot));
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('Required public build output is missing: ' + root);
      }
      throw error;
    }
  }

  const findings = [];
  for (const filePath of [...tracked, ...buildFiles]) {
    const displayPath = relative(process.cwd(), filePath).replaceAll('\\', '/');
    if (isSensitivePath(displayPath)) {
      findings.push({ path: displayPath, rule: 'sensitive-file-path', line: 1 });
      continue;
    }
    const source = await readTextFile(filePath);
    if (source === null) continue;
    for (const finding of scanText(source)) {
      findings.push({ path: displayPath, ...finding });
    }
  }
  return findings;
}

async function main() {
  const findings = await scanRepository();
  if (findings.length > 0) {
    console.error('Credential scan failed. Values are intentionally never printed:');
    for (const finding of findings) {
      console.error('- ' + finding.path + ':' + finding.line + ' [' + finding.rule + ']');
    }
    process.exitCode = 1;
    return;
  }
  console.log('Credential scan passed: no recognized secrets or sensitive credential files in tracked source or public build outputs.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main();
}
