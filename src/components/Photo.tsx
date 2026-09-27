import { cn } from "@/lib/utils";

/**
 * The one place the site loads a photograph.
 *
 * Every image on this site exists in exactly two widths, named `<base>-<w>.jpg`.
 * That convention is what lets this component build a `srcset` from a single
 * `base` prop instead of each caller hand-writing three attributes and getting
 * one of them wrong — which is what the site's only pre-existing <img> did.
 *
 * Why no WebP: there is no encoder on this machine (`cwebp` and ImageMagick are
 * both absent, and this build of `sips` has no webp output), so the assets are
 * JPEG. If an encoder is ever installed, this is the single file that has to
 * change — wrap the <img> in a <picture> with a WebP <source> above it and every
 * caller inherits it untouched.
 *
 * `sizes` matters more than it looks: without it the browser assumes the image
 * fills the viewport and will pull the 1600px file for a half-width slot on a
 * phone, which is how "responsive images" end up heavier than a single file.
 */
export interface PhotoProps {
  /** Path without width or extension, e.g. "/assets/photos/hero-drying". */
  base: string;
  /**
   * Describes the picture for a reader who cannot see it. Pass "" only when the
   * image is decorative and the surrounding copy already says everything —
   * that marks it as skippable rather than leaving a screen reader to announce
   * the filename.
   */
  alt: string;
  /** Intrinsic size of the *large* variant, so the box is reserved before load. */
  width: number;
  height: number;
  /** Media-condition list for the rendered slot. Defaults to full-bleed. */
  sizes?: string;
  /** Set on the one image above the fold; everything else stays lazy. */
  priority?: boolean;
  className?: string;
}

/*
 * Spread as a lowercase attribute rather than written as the `fetchPriority` JSX
 * prop. React 18 does not know the camelCase name, so it logged
 * "React does not recognize the fetchPriority prop" on every single page load —
 * while still passing the attribute through lowercased, which made it a warning
 * about working code and therefore easy to leave in place forever.
 *
 * Spreading an object React has no opinion about emits the attribute verbatim and
 * silently. React 19 recognises `fetchPriority` natively; on that upgrade this can
 * become a normal prop again.
 */
const fetchPriorityAttr = (priority: boolean) => ({
  fetchpriority: priority ? "high" : "auto",
});

const Photo = ({
  base,
  alt,
  width,
  height,
  sizes = "100vw",
  priority = false,
  className,
}: PhotoProps) => (
  <img
    src={`${base}-1600.jpg`}
    srcSet={`${base}-800.jpg 800w, ${base}-1600.jpg 1600w`}
    sizes={sizes}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? "eager" : "lazy"}
    /* Eager alone only removes the lazy delay; fetchpriority is what moves the
       hero ahead of the font and script requests competing for the same socket. */
    {...fetchPriorityAttr(priority)}
    decoding={priority ? "sync" : "async"}
    /* Cream rather than transparent: on a slow connection the reserved box shows
       as part of the page ground instead of a white hole in a warm layout. */
    className={cn("bg-cream-200 object-cover", className)}
  />
);

export default Photo;
