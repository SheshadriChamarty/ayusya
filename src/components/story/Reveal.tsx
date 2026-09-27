import { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay — use to stagger siblings. */
  delay?: number;
  /** Direction the content travels in from. */
  from?: "below" | "left" | "right" | "none";
  className?: string;
}

const OFFSETS = {
  below: { y: 28, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
  none: { y: 0, x: 0 },
} as const;

/**
 * Viewport-entry reveal — the baseline motion primitive for the story.
 *
 * `whileInView` with `once: true` means content animates in a single time and
 * then stays put; re-animating on every scroll-past makes a long page feel
 * twitchy and fights the continuous downward read the story depends on.
 *
 * The -12% bottom margin fires the reveal slightly before the element reaches
 * the fold, so it has finished moving by the time the eye arrives rather than
 * being caught mid-flight.
 */
const Reveal = ({ children, delay = 0, from = "below", className }: RevealProps) => {
  const reduced = useReducedMotionSafe();
  const offset = OFFSETS[from];

  // Reduced motion still gets the opacity fade — it conveys "new content here"
  // without any vestibular movement, so nothing appears without explanation.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...(reduced ? {} : offset) }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={
        reduced
          ? { duration: 0.2 }
          : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
