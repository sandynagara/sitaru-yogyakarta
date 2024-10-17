const gzipStatic = require("connect-gzip-static");
const express = require("express")
const path = require("path")
const BodyParser = require("body-parser")
const CookieParser = require("cookie-parser")
const history = require('connect-history-api-fallback');
const app = express();
const port = process.env.PORT || 3000;
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
app.use('/api/*', unstable_fegateway);
app.use(history());
app.use(gzipStatic('dist'));
app.use(express.static(path.join(__dirname, '../src')));
app.use(BodyParser.json({ limit: '50mb' }));
app.use(
  BodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 20000,
  })
);
app.use(CookieParser());

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// eslint-disable-next-line no-console
// console.log(chalkProcessing(`App is running on port ${port}`));
