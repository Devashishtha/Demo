"use client";

import React from "react";
import { FilterState, ProductSize } from "@/types";
import { X, RotateCcw, Check, Sparkles } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  isOpenMobile = false,
  onCloseMobile,
}: FilterSidebarProps) {
  const categories = [
    { id: "heavyweight", label: "Heavyweight (280-320 GSM)" },
    { id: "graphic", label: "Tactile Puff & Graphic" },
    { id: "acid-wash", label: "Acid & Mineral Washes" },
    { id: "atelier", label: "Atelier Limited" },
    { id: "minimalist", label: "Minimalist Essentials" },
  ];

  const sizes: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

  const fits = [
    "Boxy Drop-Shoulder",
    "Oversized",
    "Archival Heavyweight",
    "Relaxed",
  ];

  const colors = [
    { name: "Vintage Onyx", hex: "#1A1A1A" },
    { name: "Bone Cream", hex: "#EAE5D9" },
    { name: "Smoked Moss", hex: "#4A5243" },
    { name: "Midnight Navy", hex: "#141D2B" },
    { name: "Phantom Black", hex: "#0D0D0D" },
    { name: "Terracotta Rust", hex: "#9E4738" },
    { name: "Chalk White", hex: "#FAF8F2" },
    { name: "Slate Grey", hex: "#595F69" },
  ];

  const toggleCategory = (catId: string) => {
    const updated = filters.category.includes(catId)
      ? filters.category.filter((c) => c !== catId)
      : [...filters.category, catId];
    onFilterChange({ ...filters, category: updated });
  };

  const toggleSize = (size: ProductSize) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const toggleFit = (fit: string) => {
    const updated = filters.fits.includes(fit)
      ? filters.fits.filter((f) => f !== fit)
      : [...filters.fits, fit];
    onFilterChange({ ...filters, fits: updated });
  };

  const toggleColor = (colorName: string) => {
    const updated = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  const content = (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
        <span className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">
          Refine Garments
        </span>
        <button
          onClick={onReset}
          className="text-[11px] uppercase tracking-wider font-bold text-[var(--accent)] hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider font-extrabold text-[var(--text-primary)] block">
          Garment Category
        </label>
        <div className="space-y-2">
          {categories.map((cat) => {
            const isSelected = filters.category.includes(cat.id);
            return (
              <label
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-primary)]"
                      : "border-[var(--border-color)] bg-[var(--bg-secondary)]"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
                <span className={isSelected ? "font-bold text-[var(--text-primary)]" : ""}>
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sizes Filter */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider font-extrabold text-[var(--text-primary)] block">
          Available Size
        </label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`py-2 rounded-lg border text-xs font-black uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-sm"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Silhouette & Fit Filter */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider font-extrabold text-[var(--text-primary)] block">
          Silhouette Pattern
        </label>
        <div className="space-y-2">
          {fits.map((fit) => {
            const isSelected = filters.fits.includes(fit);
            return (
              <label
                key={fit}
                onClick={() => toggleFit(fit)}
                className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-primary)]"
                      : "border-[var(--border-color)] bg-[var(--bg-secondary)]"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
                <span className={isSelected ? "font-bold text-[var(--text-primary)]" : ""}>
                  {fit}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Colors Filter */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider font-extrabold text-[var(--text-primary)] block">
          Colorway Shade
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isSelected = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-sm"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-muted)]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
          <span>Max Price</span>
          <span className="text-[var(--accent)] font-black">
            ₹{filters.priceRange[1].toLocaleString("en-IN")}
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={4000}
          step={100}
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], Number(e.target.value)],
            })
          }
          className="w-full accent-[var(--accent)] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>₹2,000</span>
          <span>₹4,000</span>
        </div>
      </div>

      {/* In Stock Only */}
      <div className="pt-2 border-t border-[var(--border-color)]">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
            In-Stock Garments Only
          </span>
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) =>
              onFilterChange({ ...filters, onlyInStock: e.target.checked })
            }
            className="w-4 h-4 rounded accent-[var(--accent)] cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[var(--bg-card)] p-6 rounded-3xl border border-[var(--border-color)] h-fit sticky top-24 shadow-sm">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[var(--bg-primary)] p-6 overflow-y-auto shadow-2xl z-10 border-l border-[var(--border-color)]">
            <div className="flex justify-end mb-4">
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
