import { cn } from "@/lib/utils";

interface SunProps {
  className?: string;
  /** Animate the ray ring. Callers pass the reduced-motion gate here. */
  animate?: boolean;
}

/**
 * The recurring brand motif — bronze line-art sun in the packaging's stamp style.
 *
 * Rays sit in their own <g> so only that group rotates; the core and inner ring
 * stay put. Rotating the whole illustration would make the core wobble against
 * its own outline at any anti-aliased angle.
 */
const Sun = ({ className, animate = true }: SunProps) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    aria-hidden="true"
    className={cn("h-full w-full", className)}
  >
    <g
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={animate ? "origin-center animate-sun-rotate" : "origin-center"}
      style={{ transformBox: "fill-box" }}
    >
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 16;
        // Alternating ray lengths keep the ring from reading as a gear.
        const inner = 40;
        const outer = i % 2 === 0 ? 55 : 48;
        return (
          <line
            key={i}
            x1={60 + Math.cos(angle) * inner}
            y1={60 + Math.sin(angle) * inner}
            x2={60 + Math.cos(angle) * outer}
            y2={60 + Math.sin(angle) * outer}
          />
        );
      })}
    </g>

    <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="1.8" />
    <circle
      cx="60"
      cy="60"
      r="25"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 4"
      opacity="0.55"
      className={animate ? "animate-sun-pulse" : undefined}
    />
  </svg>
);

export default Sun;
