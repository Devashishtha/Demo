"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Layers, ShieldCheck, Box, Compass, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "2024",
      title: "The Zero-Tolerance Protocol",
      description: "Founded in Mumbai out of frustration with flimsy 160 GSM commercial streetwear tees. We built our proprietary 280 GSM French Terry loopback standard with zero synthetic blends.",
    },
    {
      year: "2025",
      title: "The Kala Ghoda Atelier",
      description: "Established our physical flagship studio in South Mumbai, uniting master pattern cutters, artisan screen printers, and garment dyers under one roof.",
    },
    {
      year: "2026",
      title: "Global Streetwear Archiving",
      description: "Expanded our numbered seasonal drops to tastemakers across Mumbai, Delhi, Bengaluru, Tokyo, and London.",
    },
  ];

  return (
    <div className="bg-[var(--bg-primary)]">
      {/* Hero Banner */}
      <section className="py-20 sm:py-28 border-b border-[var(--border-color)] relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            WE DO NOT MAKE BASIC TEES.
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-medium">
            KÖNIG was created to reject the disposable fashion cycle. We craft heavyweight architectural silhouettes designed to improve with age, wash, and wear.
          </p>
        </div>
      </section>

      {/* Editorial Dual-Photo Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&auto=format&fit=crop&q=90"
              alt="Atelier Craftsmanship"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                Pattern Drafting
              </p>
              <p className="text-xs font-bold uppercase mt-0.5">
                Bespoke Boxy Drop-Shoulder Ratio
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1200&auto=format&fit=crop&q=90"
              alt="Artisanal Dyeing Process"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                Hand-Finished Washes
              </p>
              <p className="text-xs font-bold uppercase mt-0.5">
                4-Hour Mineral Stone Pumice Treatment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Science */}
      <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">
              THE 280 GSM STANDARD
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              FABRIC SCIENCE & MATERIAL RIGOR.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Why our garments feel distinctly heavier, smoother, and more architectural than anything else in your wardrobe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-3">
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] text-[var(--accent)] w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                Custom French Terry Loopback
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Knitted from 100% compact ring-spun organic cotton with microscopic interior loops for thermal breathability and dense exterior drape.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-3">
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] text-[var(--accent)] w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                Anti-Warp 35mm Collar
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Double-needle bound 1x1 rib with elastane memory fibers. Engineered to maintain its tight, structured neckline after 50+ wash cycles.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-3">
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] text-[var(--accent)] w-fit">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                Ethical Atelier Craft
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Manufactured exclusively in audited craft studios in Mumbai, Jaipur, and Tirupur with fair living wages and certified zero-discharge water recycling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">
            CHRONOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            THE ARCHIVAL TIMELINE.
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-[var(--border-color)]">
          {milestones.map((item, idx) => (
            <div
              key={item.year}
              className={`relative flex flex-col sm:flex-row gap-6 items-start sm:items-center ${
                idx % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="sm:w-1/2 pl-10 sm:pl-0 sm:pr-8 text-left sm:text-right">
                {idx % 2 === 0 ? (
                  <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm text-left">
                    <span className="text-xs font-mono font-black text-[var(--accent)]">
                      {item.year}
                    </span>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--text-primary)] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Node Marker */}
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--text-primary)] border-4 border-[var(--bg-primary)] shadow-md z-10" />

              <div className="sm:w-1/2 pl-10 sm:pl-8 text-left">
                {idx % 2 !== 0 ? (
                  <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
                    <span className="text-xs font-mono font-black text-[var(--accent)]">
                      {item.year}
                    </span>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--text-primary)] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl"
          >
            <span>Explore The Current Release</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
