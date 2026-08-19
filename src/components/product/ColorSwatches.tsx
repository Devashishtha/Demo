"use client";

import React from "react";
import { ProductColor } from "@/types";

interface ColorSwatchesProps {
  colors: ProductColor[];
  selectedColorIndex: number;
  onSelectColor: (index: number) => void;
}

export function ColorSwatches({
  colors,
  selectedColorIndex,
  onSelectColor,
}: ColorSwatchesProps) {
  const activeColor = colors[selectedColorIndex] || colors[0];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-widest font-bold text-[var(--text-primary)]">
          Garment Shade: <b className="text-[var(--accent)]">{activeColor.name}</b>
        </span>
        <span className="text-[11px] text-[var(--text-muted)]">
          {colors.length} artisanal colorways
        </span>
      </div>

      <div className="flex items-center gap-3">
        {colors.map((color, idx) => (
          <button
            key={color.name}
            onClick={() => onSelectColor(idx)}
            className={`group relative flex items-center justify-center p-0.5 rounded-full transition-all ${
              selectedColorIndex === idx
                ? "ring-2 ring-[var(--text-primary)] ring-offset-2 scale-110"
                : "opacity-80 hover:opacity-100 hover:scale-105"
            }`}
            aria-label={`Color ${color.name}`}
          >
            <span
              className="w-8 h-8 rounded-full border border-black/10 shadow-inner block"
              style={{ backgroundColor: color.hex }}
            />
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
