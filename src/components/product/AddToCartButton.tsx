"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Check, Zap, ArrowRight } from "lucide-react";
import { Product, ProductColor, ProductSize } from "@/types";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export function AddToCartButton({
  product,
  selectedSize,
  selectedColor,
  quantity,
}: AddToCartButtonProps) {
  const { addItem, openCheckout } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, selectedSize, selectedColor, quantity);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }, 200);
  };

  const handleInstantBuy = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setTimeout(() => {
      openCheckout();
    }, 150);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* Add to Bag Button with Micro-Interaction */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={isAdding}
        className="flex-1 py-4 px-6 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2.5 shadow-xl disabled:opacity-50"
      >
        <motion.div
          animate={isAdded ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {isAdded ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
        </motion.div>
        <span>
          {isAdded ? "Added to Bag" : `Add to Bag • ₹${(product.price * quantity).toLocaleString("en-IN")}`}
        </span>
      </motion.button>

      {/* Buy Now (Direct Checkout) */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleInstantBuy}
        className="py-4 px-6 rounded-2xl bg-[var(--accent)] text-white font-black text-xs uppercase tracking-widest hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2 shadow-xl"
      >
        <Zap className="w-4 h-4 fill-current" />
        <span>Buy Now</span>
      </motion.button>
    </div>
  );
}
