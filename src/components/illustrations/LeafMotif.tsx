import { cn } from "@/lib/utils";

interface LeafMotifProps {
  className?: string;
  animate?: boolean;
}

/**
 * The packaging's leaf watermark, used as a section divider and ambient mark.
 * A single leaf with veins — kept to one shape so it tiles and scales without
 * turning into visual noise at watermark opacity.
 */
const LeafMotif = ({ className, animate = false }: LeafMotifProps) => (
  <svg
    viewBox="0 0 80 120"
    fill="none"
    aria-hidden="true"
    className={cn("h-full w-full", animate ? "origin-bottom animate-sway" : undefined, className)}
    style={animate ? { transformBox: "fill-box" } : undefined}
  >
    {/* Outline: two mirrored curves meeting at tip and base */}
    <path
      d="M40 8 C68 40 68 78 40 112 C12 78 12 40 40 8 Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Midrib */}
    <line x1="40" y1="12" x2="40" y2="110" stroke="currentColor" strokeWidth="1.2" />
    {/* Veins, fanning out from the midrib.
        They sweep down-and-out toward the tip and stop short of the outline. The
        earlier version curved up-and-out, which pushed the far end of each vein
        through the silhouette at the widest rows. */}
    <g stroke="currentColor" strokeWidth="0.9" opacity="0.6" strokeLinecap="round">
      {[32, 48, 64, 80, 94].map((y, i) => {
        const spread = 17 - Math.abs(i - 2) * 4;
        return (
          <g key={y}>
            <path d={`M40 ${y} Q${40 - spread * 0.7} ${y + 4} ${40 - spread} ${y + 11}`} />
            <path d={`M40 ${y} Q${40 + spread * 0.7} ${y + 4} ${40 + spread} ${y + 11}`} />
          </g>
        );
      })}
    </g>
  </svg>
);

export default LeafMotif;
