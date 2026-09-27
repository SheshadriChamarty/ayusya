import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reset scroll position on navigation.
 *
 * React Router does not do this for you — it swaps the component tree without
 * touching the scroll offset, so moving from halfway down /products to /contact
 * lands the visitor halfway down a page they have not read. The browser handles
 * this for real document loads; a client-side router has to do it by hand.
 *
 * Hash links are left alone so in-page anchors (#contact) still work, and the
 * jump is instant rather than smooth: an animated scroll on top of a route
 * change reads as a glitch, and it would fight the story's scroll animations.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
