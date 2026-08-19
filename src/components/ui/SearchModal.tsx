"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { mockProducts } from "@/data/products";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim() === ""
    ? []
    : mockProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase())
      );

  const popularTags = ["Heavyweight", "Acid Wash", "Boxy Fit", "280 GSM", "Puff Print", "Vintage Onyx"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)]">
              <Search className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search heavyweight tees, archival washes, fits..."
                className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] text-base sm:text-lg focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs uppercase tracking-widest px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                ESC
              </button>
            </div>

            {/* Content Area */}
            <div className="max-h-[60vh] overflow-y-auto p-5">
              {query.trim() === "" ? (
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                    Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-3">
                    Archival Curations
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockProducts.slice(0, 4).map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors group"
                      >
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[var(--bg-secondary)] shrink-0">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">
                            ₹{p.price.toLocaleString("en-IN")} • {p.fabricSpecs.gsm} GSM
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    {filteredProducts.length} pieces found for &quot;{query}&quot;
                  </p>
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-color)] transition-all group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-[var(--bg-secondary)] shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] truncate">
                            {product.fabricSpecs.fit} • {product.fabricSpecs.gsm} GSM Combed Cotton
                          </p>
                          <p className="text-xs font-bold text-[var(--text-primary)] mt-1">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm text-[var(--text-secondary)] font-medium">
                    No garments matching &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Try searching for &apos;Heavyweight&apos;, &apos;Boxy&apos;, or &apos;Vintage&apos;.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Press <b>ESC</b> or click outside to dismiss</span>
              <Link
                href="/shop"
                onClick={onClose}
                className="font-medium text-[var(--text-primary)] hover:underline flex items-center gap-1"
              >
                Browse All Pieces <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
