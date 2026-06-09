# Wedding Website v2

Modern, config-driven wedding website built with Next.js 16, TypeScript, and Tailwind CSS v4.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Fonts | next/font (Great Vibes + Montserrat) |
| Deployment | Vercel |

## Getting Started

```bash
# Requires Node.js >= 22
node --version

# Install dependencies
npm install

# Run dev server (Turbopack)
npm run dev

# Type-check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page (composes all sections)
│   ├── not-found.tsx       # Custom 404
│   └── api/rsvp/route.ts  # RSVP POST endpoint
├── components/             # React components (one per section)
│   ├── hero.tsx
│   ├── navigation.tsx
│   ├── countdown.tsx
│   ├── event-details.tsx
│   ├── seating-search.tsx
│   ├── menu-section.tsx
│   ├── photo-booth.tsx
│   ├── rsvp-form.tsx
│   └── footer.tsx
├── content/                # All site data (edit these to customise)
│   ├── site.ts             # Couple names, event, theme, links
│   ├── seating.ts          # Seating chart (table → guest names)
│   └── menu.ts             # Menu courses
└── lib/                    # Pure utility functions
    ├── seating-search.ts   # Search/filter logic
    ├── countdown.ts        # Date math
    └── rsvp-validation.ts  # Shared form validation
```

## Customisation

All content lives in `src/content/`. To use for a different wedding:

1. **`site.ts`** — Update couple names, event date/venue, theme colours, links
2. **`seating.ts`** — Replace with your seating chart data
3. **`menu.ts`** — Update menu courses
4. **`public/images/hero.jpg`** — Replace with your hero background image

No code changes required.

## RSVP Storage

The `/api/rsvp` route currently logs submissions to stdout (visible in Vercel function logs).
To persist data, integrate one of:

- **Vercel KV** (recommended — free tier)
- **Vercel Postgres**
- **Google Sheets API**

## Deployment

Push to GitHub and connect to [Vercel](https://vercel.com). Zero config required.

## Legacy Site

The original PHP/jQuery site is preserved in the `v1/` directory for reference.
