"use client";

import React, { useState, useRef, useEffect } from "react";
import { FilterState } from "@/types";
import { ChevronDown, ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  sortBy: FilterState["sortBy"];
  onChange: (sort: FilterState["sortBy"]) => void;
}

export function SortDropdown({ sortBy, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { id: FilterState["sortBy"]; label: string }[] = [
    { id: "featured", label: "Featured Curations" },
    { id: "newest", label: "Newest Drops" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "rating", label: "Highest Rated (4.9+)" },
  ];

  const currentLabel = options.find((o) => o.id === sortBy)?.label || "Sort By";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all shadow-sm"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-[var(--accent)]" />
        <span>{currentLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl py-2 z-30">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors ${
                sortBy === opt.id
                  ? "bg-[var(--bg-secondary)] text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
