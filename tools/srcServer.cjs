const express = require('express');
const { createServer: createViteServer } = require('vite');
const { unstable_fegateway } =  require('../src/api/unstable_feGateway.cjs');


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
  // Create a Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  
  // Use Vite's connect instance as middleware
  app.use('/api-backend/*', unstable_fegateway);
  app.use(vite.middlewares);
  
  
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

startServer();