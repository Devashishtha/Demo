"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, Check, Info } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"cm" | "in">("in");

  const measurements = [
    { size: "XS", chestIn: "42", lengthIn: "27.5", shoulderIn: "20.5", sleeveIn: "8.5", chestCm: "107", lengthCm: "70", shoulderCm: "52", sleeveCm: "21.5" },
    { size: "S", chestIn: "44", lengthIn: "28.5", shoulderIn: "21.5", sleeveIn: "9.0", chestCm: "112", lengthCm: "72", shoulderCm: "54.5", sleeveCm: "23" },
    { size: "M", chestIn: "46", lengthIn: "29.5", shoulderIn: "22.5", sleeveIn: "9.5", chestCm: "117", lengthCm: "75", shoulderCm: "57", sleeveCm: "24" },
    { size: "L", chestIn: "48", lengthIn: "30.5", shoulderIn: "23.5", sleeveIn: "10.0", chestCm: "122", lengthCm: "77.5", shoulderCm: "59.5", sleeveCm: "25.5" },
    { size: "XL", chestIn: "50", lengthIn: "31.5", shoulderIn: "24.5", sleeveIn: "10.5", chestCm: "127", lengthCm: "80", shoulderCm: "62", sleeveCm: "26.5" },
    { size: "XXL", chestIn: "52", lengthIn: "32.5", shoulderIn: "25.5", sleeveIn: "11.0", chestCm: "132", lengthCm: "82.5", shoulderCm: "65", sleeveCm: "28" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden z-10 p-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--accent)]">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    KÖNIG Boxy Fit Size Guide
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Engineered with an exaggerated drop-shoulder and relaxed chest.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Unit Switcher */}
            <div className="flex items-center justify-between my-4">
              <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium">
                Dimensions Table
              </span>
              <div className="flex bg-[var(--bg-secondary)] p-0.5 rounded-lg border border-[var(--border-color)] text-xs">
                <button
                  onClick={() => setUnit("in")}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    unit === "in"
                      ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit("cm")}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    unit === "cm"
                      ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            {/* Measurements Table */}
            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] mb-5">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] uppercase tracking-wider text-[10px] font-bold border-b border-[var(--border-color)]">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest Width</th>
                    <th className="p-3">Body Length</th>
                    <th className="p-3">Shoulder Drop</th>
                    <th className="p-3">Sleeve Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] font-medium text-[var(--text-primary)]">
                  {measurements.map((row) => (
                    <tr key={row.size} className="hover:bg-[var(--bg-secondary)]/50 transition-colors">
                      <td className="p-3 font-bold text-[var(--accent)]">{row.size}</td>
                      <td className="p-3">{unit === "in" ? `${row.chestIn}"` : `${row.chestCm} cm`}</td>
                      <td className="p-3">{unit === "in" ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                      <td className="p-3">{unit === "in" ? `${row.shoulderIn}"` : `${row.shoulderCm} cm`}</td>
                      <td className="p-3">{unit === "in" ? `${row.sleeveIn}"` : `${row.sleeveCm} cm`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fit Recommendations */}
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--border-color)] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                <Info className="w-4 h-4 text-[var(--accent)]" /> Fit & Styling Advice
              </div>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><b>True to Size:</b> Delivers our intended architectural boxy drape with a relaxed drop shoulder.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><b>Size Down:</b> If you prefer a traditional standard streetwear fit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><b>Pre-Shrunk:</b> 100% French Terry cotton washed prior to stitching; dimensions remain stable after washing.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
