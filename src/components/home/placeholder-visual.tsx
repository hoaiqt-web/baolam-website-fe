import { cn } from "@/lib/utils";

const ORIGINS = ["20% 20%", "80% 25%", "50% 75%", "15% 80%", "85% 85%", "50% 10%"];

const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CORNER_POSITIONS = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

/**
 * Stand-in for real project photography: a blueprint/topographic treatment
 * (contour rings + crop marks) instead of a fake photo, so it reads as an
 * intentional placeholder rather than a broken image.
 */
export function PlaceholderVisual({
  label,
  tag = "Ảnh minh hoạ · cập nhật sau",
  seed = 0,
  className,
}: {
  label: string;
  tag?: string;
  seed?: number;
  className?: string;
}) {
  const origin = ORIGINS[seed % ORIGINS.length];

  return (
    <div className={cn("relative isolate flex h-full w-full items-end overflow-hidden bg-[#071522]", className)}>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #0c2136 0%, #071522 55%, #030914 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at ${origin}, transparent 0px, transparent 22px, rgba(0,229,255,0.07) 23px, rgba(0,229,255,0.07) 24px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: NOISE_URL }}
      />
      {CORNER_POSITIONS.map((pos) => (
        <span key={pos} className={cn("pointer-events-none absolute z-10 size-3 border-baolam-primary/30", pos)} />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(3,9,20,0.88) 0%, rgba(3,9,20,0.12) 55%, transparent 78%)" }}
      />
      <div className="relative z-10 flex w-full flex-col gap-1.5 p-4 sm:p-6">
        {tag ? (
          <span className="w-fit rounded-full border border-white/15 bg-[#030914]/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-white/50 backdrop-blur-sm">
            {tag}
          </span>
        ) : null}
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-baolam-primary sm:text-xs">{label}</span>
      </div>
    </div>
  );
}
