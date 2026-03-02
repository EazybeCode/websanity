import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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
        {
          name: 'redirect-middleware',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              // Handle 301 redirect for pipedrive integration
              if (req.url === '/product/pipedrive-whatsapp-integration') {
                res.writeHead(301, {
                  Location: '/pipedrive-whatsapp-integration'
                });
                res.end();
                return;
              }
              next();
            });
          }
        }
      ],
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
            drop_console: isProd,
            drop_debugger: true,
            pure_funcs: isProd ? ['console.log', 'console.info', 'console.debug'] : [],
            passes: 2,
          },
          mangle: {
            safari10: true,
          }
        },
        // Optimize CSS
        cssMinify: 'lightningcss', // Faster CSS minification

        // Target modern browsers for smaller bundle
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],

        rollupOptions: {
          output: {
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
            // Better code splitting - split vendor chunks (fixed circular dependency)
            manualChunks: (id) => {
              // Split large libraries into separate chunks
              if (id.includes('node_modules')) {
                // Framer Motion - heavy animation library
                if (id.includes('framer-motion')) {
                  return 'animation-vendor';
                }
                // Recharts - heavy charting library
                if (id.includes('recharts')) {
                  return 'charts-vendor';
                }
                // Spline 3D - very heavy
                if (id.includes('@splinetool')) {
                  return 'spline-vendor';
                }
                // Everything else in one vendor chunk to avoid circular dependencies
                return 'vendor';
              }
            }
          }
        },

        // Chunk size limits - reduce for faster loading
        chunkSizeWarningLimit: 400,

        // Enable source maps for production debugging (optional)
        sourcemap: false,

        // Optimize assets - reduce inline limit
        assetsInlineLimit: 2048, // Inline assets smaller than 2kb

        // Report compressed size
        reportCompressedSize: true
      },

      // Optimize dependencies - pre-bundle for faster dev
      optimizeDeps: {
        include: [
          'react',
          'react-dom',
          'react-router-dom',
          'i18next',
          'react-i18next',
          '@sanity/client'
        ],
        exclude: ['framer-motion', 'recharts'] // Heavy libraries, load on demand
      },

      // Performance optimizations
      experimental: {
        renderBuiltUrl(filename: string) {
          // Enable immutable caching for hashed assets
          return { relative: true }
        }
      }
    };
});
