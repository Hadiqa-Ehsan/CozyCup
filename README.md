# Jalal Sons — Full-Stack E-Commerce Clone

Stack: **Next.js 15 (App Router) + TypeScript · Prisma + PostgreSQL · Auth.js v5 · Zod · React Hook Form · Zustand · shadcn/ui · Stripe**

This matches the tech stack recommendation doc exactly, pinned to **Next.js 15** (not 16) because
the caching plan (`revalidateTag`, ISR) was evaluated against Next 15's API.

## 1. Install dependencies

```bash
npm install
```

`postinstall` automatically runs `prisma generate` for you.

## 2. Set up your free PostgreSQL database

Pick **one**:

- **Neon** — https://neon.tech → free tier, create a project, copy the pooled connection string
- **Supabase** — https://supabase.com → free tier, create a project → Settings → Database → connection string

## 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in:
- `DATABASE_URL` — from step 2
- `AUTH_SECRET` — generate with `npx auth secret`
- `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` — test keys from https://dashboard.stripe.com/test/apikeys
- `NEXT_PUBLIC_APP_URL` — the public app URL, or `http://localhost:3000` locally

## 4. Push the schema and seed sample data

```bash
npm run db:push     # creates tables from prisma/schema.prisma
npm run db:seed     # adds sample categories/products
```

Use `npm run db:migrate` instead of `db:push` once you want tracked migration history (recommended
before you consider the schema "stable").

## 5. Run the dev server

```bash
npm run dev
```

Visit http://localhost:3000 — you should see the seeded products. Visit `/login` for the
Auth.js credentials sign-in form (you'll need to create a user with a hashed password first —
see `src/lib/auth.ts` for the `bcrypt.compare` flow it expects).

Authenticated clients can `POST /api/checkout` to create a Stripe Checkout session. Configure
Stripe to send `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
`checkout.session.expired`, and `checkout.session.async_payment_failed` events to
`/api/stripe/webhook`.

## 6. Explore Prisma Studio (free visual DB editor)

```bash
npm run db:studio
```

## Project structure

```
src/
  app/                    Routes (App Router)
    api/
      auth/[...nextauth]/ Auth.js route handler
      products/           Example REST-style Route Handler
    login/                React Hook Form + Zod login page
    page.tsx              Homepage — Server Component, fetches via Prisma directly
  components/ui/          shadcn/ui primitives (Button, Input, Label, Card)
  lib/
    auth.ts               Auth.js v5 config (JWT, 15-min sessions, credentials provider)
    prisma.ts             Prisma client singleton
    services/              Pure business-logic functions — keeps Route Handlers thin
    validations/           Zod schemas
  store/
    cart-store.ts          Zustand cart state (persisted to localStorage)
prisma/
  schema.prisma            Data model: User/Account/Session (Auth.js), Category, Product, Order, OrderItem
  seed.ts                  Sample data
```

## Deploying (still free)

1. Push this repo to GitHub
2. Import it on https://vercel.com (free Hobby tier — non-commercial use)
3. Add the same environment variables from `.env` in Vercel's project settings
4. Vercel auto-detects Next.js and deploys on every push
5. npm run build
6. npx --yes vercel --prod
7. https://cozy-cup-rose.vercel.app/
8. 

## Notes

- Money is stored as **integer cents** (`priceCents`) everywhere — never floats — to avoid rounding bugs.
- `revalidateTag("products")` in `api/products/route.ts` busts the cached product list the moment
  something changes, per the doc's caching strategy.
- The `/lib/services` layer is intentional — as the project grows (checkout, inventory, admin), keep
  adding pure functions there instead of putting logic directly in Route Handlers.
