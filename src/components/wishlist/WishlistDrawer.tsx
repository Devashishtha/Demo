"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export function WishlistDrawer() {
  const { wishlist, isOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addItem, openCart } = useCart();

  const handleMoveToBag = (productId: string) => {
    const item = wishlist.find((i) => i.productId === productId);
    if (!item) return;

    const defaultSize = item.product.sizes[0] || "M";
    const defaultColor = item.product.colors[0];

    addItem(item.product, defaultSize, defaultColor, 1);
    removeFromWishlist(productId);
    closeWishlist();
    openCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[var(--bg-primary)] border-l border-[var(--border-color)] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-card)]">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]" />
                  <h2 className="text-base font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                    Saved Pieces ({wishlist.length})
                  </h2>
                </div>
                <button
                  onClick={closeWishlist}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] mb-4 border border-[var(--border-color)]">
                      <Heart className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] uppercase tracking-wider">
                      Your wishlist is empty
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] max-w-xs mt-1 leading-relaxed">
                      Tap the heart icon on any garment to save it for your next release order.
                    </p>
                    <Link
                      href="/shop"
                      onClick={closeWishlist}
                      className="mt-6 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
                    >
                      Browse Catalog <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map(({ product }) => (
                      <div
                        key={product.id}
                        className="flex gap-4 p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]"
                      >
                        <Link
                          href={`/products/${product.id}`}
                          onClick={closeWishlist}
                          className="relative w-20 h-24 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shrink-0 group"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <Link
                                href={`/products/${product.id}`}
                                onClick={closeWishlist}
                                className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-1"
                              >
                                {product.name}
                              </Link>
                              <button
                                onClick={() => removeFromWishlist(product.id)}
                                className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-xs font-extrabold text-[var(--text-primary)] mt-1">
                              ₹{product.price.toLocaleString("en-IN")}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                              {product.fabricSpecs.gsm} GSM • {product.fabricSpecs.fit}
                            </p>
                          </div>

                          <button
                            onClick={() => handleMoveToBag(product.id)}
                            className="mt-2.5 w-full py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-color)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
