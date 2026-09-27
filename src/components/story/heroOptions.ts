/**
 * The candidate hero photographs, and which one opens the site.
 *
 * This is a list rather than a single constant because the hero was the one
 * decision judged by looking, not by argument — so the options that were seriously
 * considered stay in the codebase with the reasoning attached, and switching is a
 * one-word change (or, in development, a click — see HeroSwitcher).
 *
 * Each option carries its own focal point, because the crop is part of the choice.
 * Swapping the file without swapping the focal point is exactly how a hero silently
 * decapitates its subject — which happened once here already.
 *
 * Every file is landscape (3:2 or wider) on purpose, not by coincidence. A 3:4 source
 * is *narrower* than the 390px hero band (0.750 vs 0.537), so `object-cover` fits it
 * by height and crops the width — and the Y axis of `objectPosition` then has nothing
 * to move. Two portrait candidates showed sky behind the headline on mobile for that
 * reason, and no value here could have fixed it. Keep new sources landscape.
 *
 * The set is curated, not accumulated: four earlier candidates (a grain floor, sliced
 * bananas, fruit on wooden racks, a hillside setup) were removed on review because
 * none of them showed Ayusya's actual method — steel racks on a terrace — and a set
 * of near-misses makes the choice harder, not richer.
 *
 * `scrim` exists because a scrim tuned for a mid-tone photo is wrong for a bright
 * one. A pale, high-key image (the bamboo dryer) needs more bronze under the type
 * than an already-dark one, or the cream headline floats. The value is the
 * *opacity of the mid stop* — the gradient shape itself is fixed in Hero.tsx.
 */
export interface HeroOption {
  /** Stable key, also the value persisted by the dev switcher. */
  id: string;
  /** Short label for the switcher UI. */
  label: string;
  /** Path without width or extension — see Photo.tsx for the naming convention. */
  base: string;
  /** Describes the picture for a reader who cannot see it. */
  alt: string;
  /** Tailwind object-position class aimed at this photo's subject. */
  objectPosition: string;
  /** Mid-stop bronze opacity for the vertical scrim, 0–100. */
  scrim: number;
  /** One line on why this photo is a candidate — kept with the asset, not in chat. */
  note: string;
}

