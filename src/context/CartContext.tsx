"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { CartItem, Product, ProductColor, ProductSize, PromoCode } from "@/types";
import { siteConfig } from "@/config/site";
import { useToast } from "./ToastContext";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  appliedPromo: PromoCode | null;
  totalItemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalPrice: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  freeShippingRemaining: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addItem: (product: Product, size: ProductSize, color: ProductColor, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("konig-cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem("konig-promo");
      if (savedPromo) {
        setAppliedPromo(JSON.parse(savedPromo));
      }
    } catch (e) {
      console.error("Failed to parse cart storage", e);
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("konig-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  useEffect(() => {
    if (mounted) {
      if (appliedPromo) {
        localStorage.setItem("konig-promo", JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem("konig-promo");
      }
    }
  }, [appliedPromo, mounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCheckout = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addItem = (
    product: Product,
    size: ProductSize,
    color: ProductColor,
    quantity = 1
  ) => {
    const itemId = `${product.id}-${size}-${color.name.toLowerCase().replace(/\s+/g, "-")}`;
    const selectedImage = product.images[color.imageIndex] || product.images[0];

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          size,
          color,
          image: selectedImage,
          quantity,
        },
      ];
    });

    showToast(
      "Added to Bag",
      `${product.name} (${color.name} / ${size}) added to your bag.`,
      "success"
    );
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      showToast("Removed", `${item.name} removed from your bag.`, "info");
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (inputCode: string): boolean => {
    const cleanCode = inputCode.trim().toUpperCase();
    const found = siteConfig.promoCodes.find((p) => p.code === cleanCode);

    if (!found) {
      showToast("Invalid Code", "Please check your promo code and try again.", "error");
      return false;
    }

    const currentSubtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    if (found.minSpend && currentSubtotal < found.minSpend) {
      showToast(
        "Minimum Spend Required",
        `Add items worth ₹${(found.minSpend - currentSubtotal).toLocaleString("en-IN")} more to use this code.`,
        "error"
      );
      return false;
    }

    setAppliedPromo(found);
    showToast("Promo Code Applied!", found.description, "success");
    return true;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast("Promo Removed", "Discount code has been cleared.", "info");
  };

  // Computations
  const totalItemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountType === "percentage") {
      return Math.round((subtotal * appliedPromo.value) / 100);
    }
    return Math.min(appliedPromo.value, subtotal);
  }, [appliedPromo, subtotal]);

  const freeShippingThreshold = siteConfig.currency.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : siteConfig.currency.standardShippingFee;
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        items: mounted ? items : [],
        isOpen,
        isCheckoutOpen,
        appliedPromo,
        totalItemCount,
        subtotal,
        discountAmount,
        shippingFee,
        totalPrice,
        freeShippingThreshold,
        freeShippingProgress,
        freeShippingRemaining,
        openCart,
        closeCart,
        toggleCart,
        openCheckout,
        closeCheckout,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
