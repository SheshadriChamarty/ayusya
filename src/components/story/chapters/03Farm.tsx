import { useRef } from "react";
import { useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Chapter from "../Chapter";
import ChapterCTA from "../ChapterCTA";
import Reveal from "../Reveal";
import FarmRow from "@/components/illustrations/FarmRow";
import { useStoryScroll, STORY_OFFSETS } from "@/hooks/useStoryScroll";

/**
 * Chapter ③ — The Farm. The alliance.
 *
 * FarmRow takes a plain number rather than a MotionValue, so scroll is sampled
 * into React state here. The sample is quantised to 12 steps: at full resolution
 * this would re-render the whole SVG on every scroll frame, and the sprouts grow
 * in visible stages anyway, so the extra precision buys nothing.
 */

const PROMISES = [
  {
    title: "Direct from the farmer",
    body: "We buy from local and marginal farmers around Gudivada ourselves, with no layer of middlemen between the field and the factory.",
  },
  {
    title: "Fair price, agreed first",
    body: "Farm-to-Factory Integration means the price is settled before the harvest, not bargained down once the produce is already cut.",
  },
  {
    title: "Traceable by batch",
    body: "Every batch stays tied to where it came from, so what is on the pouch can be checked rather than just claimed.",
  },
];

const Farm = () => {
  const field = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useStoryScroll(field, STORY_OFFSETS.centred);
  const [growth, setGrowth] = useState(reduced ? 1 : 0);

  useMotionValueEvent(progress, "change", (v) => {
    if (reduced) return;
    // 12 steps is finer than the eye can follow on five sprouts, and cuts the
    // re-render count by roughly two orders of magnitude versus raw scroll.
    setGrowth(Math.round(v * 12) / 12);
  });

  return (
    <Chapter id="farm" numeral="III" eyebrow="The Farm" tone="bg-cream-100">
      <Reveal>
        <h2 className="heading-lg max-w-2xl">
          It begins with the people who grow it.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="paragraph mt-7 max-w-xl">
          Gudivada sits in Krishna district, surrounded by farmland. The produce
          we dry is grown within reach of the factory — which means it arrives
          hours after it is cut, not days, and it is dried while it is still at
          its peak.
        </p>
      </Reveal>

      <div ref={field} className="mt-12 h-40 text-sku-moringa md:h-52">
        <FarmRow growth={growth} />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PROMISES.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.08}
            from="below"
            className="rounded-3xl border border-caramel/40 bg-cream-50 p-6 shadow-warm"
          >
            <h3 className="font-display text-lg font-semibold text-primary">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-umber">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <ChapterCTA lead="products" productsLabel="See what the harvest becomes" />
      </Reveal>
    </Chapter>
  );
};

export default Farm;
