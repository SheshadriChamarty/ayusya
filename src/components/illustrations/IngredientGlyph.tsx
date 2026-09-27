import { GlyphShape, skuStyle } from "@/lib/skuAccents";
import { cn } from "@/lib/utils";

interface IngredientGlyphProps {
  /** Exact product name — looked up in SKU_STYLES for shape and colour. */
  productName: string;
  className?: string;
}

/**
 * Line-art glyph per ingredient, stroked in that SKU's accent colour.
 *
 * All shapes share one 64×64 viewBox and one stroke weight so a grid of cards
 * reads as a set. Colour comes from --sku-accent (set by the card) with the
 * resolved hex as the fallback, which keeps the glyph correct if it is ever
 * rendered outside a card that sets the variable.
 */
const SHAPES: Record<GlyphShape, JSX.Element> = {
  leaf: (
    <>
      <path d="M32 6 C52 26 52 46 32 58 C12 46 12 26 32 6 Z" />
      <line x1="32" y1="12" x2="32" y2="54" />
      {/* Veins angle down-and-out toward the tip, and stop short of the
          outline — drawn up-and-out they punched through the silhouette. */}
      <path d="M32 22 L23 27 M32 32 L22 38 M32 42 L25 47" opacity="0.7" />
      <path d="M32 22 L41 27 M32 32 L42 38 M32 42 L39 47" opacity="0.7" />
    </>
  ),
  chilli: (
    <>
      <path d="M32 20 C43 26 44 40 37 50 Q32 58 27 50 C20 40 21 26 32 20 Z" />
      {/* Stem and calyx leaf stay short — the long original stem ran off past
          the body and read as a stray line rather than part of the fruit. */}
      <path d="M32 20 Q30 13 25 10" />
      <path d="M32 20 Q38 15 43 17" />
      <path d="M31 30 Q33 40 31 48" opacity="0.5" />
    </>
  ),
  round: (
    <>
      <circle cx="32" cy="36" r="22" />
      <path d="M32 14 Q30 6 22 6" />
      <path d="M32 16 Q40 10 46 14" />
      <path d="M22 28 Q26 36 22 46" opacity="0.5" />
    </>
  ),
  root: (
    <>
      <path d="M27 13 C39 16 44 28 42 40 C40 52 33 58 26 56 C18 53 16 41 18 30 C20 20 23 13 27 13 Z" />
      {/* Side knobs are closed lobes, not free-standing stubs: the original
          stray arcs floated clear of the body and read as broken geometry. */}
      <path d="M41 25 Q52 23 54 31 Q50 38 41 36" />
      <path d="M19 40 Q8 42 9 50 Q16 53 21 47" />
      <path d="M27 13 Q25 7 29 4" opacity="0.6" />
    </>
  ),
  bulb: (
    <>
      <path d="M32 18 C46 18 52 30 52 40 C52 52 42 58 32 58 C22 58 12 52 12 40 C12 30 18 18 32 18 Z" />
      <path d="M32 18 L28 6 M32 18 L36 6 M32 18 L32 4" />
      <path d="M24 22 Q20 40 26 56 M40 22 Q44 40 38 56" opacity="0.5" />
    </>
  ),
  citrus: (
    <>
      <circle cx="32" cy="34" r="22" />
      <circle cx="32" cy="34" r="16" opacity="0.5" />
      <path d="M32 18 L32 50 M18 34 L46 34 M22 24 L42 44 M42 24 L22 44" opacity="0.5" />
      <path d="M32 12 Q34 6 40 6" />
    </>
  ),
  tropical: (
    <>
      <path d="M32 18 C48 18 54 30 52 42 C50 54 42 58 32 58 C22 58 14 54 12 42 C10 30 16 18 32 18 Z" />
      <path d="M32 18 Q26 8 16 6 M32 18 Q38 8 48 6 M32 18 L32 6" />
      <path d="M22 30 Q32 38 42 30 M20 42 Q32 50 44 42" opacity="0.45" />
    </>
  ),
  gourd: (
    <>
      <path d="M32 14 C44 18 48 32 46 44 C44 56 36 60 32 60 C28 60 20 56 18 44 C16 32 20 18 32 14 Z" />
      <path d="M32 14 Q32 6 36 4" />
      <path d="M26 20 Q22 38 26 56 M38 20 Q42 38 38 56" opacity="0.5" />
      <path d="M32 18 Q32 40 32 58" opacity="0.35" />
    </>
  ),
};

const IngredientGlyph = ({ productName, className }: IngredientGlyphProps) => {
  const { accent, glyph } = skuStyle(productName);

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      style={{ color: `var(--sku-accent, ${accent})` }}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {SHAPES[glyph]}
      </g>
    </svg>
  );
};

export default IngredientGlyph;
