import { Link } from "react-router-dom";
import Chapter from "../Chapter";
import Reveal from "../Reveal";
import IngredientGlyph from "@/components/illustrations/IngredientGlyph";
import { productData } from "@/data/productData";
import { skuStyle, ProductFamily } from "@/lib/skuAccents";
import { whatsappUrl } from "@/lib/contact";
import CatalogueLink from "@/components/CatalogueLink";
import { MessageCircle, ArrowRight } from "lucide-react";

/**
 * Chapter ⑦ — The Shelf. The invitation.
 *
 * The thread flattens into a shelf rule and the products sit on it. This is the
 * end of the narrative and the handoff to /products, so it is the one chapter
 * that shows actual SKUs rather than illustration.
 *
 * The three category narrations below are the surviving copy from the old
 * ProductsSection.tsx, which was dead code (imported by nothing) but held the
 * best product writing in the repo. Its 26 per-product blurbs described a
 * partly different catalogue — carrot, beetroot, amla, cabbage, potato, capsicum
 * and fenugreek are written up there but are not among the 21 SKUs that actually
 * ship — so only the category-level writing is carried across. Per-product copy
 * comes from productData.ts, which is the real catalogue.
 */

interface Group {
  family: ProductFamily[];
  name: string;
  narration: string;
}

const GROUPS: Group[] = [
  {
    family: ["leafy", "root"],
    name: "Daily superfood powders",
    narration:
      "Concentrated nutrition that goes into what you already cook — smoothies, batters, soups, or as natural colour.",
  },
  {
    family: ["vegetable", "spice"],
    name: "Everyday vegetables & spices",
    narration:
      "The prep, already done. Concentrated flavour and nutrients without the chopping, and without losing freshness.",
  },
  {
    family: ["fruit"],
    name: "Dehydrated fruit powders",
    narration:
      "For snacking, breakfast bowls, and natural sweetness — the season kept available out of season.",
  },
];

const Shelf = () => (
  <Chapter id="shelf" numeral="VII" eyebrow="The Shelf" tone="bg-cream-100">
    <Reveal>
      <h2 className="heading-lg max-w-2xl">Twenty-one of them, so far.</h2>
    </Reveal>

    <Reveal delay={0.1}>
      <p className="paragraph mt-7 max-w-xl">
        Every one is the same process and the same promise — one ingredient, solar
        dried, sealed, nothing added. Pick the ones that fit how you actually cook.
      </p>
    </Reveal>

    <div className="mt-14 space-y-12">
      {GROUPS.map((group, gi) => {
        const items = productData.filter((p) =>
          group.family.includes(skuStyle(p.name).family)
        );

        return (
          <Reveal key={group.name} delay={gi * 0.06}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="heading-md">{group.name}</h3>
              <span className="text-sm font-semibold text-umber-light">
                {items.length} products
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-umber md:text-base">
              {group.narration}
            </p>

            {/* The shelf rule the thread flattens into. */}
            <div className="mt-6 h-px w-full bg-gradient-to-r from-bronze-metallic/60 via-caramel/40 to-transparent" />

            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((product) => {
                const { accent } = skuStyle(product.name);
                return (
                  <li key={product.id}>
                    <Link
                      to="/products"
                      style={{ ["--sku-accent" as string]: accent }}
                      className="group flex h-full items-center gap-3 rounded-2xl border border-caramel/40 bg-cream-50 p-3.5
                                 transition-all duration-300 hover:-translate-y-0.5 hover:border-sku hover:shadow-warm
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="h-9 w-9 shrink-0 md:h-10 md:w-10">
                        <IngredientGlyph productName={product.name} />
                      </span>
                      <span className="font-display text-sm font-semibold leading-tight text-primary md:text-[0.95rem]">
                        {product.name.replace(" Powder", "")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        );
      })}
    </div>

    {/* The one real photograph on the page, and it earns its place here: after
        six chapters of line art, seeing the actual product is the payoff. */}
    <Reveal delay={0.08}>
      <div className="img-wrapper mt-14 border border-caramel/40 shadow-warm">
        <img
          src="/assets/showcase-1024.jpg"
          alt="A selection of Ayusya dried fruit and vegetable powders"
          width={1024}
          height={367}
          loading="lazy"
          className="h-32 w-full object-cover md:h-48"
        />
      </div>
    </Reveal>

    {/* Closing invitation. The last thing on the page is the next step. */}
    <Reveal delay={0.08}>
      <div className="mt-16 rounded-[2rem] border border-caramel bg-caramel-band p-8 text-center shadow-warm-lg md:p-12">
        <p className="script-accent text-2xl text-bronze md:text-3xl">
          Healing begins where nature whispers and light listens.
        </p>
        <h3 className="heading-md mt-5">Start wherever you like.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-bronze/80 md:text-base">
          There is no cart and no checkout — tell us what you need on WhatsApp and
          we will sort out the rest.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/products" className="ayusya-btn">
            Browse all 21 products
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer noopener"
            className="ayusya-btn-outline"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Enquire on WhatsApp
          </a>
        </div>
        <div className="mt-6">
          <CatalogueLink variant="quiet" label="Or open the full catalogue" />
        </div>
      </div>
    </Reveal>
  </Chapter>
);

export default Shelf;
