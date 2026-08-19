import { PromoCode } from "@/types";

export const siteConfig = {
  name: "KÖNIG STUDIOS",
  shortName: "KÖNIG",
  tagline: "ARCHIVAL LUXURY STREETWEAR & HEAVYWEIGHT ESSENTIALS",
  description: "Engineered in 280-320 GSM French Terry and combed cotton. Minimalist silhouettes, custom boxy cuts, and artisanal washes crafted for the modern archive.",
  url: "https://konigstudios.in",
  currency: {
    symbol: "₹",
    code: "INR",
    freeShippingThreshold: 2499, // Free shipping above ₹2,499
    standardShippingFee: 149,
    expressShippingFee: 299,
  },
  navLinks: [
    { name: "Shop All", href: "/shop" },
    { name: "New Drops", href: "/shop?filter=new" },
    { name: "Heavyweight", href: "/shop?category=heavyweight" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "Atelier / About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  announcements: [
    "FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹2,499",
    "ARCHIVE SS26 // 280 GSM FRENCH TERRY NOW LIVE",
    "LIMITED BATCHES • ETHICALLY CRAFTED • ZERO COMPROMISE",
    "USE CODE 'KÖNIG10' FOR 10% OFF YOUR FIRST PURCHASE",
  ],
  promoCodes: [
    {
      code: "KÖNIG10",
      discountType: "percentage",
      value: 10,
      description: "10% OFF your entire order",
    },
    {
      code: "KONIG10",
      discountType: "percentage",
      value: 10,
      description: "10% OFF your entire order",
    },
    {
      code: "KOENIG10",
      discountType: "percentage",
      value: 10,
      description: "10% OFF your entire order",
    },
    {
      code: "STREETWEAR",
      discountType: "fixed",
      value: 500,
      minSpend: 2999,
      description: "₹500 OFF on orders above ₹2,999",
    },
    {
      code: "FREESHIP",
      discountType: "fixed",
      value: 149,
      description: "Free Standard Shipping applied",
    },
  ] as PromoCode[],
  socials: {
    instagram: "https://instagram.com/konigstudios",
    twitter: "https://twitter.com/konigstudios",
    tiktok: "https://tiktok.com/@konigstudios",
    youtube: "https://youtube.com/@konigstudios",
  },
  stores: [
    {
      city: "MUMBAI",
      location: "Kala Ghoda Art Precinct, Fort",
      timings: "11:00 AM – 9:00 PM",
    },
    {
      city: "NEW DELHI",
      location: "The Dhan Mill, Chhatarpur",
      timings: "11:00 AM – 9:00 PM",
    },
    {
      city: "BENGALURU",
      location: "Indiranagar 100ft Road",
      timings: "11:00 AM – 9:30 PM",
    },
    {
      city: "TOKYO",
      location: "Aoyama 5-Chome, Minato-ku",
      timings: "12:00 PM – 8:00 PM",
    },
  ],
};
