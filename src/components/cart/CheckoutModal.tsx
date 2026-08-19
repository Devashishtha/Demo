"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  PackageCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    subtotal,
    discountAmount,
    shippingFee,
    totalPrice,
    appliedPromo,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    address: "B-402, Signature Towers, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#9E2A2B", "#0F0F0F", "#D4AF37", "#2D3A2F"],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder = "KNG-" + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep("success");
      triggerConfetti();
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    closeCheckout();
    setTimeout(() => {
      setStep("details");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === "success" ? handleClose : undefined}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                <div>
                  <h2 className="text-base font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                    {step === "success" ? "Order Confirmed" : "KÖNIG Express Checkout"}
                  </h2>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {step === "success"
                      ? "Your luxury streetwear order is being prepared."
                      : "Direct Atelier Dispatch • 100% Secure"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1 & 2: Details & Payment */}
            {step !== "success" && (
              <div className="p-6 max-h-[75vh] overflow-y-auto">
                {/* Order Summary Mini Box */}
                <div className="mb-6 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    <span>Selected Garments ({items.length})</span>
                    <span className="text-[var(--accent)] font-extrabold">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-[var(--border-color)] bg-[var(--bg-card)]"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute bottom-0 right-0 bg-black text-white text-[9px] font-bold px-1 rounded-tl">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--text-primary)] mb-3">
                      1. Delivery Address (India)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[var(--text-muted)] uppercase tracking-wider text-[10px] font-bold mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[var(--text-muted)] uppercase tracking-wider text-[10px] font-bold mb-1">
                          Phone (for delivery SMS)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[var(--text-muted)] uppercase tracking-wider text-[10px] font-bold mb-1">
                          Street Address / Landmark
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[var(--text-muted)] uppercase tracking-wider text-[10px] font-bold mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[var(--text-muted)] uppercase tracking-wider text-[10px] font-bold mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) =>
                            setFormData({ ...formData, pincode: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--text-primary)] mb-3">
                      2. Payment Method
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                          paymentMethod === "upi"
                            ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--text-primary)] shadow-sm ring-1 ring-[var(--accent)]"
                            : "border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
                        }`}
                      >
                        <QrCode className="w-5 h-5 text-[var(--accent)]" />
                        <span className="text-xs font-bold uppercase tracking-wider">UPI / QR</span>
                        <span className="text-[9px] text-[var(--text-muted)]">GPay, PhonePe, Paytm</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                          paymentMethod === "card"
                            ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--text-primary)] shadow-sm ring-1 ring-[var(--accent)]"
                            : "border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-[var(--accent)]" />
                        <span className="text-xs font-bold uppercase tracking-wider">Card</span>
                        <span className="text-[9px] text-[var(--text-muted)]">Visa, MC, RuPay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                          paymentMethod === "cod"
                            ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--text-primary)] shadow-sm ring-1 ring-[var(--accent)]"
                            : "border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
                        }`}
                      >
                        <Banknote className="w-5 h-5 text-[var(--accent)]" />
                        <span className="text-xs font-bold uppercase tracking-wider">Cash on Delivery</span>
                        <span className="text-[9px] text-[var(--text-muted)]">Pay on arrival</span>
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Securing Order with Atelier...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Place Order • ₹{totalPrice.toLocaleString("en-IN")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Success Screen */}
            {step === "success" && (
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-3 border border-[var(--border-color)]">
                    <Sparkles className="w-3.5 h-3.5" /> Confirmed Order #{orderNumber}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">
                    Thank You for Your Order
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mt-2 leading-relaxed">
                    A confirmation SMS & email have been dispatched to <b>{formData.email}</b>. Your order is scheduled for dispatch from our Mumbai atelier within 24 hours.
                  </p>
                </div>

                <div className="bg-[var(--bg-secondary)] rounded-2xl p-5 border border-[var(--border-color)] text-left space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5 font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    <span className="flex items-center gap-2">
                      <PackageCheck className="w-4 h-4 text-emerald-500" />
                      Estimated Delivery
                    </span>
                    <span>2-3 Business Days</span>
                  </div>
                  <div className="text-[var(--text-secondary)] space-y-1">
                    <p><b>Recipient:</b> {formData.fullName} ({formData.phone})</p>
                    <p><b>Address:</b> {formData.address}, {formData.city} - {formData.pincode}</p>
                    <p><b>Payment:</b> {paymentMethod.toUpperCase()} (₹{totalPrice.toLocaleString("en-IN")})</p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
