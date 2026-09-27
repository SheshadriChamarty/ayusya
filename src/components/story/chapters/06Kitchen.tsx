import Chapter from "../Chapter";
import ChapterCTA from "../ChapterCTA";
import Reveal from "../Reveal";
import SteamCurl from "@/components/illustrations/SteamCurl";

/**
 * Chapter ⑥ — Your Kitchen. The payoff.
 *
 * This is the beat that actually sells, so it is written as one ordinary day
 * rather than as a list of features: the reader should recognise their own
 * evening in it. Every line stays inside guidelines §7 — concrete instruction
 * and real quantities, no health outcomes, no wellness abstraction.
 *
 * The three MOMENTS are deliberately timestamped. "Add 1–2 tsp to warm water"
 * is an instruction; "6:40 in the morning, before anyone else is up" is a scene,
 * and the instruction lands harder inside it.
 */

const MOMENTS = [
  {
    when: "6:40 am",
    title: "Before anyone else is up",
    what: "One teaspoon of Moringa Powder into warm water, and it is done before the kettle has finished. No leaves to pick over, no stems to throw away, no bunch you bought on Sunday that has gone soft by Wednesday.",
  },
  {
    when: "1:15 pm",
    title: "Lunch, with twenty minutes to make it",
    what: "Two teaspoons of Tomato Powder and one of Onion Powder straight into hot oil. The base of the curry is built in under a minute — the same base, at the same strength, every single time.",
  },
  {
    when: "8:50 pm",
    title: "The night you have nothing left",
    what: "A spoon of Spinach Powder stirred into the dal while it simmers, or into the dosa batter. Greens reach the plate on the evening you were never going to chop them.",
  },
];

const Kitchen = () => (
  <Chapter id="kitchen" numeral="VI" eyebrow="Your Kitchen" tone="bg-cream-200">
    <div className="grid items-start gap-10 md:grid-cols-[1fr_auto]">
      <div>
        <Reveal>
          <h2 className="heading-lg max-w-2xl">
            And then it is just a Tuesday — and you are already ahead.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="paragraph mt-7 max-w-xl">
            This is where the whole journey lands. A farm outside Gudivada, a
            morning of sun, a sealed pouch — and the point of all of it is a
            drawer in your kitchen that you can open at ten to nine at night,
            tired, with nothing prepared.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-umber-light">
            No cutting. No cooking down. No washing up afterwards. The pouch
            opens, the spoon goes in, and the vegetable is already there —
            picked at its peak, months ago, waiting.
          </p>
        </Reveal>

        <div className="mt-10 space-y-4">
          {MOMENTS.map((moment, i) => (
            <Reveal
              key={moment.when}
              delay={i * 0.08}
              from="left"
              className="rounded-2xl border border-caramel/40 bg-cream-50 p-5 shadow-warm md:p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-wordmark text-lg font-bold text-bronze-light">
                  {moment.when}
                </span>
                <h3 className="font-display text-base font-semibold text-primary md:text-lg">
                  {moment.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-umber md:text-base">
                {moment.what}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-9 max-w-xl text-base leading-relaxed text-umber">
            It lives in the cupboard, not the fridge. Which means the season a
            thing was picked in is still on your shelf in the month it
            isn&apos;t — and nothing in that pouch is going to spoil while you
            decide what to cook.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="script-accent mt-8 text-xl md:text-2xl">
            A mother&apos;s wish, come to life — one spoon at a time.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <ChapterCTA lead="whatsapp" whatsappLabel="Ask what to start with" />
        </Reveal>
      </div>

      <div className="mx-auto h-56 w-44 text-bronze md:h-72 md:w-56">
        <SteamCurl />
      </div>
    </div>
  </Chapter>
);

export default Kitchen;
