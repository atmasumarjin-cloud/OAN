import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import app from './app.js';
import { APP_CONFIG } from './appConfig.js';
import { startServer } from './entry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static asset serving logic for 'dist/' (Production, Docker, cPanel, Vercel)
const possibleDistPaths = [
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'client', 'dist'),
];

const distPath = possibleDistPaths.find((p) => fs.existsSync(p));

if (distPath) {
  app.use(express.static(distPath));
  // Catch-all route to prevent 404 on client-side SPA reload
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send(
      `<h1>${APP_CONFIG.brandName} Production Server</h1><p>Frontend static assets not built yet in 'dist/'. Run <code>npm run build</code>.</p>`
    );
  });
}

// Start production server
const PORT = process.env.PORT || 3000;
startServer(PORT);

export default app;
