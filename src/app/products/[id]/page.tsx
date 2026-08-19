"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { mockProducts } from "@/data/products";
import { mockReviews } from "@/data/reviews";
import { ProductSize } from "@/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ColorSwatches } from "@/components/product/ColorSwatches";
import { SizeSelector } from "@/components/product/SizeSelector";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import {
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  ChevronDown,
  Layers,
  Sparkles,
  Share2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const product = mockProducts.find((p) => p.id === id);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<ProductSize>("L");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeGalleryImageIdx, setActiveGalleryImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>("specs");

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">
          Piece Not Found
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-1 mb-6">
          This archival drop may have been archived or retired.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const isFavorited = isInWishlist(product.id);

  // Related products
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    const targetImageIdx = product.colors[idx]?.imageIndex ?? 0;
    setActiveGalleryImageIdx(targetImageIdx);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      showToast("Link Copied", "Product URL copied to clipboard.", "info");
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[var(--text-primary)] transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            activeImageIndex={activeGalleryImageIdx}
            onImageChange={setActiveGalleryImageIdx}
          />
        </div>

        {/* Right Column: Product Info & Purchase Form */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            {/* Badges & Rating */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--accent)] text-[10px] font-black uppercase tracking-widest border border-[var(--border-color)]">
                {product.fabricSpecs.gsm} GSM • {product.fabricSpecs.fit}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-bold">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-[var(--text-muted)] font-normal">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-tight">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mt-1">
              {product.tagline}
            </p>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base text-[var(--text-muted)] line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                Save ₹{((product.originalPrice || product.price) - product.price).toLocaleString("en-IN")} (Incl. all taxes)
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <ColorSwatches
            colors={product.colors}
            selectedColorIndex={selectedColorIdx}
            onSelectColor={handleColorChange}
          />

          {/* Size Selector */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />

          {/* Quantity Stepper & Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[var(--text-primary)]">
                Quantity:
              </span>
              <QuantityStepper
                quantity={quantity}
                onChange={setQuantity}
                max={product.stockCount}
              />
              <span className="text-[11px] text-[var(--text-muted)] font-medium ml-auto">
                Only {product.stockCount} batch units remaining
              </span>
            </div>

            {/* Add to Cart & Buy Now Micro-Interaction Buttons */}
            <AddToCartButton
              product={product}
              selectedSize={selectedSize}
              selectedColor={currentColor}
              quantity={quantity}
            />

            {/* Wishlist & Share Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => toggleWishlist(product)}
                className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isFavorited
                    ? "bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]"
                    : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                <span>{isFavorited ? "Saved to Wishlist" : "Save to Wishlist"}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Share product"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Accordion Specs */}
          <div className="border-t border-[var(--border-color)] pt-4 space-y-2 text-xs">
            {/* Accordion 1: Fabric & Craft Specs */}
            <div className="border border-[var(--border-color)] rounded-2xl overflow-hidden bg-[var(--bg-card)]">
              <button
                onClick={() => toggleAccordion("specs")}
                className="w-full p-4 text-left font-black uppercase tracking-wider text-[var(--text-primary)] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--accent)]" />
                  Garment Architecture & Fabric Science
                </span>
                <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${openAccordion === "specs" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openAccordion === "specs" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 pt-1 text-[var(--text-secondary)] space-y-2 border-t border-[var(--border-color)]"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><b>Fabric Weight:</b> {product.fabricSpecs.gsm} GSM Heavy Loopback</div>
                      <div><b>Material:</b> {product.fabricSpecs.material}</div>
                      <div><b>Silhouette:</b> {product.fabricSpecs.fit}</div>
                      <div><b>Treatment:</b> {product.fabricSpecs.treatment}</div>
                      <div><b>Origin:</b> {product.fabricSpecs.origin}</div>
                      <div><b>Neck Ribbing:</b> 35mm High-Density 1x1 Rib</div>
                    </div>
                    <ul className="list-disc list-inside space-y-1 pt-2 border-t border-[var(--border-color)] text-[11px]">
                      {product.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Delivery & Returns */}
            <div className="border border-[var(--border-color)] rounded-2xl overflow-hidden bg-[var(--bg-card)]">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full p-4 text-left font-black uppercase tracking-wider text-[var(--text-primary)] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[var(--accent)]" />
                  Express Delivery & 7-Day Free Exchange
                </span>
                <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${openAccordion === "shipping" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openAccordion === "shipping" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 pt-1 text-[var(--text-secondary)] space-y-2 text-[11px] leading-relaxed border-t border-[var(--border-color)]"
                  >
                    <p>• <b>Dispatch:</b> Orders are dispatched from our Mumbai atelier within 24 business hours.</p>
                    <p>• <b>Delivery Timelines:</b> Metro cities (Mumbai, Delhi, Bengaluru, Hyderabad): 2-3 business days. Rest of India: 3-5 business days.</p>
                    <p>• <b>Exchange Guarantee:</b> If the size doesn&apos;t fit your intended aesthetic, we provide free reverse pickup and immediate exchange within 7 days.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-24 pt-12 border-t border-[var(--border-color)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Atelier Dispatches</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              CUSTOMER FIT REVIEWS.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-[var(--text-primary)]">{product.rating} / 5</span>
            <div className="text-xs text-[var(--text-secondary)]">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p>Based on {product.reviewCount} customer reviews</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {review.date}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[var(--text-primary)]">
                &quot;{review.title}&quot;
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {review.comment}
              </p>
              <div className="pt-3 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)] flex justify-between items-center">
                <span>{review.author} ({review.location})</span>
                <span className="font-bold text-[var(--accent)]">{review.fitFeedback}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products / "Complete The Look" */}
      <div className="mt-24 pt-12 border-t border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">
              RECOMMENDED STYLING
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              COMPLETE THE ARCHIVE.
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:underline"
          >
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
