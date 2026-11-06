# Aamna's Elixir

A premium luxury skincare e-commerce website — cinematic black/red/gold
aesthetic, immersive product presentation, and a functional cart and checkout.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **GSAP + ScrollTrigger** for all scroll animation
- **lucide-react** for icons
- **next/font/google** — Pinyon Script (brand), Cormorant Garamond (editorial),
  Manrope (body)

> **Note on 3D:** the original brief described WebGL product models. Since no
> GLB assets exist, we deliberately dropped Three.js/React Three Fiber. The
> "product rotates as you scroll" signature is implemented as a
> **scroll-scrubbed turntable video** (see `ScrollScrubVideo.tsx`) with a
> crafted SVG-art fallback that renders today. No WebGL dependency is installed.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.local.example` to `.env.local`. The app runs fully in **mock mode**
with no configuration. Only set Shopify variables when wiring the real store.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_COMMERCE_MODE` | `mock` (default) or `shopify` |
| `SHOPIFY_STORE_DOMAIN` | Storefront domain (e.g. `your-store.myshopify.com`) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token |
| `SHOPIFY_API_VERSION` | Storefront API version (default `2024-10`) |

## Commerce modes

- **mock (default):** products come from `src/data/products.ts`, the cart is
  local (`src/lib/cart.tsx`, persisted to `localStorage`), and checkout shows a
  clearly-labelled **demo** confirmation — no payment is processed.
- **shopify:** `src/lib/shopify.ts` contains a real Storefront API client
  (`cartCreate` → hosted `checkoutUrl`). It is dormant until the env vars above
  are set. Checkout then redirects to Shopify-hosted checkout — card details
  never touch this site.

## Project structure

```
src/
  app/                 routes (home, shop, products/[slug], story, ingredients,
                       contact, cart, checkout, policies/*)
  components/
    layout/            Navbar, Footer
    hero/              HeroSection
    home/              BrandIntro, SignatureProductSection, CollectionSection
    products/          ProductCard, ProductDetails, ProductGallery, ProductImage, AddToCartButton
    animations/        Reveal, ScrollScrubVideo
    cart/              CartDrawer, CartItem
    ui/                Button, SectionHeading, PageHeader
  data/products.ts     single source of truth for the catalog
  lib/                 types, products, cart, commerce, mock-commerce, shopify
public/
  images/products/     crafted SVG product art (spf, moisturizer, hand-soap)
  images/hero-bottle.svg
  videos/products/     turntable videos drop here (currently empty)
```

## Swapping in real assets & data

- **Product photography:** replace the SVG paths in `src/data/products.ts`
  (`images` array) with WebP/AVIF files under `public/images/products/`. No
  component changes needed.
- **Turntable videos:** drop `spf.mp4` etc. into `public/videos/products/` and
  set each product's `video` field. `ScrollScrubVideo` will scrub playback
  against scroll automatically.
- **Real product info:** ingredient lists, directions, sizes and prices are
  intentionally left as `[placeholder]` values in `src/data/products.ts` — fill
  them in there and every page updates. No SPF ratings or clinical claims have
  been invented.

## Placeholders — functional vs simulated

**Functional:** navigation, all 11 routes, cart (add/remove/quantity/subtotal,
persisted across refresh), search, responsive layouts, scroll animations,
product detail pages, JSON-LD structured data.

**Simulated / placeholder:** checkout (mock mode shows a demo confirmation),
newsletter signup, contact form, ingredient lists and directions, contact
details, social links, policy copy, and 3D product art (SVG placeholders).

## Deployment

Recommended host: **Vercel**. Import the repo, set the env vars in
Project Settings → Environment Variables, and deploy. Set `NEXT_PUBLIC_COMMERCE_MODE=shopify`
plus the three Shopify variables once the store is connected, and add a real
Open Graph image/domain in `src/app/layout.tsx`.
