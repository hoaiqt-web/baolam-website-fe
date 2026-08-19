"use client";

import { useState } from "react";
import { PlaceholderVisual } from "@/components/home/placeholder-visual";
import { cn } from "@/lib/utils";
import type { ArtworkTypology } from "@/data/artwork-typologies";

export function ArtworkTypologyExplorer({ typologies }: { typologies: ArtworkTypology[] }) {
  const [active, setActive] = useState(0);
  const current = typologies[active];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[45%_55%] lg:gap-12">
      <div className="divide-y divide-baolam-border border-y border-baolam-border">
        {typologies.map((typology, index) => {
          const isActive = active === index;
          return (
            <button
              key={typology.slug}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-expanded={isActive}
              className="group flex w-full items-baseline gap-4 py-5 text-left transition-colors sm:gap-6"
            >
              <span className={cn("text-xs font-black transition-colors", isActive ? "text-baolam-primary" : "text-white/30")}>
                {typology.n}
              </span>
              <span className="flex-1">
                <h3 className={cn("text-lg font-bold transition-colors sm:text-xl", isActive ? "text-white" : "text-white/50")}>
                  {typology.title}
                </h3>
                <p
                  className={cn(
                    "mt-1.5 max-w-md text-sm leading-[1.6] transition-all duration-300",
                    isActive ? "text-baolam-muted opacity-100" : "text-white/25 opacity-0 lg:opacity-100"
                  )}
                >
                  {typology.description}
                </p>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 lg:aspect-auto lg:h-full">
        <PlaceholderVisual label={current.title} tag="Artwork Typology" seed={active + 1} className="h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex flex-wrap gap-2">
            {current.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-baolam-border bg-[#030914]/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-baolam-primary backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
