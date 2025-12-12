import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    proxy: {
      '/api/scrape': {
        target: 'https://cors-anywhere.herokuapp.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/scrape/, ''),
      },
    },
  },
});