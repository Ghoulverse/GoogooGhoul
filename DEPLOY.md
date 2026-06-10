# GOO GOO — Deployment Guide

**Domain:** `https://www.googooghoul.com`  
**Description:** Baby & nursery care products

---

## Build

```bash
npm install
npm run build
```

Output: `dist/` (Vite static build)

## Deploy

### Cloudflare Pages (Recommended)

```bash
npx wrangler pages deploy dist --project-name=googooghoul-com --branch=main
```

### GitHub Actions

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml`.

### DNS

- `www.googooghoul.com` → CNAME → `googooghoul-com.pages.dev`
- `googooghoul.com` → CNAME → `googooghoul-com.pages.dev`

Managed in Cloudflare DNS.

---

*Part of the GHOULVERSE ecosystem. See root `DEPLOY.md` for ecosystem-wide deployment.*
