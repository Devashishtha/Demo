import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { LookbookHighlight } from "@/components/home/LookbookHighlight";
import { BrandStory } from "@/components/home/BrandStory";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <MarqueeTicker />
      <FeaturedSection />
      <LookbookHighlight />
      <BrandStory />
      <ReviewsSection />
      <Newsletter />
    </main>
  );
}
