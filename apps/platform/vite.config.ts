import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  const gasBuild = mode === 'gas';

  return {
    root,
    base: gasBuild ? './' : '/pooya-labs-platform/',
    plugins: [
      react(),
      ...(gasBuild ? [viteSingleFile({ removeViteModuleLoader: true })] : []),
    ],
    build: {
      outDir: gasBuild ? '../../dist/gas' : '../../dist/pages',
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
