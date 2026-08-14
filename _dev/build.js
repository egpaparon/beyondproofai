/**
 * Flynn Law Firm — static site generator (authoring-time only).
 *
 *   node _dev/build.js
 *
 * Reads page bodies from _dev/parts/<name>.html, wraps each in the shared
 * shell, and writes plain .html files to the project root. The published site
 * has no dependency on this folder.
 *
 * In a part file, {{P}} is replaced with the correct relative path prefix
 * ('' at the root, '../' one level down).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { render } = require('./shell');

const ROOT = path.join(__dirname, '..');
const PARTS = path.join(__dirname, 'parts');

const SERVICE = (name, desc, url) => ({
  '@type': 'Service',
  name,
  serviceType: name,
  description: desc,
  provider: {
    '@type': 'LegalService',
    name: 'Flynn Law Firm PLLC',
    telephone: '+1-918-583-0121',
    url: 'https://flynnlaw.net/'
  },
  areaServed: { '@type': 'State', name: 'Oklahoma' },
  url
});

const CRUMBS = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: 'https://flynnlaw.net/' + it.path
  }))
});

const FAQ = (qs) => ({
  '@type': 'FAQPage',
  mainEntity: qs.map((q) => ({
    '@type': 'Question',
    name: q[0],
    acceptedAnswer: { '@type': 'Answer', text: q[1] }
  }))
});

/* ------------------------------------------------------------------
   Page manifest
   ------------------------------------------------------------------ */

const pages = require('./pages')({ SERVICE, CRUMBS, FAQ });

/* ------------------------------------------------------------------ */

let written = 0;
const missing = [];

for (const page of pages) {
  const partPath = path.join(PARTS, page.part + '.html');
  if (!fs.existsSync(partPath)) {
    missing.push(page.part + '.html');
    continue;
  }
  page.body = fs.readFileSync(partPath, 'utf8');

  const out = path.join(ROOT, page.slug);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(page), 'utf8');
  written++;
  process.stdout.write('  wrote  ' + page.slug + '\n');
}

console.log('\n' + written + ' page(s) written.');
if (missing.length) {
  console.log('\nMissing part files (skipped):');
  missing.forEach((m) => console.log('  _dev/parts/' + m));
  process.exitCode = 1;
}
