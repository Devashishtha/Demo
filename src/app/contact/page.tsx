"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { MapPin, Mail, Phone, Clock, ChevronDown, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSent(true);
    showToast("Message Dispatched", "Our atelier support concierge will contact you within 4 business hours.", "success");
    setFormData({ name: "", email: "", subject: "Order Inquiry", message: "" });
    setTimeout(() => setIsSent(false), 4000);
  };

  const faqs = [
    {
      q: "How should I choose my size for the boxy drop-shoulder fit?",
      a: "Our garments are intentionally engineered with a relaxed, architectural drop-shoulder silhouette and wider chest. We strongly recommend choosing your true standard size. If you desire a traditional standard fit, you can size down.",
    },
    {
      q: "What makes 280-320 GSM French Terry superior to regular cotton?",
      a: "Standard commercial tees weigh between 140-180 GSM and lose shape quickly. Our 280-320 GSM 100% combed loopback cotton provides structural presence, resists collar sagging, and creates a clean drape that does not cling.",
    },
    {
      q: "What are your shipping and express delivery timelines in India?",
      a: "All orders placed before 2:00 PM IST are dispatched the same day from our Mumbai atelier. Delivery to metro cities takes 2-3 business days. Free express shipping is included on all orders above ₹2,499.",
    },
    {
      q: "How does the 7-day exchange process work?",
      a: "If the size or colorway doesn't match your styling needs, initiate an exchange via our portal. We arrange a doorstep courier pickup at zero additional cost and dispatch your replacement immediately.",
    },
    {
      q: "How do I care for hand-finished mineral wash garments?",
      a: "Machine wash cold inside-out with gentle liquid detergent. Do not bleach. Line dry in the shade to preserve the mineral wash finish and puff print tactile depth.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">
          ATELIER CONCIERGE
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)]">
          GET IN TOUCH.
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Have questions about sizing, limited batch releases, or private showroom appointments? We are here to assist.
        </p>
      </div>

      {/* Main Grid: Contact Form & Studio Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[var(--bg-card)] p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] shadow-xl">
          <h2 className="text-lg font-black uppercase tracking-wider text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[var(--accent)]" />
            <span>Send An Inquiry</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider font-bold text-[var(--text-muted)] text-[10px] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kabir Sharma"
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-bold text-[var(--text-muted)] text-[10px] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. kabir@example.com"
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-bold text-[var(--text-muted)] text-[10px] mb-1">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] font-medium"
              >
                <option value="Order Inquiry">Order Inquiry & Tracking</option>
                <option value="Sizing Advice">Sizing & Cut Recommendation</option>
                <option value="Showroom Appointment">Showroom Private Appointment</option>
                <option value="Press / Collaboration">Press, Media & Archival Collab</option>
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-bold text-[var(--text-muted)] text-[10px] mb-1">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Detail your inquiry..."
                className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {isSent ? (
                <span className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Message Sent Successfully
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Dispatch Inquiry
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Flagship Studios Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--border-color)] shadow-sm space-y-6">
            <h2 className="text-base font-black uppercase tracking-wider text-[var(--text-primary)]">
              Flagship Atelier Studios
            </h2>

            <div className="space-y-4">
              {siteConfig.stores.map((store) => (
                <div
                  key={store.city}
                  className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[var(--accent)]">
                      {store.city}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {store.timings}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                    <span>{store.location}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] space-y-2 text-xs text-[var(--text-secondary)]">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                <span>concierge@konigstudios.in</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent)]" />
                <span>+91 (022) 4892-0199 (Mon–Sat, 10 AM – 7 PM IST)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto pt-12 border-t border-[var(--border-color)]">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">
            HELP & PROTOCOLS
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">
            FREQUENTLY ASKED QUESTIONS.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[var(--border-color)] rounded-2xl bg-[var(--bg-card)] overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-extrabold text-xs sm:text-sm uppercase tracking-wide text-[var(--text-primary)] flex items-center justify-between gap-4 hover:bg-[var(--bg-secondary)]/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
