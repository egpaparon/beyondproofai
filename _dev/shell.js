/**
 * Flynn Law Firm — authoring shell.
 *
 * AUTHORING-TIME ONLY. This generates the static .html files that ship.
 * The published site has no build step and no runtime dependency on this
 * folder — you can delete _dev/ and the site still works. It exists so the
 * header, footer and <head> stay identical across 19 pages instead of being
 * hand-maintained in 19 places.
 *
 * Usage:  node _dev/build.js
 */

'use strict';

const PHONE_DISPLAY = '(918) 583-0121';
const PHONE_HREF = 'tel:+19185830121';
const SMS_HREF = 'sms:+19185830121';
const SITE = 'https://flynnlaw.net';

const ARROW =
  '<svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true"><path d="M1 6h12M9 1.5 13.5 6 9 10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV =
  '<svg class="nav__chev" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// Soft curve that separates a navy band from the section beneath it.
// `tone` selects which background colour the curve is filled with.
const wave = (tone) =>
  `<div class="wave${tone ? ' wave--' + tone : ''}" aria-hidden="true">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" fill="none">
      <path d="M0 90V38c180 34 380 50 600 34 220-16 420-46 620-52 80-2 160 2 220 10v60z" fill="currentColor"/>
    </svg>
  </div>`;

/* ------------------------------------------------------------------ */

function head(p, o) {
  // Directory index pages canonicalise to the trailing-slash form.
  const canonical = SITE + '/' + o.slug.replace(/(^|\/)index\.html$/, '$1');
  const jsonld = o.jsonld
    ? '\n<script type="application/ld+json">\n' +
      JSON.stringify(o.jsonld, null, 2) +
      '\n</script>'
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${o.title}</title>
<meta name="description" content="${o.description}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<meta name="robots" content="${o.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta property="og:type" content="${o.slug === 'index.html' ? 'website' : 'article'}">
<meta property="og:site_name" content="Flynn Law Firm PLLC">
<meta property="og:title" content="${o.title}">
<meta property="og:description" content="${o.description}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#12161C">

<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__flynnBooted)document.documentElement.classList.remove('js')},3000)</script>

<link rel="icon" href="${p}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${p}assets/fonts/playfair-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${p}assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${p}assets/css/main.css">${jsonld}
</head>

<body>
<a class="skip-link" href="#main">Skip to content</a>
`;
}

/* ------------------------------------------------------------------ */

function header(p, current) {
  const cur = (key) => (current === key ? ' aria-current="page"' : '');

  return `<div class="topbar">
  <div class="container">
    <div class="topbar__inner">
      <p class="topbar__note">
        <span class="topbar__dot" aria-hidden="true"></span>
        <span>Free consultation<span class="is-long"> — no obligation, no fee unless we win</span></span>
      </p>
      <div class="topbar__links">
        <a class="topbar__phone" href="${PHONE_HREF}">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6.2 3.3 8 6.1 6.4 7.9c.7 1.6 2.1 3 3.7 3.7l1.8-1.6 2.8 1.8-.4 2.4c-.1.6-.7 1.1-1.4 1-5-.6-8.9-4.5-9.5-9.5-.1-.7.4-1.3 1-1.4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          ${PHONE_DISPLAY}
        </a>
        <span class="lang">
          <span aria-current="true">EN</span>
          <span data-soon title="Español — coming soon">ES</span>
        </span>
      </div>
    </div>
  </div>
</div>

