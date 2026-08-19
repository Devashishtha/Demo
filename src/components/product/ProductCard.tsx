"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductSize } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Eye, ShoppingBag, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeQuickSelect, setShowSizeQuickSelect] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  // Image to display
  const primaryImage = product.images[currentColor.imageIndex] || product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, size, currentColor, 1);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      setShowSizeQuickSelect(false);
    }, 1000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizeQuickSelect(false);
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[9px] font-black uppercase tracking-wider shadow-sm">
              Best Seller
            </span>
          )}
          {product.isLimited && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--accent)] text-white text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Limited Drop
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-[var(--bg-card)] text-[var(--text-primary)] text-[9px] font-black uppercase tracking-wider border border-[var(--border-color)] shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isFavorited
              ? "bg-[var(--accent)] text-white scale-110 shadow-md"
              : "bg-black/30 hover:bg-black/60 text-white"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute top-14 right-3 z-20 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden sm:flex"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Main Image Link */}
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={isHovered && secondaryImage !== primaryImage ? secondaryImage : primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Quick Size Select Slide-Up Overlay */}
        <AnimatePresence>
          {showSizeQuickSelect && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-0 bottom-0 z-20 bg-[var(--bg-card)]/95 backdrop-blur-md p-3.5 border-t border-[var(--border-color)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">
                  Select Size to Add
                </span>
                <span className="text-[10px] text-[var(--accent)] font-semibold">
                  {product.fabricSpecs.gsm} GSM
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(size, e)}
                    className="py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-color)] text-xs font-bold transition-all flex items-center justify-center"
                  >
                    {addedSize === size ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      size
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Add To Bag Trigger (Desktop Hover) */}
        {!showSizeQuickSelect && (
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowSizeQuickSelect(true);
              }}
              className="w-full py-3 rounded-xl bg-[var(--bg-card)]/90 backdrop-blur-md text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-color)] text-xs font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="mt-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Color Dots */}
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                aria-label={`Select ${color.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? "ring-1.5 ring-[var(--text-primary)] ring-offset-1 scale-110"
                    : "border-[var(--border-color)] opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-[10px] text-[var(--text-muted)] ml-1">
              {product.fabricSpecs.gsm} GSM
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/products/${product.id}`}
            className="block text-sm font-extrabold uppercase tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Tagline / Cut */}
          <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5 font-medium">
            {product.fabricSpecs.fit} • {currentColor.name}
          </p>
        </div>

        {/* Price & Mobile Add */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-[var(--text-primary)]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={() => setShowSizeQuickSelect(true)}
            className="sm:hidden p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
