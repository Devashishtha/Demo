"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";
import { SearchModal } from "../ui/SearchModal";
import { MobileNav } from "./MobileNav";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { totalItemCount, openCart } = useCart();
  const { wishlist, openWishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-sm py-3.5"
            : "bg-[var(--bg-primary)]/80 backdrop-blur-md py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu & Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              {siteConfig.navLinks.slice(0, 4).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs uppercase tracking-widest font-semibold transition-colors relative py-1 ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--text-primary)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex flex-col items-center">
            <Link
              href="/"
              className="group flex flex-col items-center select-none"
            >
              <span className="font-black text-xl sm:text-2xl tracking-[-0.05em] uppercase text-[var(--text-primary)] font-display group-hover:opacity-80 transition-opacity">
                {siteConfig.name}
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--text-muted)] font-medium -mt-1 hidden sm:block">
                Atelier SS26
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all"
              aria-label="Search garments"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline-flex text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                ⌘K
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 text-amber-300" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-all"
              aria-label="View saved wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent)]" />
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all font-semibold text-xs uppercase tracking-wider group"
              aria-label={`Shopping bag with ${totalItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {totalItemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
