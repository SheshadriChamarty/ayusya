import { useMemo, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CatalogueLink from "@/components/CatalogueLink";
import Reveal from "@/components/story/Reveal";
import ChapterCTA from "@/components/story/ChapterCTA";
import LeafMotif from "@/components/illustrations/LeafMotif";
import { Product, productData } from "@/data/productData";
import { FAMILY_LABELS, ProductFamily, skuStyle } from "@/lib/skuAccents";
import { cn } from "@/lib/utils";

/**
 * /products — the catalogue, and chapter ⑦'s destination.
 *
 * ── On the filters ──────────────────────────────────────────────────────────
 * The previous version of this page had three filter bugs that each hid real
 * products from a real buyer, and all three came from guessing at the data
 * rather than reading it:
 *
 *   1. Category matched substrings against `product.name`, with "fruit based"
 *      hardcoded to `name.includes('banana')`. Mango, Apple, Papaya, Lemon,
 *      Pineapple and Jackfruit were all unreachable — six of 21 products.
 *      Now it matches the explicit `family` field in skuAccents.ts.
 *   2. Use case searched the `benefits[]` prose for the label, so "Bone Health"
 *      only matched products whose marketing copy happened to contain that exact
 *      phrase, while the purpose-built `categories[]` field went unused. Now it
 *      matches `categories[]`.
 *   3. "Most Popular" and "Newest First" both silently fell through to
 *      `b.id - a.id`, ignoring the `isPopular`/`isNew` flags that exist in the
 *      data. Now they honour the flags.
 *
 * Every option offered is *derived from the catalogue*, not hardcoded. That is
 * the structural fix behind all three: a filter list that cannot be typed by
 * hand cannot go stale when a product is added, and cannot offer a choice that
 * matches nothing.
 * ────────────────────────────────────────────────────────────────────────────
 */

type SortOption = "az" | "za" | "popular" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  az: "A – Z",
  za: "Z – A",
  popular: "Most popular",
  newest: "Newest first",
};

/** Families that actually have products, in the canonical display order. */
const FAMILIES = FAMILY_LABELS.filter((f) =>
  productData.some((p) => skuStyle(p.name).family === f.value)
);

/**
 * Use cases, derived from `categories[]` and ordered by how many products carry
 * them. Singletons are dropped: a badge that narrows 21 products down to 1 is a
 * worse affordance than search, and there are seven of them in the data.
 */
const USE_CASES = Object.entries(
  productData.reduce<Record<string, number>>((counts, product) => {
    product.categories.forEach((c) => {
      counts[c] = (counts[c] ?? 0) + 1;
    });
    return counts;
  }, {})
)
  .filter(([, count]) => count > 1)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([label]) => label);

/** Who it's for — the `forAges` field, which nothing read until now. */
const AGES = Array.from(new Set(productData.flatMap((p) => p.forAges))).sort();

