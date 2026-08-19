export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  fabricSpecs: {
    gsm: number;
    material: string;
    fit: "Oversized" | "Boxy Drop-Shoulder" | "Relaxed" | "Archival Heavyweight";
    treatment: string;
    origin: string;
  };
  sizes: ProductSize[];
  colors: ProductColor[];
  images: string[];
  category: "heavyweight" | "acid-wash" | "graphic" | "minimalist" | "atelier";
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLimited?: boolean;
  stockCount: number;
}

export interface CartItem {
  id: string; // generated unique id: `${product.id}-${size}-${color.name}`
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: ProductSize;
  color: ProductColor;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: number;
}

export interface FilterState {
  category: string[];
  sizes: ProductSize[];
  colors: string[];
  fits: string[];
  priceRange: [number, number];
  onlyInStock: boolean;
  sortBy: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  searchQuery: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: ProductSize;
  heightWeight?: string;
  fitFeedback: "Runs Small" | "True to Size (Boxy)" | "Slightly Oversized" | "Perfect Heavyweight Fit";
}

export interface PromoCode {
  code: string;
  discountType: "percentage" | "fixed";
  value: number; // e.g. 10 for 10% or 500 for ₹500
  minSpend?: number;
  description: string;
}
