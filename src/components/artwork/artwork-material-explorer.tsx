"use client";

import { useState } from "react";
import { PlaceholderVisual } from "@/components/home/placeholder-visual";
import { cn } from "@/lib/utils";
import type { ArtworkMaterial } from "@/data/artwork-materials";

export function ArtworkMaterialExplorer({ materials }: { materials: ArtworkMaterial[] }) {
  const [active, setActive] = useState(0);
  const current = materials[active];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[40%_60%] lg:gap-12">
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:divide-y lg:divide-baolam-border lg:border-y lg:border-baolam-border">
        {materials.map((material, index) => {
          const isActive = active === index;
          return (
            <button
              key={material.slug}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-wide transition-colors lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:py-4 lg:text-left lg:text-sm",
                isActive
                  ? "border-baolam-primary bg-baolam-primary/10 text-baolam-primary"
                  : "border-white/15 text-white/50 hover:text-white lg:border-0"
              )}
            >
              {material.title}
            </button>
          );
        })}
      </div>

      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
          <PlaceholderVisual label={current.title} tag="Material & Craft" seed={active + 1} className="h-full w-full" />
        </div>
        <p className="mt-5 max-w-xl text-sm leading-[1.8] text-baolam-muted sm:text-base">{current.description}</p>
      </div>
    </div>
  );
}
