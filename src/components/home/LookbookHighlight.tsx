"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockProducts } from "@/data/products";
import { ArrowRight, Plus, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LookbookHighlight() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const hotspots = [
    {
      id: 0,
      x: "48%",
      y: "40%",
      productId: "konig-01-vintage-onyx",
      product: mockProducts[0],
    },
    {
      id: 1,
      x: "65%",
      y: "65%",
      productId: "konig-03-acid-smoked-moss",
      product: mockProducts[2],
    },
  ];

  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Editorial Image */}
          <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1400&auto=format&fit=crop&q=90"
              alt="KÖNIG SS26 Streetwear Lookbook"
              fill
              className="object-cover"
            />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute z-20"
                style={{ top: spot.y, left: spot.x }}
              >
                <button
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  className="relative p-2 rounded-full bg-black/80 text-white border border-white/40 shadow-xl hover:scale-110 transition-transform group"
                  aria-label="View hotspot product"
                >
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-75" />
                  {activeHotspot === spot.id ? (
                    <X className="w-3.5 h-3.5 relative z-10" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 relative z-10" />
                  )}
                </button>

                {/* Hotspot Floating Popover */}
                <AnimatePresence>
                  {activeHotspot === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-12 -left-20 sm:left-0 w-64 p-3.5 rounded-2xl bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-2xl z-30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[var(--bg-secondary)] shrink-0">
                          <Image
                            src={spot.product.images[0]}
                            alt={spot.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--accent)] block">
                            {spot.product.fabricSpecs.gsm} GSM
                          </span>
                          <p className="text-xs font-bold truncate">
                            {spot.product.name}
                          </p>
                          <p className="text-xs font-extrabold mt-0.5">
                            ₹{spot.product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/products/${spot.product.id}`}
                        className="mt-2.5 w-full py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>View Piece</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest">
              Interactive Lookbook // Tap + To Inspect
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest font-black text-[var(--accent)]">
              ATELIER ARCHIVE SS26
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-tight">
              SCULPTED SILHOUETTES, ZERO EXCESS.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              We reject the thin, synthetic, flimsy tees that flood commercial retail. Every KÖNIG garment begins at the raw yarn stage in Tamil Nadu & Jaipur — custom loopback knits weighted at 280-320 GSM that hang with architectural authority.
            </p>

            <div className="space-y-3 border-y border-[var(--border-color)] py-6">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                <span>01. Anti-Bacon Ribbed Collar (35mm)</span>
                <span className="text-[var(--accent)]">Reinforced</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                <span>02. Drop-Shoulder Structural Pattern</span>
                <span className="text-[var(--accent)]">Signature</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                <span>03. Vintage Mineral Enzyme Wash</span>
                <span className="text-[var(--accent)]">Hand-Pumiced</span>
              </div>
            </div>

            <Link
              href="/lookbook"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
            >
              <span>Explore Editorial Lookbook</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
