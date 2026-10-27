# Sultana Food Industry website

Static one-page site (HTML + CSS + a little JS). No build step is needed.

## Files

- `index.html`: page content
- `styles.css`: styling (brand colors are CSS variables at the top)
- `script.js`: scrolling promo bar, WhatsApp settings and the enquiry form
- `images/`: product photos (`.jpg` originals and `.webp` sizes made by `tools/optimize_images.py`), event photos and promotion posters (`promo-*.jpg`, shown full size in the Promotions section)
- `favicon.svg`, `favicon.ico`, `favicon-32x32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `site.webmanifest`: the "S" logo icons (Google uses the 48px+ ones for the icon in search results)
- `vercel.json`: Vercel settings, security headers and caching
- `fonts/`: self-hosted web fonts
- `tools/optimize_images.py`: makes the WebP photo sizes
- `robots.txt`, `sitemap.xml`, `llms.txt`: search engine and AI files

## Run locally

Open `index.html` in a browser, or run `npx serve .`

## Deploy on Vercel

1. Go to https://vercel.com/new and import this repository.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Click **Deploy**. Every push to `main` then redeploys automatically.

## Editing promos

The promo messages are in the `promo-bar` block at the top of `index.html`. Edit, add or remove the `<span>` items; the bar scrolls and loops automatically.

## Photos

The page loads WebP copies of each photo in several sizes (`images/<name>-<width>.webp`), so phones download smaller files. The `.jpg` originals stay for social previews and the structured data.

To use sharper photos, replace the files in `images/` with originals using the same file names, then regenerate the WebP copies:

```bash
pip install pillow
python3 tools/optimize_images.py
```

If an image's width changes, update the `srcset` and `width`/`height` in `index.html` to match the new files.

## Fonts

Outfit, Yeseva One and Great Vibes are served from `fonts/` instead of Google Fonts, so the page doesn't wait on another site (SIL Open Font License, see `fonts/LICENSE-*.txt`).

## Setting the WhatsApp number

Open `script.js` and fill in the two lines at the top:

```js
const WHATSAPP_NUMBER = '60123456789';   // country code + number, digits only
const WHATSAPP_DISPLAY = '012-345 6789'; // how it appears on the page
```

Every order button, the enquiry form and the floating chat button then open WhatsApp with a pre-filled message. Until it is set, those buttons scroll to the contact form.

The number is also written into `index.html` (the WhatsApp links, the contact and footer text and the structured data in `<head>`) and `llms.txt`, so search engines and AI tools can read it without running JavaScript. When the number changes, search for `60168009417` and `016-800 9417` and update those too.

## SEO and security files

- `robots.txt` and `sitemap.xml`: let search engines find the site. Submit `https://sultanafood.com/sitemap.xml` in Google Search Console.
- `llms.txt`: a plain-text summary of the business for AI assistants.
- Structured data (JSON-LD) in `<head>`: business details, so Google can show them in results.
- `vercel.json`: security headers, including a Content-Security-Policy. The inline script in `<head>` is allowed by its SHA-256 hash; if you edit that line, update the hash in the policy (or the script stops running). Adding scripts or styles from another site also needs a policy change.
