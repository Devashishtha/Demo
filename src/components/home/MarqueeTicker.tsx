"use client";

import React from "react";

export function MarqueeTicker() {
  const items = [
    "280 GSM HEAVYWEIGHT FRENCH TERRY",
    "CUSTOM BOXY DROP-SHOULDER CUT",
    "HAND-FINISHED VINTAGE MINERAL WASHES",
    "PRE-SHRUNK ZERO WARP COLLARS",
    "MADE IN INDIA • WORLDWIDE SHIPPING",
    "LIMITED ATELIER PRODUCTION RUNS",
  ];

  return (
    <div className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-4 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap items-center gap-12 text-xs font-black uppercase tracking-[0.25em] text-[var(--text-secondary)]">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
