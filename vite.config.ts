import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      data: '/src/data',
      context: '/src/context',
      pages: '/src/pages',
      hooks: '/src/hooks',
      types: '/src/types',
    },
  },
});
