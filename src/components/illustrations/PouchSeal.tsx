import { cn } from "@/lib/utils";

interface PouchSealProps {
  className?: string;
  /** 0 = open, 1 = sealed. Chapter ⑤ snaps this shut on scroll. */
  sealed?: number;
}

/**
 * A stand-up pouch with a zipper seal — chapter ⑤, where the Golden Thread
 * becomes the seal line and the promise is closed.
 *
 * `sealed` drives the zipper's dash pattern: open teeth close into a solid line.
 * Animating dasharray rather than drawing a second shape means the zipper is one
 * element in both states, so there is no crossfade seam.
 */
const PouchSeal = ({ className, sealed = 1 }: PouchSealProps) => {
  const s = Math.min(Math.max(sealed, 0), 1);
  const open = 1 - s;
  const dashGap = 7 * open;
  /* The dash pattern alone was too subtle to read at card size, so the mouth
     also splays: the fin walls lean apart and the lip bows open as s → 0. */
  const flare = 16 * open;
  const lipDrop = 7 * open;

  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {/* Pouch body — slight taper, rounded base gusset */}
      <path
        d="M42 44 L38 206 Q38 222 56 222 L144 222 Q162 222 162 206 L158 44 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Top fin — walls splay outward and the lip bows when unsealed */}
      <path
        d={`M42 44 L${46 - flare} 24 Q100 ${24 + lipDrop} ${154 + flare} 24 L158 44`}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* The zipper seal — the line the thread resolves into */}
      <path
        d={`M48 56 Q100 ${56 + lipDrop} 152 56`}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray={dashGap > 0.05 ? `5 ${dashGap}` : undefined}
      />
      {/* Tear notches either side of the seal */}
      <path d="M42 64 L48 64 M152 64 L158 64" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />

      {/* Label panel, kept empty so product copy can sit over it in layout */}
      <rect
        x="62"
        y="96"
        width="76"
        height="88"
        rx="6"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
        strokeDasharray="3 4"
      />
      {/* Base gusset crease */}
      <path d="M38 200 Q100 212 162 200" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default PouchSeal;
