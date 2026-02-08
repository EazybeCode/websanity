import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import fs from 'fs';

// Custom plugin to handle redirects like Cloudflare Pages
function redirectsPlugin(): Plugin {
  return {
    name: 'vite-redirects-plugin',
    configureServer(viteServer) {
      const server = viteServer.httpServer;
      if (!server) return;

      // Remove all existing request listeners
      server.removeAllListeners('request');

      // Add our custom request handler
      server.on('request', (req, res) => {
        // Parse the _redirects file
        const redirectsFile = fs.readFileSync('public/_redirects', 'utf-8');
        const redirects: Array<{ from: string; to: string; code: number }> = [];

        redirectsFile.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const parts = trimmed.split(/\s+/);
            if (parts.length >= 2) {
              redirects.push({
                from: parts[0],
                to: parts[1],
                code: parts.length >= 3 ? parseInt(parts[2]) : 301
              });
            }
          }
        });

        // Check if path matches any redirect
        const url = req.url || '/';
        const pathname = url.split('?')[0];
        const redirect = redirects.find(r => pathname === r.from);

        if (redirect) {
          res.writeHead(redirect.code, {
            Location: redirect.to
          });
          res.end();
          return;
        }

        // Otherwise, let Vite handle it
        (viteServer as any).handleRequest(req, res);
      });
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), redirectsPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
