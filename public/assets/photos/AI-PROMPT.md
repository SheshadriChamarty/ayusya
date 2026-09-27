# Generating the "mixed on cloth" hero

The one frame that was asked for and does not exist as stock photography: the
chilli-on-cloth composition, but with several different crops on the one cloth instead
of a single vegetable. Four Pexels searches returned only single-crop cloth frames — the
multi-variety shots all use separate trays.

Generate it in Claude, ChatGPT, Gemini or Midjourney, then:

```
./scripts/add-hero-photo.sh ~/Downloads/<your-file> mixedcloth
```

and uncomment the `mixedcloth` entry in `src/components/story/heroOptions.ts`.

## Prompt

> A wide overhead photograph of a sunlit rooftop terrace in coastal Andhra Pradesh,
> India. A single large plain cotton cloth is spread flat on the concrete floor, and
> laid out on it in separate loose groups are five different crops drying in the sun:
> sliced orange carrot rounds, deep magenta beetroot slices, dark green moringa leaves,
> wilted spinach leaves, and pale green whole amla gooseberries. Each crop keeps to its
> own patch on the cloth so the varieties read distinctly. Hard midday sunlight, sharp
> shadows, slightly dusty air, warm earthy colour — ochre, rust, bronze, cream. Shot
> from a standing height at a slight angle, natural documentary photography, no people,
> no text, no packaging, no bowls or plates. Landscape orientation, 3:2.

## Two constraints that are not cosmetic

**Landscape, 3:2 or wider.** Not a preference. A portrait source is *narrower* than the
390px hero band (0.750 vs 0.537), so `object-cover` fits it by height and crops the
width — which leaves the vertical half of `objectPosition` with nothing to move, and sky
reappears behind the headline on mobile with no CSS fix available. Two candidates failed
exactly this way and both files had to be re-cropped. If your generator only gives you
square or portrait, crop it landscape before running the script.

**Nothing that looks like an Ayusya product.** No jars, no pouches, no bowls of powder,
no labels. The 21 product cards deliberately use drawn ingredient glyphs rather than
photographs for this reason: no image on this site should imply a product photo that
does not exist. A generated image of *drying produce* is a depiction of a method; a
generated image of a *package* would be a fabricated product shot.

## The honest caveat

This will be the only hero candidate that is not a real photograph of real solar drying.
It shows a terrace that does not exist, in a town it names. That is a mild honesty cost
on the frame that opens the site, and it is worth weighing against how much closer the
composition is to what was asked for.

One phone photo of the actual racks in Gudivada — five crops on them, taken at noon —
beats all seven candidates and deletes this file.
