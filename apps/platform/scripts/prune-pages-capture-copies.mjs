import { access, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, '../../..');
const outputRoot = path.join(repositoryRoot, 'dist', 'pages');
const duplicateCaptureDirectory = path.join(outputRoot, 'interface-captures');
const localCaptureReference = /\/pooya-labs-platform\/interface-captures\//;

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

for (const file of textFiles) {
  const content = await readFile(file, 'utf8');
  if (localCaptureReference.test(content)) {
    throw new Error(
      'Refusing to remove duplicate interface captures because a Pages file references them locally: ' +
      path.relative(outputRoot, file),
    );
  }
}

await rm(duplicateCaptureDirectory, { recursive: true, force: true });
console.log(
  'Removed unused local interface-capture copies from dist/pages; immutable raw-GitHub originals remain in the repository.',
);