const Products = () => {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<ProductFamily | null>(null);
  const [useCase, setUseCase] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("az");
  const [showFilters, setShowFilters] = useState(false);

  /* Derived with useMemo rather than held in state and synced by an effect. The
     old version stored the filtered list in useState and recomputed it inside a
     useEffect, which meant the first paint always showed the unfiltered list and
     the grid was one render behind its own inputs. */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = productData.filter((product) => {
      if (family && skuStyle(product.name).family !== family) return false;
      if (useCase && !product.categories.includes(useCase)) return false;
      if (age && !product.forAges.includes(age)) return false;
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.benefits.some((b) => b.toLowerCase().includes(q)) ||
        product.usage.some((u) => u.toLowerCase().includes(q)) ||
        product.categories.some((c) => c.toLowerCase().includes(q))
      );
    });

    // Sorted on the filter output, never on productData itself — sort() mutates
    // in place, and sorting the imported module array would silently reorder the
    // catalogue for every other page that reads it.
    const byName = (a: Product, b: Product) => a.name.localeCompare(b.name);
    const flagged = (p: Product, flag: "isPopular" | "isNew") => (p[flag] ? 0 : 1);

    switch (sort) {
      case "za":
        return result.sort((a, b) => byName(b, a));
      case "popular":
        return result.sort(
          (a, b) => flagged(a, "isPopular") - flagged(b, "isPopular") || byName(a, b)
        );
      case "newest":
        return result.sort(
          (a, b) => flagged(a, "isNew") - flagged(b, "isNew") || b.id - a.id
        );
      default:
        return result.sort(byName);
    }
  }, [query, family, useCase, age, sort]);

  const activeCount = [family, useCase, age, query.trim() || null].filter(Boolean).length;

  const clearAll = () => {
    setQuery("");
    setFamily(null);
    setUseCase(null);
    setAge(null);
    setSort("az");
  };

  /** One pill, one look — shared by all three filter groups. */
  const pill = (selected: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors md:text-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      selected
        ? "border-primary bg-primary text-primary-foreground"
        : "border-caramel/60 bg-cream-50 text-umber hover:border-primary hover:text-primary"
    );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow bg-background">
        {/* ── The shelf header ── */}
        <section className="relative overflow-x-clip bg-cream-100">
          <div className="pointer-events-none absolute -right-8 -top-10 h-56 w-40 text-sku-moringa/15 md:h-72 md:w-52">
            <LeafMotif animate />
          </div>

          <div className="container relative z-10 mx-auto px-5 py-16 md:px-8 md:py-20">
            <Reveal>
              <p className="eyebrow mb-4">The Shelf</p>
              <h1 className="heading-xl max-w-3xl">Twenty-one harvests, kept.</h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="paragraph mt-7 max-w-2xl">
                Every one of these was grown near Gudivada, dried by the sun the
                same week it was cut, and sealed the same day it was milled. Pick
                what your kitchen actually runs out of.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8">
                <CatalogueLink variant="quiet" label="Browse the full catalogue (PDF)" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Filters + grid ── */}
        <div className="container mx-auto px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            {/* The filter rail. Collapsed behind a toggle under md, always shown
                above it — one markup tree either way, so filter state survives
                the breakpoint instead of being reset by a remount. */}
            <aside
              className={cn(
                "md:sticky md:top-24 md:h-fit md:w-64 md:shrink-0 md:!block",
                showFilters ? "block" : "hidden"
              )}
            >
              <div className="space-y-7 rounded-3xl border border-caramel/40 bg-cream-50 p-6 shadow-warm">
                <div>
                  <label htmlFor="product-search" className="eyebrow">
                    Search
                  </label>
                  <div className="relative mt-3">
                    <Search
                      size={16}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-umber-light"
                    />
                    <input
                      id="product-search"
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Moringa, digestion, dal…"
                      className="w-full rounded-full border border-caramel/60 bg-background py-2.5 pl-10 pr-4 text-sm text-umber placeholder:text-umber-light/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="eyebrow">Category</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {FAMILIES.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={family === value}
                        onClick={() => setFamily(family === value ? null : value)}
                        className={pill(family === value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="eyebrow">Use case</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {USE_CASES.map((label) => (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={useCase === label}
                        onClick={() => setUseCase(useCase === label ? null : label)}
                        className={pill(useCase === label)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="eyebrow">Who it&apos;s for</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {AGES.map((label) => (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={age === label}
                        onClick={() => setAge(age === label ? null : label)}
                        className={pill(age === label)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="button"
                  onClick={clearAll}
                  disabled={activeCount === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-caramel/60 py-2.5 font-display text-sm font-semibold text-umber transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X size={15} aria-hidden="true" />
                  Clear{" "}
                  {activeCount > 0
                    ? `${activeCount} filter${activeCount > 1 ? "s" : ""}`
                    : "filters"}
                </button>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  aria-expanded={showFilters}
                  className="flex items-center gap-2 rounded-full border border-caramel/60 bg-cream-50 px-4 py-2 font-display text-sm font-semibold text-umber md:hidden"
                >
                  <SlidersHorizontal size={15} aria-hidden="true" />
                  Filters
                  {activeCount > 0 && (
                    <span className="rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                      {activeCount}
                    </span>
                  )}
                </button>

                {/* aria-live so a screen-reader user hears the count change when
                    they press a filter — otherwise the grid updates silently. */}
                <p aria-live="polite" className="text-sm text-umber-light">
                  Showing{" "}
                  <span className="font-semibold text-umber">{filtered.length}</span> of{" "}
                  {productData.length} products
                </p>

                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="eyebrow">
                    Sort
                  </label>
                  {/* A native <select>: it gets the platform's own picker on
                      mobile, which beats a custom dropdown at this size. */}
                  <div className="relative">
                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortOption)}
                      className="appearance-none rounded-full border border-caramel/60 bg-cream-50 py-2 pl-9 pr-4 font-display text-sm font-semibold text-umber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                        <option key={key} value={key}>
                          {SORT_LABELS[key]}
                        </option>
                      ))}
                    </select>
                    {sort === "za" ? (
                      <ArrowDownAZ
                        size={15}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-bronze-metallic"
                      />
                    ) : (
                      <ArrowUpAZ
                        size={15}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-bronze-metallic"
                      />
                    )}
                  </div>
                </div>
              </div>

              {filtered.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-caramel/60 bg-cream-50 px-6 py-20 text-center">
                  <p className="font-display text-xl font-semibold text-primary">
                    Nothing matches that combination.
                  </p>
                  <p className="mt-3 text-sm text-umber-light">
                    Try one filter at a time, or ask us directly — we&apos;ll tell
                    you what fits.
                  </p>
                  <button type="button" onClick={clearAll} className="ayusya-btn mt-7">
                    Clear all filters
                  </button>
                </div>
              )}

              <div className="mt-16 rounded-3xl border border-caramel/40 bg-cream-100 p-7 md:p-10">
                <p className="eyebrow">Not sure where to start?</p>
                <h2 className="heading-md mt-3 max-w-xl">
                  Tell us what you cook, and we&apos;ll tell you which two to try
                  first.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-umber-light md:text-base">
                  There is no cart and no checkout here — every order starts as a
                  conversation on WhatsApp, which is also where to ask about bulk
                  and B2B quantities.
                </p>
                <ChapterCTA
                  lead="whatsapp"
                  whatsappLabel="Start a conversation"
                  productsLabel="Back to the story"
                  productsTo="/"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
