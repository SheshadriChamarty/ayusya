import { cn } from "@/lib/utils";

interface SolarTunnelProps {
  className?: string;
  animate?: boolean;
  /**
   * 0 = fresh slices, 1 = fully dried.
   * Chapter ④ scrubs this with scroll so the drying visibly happens.
   */
  dryness?: number;
}

/* Tray rows, back to front. Front rows sit lower and wider for perspective. */
const TRAYS = [
  { y: 118, x1: 58, x2: 242, count: 5 },
  { y: 142, x1: 48, x2: 252, count: 6 },
  { y: 168, x1: 38, x2: 262, count: 6 },
];

/**
 * Cutaway of the eco-hybrid solar tunnel — the one drawing that has to carry
 * the whole "powered by the sun" claim.
 *
 * `dryness` interpolates slice radius and fill opacity: fresh slices are wide
 * and pale, dried ones are smaller and deeper. Driving both from one number
 * means the scroll-linked version in chapter ④ is a single motion value rather
 * than a keyframe timeline to keep in sync.
 */
const SolarTunnel = ({ className, animate = true, dryness = 0 }: SolarTunnelProps) => {
  const t = Math.min(Math.max(dryness, 0), 1);
  const radius = 9 - t * 3.2;
  const fillOpacity = 0.14 + t * 0.5;

  return (
    <svg
      viewBox="0 0 300 220"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {/* Sun and its rays entering the tunnel. Rays are cropped to the arch by
          angling them inward, so they read as light landing on the canopy. */}
      <circle cx="150" cy="24" r="16" stroke="currentColor" strokeWidth="1.8" opacity="0.9" />
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.5">
        {Array.from({ length: 11 }, (_, i) => {
          const x = 46 + i * 21;
          const lean = (x - 150) * 0.12;
          return <line key={i} x1={x} y1={46} x2={x + lean} y2={100} />;
        })}
      </g>

      {/* Tunnel shell — a polytunnel arch on a base rail */}
      <path
        d="M22 196 L22 128 Q150 62 278 128 L278 196"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M34 196 L34 134 Q150 76 266 134 L266 196"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.4"
      />
      <line x1="10" y1="196" x2="290" y2="196" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />

      {/* Drying trays with produce slices */}
      {TRAYS.map((tray) => (
        <g key={tray.y}>
          <line
            x1={tray.x1}
            y1={tray.y}
            x2={tray.x2}
            y2={tray.y}
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.75"
          />
          {Array.from({ length: tray.count }, (_, i) => {
            const step = (tray.x2 - tray.x1) / (tray.count + 1);
            return (
              <circle
                key={i}
                cx={tray.x1 + step * (i + 1)}
                cy={tray.y - radius - 1}
                r={radius}
                stroke="currentColor"
                strokeWidth="1.2"
                fill="currentColor"
                fillOpacity={fillOpacity}
              />
            );
          })}
        </g>
      ))}

      {/* Moisture leaving as rising dots — the visual proof that drying is
          happening rather than just heating. */}
      <g fill="currentColor" opacity="0.5">
        {[72, 118, 164, 210, 248].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={108}
            r={1.8}
            className={animate ? "animate-rise" : undefined}
            style={animate ? { animationDelay: `${i * 0.85}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
};

export default SolarTunnel;
