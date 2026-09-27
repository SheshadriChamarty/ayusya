import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/**
 * A hairline rail at the top of the page that fills as the story is read.
 *
 * The chapter threads show where the line is going next; this shows how far
 * through the whole story the reader is — so a long scroll-narrative page never
 * feels like it might go on forever.
 *
 * `scaleX` on a full-width element is the cheap way to do this: transforms are
 * composited, whereas animating `width` would lay out the element on every frame.
 */
const StoryProgress = () => {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotionSafe();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-bronze-metallic to-caramel"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  );
};

export default StoryProgress;
