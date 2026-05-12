# India Utility Tools Site

A Next.js starter for an India-focused salary, tax and finance calculator website.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run validate:tools
npm run dev
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SITE_NAME="Your Brand Name"
NEXT_PUBLIC_SITE_URL="https://your-domain.in"
```

## Data-driven calculators

Calculator pages are generated from:

```text
data/tools.json
```

Each tool has:

- inputs
- output formulas
- FAQ
- example calculation
- meta description
- related tool slugs

The n8n workflow updates this file through GitHub's Contents API.

## Production

Push this folder to GitHub and connect the repo to Vercel. Vercel will auto-deploy when n8n commits to `data/tools.json`.
