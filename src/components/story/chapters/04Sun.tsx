import { useRef, useState } from "react";
import { useMotionValueEvent } from "motion/react";
import Chapter from "../Chapter";
import ChapterCTA from "../ChapterCTA";
import Reveal from "../Reveal";
import SolarTunnel from "@/components/illustrations/SolarTunnel";
import Sun from "@/components/illustrations/Sun";
import { useStoryScroll, STORY_OFFSETS } from "@/hooks/useStoryScroll";

/**
 * Chapter ④ — The Sun. The transformation, and the hero moment of the page.
 *
 * The tunnel is scrubbed by scroll: slices visibly shrink and deepen in colour as
 * the reader moves through the chapter, so the drying *happens* in front of them
 * rather than being asserted in a caption. This is the one illustration that has
 * to carry the whole "powered by the sun" claim.
 *
 * The tunnel sticks to the viewport for the length of the chapter, which is what
 * gives the scrub room to play out — a static illustration would finish drying
 * in the fraction of a second it takes to scroll past it.
 */

/* The four pillars, in the order the guidelines set them. */
const PILLARS = [
  {
    title: "Preserves nutritional value",
    body: "Gentle, controlled eco-hybrid solar drying retains vitamins, minerals and antioxidants far better than high-heat industrial drying.",
  },
  {
    title: "Maintains natural quality",
    body: "Controlled temperature locks in each ingredient's own colour, aroma and flavour — nothing is added back in afterwards.",
  },
  {
    title: "Eco-friendly and energy-efficient",
    body: "The drying runs on 100% clean, renewable solar energy. No fossil fuels, and a far smaller carbon footprint.",
  },
  {
    title: "Chemical-free preservation",
    body: "Removing the water is what prevents spoilage — so there are no preservatives, and seasonal nutrition keeps year-round.",
  },
];

const SunChapter = () => {
  const stage = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useStoryScroll(stage, STORY_OFFSETS.full);
  const [dryness, setDryness] = useState(reduced ? 1 : 0);

  useMotionValueEvent(progress, "change", (v) => {
    if (reduced) return;
    // Quantised for the same reason as chapter ③: the SVG re-renders on change,
    // and 16 steps is already smoother than the slices visibly resolve.
    setDryness(Math.round(Math.min(Math.max(v * 1.35 - 0.1, 0), 1) * 16) / 16);
  });

  return (
    <Chapter id="sun" numeral="IV" eyebrow="The Sun" tone="bg-cream-200">
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 text-bronze-metallic/20">
        <Sun />
      </div>

      <Reveal>
        <h2 className="heading-lg max-w-2xl">
          So we let the sun do it, slowly.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="paragraph mt-7 max-w-xl">
          Eco-hybrid solar drying takes the water out and leaves everything else
          in. Low, steady, controlled heat over hours — the same thing the sun has
          always done to food, done in a tunnel where the temperature is watched.
        </p>
      </Reveal>

      {/*
        The stage: a sticky tunnel beside a scrolling column of pillars.
        Two constraints shaped this. A sticky element taller than the viewport
        cannot pin at all — it only catches at its own bottom edge — so the
        tunnel has to be the only sticky thing. And the scroll distance the
        scrub needs has to come from somewhere; taking it from an empty spacer
        left a screen of dead cream, whereas letting the pillars supply it means
        the reader is reading the four claims while the drying plays out beside
        them. The height is the pillar column's own, not a magic viewport number.
      */}
      <div ref={stage} className="relative mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="md:sticky md:top-28 md:self-start">
          <div className="rounded-[2rem] border border-caramel/40 bg-cream-50 p-5 shadow-warm-lg md:p-7">
            <div className="h-56 text-bronze md:h-72">
              <SolarTunnel dryness={dryness} animate={!reduced} />
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="eyebrow">Eco-hybrid solar tunnel</p>
              {/* Live read-out of the scrub. A progress rail makes the scroll
                  legible — the reader can see that moving is what dries it. */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-umber-light">
                  {dryness < 0.34 ? "Fresh" : dryness < 0.72 ? "Drying" : "Dried"}
                </span>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-caramel/30 md:w-32">
                  <div
                    className="h-full rounded-full bg-bronze-metallic transition-[width] duration-200"
                    style={{ width: `${dryness * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The scrolling column. Generous spacing is doing real work here: it is
            what gives the scrub its runway. */}
        <div className="space-y-5 md:space-y-16">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.06}
              from="right"
              className="rounded-2xl border border-caramel/40 bg-cream-50 p-6 shadow-warm"
            >
              <span className="eyebrow">Pillar {i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-primary md:text-xl">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-umber md:text-base">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <ChapterCTA lead="whatsapp" whatsappLabel="Ask about the process" />
      </Reveal>
    </Chapter>
  );
};

export default SunChapter;
