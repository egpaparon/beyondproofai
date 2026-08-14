/**
 * One-off: lift the <main> body out of the two hand-written pages into
 * _dev/parts/ so every page is generated from the same shell from now on.
 *
 *   node _dev/extract.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PARTS = path.join(__dirname, 'parts');
fs.mkdirSync(PARTS, { recursive: true });

function body(file) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const a = html.indexOf('<main id="main">');
  const b = html.lastIndexOf('</main>');
  if (a < 0 || b < 0) throw new Error('no <main> in ' + file);
  return html.slice(a + '<main id="main">'.length, b).trim();
}

// Any relative href/src becomes {{P}}-prefixed so it resolves at any depth.
function tokenise(html, stripUp) {
  return html.replace(/(href|src)="([^"]+)"/g, (m, attr, url) => {
    if (/^(#|tel:|sms:|mailto:|https?:|data:|\{\{P\}\})/.test(url)) return m;
    let u = url;
    if (stripUp && u.startsWith('../')) u = u.slice(3);
    else if (stripUp) return m; // same-folder link — leave relative
    return `${attr}="{{P}}${u}"`;
  });
}

function stripSection(html, cls) {
  const open = `<section class="${cls}"`;
  const i = html.indexOf(open);
  if (i < 0) return html;
  // find the matching </section> by counting nested <section tags
  let depth = 0;
  const re = /<\/?section\b/g;
  re.lastIndex = i;
  let m;
  while ((m = re.exec(html))) {
    if (m[0] === '<section') depth++;
    else if (--depth === 0) {
      const end = html.indexOf('>', re.lastIndex) + 1;
      return (html.slice(0, i) + html.slice(end)).trim();
    }
  }
  return html;
}

/* ---- home ---------------------------------------------------------- */
fs.writeFileSync(
  path.join(PARTS, 'home.html'),
  tokenise(body('index.html'), false) + '\n',
  'utf8'
);
console.log('  wrote  _dev/parts/home.html');

/* ---- workers-compensation hub -------------------------------------- */
let wc = body('workers-compensation/index.html');
wc = stripSection(wc, 'page-head');
wc = stripSection(wc, 'cta-band');
fs.writeFileSync(path.join(PARTS, 'wc-index.html'), tokenise(wc, true) + '\n', 'utf8');
console.log('  wrote  _dev/parts/wc-index.html');
