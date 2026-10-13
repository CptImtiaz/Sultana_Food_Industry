# U4 NUR Wedding Laddoo · Sultana Food Industry website

Static one-page site (HTML + CSS + a little JS). No build step is needed.

## Files

- `index.html`: page content
- `styles.css`: styling (brand colors are CSS variables at the top)
- `script.js`: scrolling promo bar and the enquiry form (sends to WhatsApp `WHATSAPP_NUMBER`)
- `images/`: product photos, cropped from the U4 NUR poster (`images/u4-nur-poster.jpg`)
- `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`: U4 logo icons
- `vercel.json`: Vercel settings

## Run locally

Open `index.html` in a browser, or run `npx serve .`

## Deploy on Vercel

1. Go to https://vercel.com/new and import this repository.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Click **Deploy**. Every push to `main` then redeploys automatically.

## Editing promos

The promo messages are in the `promo-bar` block at the top of `index.html`. Edit, add or remove the `<span>` items; the bar scrolls and loops automatically.

## Photos

Current photos are cropped from the promo poster, so they are fairly small. For sharper images, replace the files in `images/` with original photos using the same file names.
