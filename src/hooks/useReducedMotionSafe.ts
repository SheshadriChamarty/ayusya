import { useReducedMotion } from "motion/react";

/**
 * Single global gate for "should this animate at all?".
 *
 * Every animated component reads this instead of calling useReducedMotion
 * directly, so honouring the OS setting is one decision rather than a
 * convention each new component has to remember. Returns true when motion
 * should be suppressed.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
