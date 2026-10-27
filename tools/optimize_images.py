"""Make WebP copies of the site photos in several widths.

Run after adding or replacing a photo in images/:

    pip install pillow
    python3 tools/optimize_images.py

For every images/<name>.jpg it writes images/<name>-<width>.webp for each
width in WIDTHS that is smaller than the photo, plus one at the photo's own
width. index.html points at these files through srcset; the .jpg originals
stay for social previews and the structured data.
"""

from pathlib import Path

from PIL import Image

WIDTHS = (480, 800, 1200)
QUALITY = 78
IMAGES = Path(__file__).resolve().parent.parent / "images"
SKIP = {"thank-you-pattern.jpg"}  # not used on the page


def variants(width: int) -> list[int]:
    return sorted({w for w in WIDTHS if w < width} | {min(width, max(WIDTHS))})


def main() -> None:
    for jpg in sorted(IMAGES.glob("*.jpg")):
        if jpg.name in SKIP:
            continue
        with Image.open(jpg) as im:
            im = im.convert("RGB")
            for w in variants(im.width):
                out = jpg.with_name(f"{jpg.stem}-{w}.webp")
                h = round(im.height * w / im.width)
                im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
                print(f"{out.name}: {w}x{h}, {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
