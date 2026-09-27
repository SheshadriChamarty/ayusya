import { cn } from "@/lib/utils";

interface FarmRowProps {
  className?: string;
  /** 0 = bare furrow, 1 = fully grown. Chapter ③ scrubs this with scroll. */
  growth?: number;
}

const SPROUTS = [40, 95, 150, 205, 260];

/**
 * A furrow line with sprouts growing off it — chapter ③, where the Golden Thread
 * becomes the field.
 *
 * `growth` scales each sprout from its base. Sprouts are staggered by index so
 * they emerge in sequence rather than all at once, which reads as a row being
 * planted rather than a graphic appearing.
 */
const FarmRow = ({ className, growth = 1 }: FarmRowProps) => {
  const g = Math.min(Math.max(growth, 0), 1);

  return (
    <svg
      viewBox="0 0 300 120"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {/* The furrow — deliberately the same weight as the thread so it reads as
          a continuation of it. */}
      <path
        d="M4 92 Q78 82 150 92 T296 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Tilled soil texture below the furrow */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.35" strokeLinecap="round">
        {Array.from({ length: 14 }, (_, i) => {
          const x = 14 + i * 20;
          return <line key={x} x1={x} y1={100} x2={x + 7} y2={108} />;
        })}
      </g>

      {SPROUTS.map((x, i) => {
        // Each sprout gets its own slice of the growth range, so the row fills
        // left to right instead of every stem rising in lockstep.
        const local = Math.min(Math.max(g * SPROUTS.length - i, 0), 1);
        if (local <= 0) return null;
        return (
          <g
            key={x}
            style={{
              transform: `translate(${x}px, 92px) scale(${local})`,
              transformOrigin: "0 0",
            }}
          >
            <path d="M0 0 L0 -26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M0 -14 Q-12 -20 -14 -32 Q-4 -28 0 -16" stroke="currentColor" strokeWidth="1.3" />
            <path d="M0 -20 Q12 -26 14 -38 Q4 -34 0 -22" stroke="currentColor" strokeWidth="1.3" />
          </g>
        );
      })}
    </svg>
  );
};

export default FarmRow;
