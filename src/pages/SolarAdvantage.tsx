import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/story/Reveal";
import SolarTunnel from "@/components/illustrations/SolarTunnel";
import Sun from "@/components/illustrations/Sun";
import BronzeBadge from "@/components/illustrations/BronzeBadge";
import ChapterCTA from "@/components/story/ChapterCTA";
import { Link } from "react-router-dom";

/**
 * /solar-advantage — the technical deep-dive behind chapter ④.
 *
 * Until now this route rendered the *identical* HeroSection as the homepage, and
 * was linked from nowhere. It exists so the process claim has somewhere to be
 * substantiated at length: the homepage chapter makes the case in six lines, and
 * anyone who wants the detail lands here rather than on a duplicate page.
 *
 * Every claim here is about mechanism, not health outcome — guidelines §7.
 */

const STAGES = [
  {
    step: "01",
    title: "Received and sorted",
    body: "Produce arrives from farms around Gudivada within hours of being cut, then is washed and sorted by hand. Anything past its best is rejected here rather than dried.",
  },
  {
    step: "02",
    title: "Cut to an even thickness",
    body: "Slice thickness decides drying time, and uneven slices mean some pieces over-dry while others stay damp. Consistency at this step is what makes a uniform batch possible.",
  },
  {
    step: "03",
    title: "Loaded into the solar tunnel",
    body: "Trays go into a polytunnel dryer where sunlight is trapped and air is moved across the produce. The heat is the sun's; the airflow is what carries the moisture away.",
  },
  {
    step: "04",
    title: "Dried low and slow, and watched",
    body: "Hours at a controlled low temperature rather than minutes at a high one. The eco-hybrid backup only engages when daylight is insufficient, so a cloudy afternoon does not spoil a batch.",
  },
  {
    step: "05",
    title: "Milled and sealed the same day",
    body: "Once the moisture is low enough to be shelf-stable, the batch is milled and sealed in a zip pouch — no cooling period during which it could reabsorb humidity.",
  },
];

const COMPARISON = [
  {
    aspect: "Heat",
    industrial: "High heat, applied fast",
    ayusya: "Low, controlled, over hours",
  },
  {
    aspect: "Energy source",
    industrial: "Fossil-fuel fired dryers",
    ayusya: "100% solar, with an eco-hybrid backup",
  },
  {
    aspect: "What preserves it",
    industrial: "Often preservatives and additives",
    ayusya: "Removing water — nothing else",
  },
  {
    aspect: "Colour and aroma",
    industrial: "Frequently restored artificially",
    ayusya: "The ingredient's own, retained",
  },
];

const SolarAdvantage = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    <main className="flex-grow">
      <section className="relative overflow-hidden bg-cream-100">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 text-bronze-metallic/20">
          <Sun />
        </div>

        <div className="container relative z-10 mx-auto px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow mb-5">The Solar Advantage</p>
            <h1 className="heading-xl max-w-3xl">
              Removing the water. Leaving everything else.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="paragraph mt-7 max-w-2xl">
              Drying is the oldest method of preserving food there is. What
              eco-hybrid solar drying changes is the control: the same gentle heat,
              held steady and measured, so the process is repeatable batch after
              batch instead of dependent on the weather.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-12 max-w-2xl rounded-[2rem] border border-caramel/40 bg-cream-50 p-6 shadow-warm-lg md:p-9">
              <div className="h-60 text-bronze md:h-72">
                <SolarTunnel dryness={0.72} />
              </div>
              <p className="eyebrow mt-5 text-center">
                Cutaway — eco-hybrid solar tunnel
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-200">
        <div className="container mx-auto px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow mb-4">The process</p>
            <h2 className="heading-lg max-w-2xl">Five steps, one day.</h2>
          </Reveal>

          <ol className="mt-12 space-y-4">
            {STAGES.map((stage, i) => (
              <Reveal
                key={stage.step}
                delay={i * 0.06}
                from="left"
                className="flex gap-5 rounded-3xl border border-caramel/40 bg-cream-50 p-6 shadow-warm md:gap-7 md:p-7"
              >
                <span className="font-wordmark text-2xl font-bold text-bronze-light md:text-3xl">
                  {stage.step}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary md:text-xl">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-umber md:text-base">
                    {stage.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream-100">
        <div className="container mx-auto px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow mb-4">How it differs</p>
            <h2 className="heading-lg max-w-2xl">
              Against conventional industrial drying.
            </h2>
          </Reveal>

          {/* A table, because this is genuinely tabular data — and a real <table>
              reads correctly to a screen reader, where a grid of divs would not. */}
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto rounded-3xl border border-caramel/40 bg-cream-50 shadow-warm">
              <table className="w-full min-w-[34rem] text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b border-caramel/40">
                    <th scope="col" className="p-4 font-display text-primary md:p-5">
                      &nbsp;
                    </th>
                    <th scope="col" className="p-4 font-display text-umber-light md:p-5">
                      Conventional
                    </th>
                    <th scope="col" className="p-4 font-display text-primary md:p-5">
                      Ayusya
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.aspect} className="border-b border-caramel/25 last:border-0">
                      <th scope="row" className="p-4 font-display font-semibold text-primary md:p-5">
                        {row.aspect}
                      </th>
                      <td className="p-4 text-umber-light md:p-5">{row.industrial}</td>
                      <td className="p-4 font-medium text-umber md:p-5">{row.ayusya}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { label: "Solar Dried", value: "100%" },
              { label: "No Additives", value: "0" },
              { label: "Made in Gudivada" },
              { label: "FSSAI Certified" },
            ].map((badge, i) => (
              <Reveal
                key={badge.label}
                delay={i * 0.08}
                className="mx-auto h-24 w-24 text-bronze md:h-28 md:w-28"
              >
                <BronzeBadge label={badge.label} value={badge.value} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <ChapterCTA lead="products" productsLabel="See what it produces" />
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 text-sm text-umber-light">
              The process is one chapter of a longer story —{" "}
              <Link to="/" className="font-semibold text-primary underline underline-offset-4">
                read it from the beginning
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default SolarAdvantage;
