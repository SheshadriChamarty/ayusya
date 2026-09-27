import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import { HERO_OPTIONS, DEFAULT_HERO_ID } from "@/components/story/heroOptions";

/**
 * A side-by-side board of every hero photograph under consideration.
 *
 * This exists to be *shared*. The dev-only HeroSwitcher solves comparison for
 * whoever is running the dev server, but it cannot solve "send this to someone for
 * feedback" — localhost does not reach another person, and a switcher that vanishes
 * in a production build reaches them least of all.
 *
 * So this is a real route that survives the build. Each option renders under the
 * actual scrim and the actual headline, at the real aspect ratio, because the only
 * question that matters is whether the type still reads on it — which a raw
 * thumbnail cannot answer. Every card links to the live homepage with that option
 * applied via `?hero=`, so a reviewer can see any candidate full-size in context.
 *
 * It is deliberately not in the navbar. It is a working document for a decision in
 * progress, not part of the story, and it should be deleted once the hero is
 * settled — at which point heroOptions.ts collapses to the one chosen entry.
 */
const HeroOptions = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    <main className="flex-grow bg-cream-100">
      <div className="container mx-auto px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">Working document</p>
        <h1 className="heading-lg mt-3 text-primary">Hero photo options</h1>
        <p className="paragraph mt-5 max-w-2xl">
          {HERO_OPTIONS.length} candidates for the photograph that opens the site.
          Each is shown under the real headline and the real gradient, because the
          only question that matters is whether the words still read on it.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-umber-light">
          Every image is from Pexels under a licence that allows commercial use with
          no attribution required. Tap any card to see it full-size on the live
          homepage.
        </p>

        <ul className="mt-12 grid gap-10 lg:grid-cols-2">
          {HERO_OPTIONS.map((o, i) => (
            <li key={o.id}>
              <article className="overflow-hidden rounded-3xl border border-bronze/20 bg-cream shadow-warm">
                {/*
                 * A miniature of the hero, not a crop of the photo: same scrim, same
                 * cream headline, same object-position. Reviewing a bare thumbnail
                 * would answer the wrong question — every one of these looks good as
                 * a photograph, and the differences only appear under type.
                 */}
                <Link
                  to={`/?hero=${o.id}`}
                  className="relative isolate block aspect-[16/10] overflow-hidden"
                  aria-label={`Open the homepage with the ${o.label} photo`}
                >
                  <Photo
                    base={o.base}
                    alt={o.alt}
                    width={1600}
                    height={1000}
                    /* Half-width above lg, full-width below. Without this the
                       browser would fetch the 1600px file for every card. */
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className={`absolute inset-0 -z-10 h-full w-full ${o.objectPosition}`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                      backgroundImage:
                        `linear-gradient(to top, #451B03 5%, ` +
                        `rgb(69 27 3 / ${o.scrim / 100}) 30%, transparent 72%)`,
                    }}
                  />
                  <div className="flex h-full flex-col justify-end p-5 md:p-7">
                    <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cream/90">
                      Gudivada, Andhra Pradesh
                    </p>
                    <p className="mt-2 font-display text-xl font-extrabold leading-[1.05] tracking-tight text-cream drop-shadow-[0_2px_12px_rgba(69,27,3,0.55)] md:text-3xl">
                      The sun does the work.
                      <br />
                      We just don&apos;t get in its way.
                    </p>
                  </div>
                </Link>

                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="heading-md text-primary">
                      {i + 1}. {o.label}
                    </h2>
                    {o.id === DEFAULT_HERO_ID && (
                      <span className="rounded-full bg-caramel/30 px-2.5 py-0.5 font-display text-[0.7rem] font-bold uppercase tracking-wider text-bronze">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-umber">{o.note}</p>

                  <Link
                    to={`/?hero=${o.id}`}
                    className="mt-5 inline-flex items-center gap-2 font-display text-base font-bold text-bronze underline decoration-caramel-dark decoration-2 underline-offset-4 hover:decoration-bronze"
                  >
                    See it full-size
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Named on the board rather than left as a gap, so a reviewer who was
            promised this frame knows it is pending rather than forgotten. */}
        <p className="mt-10 max-w-2xl rounded-2xl border border-dashed border-bronze/30 bg-cream p-5 text-base leading-relaxed text-umber">
          <strong className="font-semibold text-bronze">
            One more is coming: mixed crops on a single cloth.
          </strong>{" "}
          Carrot, beetroot, spinach, moringa and amla drying together in the frame
          above&apos;s style. No stock library has that photograph — every
          cloth-in-the-sun shot holds only one crop — so it has to be generated or
          taken on the actual terrace. See{" "}
          <code className="text-bronze">public/assets/photos/AI-PROMPT.md</code>.
        </p>

        <p className="mt-6 max-w-2xl rounded-2xl border border-bronze/20 bg-cream p-5 text-base leading-relaxed text-umber">
          <strong className="font-semibold text-bronze">To choose one:</strong> note
          its number. Switching the live site is a one-line change —{" "}
          <code className="text-bronze">DEFAULT_HERO_ID</code> in{" "}
          <code className="text-bronze">heroOptions.ts</code>.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default HeroOptions;
