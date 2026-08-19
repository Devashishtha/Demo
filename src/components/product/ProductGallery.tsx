"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  activeImageIndex?: number;
  onImageChange?: (idx: number) => void;
}

export function ProductGallery({
  images,
  productName,
  activeImageIndex = 0,
  onImageChange,
}: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(activeImageIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const currentIdx = onImageChange ? activeImageIndex : selectedIdx;
  const setIdx = (idx: number) => {
    if (onImageChange) onImageChange(idx);
    else setSelectedIdx(idx);
  };

  const handleNext = () => {
    setIdx((currentIdx + 1) % images.length);
  };

  const handlePrev = () => {
    setIdx((currentIdx - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails Sidebar */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 shrink-0">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setIdx(idx)}
            className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-[var(--bg-secondary)] border transition-all shrink-0 ${
              currentIdx === idx
                ? "border-[var(--text-primary)] ring-2 ring-[var(--text-primary)] ring-offset-2 scale-105"
                : "border-[var(--border-color)] opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] group">
        <div
          className="relative w-full h-full cursor-crosshair overflow-hidden"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIdx] || images[0]}
                alt={productName}
                fill
                priority
                className={`object-cover transition-transform duration-200 ${
                  isZooming ? "scale-125" : "scale-100"
                }`}
                style={
                  isZooming
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lightbox / Expand icon */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
          aria-label="Open fullscreen image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Slider Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image index counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-[10px] font-bold tracking-widest backdrop-blur-md">
          {currentIdx + 1} / {images.length}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl max-h-[85vh] aspect-[3/4]">
              <Image
                src={images[currentIdx]}
                alt={productName}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
