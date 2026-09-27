import { Link } from "react-router-dom";
import Chapter from "../Chapter";
import Reveal from "../Reveal";
import IngredientGlyph from "@/components/illustrations/IngredientGlyph";
import { productData } from "@/data/productData";
import { skuStyle, FAMILY_LABELS, ProductFamily } from "@/lib/skuAccents";
import { whatsappUrl } from "@/lib/contact";
import CatalogueLink from "@/components/CatalogueLink";
import { MessageCircle, ArrowRight } from "lucide-react";

/**
 * Chapter ⑦ — The Shelf. The invitation.
 *
 * The thread flattens into a shelf rule, six powders sit on it, and the page
 * hands off to /products. This is the end of the narrative, so the last thing on
 * it is the next step rather than more information.
 *
 * ── Why this chapter is short ───────────────────────────────────────────────
 * It used to render all 21 SKUs as three grids of tiles — 21 cards duplicating
 * /products, on the tallest section of an already-long page, every one of them
 * linking to the same place. A taster of six makes the same point (there are
 * many, they are all one ingredient each) in a fifth of the height, and the
 * catalogue is one tap away for anyone who wants the full list. Length was the
 * complaint; this was where the length was.
 *
 * The three category narrations survive as prose because they are the best
 * product writing in the repo — salvaged from the old ProductsSection.tsx, which
 * was dead code but held copy nothing else replaced. Its 26 per-product blurbs
 * described a partly different catalogue (carrot, beetroot, amla, cabbage,
 * potato, capsicum and fenugreek are written up there but do not ship), so only
 * the category-level writing was carried across.
 * ────────────────────────────────────────────────────────────────────────────
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

/**
 * Six powders standing in for twenty-one.
 *
 * Derived rather than hand-picked: one per family so the row shows the real
 * spread of the catalogue, preferring a product the data already flags as
 * popular or new, then topped up from the largest family. A hardcoded list of
 * six names would quietly become wrong the first time a product is added or
 * renamed.
 */
const TASTER = (() => {
  const chosen = FAMILY_LABELS.map(({ value }) => {
    const members = productData.filter((p) => skuStyle(p.name).family === value);
    return members.find((p) => p.isPopular || p.isNew) ?? members[0];
  }).filter(Boolean);

  const fill = productData.filter((p) => !chosen.includes(p));
  return [...chosen, ...fill].slice(0, 6);
})();

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

    {/* The shelf rule the thread flattens into, with six powders standing on it. */}
    <Reveal delay={0.14}>
      <div className="mt-12 h-px w-full bg-gradient-to-r from-bronze-metallic/60 via-caramel/40 to-transparent" />

      <ul className="mt-7 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-6">
        {TASTER.map((product) => (
          <li key={product.id} className="text-center">
            <IngredientGlyph
              productName={product.name}
              className="mx-auto h-12 w-12 md:h-14 md:w-14"
            />
            <span className="mt-2.5 block font-display text-xs font-semibold leading-tight text-primary md:text-sm">
              {product.name.replace(" Powder", "")}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>

    {/* The three groups as prose with counts, not as grids. The counts do the
        work the tiles used to: they say how much is behind the link. */}
    <div className="mt-12 space-y-7 border-t border-caramel/30 pt-10">
      {GROUPS.map((group, gi) => {
        const count = productData.filter((p) =>
          group.family.includes(skuStyle(p.name).family)
        ).length;

        return (
          <Reveal key={group.name} delay={gi * 0.06}>
            <div className="max-w-2xl">
              <h3 className="font-display text-lg font-bold text-primary md:text-xl">
                {group.name}
                {/* " · 6 products" spelled out rather than a bare numeral. The
                    numeral alone read as "Daily superfood powders6" to anything
                    consuming the text layer — a screen reader, or search. */}
                <span className="ml-2 align-middle text-sm font-semibold text-umber-light">
                  {" · "}
                  {count} products
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-umber md:text-base">
                {group.narration}
              </p>
            </div>
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
          Build a list of what you need, send it on WhatsApp, and we will sort out
          the rest.
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
