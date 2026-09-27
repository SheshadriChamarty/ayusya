/**
 * The hero photograph.
 *
 * ⚠️ OWNER-LOCKED. The bamboo trays, and nothing else.
 *
 * Chosen by the owner, in these words: "That's the only one allowed. Keep it and
 * stick to that. Don't change that image." So this is not a default awaiting a
 * decision — it *is* the decision. Do not swap it for a frame that scores better
 * on scrim contrast, palette fit or file size. It was picked by eye, which
 * outranks all three.
 *
 * It is also not overridable at runtime. Hero.tsx used to resolve the photo
 * through `?hero=` and then `localStorage["ayusya:hero"]` before reaching this
 * constant, which meant any browser that had ever touched the dev picker kept
 * showing its own choice and ignored whatever shipped here — the exact reason the
 * chosen photo appeared to have been "removed". Both override paths are gone;
 * Hero.tsx reads `HERO` and has no other input.
 *
 * This was a six-candidate list feeding a /hero-options review board. The choice
 * is settled, so the board, the other five photographs and their notes are gone —
 * git history has them if the decision is ever reopened.
 *
 * Two things worth keeping from that review, because both were learned the hard way:
 *
 * 1. Keep any replacement landscape (3:2 or wider). A 3:4 source is *narrower* than
 *    the 390px hero band (0.750 vs 0.537), so `object-cover` fits it by height and
 *    crops the width — which leaves the Y axis of `objectPosition` with nothing to
 *    move. Two portrait candidates showed sky behind the headline for that reason,
 *    and no value here could have fixed it.
 *
 * 2. `objectPosition` is part of the photograph, not a separate setting. Swapping
 *    the file without swapping the focal point is how a hero silently decapitates
 *    its subject — which happened here once already.
 *
 * `scrim` is the *opacity of the mid stop* of the vertical bronze gradient; the
 * gradient's shape is fixed in Hero.tsx. A pale, high-key photo needs more bronze
 * under the cream headline than an already-dark one, or the type floats.
 */
export interface HeroOption {
  /** Path without width or extension — see Photo.tsx for the naming convention. */
  base: string;
  /** Describes the picture for a reader who cannot see it. */
  alt: string;
  /** Tailwind object-position class aimed at this photo's subject. */
  objectPosition: string;
  /** Mid-stop bronze opacity for the vertical scrim, 0–100. */
  scrim: number;
}

/**
 * The photograph the site opens with — a module constant, not a hook, so there is
 * exactly one way for the hero to be anything other than the bamboo trays:
 * editing this object.
 */
export const HERO: HeroOption = {
  base: "/assets/photos/hero-trays",
  alt: "Chillies drying in direct sunlight on woven bamboo trays",
  /* The nearest tray's rim sweeps through the lower half, so centre keeps it in
     frame; anchoring higher would leave only out-of-focus background. */
  objectPosition: "object-center",
  /* Darker and shallower than the alternatives were, so it needs less help
     under the type. */
  scrim: 68,
};
