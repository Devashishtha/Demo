"use client";

import React, { useState } from "react";
import { mockReviews } from "@/data/reviews";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % mockReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + mockReviews.length) % mockReviews.length);
  };

  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-[var(--accent)] mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Collector Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              TESTIMONIALS & FIT REVIEWS.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Rated 4.9/5 across 600+ verified customer dispatches across India.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews Grid (Desktop) and Carousel (Mobile/Interactive) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.slice(0, 3).map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[var(--border-subtle)] pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <h3 className="text-sm font-extrabold text-[var(--text-primary)] mb-2">
                  &quot;{review.title}&quot;
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-[var(--text-primary)] flex items-center gap-1.5">
                    <span>{review.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    {review.location} • Size {review.sizePurchased}
                  </p>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--bg-secondary)] text-[var(--accent)] border border-[var(--border-color)]">
                  {review.fitFeedback}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
