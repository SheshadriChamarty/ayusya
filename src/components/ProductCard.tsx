import React, { useId, useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import IngredientGlyph from "./illustrations/IngredientGlyph";
import { Product } from "../data/productData";
import { skuStyle } from "@/lib/skuAccents";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

/**
 * One catalogue card.
 *
 * The card sets `--sku-accent` on its own root, and everything coloured inside it
 * — the glyph, the tint band, the bullet marks, the hover border — reads from
 * that one variable. That is why there is no per-product styling branch anywhere
 * below: 21 visually distinct cards come out of one set of rules plus one hex.
 *
 * The glyph is the primary image, not a photograph. There are no per-SKU product
 * photographs, and a grid of 21 identical placeholder images looked worse than no
 * image at all; a line-art glyph in the ingredient's real colour distinguishes
 * every card at a glance and costs nothing to load.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();
  const { accent } = skuStyle(product.name);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-caramel/40",
        "bg-cream-50 shadow-warm transition-all duration-300",
        "hover:-translate-y-1 hover:border-sku hover:shadow-warm-lg"
      )}
      style={{ "--sku-accent": accent } as React.CSSProperties}
    >
      {/* The accent band. The tint is the SKU colour at low alpha via color-mix,
          so a single rule tints all 21 cards differently. */}
      <div
        className="relative flex items-center justify-center px-6 py-10"
        style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, #FFF7E8)` }}
      >
        <IngredientGlyph
          productName={product.name}
          className="h-24 w-24 transition-transform duration-500 group-hover:scale-110 md:h-28 md:w-28"
        />

        {(product.isNew || product.isPopular) && (
          <span
            className={cn(
              "absolute right-4 top-4 rounded-full px-3 py-1",
              "font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em]",
              product.isNew
                ? "bg-sku text-cream-50"
                : "border border-bronze/25 bg-cream-50 text-bronze"
            )}
          >
            {product.isNew ? "New" : "Popular"}
          </span>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-primary">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-umber-light">
          {product.description}
        </p>

        <ul className="mt-5 space-y-2">
          {product.benefits.slice(0, 2).map((benefit) => (
            <li key={benefit} className="flex gap-2.5 text-sm text-umber">
              <span aria-hidden="true" className="mt-0.5 font-bold text-sku-ink">
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Collapsed with grid-template-rows rather than max-height: `1fr → 0fr`
            animates to the content's real height, so a long benefit list is never
            clipped by a guessed max-height the way the old max-h-[500px] could be. */}
        <div
          id={panelId}
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500",
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0 space-y-5 pt-5 text-sm">
            <div>
              <p className="eyebrow">All benefits</p>
              <ul className="check-list mt-2.5 space-y-1.5 text-umber">
                {product.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">How to use it</p>
              <ul className="check-list mt-2.5 space-y-1.5 text-umber">
                {product.usage.map((usage) => (
                  <li key={usage}>{usage}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Shelf life</p>
              <p className="mt-2 text-umber">{product.shelfLife}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-3 pt-6">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={panelId}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 font-display text-sm font-bold text-umber transition-colors hover:text-primary"
          >
            {isExpanded ? "Show less" : "Benefits, usage & shelf life"}
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={cn("transition-transform duration-300", isExpanded && "rotate-180")}
            />
          </button>

          {/* A real anchor, not a button calling window.open: the enquiry
              survives middle-click, long-press and popup blockers, and screen
              readers announce it as the link it is. */}
          <a
            href={whatsappUrl(product.name)}
            target="_blank"
            rel="noreferrer noopener"
            className="ayusya-btn w-full px-5 py-3 text-sm"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Enquire on WhatsApp
            <span className="sr-only"> about {product.name}</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
