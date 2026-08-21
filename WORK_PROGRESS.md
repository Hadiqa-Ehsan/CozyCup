# Jalal Sons Clone - Work Progress

## Project

- Repository: `Jalalsons_clone`
- Branch: `tanqeen-zafar`
- Framework: Next.js 15 App Router with TypeScript
- Database: PostgreSQL with Prisma
- Authentication: Auth.js v5 credentials provider
- Validation: Zod
- Client state: Zustand
- Payments: Stripe integration prepared

## Completed Work

### Database and Prisma

- Added Prisma PostgreSQL schema.
- Added User, Account, Session, VerificationToken, Category, Product, Cart, CartItem, Order, and OrderItem models.
- Added roles and order status enums.
- Added product, cart, order, and authentication relations.
- Added stock, price, currency, timestamps, and indexes.
- Added database push and seed scripts.
- Seeded sample categories and products with mock product images.

### Authentication

- Added Auth.js credentials authentication.
- Added bcrypt password verification.
- Added JWT sessions with a 15-minute expiry.
- Added user role propagation to JWT and session data.
- Added user registration API: `POST /api/auth/register`.
- Added login page: `/login`.
- Added registration page: `/register`.
- Added middleware protection for account and checkout routes.

### Product and Category APIs

- `GET /api/products`
- `POST /api/products` for administrators
- `GET /api/products/[id]`
- `PUT /api/products/[id]` for administrators
- `DELETE /api/products/[id]` for administrators
- Product search and category filtering.
- `GET /api/categories`
- `GET /api/categories/[id]/products`

### Cart and Orders

- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/[id]`
- `DELETE /api/cart/[id]`
- Server Actions for add, update, and remove cart items.
- Stock validation before adding items and creating orders.
- Transactional order creation with stock decrement.
- Cart clearing after order creation.
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/[id]`

### Stripe

- Added Stripe client helper.
- Added `POST /api/checkout`.
- Added Stripe Checkout session creation from the authenticated cart.
- Added signed webhook route: `POST /api/stripe/webhook`.
- Added payment success and failure status handling.
- Added stock restoration when a pending payment is cancelled or expires.
- Added checkout success page: `/checkout/success`.
- Added checkout cancellation page: `/checkout/cancelled`.

### Frontend Connection

- Added product image display.
- Added Add to Cart interaction from the product listing.
- Added Zustand cart persistence.
- Added cart page: `/cart`.
- Added session and UI Zustand stores.

## Verification Completed

The following checks passed during development:

```text
npm run db:push
npm run db:seed
npm run typecheck
npm run build
npx prisma validate
```

The production build generated the application pages and API routes successfully.

## Known Setup Notes

- The current database was synchronized using `prisma db push`.
- Do not run `prisma migrate reset` on the existing Neon database because it deletes all data.
- `prisma migrate dev` reports drift because migration history was not created before the database was pushed.
- Port 3000 may already be occupied. When that happens, Next.js starts on port 3001.
- PowerShell environment values belong in `.env`; they should not be entered as commands.
- URLs such as `/login` and `/api/products` must be opened in a browser, for example `http://localhost:3001/login`.
- Stripe checkout requires real test values for `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.

## Remaining Work

The items below are still pending and should be completed in this order.

### 1. Match the Real Jalal Sons Domain

- Replace the placeholder grocery and household products with bakery, confectionery, pizza, snack, cake, and meal products.
- Add product options such as size, flavor, toppings, and quantity where required.
- Add branches or store locations.
- Add city, region, branch, and delivery address fields.
- Add delivery versus pickup order type.
- Add delivery fee, minimum-order, service-area, and estimated-delivery rules.

### 2. Complete Ordering Features

- Add customer order history and order-detail screens.
- Add customer order tracking.
- Add payment status and order status display.
- Add checkout validation for address, branch, delivery type, and cart availability.
- Add admin management for branches, products, categories, inventory, and orders.

### 3. Database and Deployment

- Create tracked Prisma migrations on a fresh or dedicated development database.
- Do not run `prisma migrate reset` on the existing Neon database because it deletes data.
- Add production environment variables to Vercel.
- Configure the production Stripe webhook URL.

### 4. Testing and Operations

- Add automated API tests for authentication, products, categories, cart, orders, and checkout.
- Add checkout and Stripe webhook integration tests.
- Configure Stripe CLI webhook forwarding for local testing.
- Add error logging and monitoring for failed payments and orders.

### Remaining Configuration

- Add real test values for `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
- Install Stripe CLI if local webhook testing is required.
- Resolve the duplicate lockfile warning by removing the unrelated parent lockfile or configuring `outputFileTracingRoot`.

## Local Run Commands

From the project directory:

```powershell
npm install
npm run db:push
npm run db:seed
npm run dev
```

Then open the URL printed by Next.js, usually:

```text
http://localhost:3000
```

or, if port 3000 is busy:

```text
http://localhost:3001
```
