"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, WishlistItem } from "@/types";
import { useToast } from "./ToastContext";

interface WishlistContextType {
  wishlist: WishlistItem[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlistDrawer: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("konig-wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse wishlist", e);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("konig-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);
  const toggleWishlistDrawer = () => setIsOpen((prev) => !prev);

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product: Product) => {
    const exists = isInWishlist(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((i) => i.productId !== product.id));
      showToast("Removed from Wishlist", `${product.name} removed from your saved pieces.`, "info");
    } else {
      setWishlist((prev) => [
        ...prev,
        {
          productId: product.id,
          product,
          addedAt: Date.now(),
        },
      ]);
      showToast("Saved to Wishlist", `${product.name} saved to your curated wishlist.`, "success");
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((i) => i.productId !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: mounted ? wishlist : [],
        isOpen,
        openWishlist,
        closeWishlist,
        toggleWishlistDrawer,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
