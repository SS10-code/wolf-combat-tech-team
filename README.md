# Wolf Combat Tech Team — Website

A single-page site for Wolf Combat Tech Team, a student-built combat robotics
team competing in Texas Robot Combat. Plain HTML/CSS/JS — no build step,
deploys to Vercel as a static site.

## Files

```
data.js        ← ALL site copy lives here. Edit this to change anything.
index.html     structural skeleton (empty containers, rendered by script.js)
styles.css     design system (colors, type, layout, components, animation)
script.js      renders the page from data.js, wires up all interactivity
vercel.json    static deployment config
```

## Editing content

Everything you'd want to change — headlines, descriptions, the two weight
classes, process steps, mission copy, contact email, social link — lives in
**`data.js`** as one plain JS object (`SITE_DATA`). `index.html` itself has
no copy in it; `script.js` reads `data.js` on page load and builds the DOM.

To change something, open `data.js`, edit the relevant string, save, reload.
No HTML hunting required.

> One exception: the `<title>` and meta description tags in the `<head>` of
> `index.html` are duplicated as plain static text, so search engines and
> link-preview bots that don't run JavaScript still see correct text. If you
> change `meta.title` / `meta.description` in `data.js`, update those two
> tags in `index.html` to match.

### Things you'll likely want to edit first
- `join.email` — replace `wolfcombat@yourschool.edu` with your real address.
- `join.social.href` — currently `"#"`; point it at Instagram/YouTube/build blog.
- Add your school's name anywhere you'd like (hero subtitle, footer, etc).

## Animation & interaction features

- **Scroll-progress gauge** — thin accent bar fixed to the top of the page
  that fills left-to-right as you scroll, like a fuel gauge.
- **Staggered hero load-in** — eyebrow, headline, subtext, buttons, and the
  spec line animate in sequence on first paint.
- **Scroll-triggered reveals** — sections fade up into view as you scroll;
  grouped items (cards, fighters, pipeline steps, badges) stagger in one
  after another rather than all at once.
- **Scroll-spy navigation** — the nav link for whichever section you're
  viewing highlights automatically.
- **Mechanical tilt on cards** — the "spec plate" and "fighter" cards tilt
  slightly toward your cursor on hover, like a bolted metal plate catching
  the light.
- **Hazard-stripe motion** — the diagonal hazard stripes above/below the
  hero and join sections scroll continuously at a slow, steady pace.

All motion respects `prefers-reduced-motion` and is disabled automatically
for users who have that system setting on. The cursor-tilt effect is also
skipped on touch-only devices.

## Run it locally

No build tools required. Either:

- Open `index.html` directly in a browser, or
- Serve it locally so relative paths behave the same as production:
  ```bash
  npx serve .
  ```

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel
```
Follow the prompts (any framework preset — choose "Other"). That's it.

**Option B — Git + Vercel dashboard**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New Project** → import the repo.
3. Framework preset: **Other**. Build command: none. Output directory: `.`
4. Deploy.

## Before you launch — checklist

- [ ] Replace the contact email in `data.js` (`join.email`)
- [ ] Replace the social/build-log link in `data.js` (`join.social.href`)
- [ ] Add your school's name if you want it on the page
- [ ] (Optional) Add an `og-image.png` (1200×630) and link it in `index.html`
      `<head>` for a custom social preview card
- [ ] (Optional) Swap the inline SVG "W" favicon/logo mark for your own

## Design notes

The visual language borrows from combat-robotics culture itself: hazard
striping, riveted "spec plate" cards, and tale-of-the-tape stat blocks for
each weight class. Colors and type live in `:root` at the top of
`styles.css` if you want to retheme.
