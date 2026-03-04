import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    base: '/malmetrics/',
    server: {
      proxy: {
        '/api/mal': {
          target: 'https://api.myanimelist.net/v2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/mal/, '')
        }
      }
    }
  };
});