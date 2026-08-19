"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { mockProducts } from "@/data/products";
import { FilterState, Product, ProductSize } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { ActiveFilters } from "@/components/shop/ActiveFilters";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { SlidersHorizontal, LayoutGrid, Grid3X3, Grid2X2, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const isNewFilter = searchParams.get("filter") === "new";

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory ? [initialCategory] : [],
    sizes: [],
    colors: [],
    fits: [],
    priceRange: [2000, 4000],
    onlyInStock: false,
    sortBy: "featured",
    searchQuery: "",
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState<2 | 3 | 4>(3);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const resetFilters = () => {
    setFilters({
      category: [],
      sizes: [],
      colors: [],
      fits: [],
      priceRange: [2000, 4000],
      onlyInStock: false,
      sortBy: "featured",
      searchQuery: "",
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    if (isNewFilter) {
      result = result.filter((p) => p.isNewArrival);
    }

    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category));
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    if (filters.fits.length > 0) {
      result = result.filter((p) => filters.fits.includes(p.fabricSpecs.fit));
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.onlyInStock) {
      result = result.filter((p) => p.stockCount > 0);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [filters, isNewFilter]);

  const gridColsClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Heading */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent)] mb-3">
          <Sparkles className="w-3 h-3" />
          <span>Full Archival Roster // SS26</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)]">
          ALL GARMENTS.
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-xl">
          Crafted from 280-320 GSM French Terry loopback cotton. Explore our signature silhouettes, tactile puff prints, and artisanal mineral washes.
        </p>
      </div>

      {/* Main Container: Sidebar + Catalog Grid */}
      <div className="flex gap-8 items-start">
        {/* Filter Sidebar (Desktop + Mobile Drawer) */}
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={resetFilters}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Catalog Main Stage */}
        <div className="flex-1 min-w-0">
          {/* Top Bar: Controls, Count, Sort, Columns */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-color)]">
            {/* Left: Product Count & Mobile Filter Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Showing <b>{filteredProducts.length}</b> Garments
              </span>
            </div>

            {/* Right: Sort & Grid Column Switcher */}
            <div className="flex items-center gap-3 ml-auto">
              <SortDropdown
                sortBy={filters.sortBy}
                onChange={(sortBy) => setFilters({ ...filters, sortBy })}
              />

              {/* Grid Column Toggles (Desktop) */}
              <div className="hidden sm:flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] p-1 rounded-full">
                <button
                  onClick={() => setColumns(2)}
                  className={`p-1.5 rounded-full transition-colors ${
                    columns === 2
                      ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label="2 Columns"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setColumns(3)}
                  className={`p-1.5 rounded-full transition-colors ${
                    columns === 3
                      ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label="3 Columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setColumns(4)}
                  className={`p-1.5 rounded-full transition-colors ${
                    columns === 4
                      ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label="4 Columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          <ActiveFilters
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
          />

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-6 ${gridColsClass}`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-8">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] mx-auto mb-4 border border-[var(--border-color)]">
                <RefreshCw className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-base font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                No Garments Found
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mt-1 leading-relaxed">
                No pieces match your currently applied filters. Try clearing some parameters to explore other archive drops.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
