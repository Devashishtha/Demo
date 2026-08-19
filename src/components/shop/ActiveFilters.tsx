"use client";

import React from "react";
import { FilterState, ProductSize } from "@/types";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function ActiveFilters({
  filters,
  onFilterChange,
  onReset,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.category.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.fits.length > 0 ||
    filters.priceRange[1] < 4000 ||
    filters.onlyInStock ||
    filters.searchQuery !== "";

  if (!hasActiveFilters) return null;

  const removeCategory = (cat: string) => {
    onFilterChange({
      ...filters,
      category: filters.category.filter((c) => c !== cat),
    });
  };

  const removeSize = (size: ProductSize) => {
    onFilterChange({
      ...filters,
      sizes: filters.sizes.filter((s) => s !== size),
    });
  };

  const removeColor = (color: string) => {
    onFilterChange({
      ...filters,
      colors: filters.colors.filter((c) => c !== color),
    });
  };

  const removeFit = (fit: string) => {
    onFilterChange({
      ...filters,
      fits: filters.fits.filter((f) => f !== fit),
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mr-1">
        Active Filters:
      </span>

      {filters.category.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]"
        >
          <span className="capitalize">{cat}</span>
          <button
            onClick={() => removeCategory(cat)}
            className="text-[var(--text-muted)] hover:text-rose-500"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.sizes.map((size) => (
        <span
          key={size}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]"
        >
          <span>Size {size}</span>
          <button
            onClick={() => removeSize(size)}
            className="text-[var(--text-muted)] hover:text-rose-500"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.colors.map((color) => (
        <span
          key={color}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]"
        >
          <span>{color}</span>
          <button
            onClick={() => removeColor(color)}
            className="text-[var(--text-muted)] hover:text-rose-500"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.fits.map((fit) => (
        <span
          key={fit}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]"
        >
          <span>{fit}</span>
          <button
            onClick={() => removeFit(fit)}
            className="text-[var(--text-muted)] hover:text-rose-500"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filters.priceRange[1] < 4000 && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
          <span>Max ₹{filters.priceRange[1]}</span>
          <button
            onClick={() =>
              onFilterChange({ ...filters, priceRange: [2000, 4000] })
            }
            className="text-[var(--text-muted)] hover:text-rose-500"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filters.onlyInStock && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
          <span>In Stock</span>
          <button
            onClick={() => onFilterChange({ ...filters, onlyInStock: false })}
            className="text-[var(--text-muted)] hover:text-rose-500"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      <button
        onClick={onReset}
        className="text-xs uppercase font-extrabold tracking-wider text-[var(--accent)] hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
}
