# Aqua Pro — Design System & Architecture Guide

A comprehensive specification of the design tokens, typography, color palette, interactive animations, and component structure for **Aqua Pro** (Sri Lanka's Premier Aquarium Destination).

---

## 1. Typography

| Attribute | Specification |
| :--- | :--- |
| **Primary Typeface** | **Josefin Sans** |
| **Fallback Stack** | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` |
| **Loaded Weights** | `300` (Light), `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold) |
| **Loading Strategy** | Hybrid: `next/font/google` (`--font-josefin` variable) + Google Fonts `@import` fallback |
| **Scope** | Global across all headings (`h1`–`h6`), body copy, navigation, buttons, inputs, and badges |

### Type Tokens & Scale
```css
--font-body:    'Josefin Sans', var(--font-josefin), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-sans:    var(--font-body);
--font-display: var(--font-body);
--font-ui:      var(--font-body);

/* Standardized Scale */
--text-2xs:  0.6875rem; /* 11px */
--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-md:   1.0625rem; /* 17px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */
--text-5xl:  3rem;      /* 48px */
--text-6xl:  3.75rem;   /* 60px */
--text-7xl:  4.5rem;    /* 72px */
```

---

## 2. Color Palette & Theme Tokens

### Surfaces & Backgrounds
* **`--ink` (`#f6f4ee`)**: Warm botanical paper surface for light page sections.
* **`--ink-deep` (`#172522`)**: Deep aquatic dark background for hero, footer, and dark modals.
* **`--ink-mid` (`#e8eee8`)**: Soft tinted divider and card backdrop.
* **`--surface` (`#ffffff`)**: Pure white card and container surface.
* **`--surface-alt` (`#eef2ec`)**: Subtle contrast background for section cards.

### Aquatic Teals & Emeralds
* **`--teal-900` (`#164b4a`)**: Deep underwater shadow.
* **`--teal-700` (`#21716d`)**: Primary brand teal for headings and solid buttons.
* **`--teal-500` (`#3a9a91`)**: Medium aquatic tone for borders and hover highlights.
* **`--teal-400` (`#66c5b7`)**: Radiant sea-glass accent for primary action buttons.
* **`--teal-300` (`#9be0d2`)**: Light seafoam for badges and glowing active links.
* **`--teal-200` (`#c5eee4`)**: Selection highlights and pill badges.
* **`--teal-100` (`#e2f7f1`)**: Tinted badge backgrounds.

### Warm Accents & Status
* **`--gold` (`#d6a45e`)**: Sri Lankan heritage gold accent for premium badges and stars.
* **`--gold-light` (`#e8c181`)**: Warm glow highlight.
* **`--text-primary` (`#1a2a27`)**: Deep charcoal-slate for maximum contrast readability.
* **`--text-secondary` (`#52625d`)**: Balanced neutral for body paragraphs and subheadings.
* **`--text-muted` (`#71817a`)**: Tertiary captions, metadata, and timestamps.
* **`--success` (`#22c87e`)**: In-stock, verified health certificates.
* **`--sale` (`#ff6b4a`)**: Discount banners and promotional prices.

---

## 3. Spatial System & Layout

### Container Max-Widths
* **Default Container**: `--max-w: 1320px`
* **Wide Container**: `--max-w-wide: 1600px` (Headers, mega-menus, hero)
* **Narrow / Reading Container**: `--max-w-sm: 880px` (Checkout, editorial content)
* **Horizontal Padding**: `--pad-x: clamp(1.25rem, 5vw, 3rem)`

### Border Radius
* `--r-xs: 4px` · `--r-sm: 6px` · `--r-md: 10px` · `--r-lg: 16px` · `--r-xl: 24px` · `--r-full: 9999px`

### Depth & Elevation
* `--shadow-sm`: `0 1px 3px rgba(26,42,39,0.08)`
* `--shadow-md`: `0 8px 24px rgba(26,42,39,0.12)`
* `--shadow-lg`: `0 18px 42px rgba(26,42,39,0.15)`
* `--shadow-teal`: `0 8px 24px rgba(33,113,109,0.14)`

---

## 4. Interactive Hero Canvas Simulation

The hero section ([src/components/hero/Hero.tsx](file:///Users/reshi/Documents/Projects/aquapro/src/components/hero/Hero.tsx)) is powered by a high-performance native HTML5 2D Canvas engine:

1. **Single Majestic Betta Fish**:
   * **Multi-Layered Silk Caudal Fin**: 3 translucent layers rippling with mathematical sine harmonics (`Math.sin()`).
   * **Fin Ray Striations**: Delicate translucent ray lines inside the fin membrane.
   * **Natural Kinematics**: Smooth steering towards pointer coordinates with velocity damping and idle Lissajous figure-eight cruising.
   * **Pectoral Fin & Operculum**: Animated breathing side fin and iridescent spine highlight.
2. **Natural Surface Water Caustics**:
   * Replaced rigid artificial beams with undulating multi-wave water surface refractions across the top edge.
3. **Atmospheric Marine Particles**:
   * 42 pulsing micro-plankton spores drifting with gentle Brownian motion.
   * 24 rising air bubbles with wobble amplitude.
4. **Interactive Ripple Waves**:
   * Click/tap events spawn expanding refractive water ripple rings.

---

## 5. Codebase & Directory Structure

```
aquapro/
├── public/                     # Static media and brand assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with Josefin Sans font & context providers
│   │   ├── globals.css         # Design system tokens, reset, typography & utility classes
│   │   ├── page.tsx            # Homepage with Hero, CategoryGrid, StorePromises, etc.
│   │   ├── shop/               # Shop catalog with category filters, sorting & search
│   │   ├── services/           # Custom aquarium builds & maintenance bookings
│   │   ├── offers/             # Special deals & promotions
│   │   ├── store/              # Showroom information (Galnewa, Sri Lanka)
│   │   ├── cart/               # Shopping cart drawer and page
│   │   ├── checkout/           # Multi-step checkout flow
│   │   ├── wishlist/           # Saved favorites
│   │   └── admin/              # Inventory & order management dashboard
│   ├── components/
│   │   ├── hero/               # Interactive Canvas Hero component & CSS module
│   │   ├── layout/             # Header, Announcement Ticker, Mega Dropdown, Footer
│   │   ├── product/            # ProductCard, QuickView modal, Badge tags
│   │   ├── sections/           # WhyAquaPro, CategoryGrid, ServicesPreview, ContactCTA
│   │   ├── shop/               # FilterSidebar, SearchDialog, SortSelect
│   │   └── ui/                 # Reusable buttons, badges, accordions, modals
│   ├── data/                   # Product catalog, categories, and service packages
│   └── lib/                    # React Contexts (CartProvider, WishlistProvider, Toast)
├── DESIGN_SYSTEM.md            # Design system & architecture documentation (this file)
└── tsconfig.json               # TypeScript configuration
```
