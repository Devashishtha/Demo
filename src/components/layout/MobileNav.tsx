"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { X, Sun, Moon, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-4/5 max-w-sm h-full bg-[var(--bg-primary)] border-r border-[var(--border-color)] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]">
                <Link
                  href="/"
                  onClick={onClose}
                  className="font-black text-xl tracking-tighter uppercase text-[var(--text-primary)]"
                >
                  {siteConfig.name}
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-1">
                {siteConfig.navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-3.5 px-3 rounded-xl text-base font-bold uppercase tracking-wider text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[var(--accent)]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Search Shortcut */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <span>Search Garments...</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  ⌘K
                </span>
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-[var(--border-color)] space-y-4">
              {/* Dark mode switch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Interface Theme
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] text-xs font-bold text-[var(--text-primary)] shadow-sm border border-[var(--border-color)]"
                >
                  {theme === "dark" ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>

              {/* Atelier Store Link */}
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-1"
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Flagship Ateliers: Mumbai • Delhi • Bengaluru</span>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
