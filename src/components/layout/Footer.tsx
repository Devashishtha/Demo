"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUp, ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border-color)] text-[var(--text-primary)]">
      {/* Value Badges Banner */}
      <div className="border-b border-[var(--border-color)] py-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--accent)] border border-[var(--border-color)] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Free Express Delivery</p>
              <p className="text-[11px] text-[var(--text-muted)]">On all orders above ₹2,499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--accent)] border border-[var(--border-color)] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">7-Day Free Exchange</p>
              <p className="text-[11px] text-[var(--text-muted)]">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--accent)] border border-[var(--border-color)] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">280 GSM Heavyweight</p>
              <p className="text-[11px] text-[var(--text-muted)]">100% Combed French Terry</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--accent)] border border-[var(--border-color)] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">100% Secure UPI & Card</p>
              <p className="text-[11px] text-[var(--text-muted)]">256-bit encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="font-black text-2xl tracking-tighter uppercase text-[var(--text-primary)] font-display"
            >
              {siteConfig.name}
            </Link>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
              HEADQUARTERS: FORT, MUMBAI • 400 001
            </div>

            {/* Social Icons (Inline SVGs) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-color)] transition-all flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--bg-primary)]"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-color)] transition-all flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--bg-primary)]"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-color)] transition-all flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--bg-primary)]"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Collection Col */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">
              Collections
            </p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
              <li>
                <Link href="/shop" className="hover:text-[var(--text-primary)] transition-colors">
                  Shop All Releases
                </Link>
              </li>
              <li>
                <Link href="/shop?category=heavyweight" className="hover:text-[var(--text-primary)] transition-colors">
                  280 GSM French Terry
                </Link>
              </li>
              <li>
                <Link href="/shop?category=acid-wash" className="hover:text-[var(--text-primary)] transition-colors">
                  Acid & Mineral Washes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=graphic" className="hover:text-[var(--text-primary)] transition-colors">
                  Tactile Puff Prints
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-[var(--text-primary)] transition-colors">
                  SS26 Atelier Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Col */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">
              The Brand
            </p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
              <li>
                <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">
                  Atelier Philosophy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">
                  280 GSM Fabric Science
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Flagship Studios (Mumbai/Delhi)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">
                  Ethical Manufacturing
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Col */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">
              Client Support
            </p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
              <li>
                <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Order Tracking & Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Shipping & Customs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Exchange & Return Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Authenticity Verification
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              UPI • RuPay • Visa • Mastercard • Apple Pay
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