<header class="site-header">
  <div class="container">
    <div class="site-header__inner">
      <a class="wordmark" href="${p}index.html" aria-label="Flynn Law Firm — home">
        <svg class="wordmark__mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22.5" fill="#123F5C"/>
          <path d="M16 13h17v5.6H22.2v6.1h9.6v5.6h-9.6V35H16z" fill="#fff"/>
          <path d="M16 37.5h17" stroke="#E2725B" stroke-width="2.4" stroke-linecap="round"/>
        </svg>
        <span class="wordmark__text">
          <span class="wordmark__name">Flynn Law Firm</span>
          <span class="wordmark__sub">Tulsa · Since 2000</span>
        </span>
      </a>

      <nav class="nav" id="primary-nav" aria-label="Primary">
        <button class="nav__close" type="button">
          Close
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 1l10 10M11 1 1 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </button>

        <div class="nav__item">
          <a class="nav__link" href="${p}workers-compensation/index.html"${cur('wc')} aria-expanded="false" aria-haspopup="true">
            Workers' Comp ${CHEV}
          </a>
          <div class="nav__panel">
            <a class="nav__panel-link" href="${p}workers-compensation/index.html"><strong>Workers' Compensation Overview</strong><span>How Oklahoma claims work, and where they go wrong</span></a>
            <a class="nav__panel-link" href="${p}workers-compensation/denied-claims.html"><strong>Denied &amp; Disputed Claims</strong><span>A denial is a position, not a verdict</span></a>
            <a class="nav__panel-link" href="${p}workers-compensation/permanent-disability.html"><strong>Permanent Disability &amp; Settlements</strong><span>PPD and PTD ratings, and what they're worth</span></a>
            <a class="nav__panel-link" href="${p}workers-compensation/retaliation.html"><strong>Fired for Filing a Claim?</strong><span>Retaliation rarely announces itself</span></a>
            <a class="nav__panel-link" href="${p}workers-compensation/injured-worker-guide.html"><strong>The Injured Worker's Guide</strong><span>Deadlines, forms and first steps</span></a>
          </div>
        </div>

        <div class="nav__item">
          <a class="nav__link" href="${p}personal-injury/index.html"${cur('pi')} aria-expanded="false" aria-haspopup="true">
            Personal Injury ${CHEV}
          </a>
          <div class="nav__panel">
            <a class="nav__panel-link" href="${p}personal-injury/index.html"><strong>Personal Injury Overview</strong><span>Wrecks, premises and serious injury claims</span></a>
            <a class="nav__panel-link" href="${p}personal-injury/car-accidents.html"><strong>Car Accidents</strong><span>Including uninsured and underinsured claims</span></a>
            <a class="nav__panel-link" href="${p}personal-injury/truck-accidents.html"><strong>Semi-Truck Accidents</strong><span>Federal rules, black boxes, corporate insurers</span></a>
            <a class="nav__panel-link" href="${p}personal-injury/fela-railroad.html"><strong>FELA &amp; Railroad Injuries</strong><span>Railroad workers are not covered by workers' comp</span></a>
          </div>
        </div>

        <div class="nav__item"><a class="nav__link" href="${p}results.html"${cur('results')}>Results</a></div>
        <div class="nav__item"><a class="nav__link" href="${p}attorneys.html"${cur('attorneys')}>Attorneys</a></div>
        <div class="nav__item"><a class="nav__link" href="${p}about.html"${cur('about')}>Firm</a></div>
        <div class="nav__item"><a class="nav__link" href="${p}contact.html"${cur('contact')}>Contact</a></div>

        <div class="nav__mobile-cta">
          <a class="btn btn--brass btn--block" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a>
          <a class="btn btn--outline btn--block" href="${p}contact.html">Free case review</a>
        </div>
      </nav>

      <div class="header__actions">
        <a class="btn btn--sm" href="${p}contact.html">Free case review</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span class="nav-toggle__bars" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>Menu</span>
        </button>
      </div>
    </div>
  </div>
</header>
<div class="nav-scrim" aria-hidden="true"></div>

<main id="main">
`;
}

/* ------------------------------------------------------------------ */

function ctaBand(p) {
  return `
<section class="cta-band">
  <div class="container">
    <div class="cta-band__grid" data-reveal>
      <p class="eyebrow">No cost to find out</p>
      <h2 class="mt-4">Tell us what happened. We'll tell you <em>honestly</em> whether you have a claim.</h2>
      <p>
        Including when the answer is no. The consultation is free, it obligates you
        to nothing, and you can have it in English or Spanish.
      </p>
      <div class="cta-band__actions">
        <a class="btn btn--lg" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a>
        <a class="btn btn--ghost-inverse btn--lg" href="${p}contact.html">Free case review</a>
      </div>
    </div>
  </div>
