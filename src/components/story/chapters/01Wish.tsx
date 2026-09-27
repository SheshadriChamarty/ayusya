import Chapter from "../Chapter";
import ChapterCTA from "../ChapterCTA";
import Reveal from "../Reveal";
import Sun from "@/components/illustrations/Sun";
import LeafMotif from "@/components/illustrations/LeafMotif";

/**
 * Chapter ① — The Wish.
 *
 * Trimmed hard. This used to open the page and carried the wordmark, the tagline
 * and three stacked paragraphs — roughly 95 words before the reader saw anything.
 * Hero.tsx now opens the page with a photograph, so this chapter does one job:
 * the question a mother asks, and where Ayusya came from. Two sentences.
 *
 * The h1 moved to the hero with it. There is one h1 per document, and it belongs
 * on the thing a visitor actually lands on.
 */
const Wish = () => (
  <Chapter id="wish" numeral="I" eyebrow="The Wish" tone="bg-cream-100">
    {/* Ambient sun, bleeding off the top-right corner. Decorative only. */}
    <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-caramel/25 md:h-96 md:w-96">
      <Sun />
    </div>

    <Reveal>
      <h2 className="heading-lg max-w-2xl text-primary">
        A mother&apos;s wish, <span className="text-sku-moringa">come to life.</span>
      </h2>
    </Reveal>

    <Reveal delay={0.1}>
      <p className="paragraph mt-7 max-w-xl">
        It starts before sunrise, with one question a mother asks every day: what
        will my family eat, and is it good for them?
      </p>
    </Reveal>

    <Reveal delay={0.16}>
      <p className="script-accent mt-8 text-2xl md:text-3xl">
        Smart food for healthy lives.
      </p>
    </Reveal>

    <Reveal delay={0.22}>
      <ChapterCTA lead="products" productsLabel="See what we make" />
    </Reveal>

    {/* Leaf watermark anchoring the chapter's lower edge. */}
    <div className="pointer-events-none absolute -bottom-8 right-6 h-40 w-28 text-sku-moringa/15 md:h-56 md:w-40">
      <LeafMotif animate />
    </div>
  </Chapter>
);

export default Wish;
