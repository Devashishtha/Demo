"use client";

import React, { useState } from "react";
import { ProductSize } from "@/types";
import { SizeGuideModal } from "../ui/SizeGuideModal";
import { Ruler } from "lucide-react";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onSelectSize: (size: ProductSize) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-widest font-bold text-[var(--text-primary)]">
          Selected Cut: <b className="text-[var(--accent)]">{selectedSize} (Boxy Fit)</b>
        </span>
        <button
          type="button"
          onClick={() => setIsSizeGuideOpen(true)}
          className="text-xs uppercase tracking-wider font-bold text-[var(--accent)] hover:underline flex items-center gap-1.5"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Size Dimensions</span>
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2.5">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`py-3.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${
                isSelected
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-md scale-[1.02]"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>{size}</span>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-[var(--text-muted)] italic">
        * Model is 6&apos;1&quot; (185 cm) and wears size Large for signature boxy drape.
      </p>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
