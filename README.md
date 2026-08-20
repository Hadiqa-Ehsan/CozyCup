# Jalal Sons — Full-Stack E-Commerce Clone

Stack: **Next.js 15 (App Router) + TypeScript · Prisma + PostgreSQL · Auth.js v5 · Zod · React Hook Form · Zustand · shadcn/ui**

An unofficial, functional clone of jalalsons.com.pk's public storefront and ordering flow, built as
a portfolio/learning project. Not affiliated with the real Jalal Sons.

## 1. Install dependencies
```bash
npm install
```
`postinstall` automatically runs `prisma generate`.

## 2. Set up your free PostgreSQL database
- **Neon** — https://neon.tech (free tier)
- **Supabase** — https://supabase.com (free tier)

## 3. Configure environment
```bash
cp .env.example .env
```
Fill in `DATABASE_URL` and generate `AUTH_SECRET` with `npx auth secret`.

## 4. Build the database and load sample data
```bash
npm run db:push
npm run db:seed
```

## 5. Run it
```bash
npm run dev
```
Visit http://localhost:3000

## Pages / routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, category grid, deals, featured products |
| `/shop` | All products, sidebar category/subcategory filter |
| `/shop/[slug]` | Category or subcategory listing |
| `/product/[slug]` | Product detail + add to cart |
| `/search?q=` | Search results |
| `/deals` | Discounted products |
| `/cart` | Cart with quantity edit/remove |
| `/branches` | Select branch + Delivery/Pickup |
| `/checkout` | Checkout form (requires login + branch selected) |
| `/order-confirmation/[orderId]` | Order confirmation |
| `/login`, `/signup` | Auth (credentials, JWT session) |
| `/account` | Order history |
| `/contact` | Contact form (UI only — TBD backend) |
| `/privacy-policy`, `/terms` | Sample legal pages |

## What's real vs. sample data

- **Category names** — real, taken from Jalal Sons' live category listing (Beverages, Frozen
  Foods, Bakery, etc.).
- **Products & prices** — a representative sample set (~45 products). A handful of prices (K&N
  items, Olper's/Prema milk, JS Rusk) are pulled from a verified real listing; the rest are
  realistic estimates. The full live catalog (1000s of SKUs) is not reproduced.
- **Branches** — SAMPLE/placeholder only. The real branch list is loaded dynamically by the live
  site in a way this project couldn't scrape. Clearly marked TBD in the seed file and UI.
- **Payment** — Cash on Delivery only, matching the real site's "online payments not supported for
  grocery purchases" behavior. No payment gateway is integrated.
- **Contact form** — UI only; doesn't send anywhere yet (marked TBD in the page itself).

## Architecture notes

- `/lib/services` — pure business-logic functions; Route Handlers stay thin and just call these.
- Cart and branch/fulfillment selection persist client-side via **Zustand + localStorage**.
- Auth sessions last 30 days for normal shoppers (the original tech-stack doc's 15-minute JWT
  suggestion was written for **admin** account security — that's noted in `src/lib/auth.ts` in case
  an admin panel gets built later).
- Money stored as integer paisa/cents (`priceCents`) — never floats.

## Deploying (still free)
Push to GitHub → import on vercel.com (free Hobby tier) → add the same `.env` variables in
Vercel's project settings.
