import { join } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '~': join(__dirname, 'src'),
    },
  },
  plugins: [react()],
  server: {
    open: true,
    port: 4000,
  },
});
