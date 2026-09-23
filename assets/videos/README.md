# Video files go here

The carousel on the homepage (`index.html`) expects these six files in this
folder. Drop your `.mov` exports in with these exact names and they'll show
up automatically — no code changes needed:

- `aurea-beauty-launch.mov`
- `fernweh-travel-series.mov`
- `northlane-product-reel.mov`
- `basecamp-goods-social.mov`
- `loom-co-rebrand.mov`
- `sable-studio-editorial.mov`

Until you add real files, the video players will show the poster
(thumbnail) image but fail to play — that's expected.

## Naming your own videos

Have different videos than the six placeholders above? Open `index.html`,
find the `<video>` block for the slide you want to change, and edit the
`src` path in its `<source>` tag(s) to match your filename — the `<h3>` /
`<p>` text right below it is the title and description for that slide, edit
those too.

## Browser compatibility note

`.mov` plays natively in Safari, and works in Chrome/Edge/Firefox **as long
as the video is encoded with H.264/AAC** (the default for iPhone recordings
and most video editors' exports). If a video fails to play in a
non-Safari browser:

1. Check the codec (QuickTime Player → `Window > Show Movie Inspector` on
   Mac tells you the format).
2. If it's not H.264, export/convert an `.mp4` version with the *same
   filename* (e.g. `aurea-beauty-launch.mp4`) and drop it in this folder
   alongside the `.mov`. Each `<video>` tag already has an `.mp4` fallback
   `<source>` wired up — the browser will automatically use whichever file
   it supports.

A free way to convert: [Handbrake](https://handbrake.fr) (Mac/Win/Linux,
free) — pick the "Fast 1080p30" preset, which outputs H.264 `.mp4`.

## Poster images

Each `<video>` currently uses a placeholder Unsplash photo as its poster
(thumbnail shown before play). Replace the `poster="..."` URL on each
`<video>` tag in `index.html` with a real frame grab from your video for a
more accurate preview.

## Deploying the site & hosting the videos

These are two separate decisions.

### 1. Hosting the site itself

The site is plain HTML/CSS/JS with no build step, so any static host works.
Free, simple options:

- **[Netlify](https://netlify.com)** or **[Vercel](https://vercel.com)** —
  drag-and-drop the `Victoria - Website` folder in their dashboard, or
  connect a Git repo for auto-deploys on every push.
- **[Cloudflare Pages](https://pages.cloudflare.com)** — same idea, and
  pairs naturally with Cloudflare Stream if you go that route for video (see
  below).
- **GitHub Pages** — free if the repo is public (or you're on a paid GitHub
  plan for a private one).

### 2. Hosting the videos — don't put large files on the static host

Raw `.mov`/`.mp4` exports are often 50–500MB+ each. Static hosts either cap
individual file size, throttle bandwidth once real traffic hits, or get
expensive fast serving video directly. Use a dedicated video host instead
and point the carousel at that. Roughly easiest → most control:

| Option | Cost | Look & feel | Notes |
|---|---|---|---|
| **Vimeo** | Free tier, paid to remove branding | Clean, portfolio-appropriate player | Easiest swap-in |
| **YouTube (unlisted)** | Free, unlimited | YouTube player chrome, can suggest other videos | No cost at any scale |
| **Cloudflare Stream / Bunny Stream** | Pay per minute stored + GB served (cheap) | Fully custom — keeps the native look this template already has | Closest to a drop-in replacement for the current `<video>` tags |

**Swapping to Vimeo or YouTube** — replace a slide's `<video>` block with an
iframe embed, e.g.:

```html
<div class="reel__video-wrap">
  <iframe class="reel__video" src="https://player.vimeo.com/video/VIDEO_ID"
    style="width:100%;height:100%;border:0" allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen></iframe>
</div>
```

(Drop the `.reel__play` button for that slide — the platform's own player
already has a play button.)

**Swapping to Cloudflare Stream / Bunny Stream** — upload the file there,
then just change the `<source src="...">` in the existing `<video>` tag to
the hosted MP4/HLS URL they give you. No other markup changes needed — the
click-to-play, pause-others, and poster-image behavior in `script.js`
already work with any `<video>` element.
