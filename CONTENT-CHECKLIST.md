# Flynn Law Firm — pre-launch content checklist

**Nothing on this site was invented.** Every figure, quote, credential, photo and
statutory specific that could not be verified from public sources is marked in the
markup as a placeholder and rendered with a red dashed outline so it is impossible
to ship by accident.

**Launch gate:** `node _dev/check.js` must report zero errors, and the placeholder
count must be zero — or every remaining item must be explicitly signed off.

```bash
node _dev/check.js     # links, JSON-LD, headings, placeholder inventory
node _dev/build.js     # regenerate all pages after editing _dev/parts/*
```

Current inventory: **119 placeholder markers across 20 pages.**

---

## 1. Blocking — must be resolved or deleted before launch

### Case results — `results.html` (50 markers)
Six result entries are entirely `[[bracketed]]` dummy content.

- [ ] Supply real verdicts/settlements, or **delete the entries you cannot substantiate**
- [ ] Confirm each is cleared for confidentiality (check settlement agreements for non-disclosure terms)
- [ ] Strip all client-identifying detail
- [ ] Keep the existing disclaimer language beneath the list

> Greg Denney Law currently ships `0+ Satisfied Customers` and `0mil+ Compensation` on
> its live homepage. An empty or broken results section does more damage than no
> results section — delete rather than fake.

### Attorney biographies — `attorneys.html` (17 markers)
- [ ] Michael D. Flynn — bar admission year and jurisdictions, education, full bio, headshot
- [ ] Pamla K. Cornett — same
- [ ] **Robert Flynn (1950–2025)** — confirm the full legal name. Public sources show
      both "Robert A. Flynn" and "Robert F." Have the memorial wording approved by the family.
- [ ] Staff (Alejandra G., Maria M., Martha P., Melanie O.) — confirm surnames, exact
      titles, and that each has consented to being listed
- [ ] Confirm which staff are bilingual before labelling them

### Homepage proof strip — `index.html`
- [ ] `[[NUMBER]]` workers' compensation claims handled — supply a verifiable figure or delete the tile
- [ ] `[[X.X]]★` average rating — connect to real Google reviews or delete the tile
- [ ] Three placeholder testimonials — replace with permissioned client reviews or delete the section

### Office addresses — sitewide footer, `contact.html`
- [ ] **Resolve the Claremore vs. Grove inconsistency.** The current flynnlaw.net says
      "offices in Tulsa and Claremore" on one page and "Tulsa and Grove" on another.
      Supply the correct second office, suite, and hours.
- [ ] Confirm office hours (currently drafted as Mon–Fri 8:30–5:00)

### Legal pages — attorney review required
- [ ] `disclaimer.html` — confirm the wording satisfies current Oklahoma Bar advertising
      and solicitation rules; name the attorney responsible for site content
- [ ] `privacy.html` — confirm it matches actual data practices once the form endpoint,
      hosting and any analytics are chosen
- [ ] `accessibility.html` — fill in the known-limitations section after the audit; add
      an accessibility contact email and a response-time target

### Statutory specifics — attorney review required
The site states Oklahoma rules in general terms and hedges appropriately, but these
must be confirmed against current law before publication:

- [ ] `workers-compensation/injured-worker-guide.html` — the 30-day notice rule, the
      claim-filing limitation period, and the deadline to dispute a denial
- [ ] `workers-compensation/index.html` — TTD/TPD rate and statutory cap
- [ ] `workers-compensation/permanent-disability.html` — current TTD rate and cap
- [ ] The 60-second evaluator's verdict copy on the workers' comp hub

### Form delivery — not yet wired
The case-review form validates, expands progressively, and redirects to
`thank-you.html`, but **sends nothing**.

- [ ] Choose an endpoint (form service, or a mail handler on the host)
- [ ] Set `action` and `method` on both forms (`index.html`, `contact.html`)
- [ ] Add spam protection (honeypot field plus server-side check — avoid a CAPTCHA if
      possible; injured users on phones fail them)
- [ ] Configure the internal notification and the client confirmation email
- [ ] Remove the "developer note" block from `_dev/parts/thank-you.html` and rebuild
- [ ] Confirm the SMS-consent checkbox wording satisfies TCPA requirements

---

## 2. Recommended before launch

- [ ] **Photography.** The hero is currently a clean navy gradient with no image — safe,
      but a real photograph would lift it. Drop one into a `div.hero__bg` inside the hero
      section (see the comment in `_dev/parts/home.html`); the CSS already handles the
      overlay. The reference site pairs its dark bands with warm, human, in-context
      photography — office, team, real northeast Oklahoma. Rule from the design brief:
      no gavels, no scales, no stock handshakes, no courthouse columns.
- [ ] **Interior page imagery.** The reference uses a photo-beside-text block ("Your
      first visit, simplified"). The closest equivalent here is the process/steps
      section — worth adding a photo panel once photography exists.
- [ ] **Credential badges** (`results.html`) — add only credentials the firm currently
      holds. Each tile has a "what this actually means" line; fill it in. Check each
      awarding body's mark-usage rules. Delete tiles you cannot substantiate.
- [ ] **Google Business Profile** — connect reviews, confirm NAP consistency with the
      schema markup in each page's `<head>`.
- [ ] **Analytics** — none is installed. If you add any, update `privacy.html`.
- [ ] **OG image** — add a 1200×630 share image and reference it as `og:image`.
- [ ] **Domain** — all canonical URLs, the sitemap and the JSON-LD assume
      `https://flynnlaw.net`. Update if that changes.

---

## 3. Phase two (already structured for)

- [ ] **Spanish site at `/es/`.** The directory exists, the language toggle is in the
      top bar (currently marked "coming soon"), and `hreflang` tags are in place ready
      to be pointed at Spanish twins. This is the single largest uncontested
      opportunity in the Tulsa market — no competitor audited does Spanish properly.
- [ ] City landing pages (Claremore, Broken Arrow, Owasso, Bartlesville, Muskogee,
      Sapulpa) — the approach Hawkins Felton and Carr & Carr use to win local search
- [ ] Blog / insights section
- [ ] Live chat or text-us widget — 7 of the 9 competitors audited have neither

---

## 4. Post-launch verification

- [ ] Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO — test the
      homepage, the workers' comp hub, and one deep page
- [ ] Every page through Google's Rich Results Test — zero schema errors
- [ ] Full keyboard tab-through of nav, drawer, accordions, evaluator and forms
- [ ] axe DevTools clean
- [ ] Real-device check on iOS Safari and Android Chrome — particularly the sticky
      action bar and the nav drawer
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Set the host's 404 handler to serve `/404.html`
- [ ] Force HTTPS and add `www` → apex (or apex → `www`) redirects
- [ ] Set up 301 redirects from the old flynnlaw.net URLs:
      `/firm-overview/` → `/about.html`,
      `/attorney-profiles/` → `/attorneys.html`,
      `/practice-areas/` → `/workers-compensation/`,
      `/workers-compensation/` → `/workers-compensation/`,
      `/contact-us/` → `/contact.html`
