# Victoria George — Portfolio Site

A one-page portfolio site for Victoria George, a marketing strategist and
content creator. Plain HTML/CSS/JS — no build step, no framework, no
dependencies beyond two Google Fonts.

## What's on the page

- **Hero** — name, tagline, and a short intro with two calls to action
  (watch the reel / start a project).
- **Video carousel** — the centerpiece. A swipeable, scroll-snap carousel of
  video content with prev/next arrows, dot indicators, and click-to-play
  video cards (starting one video automatically pauses any other that's
  playing).
- **Contact** — a styled contact form plus direct email/social links.

Earlier drafts of this project included a full multi-section portfolio
(services, case studies, testimonials, etc.) and a WordPress block-theme
version — both were scoped back out in favor of this lean, video-first
one-pager, per direction along the way.

## File structure

```
Victoria - Website/
├── index.html              The whole page — hero, carousel, contact
├── styles.css               All styling (palette, type, layout, animations)
├── script.js                 Nav, reveal-on-scroll, carousel, video playback, contact form demo
├── assets/
│   └── videos/
│       └── README.md         Video file naming, browser compatibility notes,
│                              and hosting/deployment guidance
└── README.md                 This file
```

## Running it locally

No build step — just serve the folder:

```bash
cd "Victoria - Website"
python3 -m http.server 8000
```

Then open `http://localhost:8000`. (Opening `index.html` directly by
double-clicking works too, but some browsers restrict video/file loading
under the `file://` protocol — a local server avoids that.)

## Adding your videos

The carousel currently points to six placeholder video files that don't
exist yet (`assets/videos/*.mov`) with Unsplash photos standing in as
posters. **See [assets/videos/README.md](assets/videos/README.md)** for:

- the exact filenames each carousel slide expects,
- how to swap in your own videos and titles,
- a browser-compatibility note on `.mov` playback and an `.mp4` fallback,
- and a full walkthrough of deploying the site and hosting the videos
  (static hosting options, plus a comparison of Vimeo / YouTube / Cloudflare
  Stream / Bunny Stream for the video files themselves).

## Customizing

- **Colors & fonts** — CSS custom properties at the top of `styles.css`
  (`--ink`, `--accent`, `--cream`, etc.) and the two Google Fonts linked in
  `index.html` (Fraunces for headings, Inter for body text). The palette
  also has a dark-mode variant that follows the visitor's OS setting.
- **Copy** — edit directly in `index.html`; there's no CMS or templating
  layer.
- **Contact form** — currently front-end only (`script.js` shows a
  confirmation message on submit but doesn't send anything). Wire it up to
  a form service like Formspree or Netlify Forms, or your own backend,
  before relying on it for real inquiries.

## Known limitations

- Contact form doesn't actually send email yet (see above).
- Video poster images and the six sample titles/brands are placeholders —
  swap them for real work before sharing the link.
- `.mov` playback isn't guaranteed in every browser depending on codec —
  see the compatibility note linked above.
