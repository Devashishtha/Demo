"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { X, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative z-40 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[11px] font-medium tracking-widest uppercase overflow-hidden py-2 select-none">
      <div className="flex animate-marquee whitespace-nowrap items-center gap-8">
        {siteConfig.announcements.concat(siteConfig.announcements).map((text, i) => (
          <span key={i} className="inline-flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
            <Sparkles className="w-3 h-3 text-[var(--accent)] shrink-0" />
            {text}
          </span>
        ))}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--bg-primary)] opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Close Announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
