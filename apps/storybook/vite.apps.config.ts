import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const appName = process.env.VITE_APP_NAME;

if (!appName) {
  throw new Error('VITE_APP_NAME environment variable is not set. Please specify which app to build.');
}

const appEntry = fileURLToPath(new URL(`./src/apps/${appName}/index.tsx`, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    emptyOutDir: false,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        [appName.toLowerCase()]: appEntry,
      },
      external: ['react', 'react-dom'],
      output: {
        dir: `dist/${appName.toLowerCase()}`,
        format: 'iife',
        entryFileNames: `${appName.toLowerCase()}.js`,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
