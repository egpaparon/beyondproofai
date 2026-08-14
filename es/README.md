# /es/ — Spanish site (phase two)

Reserved. Nothing is served from here yet.

The English site is already prepared for it:

- The language toggle exists in the top bar of every page, currently rendered as a
  dimmed `ES` with `data-soon` (see `.lang` in `assets/css/main.css`).
- Every page carries `hreflang="en"` and `hreflang="x-default"` tags, ready for an
  `hreflang="es"` sibling to be added alongside them.
- The generator handles depth automatically — a page at `es/workers-compensation/`
  resolves its asset paths correctly with `depth: 2`.

## To build it

1. Add Spanish page bodies to `_dev/parts/es-*.html`
2. Add entries to `_dev/pages.js` with `slug: 'es/...'`, the correct `depth`, and
   Spanish `title` / `description`
3. Add a Spanish variant of `header()` / `footer()` in `_dev/shell.js`, or parameterise
   the existing one by locale
4. Add `hreflang` pairs in both directions
5. Set `<html lang="es">` on the Spanish pages

## Why this matters

Of the nine Oklahoma competitors audited, only Carr & Carr offers Spanish at all, and
only as a thin link. Flynn Law Firm already advertises more bilingual legal assistants
than any firm in Tulsa — this is the largest uncontested opportunity in the market,
and the reason the site was structured for it from the start.