</section>
`;
}

function footer(p) {
  return `</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <span class="wordmark">
          <span class="wordmark__text">
            <span class="wordmark__name">Flynn Law Firm</span>
            <span class="wordmark__sub">PLLC · Since 2000</span>
          </span>
        </span>
        <p class="footer__blurb">
          Oklahoma workers' compensation and injury lawyers. We represent injured
          people — never insurers, never employers.
        </p>
        <p class="mt-5"><a class="btn btn--sm" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></p>
      </div>

      <div class="footer__col">
        <h3>Workers' Comp</h3>
        <ul>
          <li><a href="${p}workers-compensation/index.html">Overview</a></li>
          <li><a href="${p}workers-compensation/denied-claims.html">Denied claims</a></li>
          <li><a href="${p}workers-compensation/permanent-disability.html">Disability &amp; settlements</a></li>
          <li><a href="${p}workers-compensation/retaliation.html">Fired for filing</a></li>
          <li><a href="${p}workers-compensation/injured-worker-guide.html">Injured worker's guide</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3>Personal Injury</h3>
        <ul>
          <li><a href="${p}personal-injury/index.html">Overview</a></li>
          <li><a href="${p}personal-injury/car-accidents.html">Car accidents</a></li>
          <li><a href="${p}personal-injury/truck-accidents.html">Semi-truck accidents</a></li>
          <li><a href="${p}personal-injury/fela-railroad.html">FELA &amp; railroad</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3>Firm</h3>
        <ul>
          <li><a href="${p}about.html">About Flynn Law Firm</a></li>
          <li><a href="${p}attorneys.html">Attorneys &amp; team</a></li>
          <li><a href="${p}results.html">Results &amp; reviews</a></li>
          <li><a href="${p}faq.html">FAQ</a></li>
          <li><a href="${p}contact.html">Contact</a></li>
        </ul>

        <div class="footer__office">
          <strong>Tulsa</strong>
          <address>
            Spirit Bank Tower<br>
            1800 S Baltimore Ave, Suite 500<br>
            Tulsa, OK 74119
          </address>
        </div>
        <div class="footer__office">
          <strong>Claremore</strong>
          <address><span class="placeholder-note">Address to confirm</span></address>
        </div>
      </div>
    </div>

    <div class="footer__legal">
      <div class="footer__disclaimer">
        <p>
          <strong>Attorney advertising.</strong> The information on this website is for
          general informational purposes only and is not legal advice. Viewing this site,
          contacting the firm, or sending information through a form on this site does not
          create an attorney–client relationship. Prior results do not guarantee or predict
          a similar outcome in any other matter. Every case is different and depends on its
          own facts. Flynn Law Firm PLLC is licensed to practise in Oklahoma.
        </p>
      </div>
      <div class="footer__meta">
        <span>&copy; <span data-year>2026</span> Flynn Law Firm PLLC</span>
        <a href="${p}privacy.html">Privacy</a>
        <a href="${p}disclaimer.html">Disclaimer</a>
        <a href="${p}accessibility.html">Accessibility</a>
      </div>
    </div>
  </div>
</footer>

<nav class="action-bar" aria-label="Quick contact">
  <a class="action-bar__primary" href="${PHONE_HREF}">
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6.2 3.3 8 6.1 6.4 7.9c.7 1.6 2.1 3 3.7 3.7l1.8-1.6 2.8 1.8-.4 2.4c-.1.6-.7 1.1-1.4 1-5-.6-8.9-4.5-9.5-9.5-.1-.7.4-1.3 1-1.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    Call now
  </a>
  <a href="${SMS_HREF}">
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v7a1.5 1.5 0 0 1-1.5 1.5H8l-4 3v-3h-.5A1.5 1.5 0 0 1 3 12.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    Text us
  </a>
  <a href="${p}contact.html">
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 4h12v12H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 8h6M7 11h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    Free review
  </a>
</nav>

<script src="${p}assets/js/main.js" defer></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */

function pageHead(p, o) {
  const crumbs = (o.breadcrumb || [])
    .map((c, i, a) =>
      i === a.length - 1
        ? `<li aria-current="page">${c.name}</li>`
        : `<li><a href="${p}${c.href}">${c.name}</a></li>`
    )
    .join('\n      ');

  const actions = (o.actions || [])
    .map((a) => `<a class="${a.cls}" href="${a.href}">${a.label}</a>`)
    .join('\n      ');

  return `
<section class="page-head">
  <div class="container">
    <ol class="breadcrumb">
      ${crumbs}
    </ol>
    <p class="eyebrow mt-5">${o.eyebrow}</p>
    <h1>${o.h1}</h1>
    <p class="page-head__lead">${o.lead}</p>
    ${actions ? `<div class="cluster cluster--center mt-7">\n      ${actions}\n    </div>` : ''}
  </div>
  ${wave(o.waveTone)}
</section>
`;
}

function render(o) {
  const p = o.depth ? '../'.repeat(o.depth) : '';
  const html =
    head(p, o) +
    header(p, o.nav) +
    (o.pageHead ? pageHead(p, o.pageHead) : '') +
    o.body +
    (o.noCta ? '' : ctaBand(p)) +
    footer(p);
  // Substitute across the whole document, not just the body — page-head
  // action links use {{P}} too.
  return html.replace(/\{\{P\}\}/g, p);
}

module.exports = { render, ARROW, PHONE_DISPLAY, PHONE_HREF, SITE };
