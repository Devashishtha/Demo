"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProductSize } from "@/types";
import { useCart } from "@/context/CartContext";
import { SizeGuideModal } from "./SizeGuideModal";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Check, Ruler, ArrowRight, ShieldCheck } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];

  const handleAddToCart = () => {
    addItem(product, selectedSize, currentColor, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-color)]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image Viewer */}
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-[var(--bg-secondary)] min-h-[350px]">
                <Image
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />

                {/* Thumbnails row */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto p-2 bg-black/40 backdrop-blur-md rounded-2xl">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                        activeImageIdx === idx
                          ? "border-white scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="thumb" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Garment Specs & Purchase Controls */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--accent)] text-[10px] font-black uppercase tracking-wider border border-[var(--border-color)]">
                      {product.fabricSpecs.gsm} GSM French Terry
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {product.fabricSpecs.fit}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">
                    {product.name}
                  </h2>

                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-xl font-black text-[var(--text-primary)]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[var(--text-muted)] line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Color Selection */}
                  <div className="mt-5">
                    <label className="text-xs uppercase tracking-wider font-bold text-[var(--text-primary)] flex items-center justify-between">
                      <span>Color: <b>{currentColor.name}</b></span>
                    </label>
                    <div className="flex gap-2.5 mt-2">
                      {product.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => {
                            setSelectedColorIdx(idx);
                            setActiveImageIdx(color.imageIndex);
                          }}
                          className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                            selectedColorIdx === idx
                              ? "ring-2 ring-[var(--text-primary)] ring-offset-2 scale-110"
                              : "border-[var(--border-color)] opacity-70 hover:opacity-100"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="uppercase tracking-wider font-bold text-[var(--text-primary)]">
                        Size: <b>{selectedSize}</b>
                      </span>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px]"
                      >
                        <Ruler className="w-3.5 h-3.5" /> Size Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2.5 rounded-xl border text-xs font-black transition-all ${
                            selectedSize === size
                              ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-sm"
                              : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    {isAdded ? (
                      <span className="flex items-center gap-2 text-emerald-400">
                        <Check className="w-4 h-4" /> Added to Bag
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Add to Bag • ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    )}
                  </button>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/products/${product.id}`}
                      onClick={onClose}
                      className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 hover:underline"
                    >
                      <span>Full Product Details & Reviews</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> Free Returns in 7 Days
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </>
  );
}
