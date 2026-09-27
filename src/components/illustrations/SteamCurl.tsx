import { cn } from "@/lib/utils";

interface SteamCurlProps {
  className?: string;
  animate?: boolean;
}

/**
 * A cup with rising steam — chapter ⑥, where the thread loosens into steam and
 * the story lands back in the visitor's own kitchen.
 *
 * The three curls are offset in both phase and height so the rise never pulses
 * in unison, which is what makes looping steam look mechanical.
 */
const SteamCurl = ({ className, animate = true }: SteamCurlProps) => (
  <svg
    viewBox="0 0 160 200"
    fill="none"
    aria-hidden="true"
    className={cn("h-full w-full", className)}
  >
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
      {[
        { d: "M62 108 Q52 88 62 70 Q72 52 62 34", delay: 0 },
        { d: "M80 112 Q70 90 80 70 Q90 48 80 26", delay: 1.4 },
        { d: "M98 108 Q88 88 98 70 Q108 52 98 34", delay: 2.6 },
      ].map((curl) => (
        <path
          key={curl.d}
          d={curl.d}
          className={animate ? "animate-rise" : undefined}
          style={animate ? { animationDelay: `${curl.delay}s` } : undefined}
        />
      ))}
    </g>

    {/* Cup */}
    <path
      d="M36 122 L44 172 Q46 186 60 186 L100 186 Q114 186 116 172 L124 122 Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <ellipse cx="80" cy="122" rx="44" ry="8" stroke="currentColor" strokeWidth="1.8" />
    {/* Handle */}
    <path
      d="M124 134 Q146 136 144 152 Q142 166 120 166"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Saucer */}
    <path d="M28 192 L132 192" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export default SteamCurl;
