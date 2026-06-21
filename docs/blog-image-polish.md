# Blog Image Polish Workflow

Use this script to turn a raw AI-generated blog image into a website-ready asset for RupeeKit blog hero images, thumbnails, inline images, and Open Graph images.

## Where to place raw images

Put source files in:

`public/blog/raw/`

Keep the raw files separate from the polished outputs so review stays simple and reversible.

## Command

```bash
node scripts/polish-blog-image.mjs \
  --input public/blog/raw/how-much-emergency-fund-gpt.png \
  --slug how-much-emergency-fund \
  --title "How Much Emergency Fund Do You Need?" \
  --category "Emergency Fund Guide" \
  --alt "Illustration of an Indian household planning emergency fund savings with calculator and expense chart." \
  --style editorial
```

The script writes optimized assets to:

`public/blog/images/<slug>/`

## Output files

- `hero.webp` — 1600x900
- `og.png` — 1200x630
- `thumbnail.webp` — 800x450
- `inline.webp` — 1200x675
- `manifest.json` — file metadata and output inventory

## Recommended RupeeKit style

- Use a clean editorial illustration or AI background, not a promotional ad layout.
- Keep the raw image as background only.
- Let the script add all readable text, the category label, footer text, and RupeeKit branding.
- Prefer calm, finance-neutral scenes such as calculators, desks, charts, documents, households, or planning layouts.
- Keep the visual balanced and readable at mobile thumbnail size.

## What not to include

- Fake testimonials
- Fake official screenshots
- Fake Income Tax, RBI, bank, or government logos
- Fake documents or forms
- Fake ratings or review stars
- Fake financial claims or guaranteed outcomes
- Readable AI-generated text inside the raw image

## Alt text

Always write descriptive alt text for the final image set. Treat alt text as part of the publishing workflow, not an optional field.

## Review step

Every output must be manually reviewed before publication. Check:

- crop quality
- title readability
- logo placement
- safe margins on mobile and desktop
- whether the image feels editorial rather than promotional
- whether the image matches the article topic without making unsupported claims

## Notes

- The script validates input readability and output dimensions.
- Generated assets are for the website only; do not add image asset URLs to `sitemap.xml`.
- Keep image metadata changes separate from canonical, robots, and schema logic.
