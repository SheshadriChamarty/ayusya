import { cn } from "@/lib/utils";

interface BronzeBadgeProps {
  /** Text curved around the top of the seal. */
  label: string;
  /** Short text stacked in the centre, e.g. "100%". */
  value?: string;
  className?: string;
}

/**
 * Circular line-art seal in the packaging's stamp register — guidelines §6 calls
 * for a hand-drawn/stamp feel rather than flat vector icons, which is why the
 * ring is doubled and dashed instead of a single crisp circle.
 *
 * The label rides a <textPath>, so it curves with the seal at any size. The id
 * is derived from the label because two badges on one page with the same path id
 * would both resolve to the first one's geometry.
 */
const BronzeBadge = ({ label, value, className }: BronzeBadgeProps) => {
  const pathId = `seal-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label={value ? `${value} ${label}` : label}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <path id={pathId} d="M60 60 m-44 0 a44 44 0 1 1 88 0" />
      </defs>

      <circle cx="60" cy="60" r="57" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="60"
        cy="60"
        r="51"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="2 3.5"
        opacity="0.7"
      />

      <text
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.6"
        fill="currentColor"
        textAnchor="middle"
      >
        <textPath href={`#${pathId}`} startOffset="50%">
          {label.toUpperCase()}
        </textPath>
      </text>

      {value && (
        <text
          x="60"
          y="72"
          fontSize="26"
          fontWeight="700"
          fill="currentColor"
          textAnchor="middle"
        >
          {value}
        </text>
      )}

      {/* Stamp flourishes flanking the centre */}
      <line x1="34" y1="84" x2="86" y2="84" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="92" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
};

export default BronzeBadge;
