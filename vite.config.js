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
    },
    build: {
      chunkSizeWarningLimit: 800, // Calibración del umbral para motores gráficos
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('recharts') || id.includes('d3') || id.includes('react-smooth')) {
                return 'charts-vendor';
              }
            }
          }
        }
      }
    }
  };
});