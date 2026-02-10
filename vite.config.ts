import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProd = mode === 'production';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // Gzip compression
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
          threshold: 10240, // Only compress files larger than 10kb
          deleteOriginFile: false
        }),
        // Brotli compression (better than gzip)
        viteCompression({
          algorithm: 'brotliCompress',
          ext: '.br',
          threshold: 10240,
          deleteOriginFile: false
        }),
        // Bundle analyzer (only in production)
        isProd && visualizer({
          filename: './dist/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true
        })
      ].filter(Boolean),
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
        // Enable production optimizations
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: isProd, // Remove console logs in production
            drop_debugger: true,
            pure_funcs: isProd ? ['console.log', 'console.info'] : []
          }
        },
        // Optimize CSS
        cssMinify: true,
        cssCodeSplit: true,

        // Target modern browsers for smaller bundle
        target: 'es2020',

        rollupOptions: {
          output: {
            // Optimize chunk naming for better caching
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',

            manualChunks: (id) => {
              // Only process node_modules
              if (!id.includes('node_modules')) {
                return;
              }

              // Core React - rarely changes, cached long-term (check first)
              if (id.includes('/react/') || id.includes('/react-dom/')) {
                return 'vendor-react';
              }

              // Router - separate chunk
              if (id.includes('/react-router-dom/')) {
                return 'vendor-router';
              }

              // Heavy UI libraries - load on demand
              if (id.includes('/framer-motion/')) {
                return 'vendor-motion';
              }

              if (id.includes('/recharts/')) {
                return 'vendor-charts';
              }

              // Icons - tree-shake and split
              if (id.includes('/lucide-react/')) {
                return 'vendor-icons';
              }

              // i18n - separate chunk
              if (id.includes('/i18next') || id.includes('/react-i18next/')) {
                return 'vendor-i18n';
              }

              // Sanity CMS - separate chunk
              if (id.includes('/@sanity/') || id.includes('/@portabletext/')) {
                return 'vendor-sanity';
              }
            }
          }
        },

        // Chunk size limits
        chunkSizeWarningLimit: 500,

        // Enable source maps for production debugging (optional)
        sourcemap: false,

        // Optimize assets
        assetsInlineLimit: 4096, // Inline assets smaller than 4kb

        // Report compressed size
        reportCompressedSize: true,
      },

      // Optimize dependencies
      optimizeDeps: {
        include: [
          'react',
          'react-dom',
          'react-router-dom',
          'i18next',
          'react-i18next',
          '@sanity/client'
        ],
        exclude: ['framer-motion'] // Heavy library, load on demand
      }
    };
});
