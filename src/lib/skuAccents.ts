/**
 * Per-product accent colour, glyph shape and catalogue family.
 *
 * This is the single place per-SKU presentation metadata lives. It sits beside
 * productData.ts rather than inside it deliberately: the catalogue copy (names,
 * benefits, usage, shelf life) is frozen content, while accent/glyph/family are
 * presentation decisions that will keep changing as the design does. Keeping them
 * apart means a design change never touches the file holding the product claims.
 *
 * Guidelines §3: every accent is the real colour of the ingredient, never an
 * arbitrary brand hue. Keyed by exact product name from productData.ts.
 *
 * `glyph` selects a drawn shape family rather than a unique illustration per
 * SKU: 21 bespoke drawings would be inconsistent in weight and heavy to ship,
 * while eight well-drawn families cover every product legibly. The tradeoff is
 * that `tropical` serves five SKUs — Banana, Pineapple, Papaya, Mango and
 * Jackfruit look alike apart from colour.
 */

export type GlyphShape =
  | "leaf"
  | "chilli"
  | "round"
  | "root"
  | "bulb"
  | "citrus"
  | "tropical"
  | "gourd";

/**
 * Catalogue family. This is what /products filters on.
 *
 * The previous filter matched substrings against the product *name*, so "Fruit
 * Based" never matched Mango, Apple or Papaya — three products were unreachable.
 * An explicit field per SKU cannot silently miss one.
 */
export type ProductFamily = "leafy" | "vegetable" | "fruit" | "spice" | "root";

export interface SkuStyle {
  accent: string;
  glyph: GlyphShape;
  family: ProductFamily;
}

export const SKU_STYLES: Record<string, SkuStyle> = {
  "Moringa Powder": { accent: "#4E732A", glyph: "leaf", family: "leafy" },
  "Spinach Powder": { accent: "#3E6B24", glyph: "leaf", family: "leafy" },
  "Green Chilli Powder": { accent: "#5C8A1E", glyph: "chilli", family: "spice" },
  "Tomato Powder": { accent: "#C4341B", glyph: "round", family: "vegetable" },
  "Banana Powder": { accent: "#E38C00", glyph: "tropical", family: "fruit" },
  "Mint Powder": { accent: "#3F7D4A", glyph: "leaf", family: "leafy" },
  "Coriander Powder": { accent: "#5B8A33", glyph: "leaf", family: "leafy" },
  "Bittergourd Powder": { accent: "#4C781C", glyph: "gourd", family: "vegetable" },
  "Sweet Potato Powder": { accent: "#B1143C", glyph: "root", family: "root" },
  "Ginger Powder": { accent: "#C8860D", glyph: "root", family: "spice" },
  "Soreal Powder": { accent: "#6B8F2E", glyph: "leaf", family: "leafy" },
  "Onion Powder": { accent: "#9B5E8C", glyph: "bulb", family: "vegetable" },
  "Garlic Powder": { accent: "#B8A48F", glyph: "bulb", family: "spice" },
  "Pumpkin Powder": { accent: "#E96A00", glyph: "gourd", family: "vegetable" },
  "Lemon Powder": { accent: "#D9B310", glyph: "citrus", family: "fruit" },
  "Pineapple Powder": { accent: "#E0A007", glyph: "tropical", family: "fruit" },
  "Papaya Powder": { accent: "#E8701A", glyph: "tropical", family: "fruit" },
  "Mango Powder": { accent: "#E8A317", glyph: "tropical", family: "fruit" },
  "Apple Powder": { accent: "#C2352F", glyph: "round", family: "fruit" },
  "Jackfruit Powder": { accent: "#C99A1E", glyph: "tropical", family: "fruit" },
  "Red Chilli Powder": { accent: "#A81F10", glyph: "chilli", family: "spice" },
};

/** Bronze fallback keeps an unmapped product on-brand rather than colourless. */
const FALLBACK: SkuStyle = { accent: "#451B03", glyph: "leaf", family: "vegetable" };

export function skuStyle(productName: string): SkuStyle {
  return SKU_STYLES[productName] ?? FALLBACK;
}

/** Display labels for each family, in the order they should be offered. */
export const FAMILY_LABELS: { value: ProductFamily; label: string }[] = [
  { value: "leafy", label: "Leafy Greens" },
  { value: "vegetable", label: "Vegetables" },
  { value: "fruit", label: "Fruits" },
  { value: "spice", label: "Spices & Aromatics" },
  { value: "root", label: "Roots & Tubers" },
];
