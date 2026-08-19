"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowRight, Sparkles, Copy, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "@/context/ToastContext";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#9E2A2B", "#0F0F0F", "#D4AF37"],
      });
    } catch (err) {
      console.error(err);
    }
    showToast("VIP Access Granted", "Welcome to KÖNIG Archival Club. Your ₹500 discount code is ready.", "success");
  };

  const copyCode = () => {
    navigator.clipboard.writeText("KÖNIG10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("Copied to Clipboard", "Code KÖNIG10 copied!", "info");
  };

  return (
    <section className="py-24 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-14 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Radial */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-light),transparent_70%)] pointer-events-none opacity-50" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent)]">
              <Sparkles className="w-3 h-3" />
              <span>Priority Drop Access</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              JOIN THE ARCHIVE CLUB.
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Subscribe to receive private 24-hour early access to limited batch releases, exclusive sample sale invites, and <b>10% off your first acquisition</b>.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="pt-4 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
                >
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your personal email"
                      className="w-full pl-11 pr-4 py-3.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] focus:ring-2 focus:ring-[var(--text-primary)]/10 transition-all font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shrink-0"
                  >
                    <span>Unlock 10%</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                >
                  <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Welcome to the Atelier Archive</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Use your exclusive welcome discount at checkout:
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <code className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-emerald-500/30 text-base font-mono font-black text-[var(--text-primary)] tracking-widest select-all">
                      KÖNIG10
                    </code>
                    <button
                      onClick={copyCode}
                      className="p-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-opacity"
                      aria-label="Copy coupon code"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              Zero Spam • Unsubscribe at Any Moment • Direct Atelier Communications
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
