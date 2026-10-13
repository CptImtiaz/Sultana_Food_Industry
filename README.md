# Sultana Food Industry website

Static one-page site (HTML + CSS + a little JS). No build step is needed.

## Files

- `index.html`: page content
- `styles.css`: styling (brand colors are CSS variables at the top)
- `script.js`: scrolling promo bar, WhatsApp settings and the enquiry form
- `images/`: product photos, event photos and promotion posters (`promo-*.jpg`, shown full size in the Promotions section)
- `favicon.svg`, `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`: the "S" logo icons
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

To use sharper photos, replace the files in `images/` with originals using the same file names.

## Setting the WhatsApp number

Open `script.js` and fill in the two lines at the top:

```js
const WHATSAPP_NUMBER = '60123456789';   // country code + number, digits only
const WHATSAPP_DISPLAY = '012-345 6789'; // how it appears on the page
```

Every order button, the enquiry form and the floating chat button then open WhatsApp with a pre-filled message. Until it is set, those buttons scroll to the contact form.
