import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT || '4200', 10),
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  base: '/snappy-fern-prototype/',
  plugins: [react(), svgr()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
