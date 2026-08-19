"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface CartItemProps {
  item: CartItemType;
  onCloseCart?: () => void;
}

export function CartItemRow({ item, onCloseCart }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-4 border-b border-[var(--border-color)] last:border-0"
    >
      {/* Thumbnail */}
      <Link
        href={`/products/${item.productId}`}
        onClick={onCloseCart}
        className="relative w-20 h-24 rounded-xl overflow-hidden bg-[var(--bg-secondary)] shrink-0 border border-[var(--border-color)] group"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${item.productId}`}
              onClick={onCloseCart}
              className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-1"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Variant specs */}
          <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5 font-medium">
              <span
                className="w-2.5 h-2.5 rounded-full border border-[var(--border-color)]"
                style={{ backgroundColor: item.color.hex }}
              />
              {item.color.name}
            </span>
            <span>•</span>
            <span className="font-semibold text-[var(--text-primary)]">
              Size: {item.size}
            </span>
          </div>
        </div>

        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-[var(--border-color)] rounded-lg bg-[var(--bg-secondary)]">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2.5 text-xs font-bold text-[var(--text-primary)] min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm font-extrabold text-[var(--text-primary)]">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
            {item.originalPrice && (
              <p className="text-[10px] text-[var(--text-muted)] line-through">
                ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
