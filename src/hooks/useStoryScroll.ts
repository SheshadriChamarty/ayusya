import { RefObject } from "react";
import { useScroll, useSpring, useTransform, MotionValue } from "motion/react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/** Scroll offsets, named for what they mean to the story rather than to the DOM. */
export const STORY_OFFSETS = {
  /** Spans the element's whole pass through the viewport. */
  full: ["start end", "end start"],
  /** Completes while the element is still on screen — used for the thread, so a
   *  segment finishes drawing before it scrolls away rather than as it leaves. */
  draw: ["start end", "end center"],
  /** Runs across the middle of the pass — for scrubbing an illustration that
   *  should be mid-change while the reader is actually looking at it. */
  centred: ["start center", "end center"],
} as const;

/**
 * Spring-smoothed scroll progress for the story.
 *
 * Raw scroll offset tracks the wheel exactly, which is what makes hand-rolled
 * scroll animation feel cheap — every notch of a mouse wheel becomes a visible
 * step. Passing it through a spring gives the thread weight: it trails the
 * scroll slightly and settles, which reads as drawn rather than scrubbed.
 *
 * @param target Element to measure. Omit to track the whole document.
 * @param offset Scroll offset pair; see STORY_OFFSETS.
 */
export function useStoryScroll(
  target?: RefObject<HTMLElement>,
  offset: readonly [string, string] = STORY_OFFSETS.full
) {
  const { scrollYProgress } = useScroll(
    target ? { target, offset: offset as unknown as [string, string] } : undefined
  );

  const reduced = useReducedMotionSafe();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // With reduced motion we hand back the unsmoothed value: it still maps
  // position to progress, but nothing eases or overshoots.
  const progress = reduced ? scrollYProgress : smooth;

  return { progress, rawProgress: scrollYProgress, reduced };
}

/**
 * Map story progress to an SVG stroke-dashoffset for a `pathLength="1"` path.
 * 1 = fully hidden, 0 = fully drawn.
 */
export function useDrawnPath(progress: MotionValue<number>, reduced: boolean) {
  return useTransform(progress, [0, 1], reduced ? [0, 0] : [1, 0]);
}
