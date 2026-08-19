"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Feather, Sparkles, Box } from "lucide-react";

export function BrandStory() {
  const pillars = [
    {
      icon: Layers,
      title: "280-320 GSM French Terry",
      desc: "Twice the density of conventional streetwear tees. Holds its crisp boxy form without clinging or losing structure over time.",
    },
    {
      icon: Feather,
      title: "Carbon-Brushed Peach Finish",
      desc: "Mechanical micro-brushing gives the dense cotton a suede velvet touch against the skin while retaining industrial durability.",
    },
    {
      icon: ShieldCheck,
      title: "Anti-Sag Rib Collar",
      desc: "Engineered with 5% Lycra-infused 1.25\" ribbing and double-needle interior neck taping to prevent collar warping permanently.",
    },
    {
      icon: Box,
      title: "Matte Slide-Box Packaging",
      desc: "Every order arrives in our signature rigid matte obsidian slide box with custom archival tissue paper and numbered authenticity tag.",
    },
  ];

  return (
    <section className="py-24 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="text-xs uppercase tracking-widest font-black text-[var(--accent)] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fabric Science & Craftsmanship</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            ENGINEERED TO OUTLAST SEASONS.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            We operate at the intersection of architectural tailoring and contemporary subcultural streetwear. Every pattern is drafted from scratch to deliver the golden ratio of drop-shoulder proportions.
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent)] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[10px] font-mono uppercase text-[var(--text-muted)] font-bold">
                  <span>ATELIER SPEC 0{idx + 1}</span>
                  <span className="text-[var(--accent)]">VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