export const HERO_OPTIONS: HeroOption[] = [
  {
    id: "steelracks",
    label: "Steel racks",
    base: "/assets/photos/hero-steelracks",
    alt: "Tiered circular steel mesh racks in open sunlight, each filled with fruit laid out to dry",
    /* Centre, because the sky is already gone from the *file*. This arrived 3:4 and
       no CSS anchor could fix it: at 390px the hero band is 0.537 while a 3:4 source
       is 0.750, so object-cover showed the full height and cropped the width instead
       — which leaves the Y axis of object-position with nothing to move, and the
       roofline came back on mobile no matter what was set here. Every hero file is
       now 3:2 so that height is the cropped axis at every breakpoint. */
    objectPosition: "object-center",
    scrim: 80,
    note: "The closest match to Ayusya's actual setup: circular steel mesh racks, tiered, drying in the open sun rather than under wood or bamboo. Structurally this is the terrace, which is why it is first.",
  },
  {
    id: "mixedtrays",
    label: "Mixed trays",
    base: "/assets/photos/hero-mixedtrays",
    alt: "Nine large round drying trays on a rooftop in full sun, each holding a different crop — yellow corn, red chilli, brown pulses and split grain",
    objectPosition: "object-center",
    scrim: 74,
    note: "The same rooftop-and-trays register as the tomato and chilli frames, but with five different crops in the one picture instead of a single vegetable standing in for twenty-one. Warm end to end, and the range is the subject.",
  },
  /*
   * ── 7. "Mixed cloth" — AI-generated, not yet present ───────────────────────
   *
   * The one frame that was asked for and does not exist as a photograph: the
   * chilli-on-cloth composition, but with carrot, beetroot, spinach, moringa and
   * amla drying on the one cloth instead of a single crop. Four searches of Pexels
   * (drying vegetables sun cloth / sun dried vegetable slices / assorted vegetables
   * drying terrace india, plus earlier sweeps) returned only single-crop cloth
   * frames — the multi-variety shots all use separate trays, which is why
   * `mixedtrays` exists and why it was not what was wanted. Stock photography does
   * not have this picture.
   *
   * So it has to be generated. To enable it:
   *
   *   1. Generate a 3:2 landscape image from the prompt in AI-PROMPT.md (same dir
   *      as the photos). Landscape is not cosmetic — see the file-shape note at the
   *      top of this file.
   *   2. ./scripts/add-hero-photo.sh ~/Downloads/<file> mixedcloth
   *   3. Uncomment this entry.
   *
   * Left commented rather than pointing at a missing file, because a live entry with
   * no asset behind it renders as a bare scrim on /hero-options and reads as a broken
   * build rather than a pending decision.
   *
   * Worth knowing before it ships: an AI image on the hero depicts a drying setup
   * that is not Ayusya's. Every other option here is at least a real photograph of
   * real solar drying. A phone photo of the actual terrace beats all seven.
   */
  // {
  //   id: "mixedcloth",
  //   label: "Mixed on cloth (AI)",
  //   base: "/assets/photos/hero-mixedcloth",
  //   alt: "Carrot, beetroot, spinach, moringa leaves and amla laid out separately on a cloth, drying in direct sun",
  //   objectPosition: "object-center",
  //   scrim: 76,
  //   note: "The frame that was asked for and does not exist in stock: the chilli-on-cloth composition with five different crops on the one cloth. Generated rather than photographed, which is the trade-off — it shows a drying setup that is not literally Ayusya's.",
  // },
  {
    id: "trays",
    label: "Bamboo trays",
    base: "/assets/photos/hero-trays",
    alt: "Chillies drying in direct sunlight on woven bamboo trays",
    /* The nearest tray's rim sweeps through the lower half, so centre keeps it in
       frame; anchoring higher would leave only out-of-focus background. */
    objectPosition: "object-center",
    /* Darker and shallower than the others, so it needs less help under the type. */
    scrim: 68,
    note: "Quieter and closer — brown trays and shallow depth of field read as craft rather than scale. The warmest of the set, and the lightest file. Kept by request.",
  },
  {
    id: "solardryer",
    label: "Solar dryer",
    base: "/assets/photos/hero-solardryer",
    alt: "Interior of a bamboo solar drying tunnel, produce spread on raised mesh beds under a translucent roof",
    /* The vanishing point sits slightly above centre; anchoring there keeps the
       tunnel's symmetry, which is the whole appeal of the frame. */
    objectPosition: "object-[center_45%]",
    /* High-key: a translucent roof blows the top of the frame out to near-white, so
       the type needs materially more bronze beneath it than the others. */
    scrim: 86,
    note: "An actual solar dryer, which is the literal technology behind the product. Pale and high-key, so it needs the heaviest scrim — but nothing else on the shortlist explains the method this directly.",
  },
  {
    id: "tomatoes",
    label: "Sun-dried tomatoes",
    base: "/assets/photos/hero-tomatoes",
    alt: "Halved tomatoes drying in the sun on a white rooftop, stretching to the horizon under a blue sky",
    /* Was object-[center_62%] against a 3:4 source, which still showed sky at 390px
       for the geometric reason recorded on `steelracks`. The sky is now cropped out
       of the file, so centre is correct. */
    objectPosition: "object-center",
    scrim: 78,
    note: "The most appetising of the shortlist and unmistakably solar-dried food. Its red and sky-blue sit outside the cream/bronze palette, which is the trade-off — vivid, but less obviously Ayusya's.",
  },
  {
    id: "chillies",
    label: "Chillies on cloth",
    base: "/assets/photos/hero-chillies",
    alt: "Split red chillies spread out to dry on a cloth in direct sunlight",
    objectPosition: "object-center",
    scrim: 76,
    note: "Graphic and high-contrast, and Andhra is chilli country — the most regionally specific of the set. All red, though, which crowds out the brand's warm neutrals. Kept by request.",
  },
];

/**
 * The shipped default.
 *
 * Change this id to change the site. The dev-only switcher overrides it in the
 * browser for comparison, but never writes here — a production build always
 * renders exactly this option.
 *
 * Currently the steel-rack frame, because it is the only candidate that matches the
 * structure Ayusya actually dries on. It is a placeholder for a real decision, not
 * the decision — and the honest fix is a photograph of the actual terrace, which
 * would end this file.
 */
export const DEFAULT_HERO_ID = "steelracks";

export const heroById = (id: string | null | undefined): HeroOption =>
  HERO_OPTIONS.find((o) => o.id === id) ??
  HERO_OPTIONS.find((o) => o.id === DEFAULT_HERO_ID) ??
  HERO_OPTIONS[0];
