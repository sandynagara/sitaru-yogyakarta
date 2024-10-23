const express = require('express');
const path = require('path');
const { unstable_fegateway } = require('../src/api/unstable_feGateway.cjs');
require('dotenv').config();
// Modify CSP for production
const getCSP = () => `
  default-src *;
  script-src * 'unsafe-inline' 'unsafe-eval';
  style-src * 'unsafe-inline';
  img-src * data:;
  font-src *;
  connect-src *;
  object-src *;
  media-src *;
  frame-src *;
  worker-src * blob:;
`.replace(/\s+/g, ' ').trim();


async function startServer() {
  const app = express();

  app.use((_, res, next) => {
    res.setHeader('Expect-CT', 'enforce, max-age=86400');
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-DNS-Prefetch-Control', 'on');
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()'
    );
    res.setHeader('Content-Security-Policy', getCSP());
    next();
  });

  app.use('/api-backend/*', unstable_fegateway);
  // Serve static files from the Vite build directory
  const staticDir = path.resolve(__dirname, '../dist');
  app.use(express.static(staticDir));

  // Backend API route


  // All other routes should serve the index.html (single-page application)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticDir, 'index.html'));
  });

  // Start the server
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

startServer();