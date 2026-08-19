"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Compass } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-primary)] pt-6 pb-16">
      {/* Background Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] font-extrabold uppercase tracking-widest text-[var(--accent)] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Archive SS26 // 280-320 GSM Drop</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-[-0.04em] text-[var(--text-primary)] leading-[0.95]"
            >
              ARCHITECTURAL <br />
              <span className="text-[var(--accent)] italic font-serif lowercase tracking-normal">
                heavyweight
              </span>{" "}
              ESSENTIALS.
            </motion.h1>

            {/* Manifesto / Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Engineered with custom boxy silhouettes, exaggerated drop-shoulders, and hand-finished mineral washes. Crafted for those who demand structural presence without compromise.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-2xl group"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/lookbook"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold text-xs uppercase tracking-widest border border-[var(--border-color)] transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[var(--accent)]" />
                <span>View Lookbook</span>
              </Link>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-[var(--border-color)] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div>
                <p className="text-xl font-black text-[var(--text-primary)]">280+</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  GSM French Terry
                </p>
              </div>
              <div>
                <p className="text-xl font-black text-[var(--text-primary)]">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  Combed Cotton
                </p>
              </div>
              <div>
                <p className="text-xl font-black text-[var(--accent)]">₹0</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  Express Delivery
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Card */}
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=90"
                alt="KÖNIG Archival Heavyweight Washed Tee"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Product Badge Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
                    Featured Archival Piece
                  </span>
                  <h2 className="text-sm font-black uppercase tracking-tight">
                    Vintage Onyx Boxy Tee
                  </h2>
                  <p className="text-xs text-stone-300 font-bold">
                    ₹2,499 <span className="text-[10px] line-through text-stone-500 ml-1">₹3,299</span>
                  </p>
                </div>
                <Link
                  href="/products/konig-01-vintage-onyx"
                  className="p-3 rounded-xl bg-white text-black hover:bg-[var(--accent)] hover:text-white transition-colors"
                  aria-label="View product"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Floating Floating Specs Pill */}
              <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest">
                280 GSM Mineral Wash
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
