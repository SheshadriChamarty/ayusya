import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import { HERO_OPTIONS, DEFAULT_HERO_ID } from "@/components/story/heroOptions";

/**
 * A side-by-side board of the hero photographs that were considered.
 *
 * ── This is now a record, not a chooser ─────────────────────────────────────
 * The decision is made — the bamboo trays, locked by the owner — so the cards no
 * longer link to `/?hero=<id>`. They can't: the hero is a module constant and the
 * `?hero=` param is not read any more. Leaving the links in place would have been
 * the worse option, because a link that navigates and changes nothing is exactly
 * how the original confusion happened. The board stays because the reasoning
 * behind each candidate is worth keeping next to the assets.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * Each option renders under the actual scrim and the actual headline, at the real
 * aspect ratio, because the only question that mattered was whether the type still
 * reads on it — which a raw thumbnail cannot answer.
 *
 * It is deliberately not in the navbar, and it can be deleted whenever the record
 * stops being useful; at that point heroOptions.ts collapses to the one entry.
 */
const HeroOptions = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    <main className="flex-grow bg-cream-100">
      <div className="container mx-auto px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">Working document</p>
        <h1 className="heading-lg mt-3 text-primary">Hero photo options</h1>
        <p className="paragraph mt-5 max-w-2xl">
          The {HERO_OPTIONS.length} candidates for the photograph that opens the
          site, each shown under the real headline and the real gradient. The
          bamboo trays were chosen and are live on the homepage; the rest are kept
          here as a record of what was considered and why.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-umber-light">
          Every image is from Pexels under a licence that allows commercial use with
          no attribution required.
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
                <div className="relative isolate block aspect-[16/10] overflow-hidden">
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
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="heading-md text-primary">
                      {i + 1}. {o.label}
                    </h2>
                    {o.id === DEFAULT_HERO_ID && (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 font-display text-[0.7rem] font-bold uppercase tracking-wider text-primary-foreground">
                        Chosen — live on the site
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-umber">{o.note}</p>
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
          <strong className="font-semibold text-bronze">The hero is settled:</strong>{" "}
          the bamboo trays, chosen by the owner and fixed in code. It is no longer
          switchable from the browser — the one place it can change is{" "}
          <code className="text-bronze">DEFAULT_HERO_ID</code> in{" "}
          <code className="text-bronze">heroOptions.ts</code>.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default HeroOptions;
