import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // Core React - rarely changes, cached long-term
              'vendor-react': ['react', 'react-dom'],
              // Router - separate chunk
              'vendor-router': ['react-router-dom'],
              // Heavy UI libraries - load on demand
              'vendor-motion': ['framer-motion'],
              'vendor-charts': ['recharts'],
              // Icons - tree-shake and split
              'vendor-icons': ['lucide-react'],
              // i18n
              'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
              // Sanity CMS
              'vendor-sanity': ['@sanity/client', '@sanity/image-url', '@portabletext/react'],
            }
          }
        },
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 500,
      }
    };
});
