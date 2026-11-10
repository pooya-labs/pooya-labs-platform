import { access, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, '../../..');
const outputRoot = path.join(repositoryRoot, 'dist', 'pages');
const duplicateCaptureDirectory = path.join(outputRoot, 'interface-captures');
const localCaptureReference = /\/pooya-labs-platform\/(interface-captures\/[a-z0-9-]+\/[a-z0-9.-]+\.png)/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

await access(path.join(outputRoot, 'index.html'));

const textFiles = (await walk(outputRoot)).filter((file) =>
  /\.(?:html|js|css|json|txt|xml|svg)$/i.test(file),
);
const referencedCaptures = new Set();

for (const file of textFiles) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(localCaptureReference)) {
    referencedCaptures.add(match[1]);
  }
}

let removed = 0;
let retained = 0;
try {
  const copiedCaptures = await walk(duplicateCaptureDirectory);
  for (const file of copiedCaptures) {
    const relativeCapture = path.relative(outputRoot, file).split(path.sep).join('/');
    if (referencedCaptures.has(relativeCapture)) {
      retained += 1;
      continue;
    }
    await rm(file, { force: true });
    removed += 1;
  }
  // Remove now-empty project folders without affecting referenced captures.
  const projectFolders = await readdir(duplicateCaptureDirectory, { withFileTypes: true });
  for (const folder of projectFolders) {
    if (!folder.isDirectory()) continue;
    const folderPath = path.join(duplicateCaptureDirectory, folder.name);
    const remaining = await readdir(folderPath);
    if (remaining.length === 0) await rm(folderPath, { recursive: true, force: true });
  }
  const remaining = await readdir(duplicateCaptureDirectory);
  if (remaining.length === 0) await rm(duplicateCaptureDirectory, { recursive: true, force: true });
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

for (const capture of referencedCaptures) {
  await access(path.join(outputRoot, capture));
}

console.log(
  `Pruned ${removed} unused interface-capture copies and retained ${retained} locally referenced capture(s); immutable source originals remain in the repository.`,
);
