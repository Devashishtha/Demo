"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "./CartItem";
import {
  X,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    discountAmount,
    shippingFee,
    totalPrice,
    appliedPromo,
    applyPromo,
    removePromo,
    freeShippingThreshold,
    freeShippingProgress,
    freeShippingRemaining,
    openCheckout,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setTimeout(() => {
      const success = applyPromo(promoInput);
      if (success) setPromoInput("");
      setPromoLoading(false);
    }, 400);
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
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel */}
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
                  <ShoppingBag className="w-5 h-5 text-[var(--accent)]" />
                  <h2 className="text-base font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                    Your Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[var(--accent)]" />
                    {freeShippingRemaining === 0 ? (
                      <span className="text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Free Express Shipping Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <b>₹{freeShippingRemaining.toLocaleString("en-IN")}</b> more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    {freeShippingProgress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--accent)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] mb-4 border border-[var(--border-color)]">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] uppercase tracking-wider">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] max-w-xs mt-1 leading-relaxed">
                      Explore our heavyweight drops, archival washes, and custom boxy silhouettes.
                    </p>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="mt-6 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
                    >
                      Explore Collection <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItemRow
                        key={item.id}
                        item={item}
                        onCloseCart={closeCart}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[var(--border-color)] bg-[var(--bg-card)] space-y-4">
                  {/* Promo Code Input */}
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-500" />
                        <div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {appliedPromo.code}
                          </span>
                          <span className="text-[var(--text-secondary)] ml-2">
                            ({appliedPromo.description})
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-xs font-bold text-rose-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (e.g. KÖNIG10)"
                          className="w-full pl-9 pr-3 py-2 text-xs bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl uppercase tracking-wider text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={promoLoading || !promoInput.trim()}
                        className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] disabled:opacity-50 transition-colors"
                      >
                        {promoLoading ? "Applying..." : "Apply"}
                      </button>
                    </form>
                  )}

                  {/* Calculations breakdown */}
                  <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-[var(--text-primary)]">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                        <span>Discount ({appliedPromo?.code})</span>
                        <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {shippingFee === 0 ? (
                          <span className="text-emerald-500 font-bold uppercase tracking-wider text-[11px]">
                            FREE
                          </span>
                        ) : (
                          `₹${shippingFee.toLocaleString("en-IN")}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-[var(--border-color)] text-sm font-extrabold text-[var(--text-primary)]">
                      <span>Total Amount</span>
                      <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={openCheckout}
                    className="w-full py-4 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-extrabold text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Express Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-Bit Encrypted Secure Checkout • UPI & Cards</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
