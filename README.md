# Flynn Law Firm PLLC — website

Static site. No framework, no runtime dependencies, no build step required to serve it.
Upload the repository root to any host and it works.

**Read [`CONTENT-CHECKLIST.md`](CONTENT-CHECKLIST.md) before launching.** The site
contains 119 clearly-marked placeholders that must be resolved or deleted first.

---

## Run it locally

```bash
python -m http.server 8765
# → http://localhost:8765
```

## Structure

```
index.html                    Homepage
workers-compensation/         Hub + 4 deep pages (the flagship cluster)
personal-injury/              Hub + 3 deep pages
about · attorneys · results · faq · contact
thank-you · 404 · privacy · disclaimer · accessibility
robots.txt · sitemap.xml

assets/css/main.css           Design tokens + all styles (~1,400 lines)
assets/js/main.js             Nav, accordions, reveal, forms, evaluator (~330 lines)
assets/fonts/                 Self-hosted variable woff2 — 115 KB total, no CDN call
assets/img/                   Favicon + hero artwork

es/                           Reserved for the Spanish site (phase two)

_dev/                         Authoring tools — NOT part of the published site
```

## Editing content

Pages are **generated** so the header, footer and `<head>` stay identical across all
20 of them. Edit the body content in `_dev/parts/<name>.html`, then:

```bash
node _dev/build.js     # regenerate every page
node _dev/check.js     # verify links, JSON-LD, headings; count placeholders
```

Page metadata (title, description, schema, page header) lives in `_dev/pages.js`.
The shared chrome lives in `_dev/shell.js`. Inside a part file, `{{P}}` is replaced
with the correct relative path prefix for that page's depth.

`_dev/` can be deleted at any time — the site keeps working. You would just be back
to maintaining the header in 20 places by hand.

## Design system

**"Quiet Authority"** — deliberately not the navy-and-red personal-injury template
that all nine audited Oklahoma competitors use.

| | |
|---|---|
| Ink | `#12161C` |
| Paper | `#F7F5F1` |
| Brass | `#B07A3C` (`#8A5A22` for small text on paper, `#D6A566` on ink) |
| Urgent | `#A32A26` — reserved for genuine deadline warnings only |
| Display | Fraunces (variable, `WONK 0 / SOFT 0`) |
| Body | Inter (variable) |

All colours, spacing, type sizes, radii and motion are CSS custom properties at the
top of `main.css`. Light and dark palettes are both defined; dark responds to the OS
setting and to `data-theme="dark"` on `<html>`.

## Notable behaviour

- **Two-door hero.** "I was hurt at work" / "I was hurt in a wreck" routes intent in
  one click. No competitor in the market does this.
- **60-second evaluator** (`workers-compensation/`). A three-question branching tool
  that returns the user's real next step. Keyboard accessible, announces each step to
  screen readers, no data leaves the page.
- **Progressive form.** Three fields to start; the rest reveal on first interaction.
  Inline validation, focus management, and it will not silently swallow a submission.
- **Sticky mobile action bar** — call / text / free review, appears after 420px of scroll.
- **Works without JavaScript.** Content is never hidden behind a script. A `.js` class
  set inline in `<head>` gates the reveal animation, and a 3-second failsafe strips it
  if `main.js` fails to boot.
- **`prefers-reduced-motion`** fully respected.

## Accessibility

Built to WCAG 2.2 AA: semantic landmarks, skip link, one `<h1>` per page (enforced by
`check.js`), labelled form fields, visible focus rings, keyboard-operable drawer with
a focus trap and its own close control, and 4.5:1 minimum text contrast in both themes.

## Performance

No framework, no CDN requests, no third-party scripts, no web fonts fetched over the
network. Fonts are preloaded and self-hosted. Target: LCP under 1.5s, page weight
under 400 KB.
