"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockProducts } from "@/data/products";
import { Product } from "@/types";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { Sparkles, ShoppingBag, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LookbookPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const lookbookItems = [
    {
      id: "look-01",
      title: "LOOK 01 // ARCHIVAL MINERAL MONOCHROME",
      subtitle: "Vintage Onyx Washed Tee paired with relaxed raw-hem denim.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=90",
      featuredProduct: mockProducts[0],
      location: "Bandra Fort Arch, Mumbai",
    },
    {
      id: "look-02",
      title: "LOOK 02 // BONE BRUTALISM & PUFF GRAPHICS",
      subtitle: "Sculptural Archival Puff Tee with double-pleated charcoal trousers.",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&auto=format&fit=crop&q=90",
      featuredProduct: mockProducts[1],
      location: "Dhan Mill Complex, New Delhi",
    },
    {
      id: "look-03",
      title: "LOOK 03 // SMOKED MOSS ACID DISTRESS",
      subtitle: "Acid-Wash Archival Distress Tee styled with washed olive fatigue cargo shorts.",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&auto=format&fit=crop&q=90",
      featuredProduct: mockProducts[2],
      location: "Indiranagar Rooftop, Bengaluru",
    },
    {
      id: "look-04",
      title: "LOOK 04 // TONAL ATELIER EMBROIDERY",
      subtitle: "Midnight Navy Micro-Embroidered Tee layered under heavy Japanese overshirt.",
      image: "https://images.unsplash.com/photo-1618354691438-25bc04584c03?w=1200&auto=format&fit=crop&q=90",
      featuredProduct: mockProducts[3],
      location: "Kala Ghoda Heritage Quarter, Mumbai",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Spring/Summer 2026 Editorial</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[var(--text-primary)]">
          THE LOOKBOOK ARCHIVE.
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
          Captured on location across Mumbai and New Delhi. Explore how our architectural boxy cuts interact with natural movement and contemporary layering.
        </p>
      </div>

      {/* Lookbook Editorial Grid */}
      <div className="space-y-20">
        {lookbookItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Column */}
            <div className={`lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl group ${
              idx % 2 !== 0 ? "lg:order-2" : ""
            }`}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />

              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-widest">
                {item.location}
              </div>

              <button
                onClick={() => setSelectedProduct(item.featuredProduct)}
                className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--accent)] hover:text-white transition-all shadow-2xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop This Look</span>
              </button>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-4 space-y-6 ${
              idx % 2 !== 0 ? "lg:order-1" : ""
            }`}>
              <div>
                <span className="text-xs font-mono font-bold text-[var(--accent)] tracking-widest uppercase">
                  LOOK 0{idx + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-primary)] mt-1">
                  {item.title.split("//")[1] || item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {/* Garment Card Summary */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[var(--bg-secondary)] shrink-0">
                    <Image
                      src={item.featuredProduct.images[0]}
                      alt={item.featuredProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[var(--text-primary)] truncate max-w-[150px]">
                      {item.featuredProduct.name}
                    </p>
                    <p className="text-xs font-bold text-[var(--accent)]">
                      ₹{item.featuredProduct.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      {item.featuredProduct.fabricSpecs.gsm} GSM Combed Cotton
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedProduct(item.featuredProduct)}
                    className="p-2 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] transition-colors"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/products/${item.featuredProduct.id}`}
                    className="p-2 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity"
                    aria-label="Product Page"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
