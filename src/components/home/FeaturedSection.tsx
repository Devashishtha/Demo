"use client";

import React, { useState } from "react";
import { mockProducts } from "@/data/products";
import { Product } from "@/types";
import { ProductCard } from "../product/ProductCard";
import { QuickViewModal } from "../ui/QuickViewModal";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { id: "all", label: "All Releases" },
    { id: "heavyweight", label: "280-320 GSM Heavy" },
    { id: "graphic", label: "Puff & Graphic" },
    { id: "acid-wash", label: "Archival Washes" },
    { id: "atelier", label: "Atelier Limited" },
  ];

  const filteredProducts = activeCategory === "all"
    ? mockProducts
    : mockProducts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-[var(--accent)] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Archival Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              FEATURED DROPS.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-lg">
              Each garment is cut from bespoke heavyweight cotton and finished with custom reactive washes.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>View All Pieces ({mockProducts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-md"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid with Framer Motion layout animations */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
              priority={idx < 4}
            />
          ))}
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
