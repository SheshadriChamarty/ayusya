import { ArrowDown } from "lucide-react";
import Photo from "@/components/Photo";
import Sun from "@/components/illustrations/Sun";
import { cn } from "@/lib/utils";
import ChapterCTA from "./ChapterCTA";
import { HERO } from "./heroOptions";

/* tailwind.config.ts `bronze.DEFAULT`. Duplicated as a literal because this
   gradient is built in JS, where a Tailwind class name is not available. */
const BRONZE = "#451B03";

/**
 * The opening frame — a photograph, not a paragraph.
 *
 * This exists because the story used to open on chapter ①: four stacked blocks of
 * copy and a faint SVG sun. It read as an essay, and the verdict on it was exact —
 * "too much of content on the page rather than actual images."
 *
 * So the hero now carries one picture and eleven words, and chapter ① keeps the
 * prose. It sits *outside* <Chapter> on purpose: Chapter owns the Golden Thread's
 * lane and its numeral seal, and the hero is not a chapter — the thread should
 * begin at ① The Wish, below this, where the story actually starts.
 *
 * The photograph is the bamboo trays, and it is fixed — see the lock note on
 * `HERO` in heroOptions.ts. It is real solar drying, Ayusya's own process, not a
 * stock bowl of wellness powder. The subject does the selling; the type only has
 * to name it.
 *
 * ── Why there is no longer a runtime override ───────────────────────────────
 * This used to resolve the photo per render: `?hero=` first, then the dev
 * switcher's localStorage value, then the shipped default. That chain is why the
 * owner's chosen photograph appeared to have gone missing — a browser that had
 * ever used the picker kept serving its own stored choice and never reached the
 * default, so the site shipped one photo and showed another on the one machine
 * where it mattered. Both paths are gone; `HERO` is a module constant, so the
 * hero has exactly one input and it is under version control.
 *
 * A side benefit: the `<img>` is now in the very first paint with its final
 * `src` and no hook runs before it, which is what Photo.tsx's `priority` path
 * wants anyway.
 * ───────────────────────────────────────────────────────────────────────────
 */
const Hero = () => {
  return (
  <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden md:min-h-[92svh]">
    <Photo
      base={HERO.base}
      /* Described, not decorative: this image *is* the argument the page opens
         with, so a reader who cannot see it still gets the argument. */
      alt={HERO.alt}
      width={1600}
      height={1066}
      sizes="100vw"
      priority
      className={cn("absolute inset-0 -z-10 h-full w-full", HERO.objectPosition)}
    />

    {/*
     * The scrim only covers the type, not the photograph.
     *
     * The first version of this ran `from-bronze via-bronze/70 to-bronze/15` and
     * the result was mud — Tailwind puts a 3-stop gradient's middle stop at the
     * vertical centre, so 70% opaque bronze sat across the middle of the frame
     * and even the top was under a 15% wash. The photo stopped being a photo.
     *
     * Two changes: it ends at fully transparent (so the upper half is the image,
     * untouched), and the weight is pushed to the bottom third with explicit
     * stop positions — which is the only band that needs to carry cream type.
     *
     * The mid-stop opacity comes from the chosen option rather than being fixed,
     * because a scrim tuned for a mid-tone photo is wrong for a high-key one: the
     * pale bamboo-dryer frame needs 86% where the dark tray frame needs 68%. It is
     * an inline style because the value is data — a Tailwind class would have to be
     * enumerated per option for the JIT compiler to emit it.
     */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        backgroundImage:
          `linear-gradient(to top, ${BRONZE} 5%, ` +
          `rgb(69 27 3 / ${HERO.scrim / 100}) 30%, transparent 72%)`,
      }}
    />
    {/* A narrow horizontal wedge behind the copy column specifically: the headline
        is left-aligned, so the right of the frame can stay brighter than the left. */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-gradient-to-r from-bronze/55 via-bronze/15 to-transparent"
    />

    {/* The brand motif survives, but as a mark in the corner rather than the
        main event it used to be. */}
    <div className="pointer-events-none absolute right-4 top-20 h-28 w-28 text-cream/30 md:right-12 md:top-24 md:h-44 md:w-44">
      <Sun />
    </div>

    <div className="container relative mx-auto px-5 pb-16 pt-28 md:px-8 md:pb-24">
      <div className="max-w-3xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cream/90 md:text-base">
          Gudivada, Andhra Pradesh
        </p>

        {/*
         * Cream on the bronze scrim, and heavy: the whole point is that this is
         * readable at a glance on a photograph.
         *
         * The line breaks are `hidden md:inline` because they are composed for the
         * desktop measure. On a 390px screen the same breaks left "way." stranded
         * alone on a fourth line; below md the browser wraps it itself, which is
         * the one thing it is better at than we are.
         */}
        <h1 className="mt-5 font-display text-[2.35rem] font-extrabold leading-[1.06] tracking-tight text-cream drop-shadow-[0_2px_12px_rgba(69,27,3,0.55)] sm:text-5xl md:text-7xl">
          The sun does the
          <br className="hidden md:inline" /> work. We just
          <br className="hidden md:inline" /> don&apos;t get in its way.
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/95 md:text-xl">
          Solar-dried fruit and vegetable powders. Nothing added, nothing taken
          away — just the harvest, kept.
        </p>

        <ChapterCTA lead="products" productsLabel="See the range" onDark />

        <p className="mt-12 flex items-center gap-2.5 text-sm font-semibold text-cream/80">
          <ArrowDown size={16} aria-hidden="true" className="animate-bounce" />
          How it got here
        </p>
      </div>
    </div>
  </section>
  );
};

export default Hero;
