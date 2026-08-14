/**
 * Pre-launch checks (authoring-time only).
 *
 *   node _dev/check.js
 *
 * Verifies: internal links resolve, JSON-LD parses, every page has the
 * required chrome, headings start at h1, and reports the placeholder inventory.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('_dev') || e.name === 'node_modules' || e.name === '.claude') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith('.html') && !e.name.startsWith('_')) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
let placeholderTotal = 0;
const placeholderByFile = {};

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);

  /* --- required chrome ------------------------------------------- */
  const required = [
    ['<title>', 'missing <title>'],
    ['name="description"', 'missing meta description'],
    ['rel="canonical"', 'missing canonical'],
    ['<main id="main">', 'missing <main id="main">'],
    ['class="skip-link"', 'missing skip link'],
    ['assets/css/main.css', 'missing stylesheet'],
    ['assets/js/main.js', 'missing script'],
    ['class="site-footer"', 'missing footer'],
    ['Attorney advertising', 'missing attorney-advertising disclaimer']
  ];
  for (const [needle, msg] of required) {
    if (!html.includes(needle)) errors.push(`${rel}: ${msg}`);
  }

  /* --- exactly one h1 -------------------------------------------- */
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${rel}: expected exactly one <h1>, found ${h1s}`);

  /* --- JSON-LD parses -------------------------------------------- */
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  ld.forEach((block, i) => {
    const json = block
      .replace(/<script type="application\/ld\+json">/, '')
      .replace(/<\/script>/, '');
    try {
      JSON.parse(json);
    } catch (e) {
      errors.push(`${rel}: JSON-LD block ${i + 1} does not parse — ${e.message}`);
    }
  });

  /* --- internal links resolve ------------------------------------ */
  const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(#|tel:|sms:|mailto:|https?:|data:)/.test(href)) continue;
    const [p] = href.split('#');
    if (!p) continue;
    const target = path.resolve(dir, p);
    if (!fs.existsSync(target)) errors.push(`${rel}: broken link -> ${href}`);
  }

  /* --- in-page anchors resolve ----------------------------------- */
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  for (const a of anchors) {
    if (!html.includes(`id="${a}"`)) errors.push(`${rel}: dangling anchor -> #${a}`);
  }

  /* --- images have alt ------------------------------------------- */
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt=/.test(img)) errors.push(`${rel}: <img> without alt attribute`);
  }

  /* --- unresolved template token --------------------------------- */
  if (html.includes('{{P}}')) errors.push(`${rel}: unresolved {{P}} token in output`);

  /* --- placeholder inventory ------------------------------------- */
  const ph =
    (html.match(/\[\[/g) || []).length + (html.match(/placeholder-note/g) || []).length;
  if (ph) {
    placeholderByFile[rel] = ph;
    placeholderTotal += ph;
  }
}

/* --- orphan check: every page reachable from the nav/footer ------- */
const linked = new Set();
for (const file of files) {
  const dir = path.dirname(file);
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="([^"#:]+\.html)"/g)) {
    linked.add(path.relative(ROOT, path.resolve(dir, m[1])).replace(/\\/g, '/'));
  }
}
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel === 'index.html' || rel === '404.html') continue;
  if (!linked.has(rel)) warnings.push(`${rel}: not linked from any other page (orphan)`);
}

/* --- report ------------------------------------------------------- */
console.log(`Checked ${files.length} pages.\n`);

if (errors.length) {
  console.log(`ERRORS (${errors.length}):`);
  errors.forEach((e) => console.log('  ✗ ' + e));
  console.log('');
} else {
  console.log('✓ No errors.\n');
}

if (warnings.length) {
  console.log(`WARNINGS (${warnings.length}):`);
  warnings.forEach((w) => console.log('  ! ' + w));
  console.log('');
}

console.log(`PLACEHOLDERS — ${placeholderTotal} marker(s) across ${Object.keys(placeholderByFile).length} page(s):`);
Object.entries(placeholderByFile)
  .sort((a, b) => b[1] - a[1])
  .forEach(([f, n]) => console.log(`  ${String(n).padStart(3)}  ${f}`));
console.log('\nAll of the above must be resolved or removed before launch.');

process.exitCode = errors.length ? 1 : 0;
