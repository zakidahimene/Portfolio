# Zaki Dahimene — Portfolio

Astro static site. Navy, editorial grid design.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321/portfolio/
npm run build      # outputs static site to dist/
```

## Editing content

- **Projects** (text, stats, captions, video segments): `src/data/projects.ts`
- **Home page** (about, experience, skills, contact): `src/pages/index.astro`
- **Images**: `public/media/<project>/` (`*-sm.webp` = thumbnails). The order is set in `src/data/media.json`.
- **Colours / fonts**: `src/styles/global.css` (`:root` tokens)

### Videos
Videos play muted and loop only the time ranges in `video.segments`
(`[[start, end], ...]` in seconds) in `projects.ts`. They pause when off-screen
and show controls instead of autoplaying when the viewer prefers reduced motion.

## Deploy
Hosted on GitHub Pages at https://zakidahimene.github.io/portfolio/.
Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).

Link to pages and files with the `u()` helper (`src/lib/url.ts`) so paths include the `/portfolio` base.
If you move to a custom domain, remove `base` from `astro.config.mjs` and update `site`.
