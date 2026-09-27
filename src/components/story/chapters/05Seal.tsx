import { useRef, useState } from "react";
import { useMotionValueEvent } from "motion/react";
import Chapter from "../Chapter";
import ChapterCTA from "../ChapterCTA";
import Reveal from "../Reveal";
import PouchSeal from "@/components/illustrations/PouchSeal";
import BronzeBadge from "@/components/illustrations/BronzeBadge";
import { useStoryScroll, STORY_OFFSETS } from "@/hooks/useStoryScroll";
import { FSSAI_LICENSE } from "@/lib/contact";

/**
 * Chapter ⑤ — The Seal. The promise.
 *
 * The pouch closes as the chapter is scrolled, and the Golden Thread's segment
 * resolves into the zipper line — the thread's most literal moment, and the one
 * that ties the drawing to the physical product the customer will hold.
 *
 * Badges state only what can be backed up. Guidelines §7 requires claims stay
 * specific and modest, so these are all facts about what is absent or licensed —
 * no health outcomes.
 */

const BADGES = [
  { label: "Solar Dried", value: "100%" },
  { label: "No Additives", value: "0" },
  { label: "Made in Gudivada" },
  { label: "FSSAI Certified" },
];

const Seal = () => {
  const stage = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useStoryScroll(stage, STORY_OFFSETS.centred);
  const [sealed, setSealed] = useState(reduced ? 1 : 0);

  useMotionValueEvent(progress, "change", (v) => {
    if (reduced) return;
    // Eases toward shut across the first two-thirds, then holds sealed — the
    // pouch should stay closed while the badges are still being read.
    setSealed(Math.round(Math.min(v * 1.5, 1) * 12) / 12);
  });

  return (
    <Chapter id="seal" numeral="V" eyebrow="The Seal" tone="bg-cream-100">
      <Reveal>
        <h2 className="heading-lg max-w-2xl">
          Then we close it, at exactly the right moment.
        </h2>
      </Reveal>

      <div ref={stage} className="mt-12 grid items-center gap-10 md:grid-cols-2">
        <div className="mx-auto h-64 w-48 text-bronze md:h-80 md:w-60">
          <PouchSeal sealed={sealed} />
        </div>

        <div>
          <p className="paragraph max-w-lg">
            Sealed the same day it finishes drying, while the nutrition is still
            where the sun left it. What goes in is the ingredient and nothing else.
          </p>
          <ul className="check-list mt-7 space-y-3 text-base text-umber">
            <li>Zero preservatives</li>
            <li>No artificial colours</li>
            <li>No additives or fillers</li>
            <li>Shelf-stable without refrigeration</li>
          </ul>
          <p className="mt-6 text-sm text-umber-light">
            FSSAI Central Licence {FSSAI_LICENSE}
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {BADGES.map((badge, i) => (
          <Reveal key={badge.label} delay={i * 0.08} className="mx-auto h-24 w-24 text-bronze md:h-28 md:w-28">
            <BronzeBadge label={badge.label} value={badge.value} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <ChapterCTA lead="products" productsLabel="See every pouch" />
      </Reveal>
    </Chapter>
  );
};

export default Seal;
