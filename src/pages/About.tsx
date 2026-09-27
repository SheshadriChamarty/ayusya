import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/story/Reveal";
import ChapterCTA from "@/components/story/ChapterCTA";
import LeafMotif from "@/components/illustrations/LeafMotif";
import Sun from "@/components/illustrations/Sun";
import {
  COMPANY_NAME,
  FOUNDER,
  ADDRESS_SHORT,
  ADDRESS_FULL,
  FSSAI_LICENSE,
} from "@/lib/contact";

/**
 * /about — the origin story at length, and the people and place behind it.
 *
 * The homepage tells this in two paragraphs because a scroll narrative has to
 * keep moving. This page is where a visitor who wants to know who they are
 * buying from can actually find out.
 */

const COMMITMENTS = [
  {
    title: "Mission",
    body: "To make high-quality, natural products that support well-being at every stage of life — nutrition that feels homemade but stays pantry-ready.",
  },
  {
    title: "Vision",
    body: "To be a leading name in sustainable food preservation, creating a healthier future by reducing post-harvest losses globally.",
  },
  {
    title: "Sustainable sourcing",
    body: "Farm-to-Factory Integration: we collaborate directly with local farmers for fair pricing and complete traceability.",
  },
  {
    title: "Quality standard",
    body: "Every batch is shelf-stable, chemical-free and preservative-free, so families can trust what they serve and what they store.",
  },
];

const About = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    <main className="flex-grow">
      <section className="relative overflow-hidden bg-cream-100">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-caramel/25">
          <Sun />
        </div>

        <div className="container relative z-10 mx-auto px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow mb-5">Our story</p>
            <h1 className="heading-xl max-w-3xl">
              A mother&apos;s wish for lasting wellness.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="paragraph mt-8 max-w-2xl">
              Ayusya was born from a mother&apos;s heartfelt desire to nurture her
              family — to promote wellness and support healthy lives from childhood
              through to the golden years.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-umber-light">
              The belief underneath it is simple: a woman is the heart of her
              family&apos;s health. She decides what is eaten, and she should not
              have to choose between food that is convenient and food that is
              genuinely nourishing. Everything we make exists to remove that choice.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <blockquote className="mt-10 max-w-2xl rounded-3xl border-l-4 border-sku-moringa bg-cream-50 p-7 shadow-warm">
              <p className="font-display text-lg italic leading-relaxed text-primary md:text-xl">
                &ldquo;We craft wellness staples that keep nature&apos;s rhythm alive
                in every kitchen, preserving nutrients as if they were freshly
                harvested.&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="script-accent mt-10 text-2xl md:text-3xl">
              Healing begins where nature whispers and light listens.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-200">
        <div className="container mx-auto px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow mb-4">The founder</p>
            <h2 className="heading-lg max-w-2xl">{FOUNDER}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="paragraph mt-7 max-w-2xl">
              {COMPANY_NAME} is run from {ADDRESS_SHORT}, surrounded by the
              farmland it buys from — which is the whole reason the business works
              where it is. The produce is grown within reach of the factory, so it
              is dried while it is still at its peak rather than after a journey.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-umber-light">
              It is a small operation by design. Sourcing directly from local and
              marginal farmers means a fair price agreed before the harvest, and it
              means every batch stays traceable to where it came from.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {COMMITMENTS.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.07}
                className="rounded-3xl border border-caramel/40 bg-cream-50 p-7 shadow-warm"
              >
                <p className="eyebrow">{item.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-umber md:text-base">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-100">
        <div className="pointer-events-none absolute -bottom-10 right-4 h-48 w-32 text-sku-moringa/15 md:h-64 md:w-44">
          <LeafMotif animate />
        </div>

        <div className="container relative z-10 mx-auto px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow mb-4">Where we are</p>
            <h2 className="heading-lg max-w-2xl">{COMPANY_NAME}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <address className="mt-6 max-w-md not-italic leading-relaxed text-umber">
              {ADDRESS_FULL}
            </address>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-4 text-sm text-umber-light">
              FSSAI Central Licence {FSSAI_LICENSE}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ChapterCTA lead="products" productsLabel="See what we make" />
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-8 text-sm text-umber-light">
              Or{" "}
              <Link to="/" className="font-semibold text-primary underline underline-offset-4">
                read the whole story from the beginning
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

export default About;
