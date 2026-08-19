# KÖNIG STUDIOS — Luxury Streetwear & Heavyweight T-Shirt Brand

![Next.js 14](https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

An archival, aesthetic e-commerce web application for **KÖNIG STUDIOS** — an artisanal streetwear brand crafting 280-320 GSM French Terry heavyweight T-shirts with custom boxy drop-shoulder silhouettes, hand-pumiced mineral washes, and tactile puff graphics.

---

## ✨ Key Features & User Experience

### 1. 🏛️ Editorial Streetwear Design & Visual Rigor
- **Aesthetic**: Minimal, high-end luxury streetwear inspired by Kith, Fear of God Essentials, Represent, and Cole Buxton.
- **Palette**: Curated luxury bone cream (`#F9F8F5`), deep obsidian pitch (`#0A0A0A`), warm stone gray, and rich crimson accent (`#9E2A2B`).
- **Dark Mode**: Seamless theme switching with persistent localStorage preferences and customized frosted glass overlays.

### 2. ⚡ Dynamic Shopping Bag & Express Checkout
- **Slide-in Cart Drawer**: Real-time free express delivery progress meter (unlocks at ₹2,499), line-item quantity controls, and smooth item exit animations.
- **Coupon Code Engine**: Working promo codes (`KÖNIG10` / `KONIG10` for 10% off, `STREETWEAR` for ₹500 off, `FREESHIP` for shipping waiver).
- **1-Click Express Checkout Simulation**: Address validation, UPI / QR (GPay, PhonePe, Paytm), Card & COD selection, and celebratory confetti burst with generated order tracking ID (`KNG-XXXXXX`).

### 3. 👕 Product Detail Page (PDP)
- **Interactive Multi-Angle Gallery**: High-resolution zoom inspection on hover, thumbnail switcher, and fullscreen lightbox modal.
- **Dynamic Color Swatches**: Real-time garment image swapping when switching colorways.
- **Size Selector & Guide**: Measurements table (Chest, Length, Shoulder, Sleeve in inches & cm) with boxy fit recommendations.
- **Tactile Micro-Interactions**: Spring-bounce Add-to-Bag button with checkmark feedback and Instant Buy Now action.
- **Technical Breakdown Accordions**: Fabric specifications (280-320 GSM French Terry loopback cotton, 35mm rib collar, pre-shrunk), delivery timelines, and 7-day exchange guarantee.

### 4. 🔍 Catalog & Multi-Facet Filtering (`/shop`)
- **Framer Motion Layout Animations**: The product grid dynamically reflows with smooth spring transitions when filters change.
- **Filters**: Category, Size (XS–XXL), Silhouette Cut, Colorway Shade, Max Price slider, and In-Stock toggle.
- **Sorting**: Featured Curations, Price (Low to High / High to Low), Newest Drops, and Highest Rated.
- **Grid Layout Switcher**: Instant switch between 2-column, 3-column, and 4-column views on desktop.
- **Quick View Modal & Quick Add**: Instant size selection overlay directly on product cards.

### 5. 📖 Editorial Lookbook & Atelier Heritage (`/lookbook` & `/about`)
- **Interactive Hotspot Lookbook**: Clickable "+" markers on streetwear models revealing garment specs and instant quick-shop buttons.
- **Atelier Philosophy & Science**: Fabric weight diagrams, ethical loopback knitting, anti-warp rib collar engineering, and brand milestone timeline.

### 6. 💬 Social Proof & Verification
- **Verified Customer Reviews**: Star ratings, buyer height/weight feedback, fit notes ("True to Size (Boxy)", "Slightly Oversized").
- **Newsletter VIP Club**: Instant 10% discount code reveal with celebratory confetti burst.
- **Spotlight Search (⌘K / Ctrl+K)**: Instant autocomplete search for garments, categories, and tags.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables Design System
- **Animations**: Framer Motion (page transitions, staggered hero typography, layout animations, spring micro-interactions)
- **Icons**: Lucide React + Inline SVGs
- **Celebration Effects**: Canvas Confetti
- **State Management**: React Context API (`CartContext`, `WishlistContext`, `ThemeContext`, `ToastContext`) with localStorage persistence

---

## 🚀 Quick Start Guide

### 1. Clone the repository
```bash
git clone https://github.com/Devashishtha/Demo.git
cd Demo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Providers & global overlays
│   │   ├── page.tsx               # Homepage (Hero, Marquee, Drops, Lookbook, Craft, Reviews, Newsletter)
│   │   ├── shop/
│   │   │   └── page.tsx           # Catalog with Filter Sidebar, Sort, Layout Animated Grid
│   │   ├── products/
│   │   │   └── [id]/page.tsx      # Dynamic PDP (Gallery, Swatches, Size Guide, Micro-Interactions)
│   │   ├── lookbook/
│   │   │   └── page.tsx           # Editorial Lookbook with interactive tap-to-shop hotspots
│   │   ├── about/
│   │   │   └── page.tsx           # Fabric Science, Craftsmanship & Timeline
│   │   ├── contact/
│   │   │   └── page.tsx           # Concierge Form, Flagship Studios, FAQs Accordion
│   │   └── globals.css            # Custom theme variables, glassmorphism, marquee animations
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, MobileNav, AnnouncementBar
│   │   ├── home/                  # HeroSection, MarqueeTicker, FeaturedSection, BrandStory, Reviews, Newsletter
│   │   ├── shop/                  # FilterSidebar, SortDropdown, ActiveFilters
│   │   ├── product/               # ProductCard, ProductGallery, SizeSelector, ColorSwatches, AddToCartButton
│   │   ├── cart/                  # CartDrawer, CartItemRow, CheckoutModal
│   │   ├── wishlist/              # WishlistDrawer
│   │   └── ui/                    # SearchModal, QuickViewModal, SizeGuideModal, Toast
│   ├── context/                   # CartContext, WishlistContext, ThemeContext, ToastContext
│   ├── config/                    # siteConfig, promoCodes, store locations
│   ├── data/                      # 8 Curated Heavyweight T-Shirt Products (₹ INR) & Reviews
│   └── types/                     # TypeScript definitions for Products, Cart, Filters, Orders
```

---

## 📜 License
MIT License. Crafted with precision for **KÖNIG STUDIOS**.
