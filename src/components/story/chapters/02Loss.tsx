import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import Chapter from "../Chapter";
import ChapterCTA from "../ChapterCTA";
import Reveal from "../Reveal";
import IngredientGlyph from "@/components/illustrations/IngredientGlyph";
import { useStoryScroll, STORY_OFFSETS } from "@/hooks/useStoryScroll";

/**
 * Chapter ② — What We Lose. The antagonist.
 *
 * Without this beat the site explains a process; with it, the sun has something
 * to defeat. The stakes come straight from Ayusya's own vision statement —
 * "reducing post-harvest losses globally".
 *
 * Copy constraint: this chapter deliberately carries NO loss statistic. The
 * number everyone quotes needs a citable source before it goes on a commercial
 * page, so the beat is written qualitatively until one is supplied.
 */

/* Six SKUs whose glyphs read clearly at small size and differ from each other. */
const FADING = [
  "Tomato Powder",
  "Spinach Powder",
  "Banana Powder",
  "Green Chilli Powder",
  "Pumpkin Powder",
  "Mango Powder",
];

const Loss = () => {
  const row = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useStoryScroll(row, STORY_OFFSETS.centred);

  return (
    <Chapter id="loss" numeral="II" eyebrow="What We Lose" tone="bg-cream-200">
      <Reveal>
        <h2 className="heading-lg max-w-2xl">
          The hardest part was never growing the food.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="paragraph mt-7 max-w-xl">
          A tomato is at its best for about a day. A bunch of spinach, less. Fruit
          picked at perfect ripeness starts losing the very thing it was picked for
          almost immediately — and most of it never reaches a plate at all.
        </p>
      </Reveal>

      {/* The glyph row empties left to right as the chapter is scrolled: the
          harvest is there, and then it isn't. Opacity and scale only, so this
          never touches layout. */}
      <div ref={row} className="mt-12 flex flex-wrap items-center gap-5 md:gap-7">
        {FADING.map((name, i) => {
          // Each glyph gets its own slice of the range, so they go one by one.
          const start = i / FADING.length;
          const end = start + 1 / FADING.length;
          return (
            <Fading key={name} name={name} start={start} end={end} progress={progress} reduced={reduced} />
          );
        })}
      </div>

      <Reveal delay={0.12}>
        <p className="mt-10 max-w-xl text-base leading-relaxed text-umber-light">
          The usual answers all cost something. Refrigeration needs power that
          isn&apos;t always there. Preservatives buy time by changing what the food
          is. Industrial heat-drying is fast, and burns off a good part of the
          nutrition it was meant to save.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <p className="mt-6 max-w-xl font-display text-lg font-semibold text-primary md:text-xl">
          So we went looking for a way to stop the clock without changing the food.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <ChapterCTA lead="whatsapp" whatsappLabel="Talk to us" productsLabel="Skip to the range" />
      </Reveal>
    </Chapter>
  );
};

/** One glyph that dims and shrinks across its own slice of the chapter's scroll. */
const Fading = ({
  name,
  start,
  end,
  progress,
  reduced,
}: {
  name: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useStoryScroll>["progress"];
  reduced: boolean;
}) => {
  const opacity = useTransform(progress, [start, end], [1, 0.12]);
  const scale = useTransform(progress, [start, end], [1, 0.82]);

  return (
    <motion.div
      className="h-12 w-12 md:h-14 md:w-14"
      style={reduced ? { opacity: 0.4 } : { opacity, scale }}
    >
      <IngredientGlyph productName={name} />
    </motion.div>
  );
};

export default Loss;
