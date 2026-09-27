import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useStoryScroll, useDrawnPath, STORY_OFFSETS } from "@/hooks/useStoryScroll";
import { threadFor } from "./threadPaths";
import { cn } from "@/lib/utils";

interface GoldenThreadProps {
  /** Chapter id — selects the segment from threadPaths. */
  id: string;
  className?: string;
}

/**
 * One stretch of the Golden Thread, scoped to its chapter.
 *
 * Two techniques carry this:
 *
 * 1. `pathLength="1"` renormalises the path's length to 1 regardless of its real
 *    geometry, so `strokeDasharray: 1` plus a `strokeDashoffset` from 1 → 0 draws
 *    it progressively. Without pathLength we would have to measure the path in JS
 *    and re-measure it on every resize.
 *
 * 2. `preserveAspectRatio="none"` lets the 100×100 viewBox stretch to whatever
 *    height the chapter turns out to be, which is how the segment stays glued to
 *    its section through any reflow. That stretch would also distort the stroke,
 *    so `vectorEffect="non-scaling-stroke"` pins the line to 2px in screen space.
 *
 * Only `strokeDashoffset` animates — never a layout property — so the browser
 * keeps this off the layout path and mobile scroll stays smooth.
 */
const GoldenThread = ({ id, className }: GoldenThreadProps) => {
  const wrap = useRef<HTMLDivElement>(null);
  const segment = threadFor(id);

  // Completes while the section is still on screen, so a segment finishes
  // drawing in front of the reader rather than as it leaves the viewport.
  const { progress, reduced } = useStoryScroll(wrap, STORY_OFFSETS.draw);
  const dashOffset = useDrawnPath(progress, reduced);

  // Chapter ②'s thread frays: the gap widens as it is scrolled through, then the
  // next chapter's segment re-solidifies. Dash length stays constant so the
  // strokeDasharray keeps summing with the drawn-length trick above.
  const frayGap = useTransform(progress, [0, 1], [0, 0.028]);
  const dashArray = useTransform(frayGap, (g) =>
    segment?.frayed && !reduced ? `${Math.max(1 - g * 6, 0.02)} ${g}` : "1"
  );

  if (!segment) return null;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-y-0 left-0", className)}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Ghost of the full path, so the eye has somewhere to travel to — the
            line reads as a route being followed, not one appearing from nowhere. */}
        <path
          d={segment.d}
          stroke={segment.stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.14"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={segment.d}
          stroke={segment.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
        />
      </svg>
    </div>
  );
};

export default GoldenThread;
