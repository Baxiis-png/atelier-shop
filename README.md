# APE LAB — Streetwear Research & Curation

A responsive Next.js + Tailwind storefront built around the original `ProductCard` component. Front-end only — no backend, no API routes. Cart state lives in React context with `localStorage` persistence.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> On Windows, if `node` isn't on your PATH, prefix the command:
> `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm run dev`

Don't run `npm run build` while `npm run dev` is running — both write to `.next` and the dev server will throw a webpack runtime error. Stop dev first, or delete `.next` and restart.

## Design system

| Token | Hex | Usage |
| --- | --- | --- |
| `carbon` | `#111111` | Header, footer, dark sections |
| `cream` | `#F4F4F0` | Page background, light sections |
| `cocoa` | `#4A2E1B` | Detail Study panel |
| `rust` | `#D9601A` | Accents, active nav, hover states |
| `flame` | `#EE8236` | Accent on cocoa (contrast-safe) |
| `bone` / `paper` / `ink` / `amber` | — | Original `ProductCard` tokens |

**Fonts:** `font-display` (Arial Black / Helvetica heavy) for brutalist headings, `font-sans` (Inter) for body, `font-mono-lab` for lab/research labels.

**Utilities** in `globals.css`: `.heading-brutal` (uppercase, tight tracking, 0.88 leading), `.label-lab` (10px mono, 0.28em tracking), `.tech-grid` (blueprint grid on dark sections).

## Home page sections

| # | Section | Theme |
| --- | --- | --- |
| 1 | Header — top bar + two nav rows, sticky | Dark |
| 2 | `INDEX 01` Departments — 4-up card grid | Cream |
| 3 | `SPECIMEN 001` Current Intake — hero + specimen plates | Dark + grid |
| 4 | `INDEX 02` The Catalogue — `ProductCard` grid | Cream |
| 5 | Detail Study — macro hem label + 2×2 check grid | Split / cocoa |
| 6 | `INDEX 03` Visit The Lab — storefront + info grid | Cream |
| 7 | Footer — link columns | Dark |

Responsive: 2-col grids on mobile, 4-col from `lg`. Nav collapses to a hamburger drawer below `lg`.

## Other routes

- `/products/[handle]` — gallery thumbnails, size picker, add to bag, related items
- `/cart` — quantity controls, subtotal, empty state

## Project structure

```
src/
  app/
    page.tsx                    home page composition
    layout.tsx                  header + footer shell
    globals.css                 tokens and utilities
    cart/page.tsx
    products/[handle]/page.tsx
  components/
    ProductCard.tsx             original component, unmodified
    ProductGrid.tsx
    ProductDetail.tsx
    SiteHeader.tsx  SiteFooter.tsx  LabMark.tsx
    home/
      DepartmentsSection.tsx
      CurrentIntakeSection.tsx
      CatalogueSection.tsx
      DetailStudySection.tsx
      VisitLabSection.tsx
  context/cart-context.tsx
  lib/products.ts               catalogue data
  lib/utils.ts                  cn(), discountPercent()
public/
  logo.png  storefront.png  products/*.png
```

## Customize

- **Catalogue:** `src/lib/products.ts`
- **Colors / fonts:** `tailwind.config.ts`
- **Nav links:** `primaryNav` / `secondaryNav` in `src/components/SiteHeader.tsx`
- **Store details:** `info` array in `src/components/home/VisitLabSection.tsx`

Department cards 02–04 use Unsplash placeholders; swap the `image` values in `DepartmentsSection.tsx` when you photograph those categories.
