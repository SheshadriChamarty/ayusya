# Photography credits

All photographs here come from **Pexels** under the [Pexels License](https://www.pexels.com/license/):
free for commercial use, no attribution required, modification allowed. Attribution is
recorded anyway so the provenance of every asset is traceable, and so a future
replacement can be sourced from the same place.

Not permitted by that licence, and therefore not done: reselling unaltered copies, or
implying the people shown endorse Ayusya.

**How these were sourced.** Photo IDs and alt text were read off Pexels' rendered public
search pages in a browser, then the files were downloaded from the public
`images.pexels.com` CDN. Pexels' internal search API is not used: it requires a private
`Secret-Key` header that is not ours to send, and using it would not be a legitimate way
to use their service regardless of whether it happened to work.

## Assets

Six hero candidates, two widths each. Only **one** ships on the homepage — the rest exist
so the choice can be reviewed (see `/hero-options`) and should be deleted once it is made.

| Base | Pexels ID | Source | 1600 / 800 bytes | Dimensions | Subject |
|---|---|---|---|---|---|
| `hero-steelracks` | 14191541 | https://www.pexels.com/photo/14191541/ | 129,743 / 56,699 | 1600×1066 | Tiered circular steel mesh racks of fruit drying in open sun |
| `hero-mixedtrays` | 13913245 | https://www.pexels.com/photo/13913245/ | 225,801 / 81,164 | 1600×1066 | Nine rooftop trays, each with a different crop — corn, chilli, pulses, split grain |
| `hero-trays` | 33588417 | https://www.pexels.com/photo/33588417/ | 123,780 / 55,121 | 1600×1066 | Chillies drying in direct sun on woven bamboo trays |
| `hero-solardryer` | 8894056 | https://www.pexels.com/photo/8894056/ | 191,620 / 75,732 | 1600×1200 | Interior of a bamboo solar drying tunnel, produce on raised mesh beds |
| `hero-tomatoes` | 13326551 | https://www.pexels.com/photo/13326551/ | 149,162 / 65,355 | 1600×1066 | Halved tomatoes drying on a white rooftop to the horizon |
| `hero-chillies` | 33858000 | https://www.pexels.com/photo/33858000/ | 240,170 / 99,744 | 1600×1066 | Split red chillies spread on cloth in direct sun |

Total on disk: **~1.5MB across twelve files.** That is not the page weight — a visit loads one
1600px hero (~98–240KB). The number that matters is the one that stays after the decision:
five bases get deleted.

A seventh option — mixed crops on a single cloth — is specified in `AI-PROMPT.md` but has no
asset yet. It does not exist as stock photography: four searches (`drying vegetables sun
cloth`, `sun dried vegetable slices`, `assorted vegetables drying terrace india`, plus the
earlier sweeps) returned only single-crop cloth frames, because the multi-variety shots all
use separate trays. It has to be generated or photographed. Its entry in `heroOptions.ts` is
commented out until the file lands, so the board never shows a card with no photo behind it.

### Removed on review

`hero-drying` (20407306, grain floor), `hero-bananas` (27508849), `hero-fruittrays` (35268684)
and `hero-setup` (29725263) were all downloaded, sized and wired in, then cut. Each was a
decent photograph; none showed **Ayusya's actual method**, which is steel and iron racks on a
terrace. The grain floor in particular had been the default — it is a beautiful frame of people
raking *grain*, which is not what this business dries. A candidate set full of near-misses makes
the decision harder rather than richer, so they were deleted rather than kept "just in case".

The per-option focal point, scrim opacity and rationale live in
`src/components/story/heroOptions.ts`, next to the code that uses them, rather than here.

### Why `steelracks` is the current default

Because it is the only candidate whose **structure** matches how Ayusya actually dries:
circular steel mesh racks, tiered, in open sun — not wood, not bamboo, not a tunnel. Every
other frame here is a better photograph of a different process.

It is a placeholder for a decision, not the decision. The honest fix is a photograph of the
real terrace in Gudivada, which would make this entire file unnecessary.

### On curating a set rather than picking one photo

Two rounds of pruning, both for the same reason.

The first eight candidates pulled were almost all red chilli — each defensible alone, the
*set* useless, because eight variations of one idea asks a reviewer to compare shades of red
instead of choosing a direction. A second search went after other subjects to make the
options actually differ.

Then four of those eight were cut on review, because "different from each other" is not the
same as "each plausibly Ayusya". A set can be varied and still be wrong: bananas, wooden
racks, a hillside and a grain floor are four distinct pictures of four processes this
business does not run. What replaced them was chosen against the real setup — steel racks —
and against a specific request: **the same frame, with more than one crop in it**, which is
what `mixedtrays` is. When the deliverable is a choice, the spread between options is part of
the work, but so is every option being a real candidate.

Rejected candidates, for the record:
- **20356770** (women bunching harvested crop) — warm and genuinely human, but a blown-out
  white sky across the top third and a black tarpaulin across the bottom. Neither belongs
  to the palette, and the tarp is exactly where the headline needs to go.
- **17870116** (Delhi spice market) — a reseller's stall covered in handwritten prices and
  a Paytm sign. Reads as a bazaar middleman, the opposite of farm-direct.
- **17971549** (tomato drying field) — literally the right process, but portrait, and its
  red/blue/white palette fights the brand. Depicts industrial scale, not smallholders.
- **1400172** (vegetable flat-lay on grey wood) — cold grey boards, generic stock look.
- Searches for `turmeric powder spices sunlight` returned almost entirely dark studio
  flat-lays on black or slate. Wrong register for this brand, and none were used.

`hero-trays` (33588417) is the one that went both ways: it shipped first, was replaced for
being a dim shallow-focus macro that went to mud under a scrim, and then came back as a
deliberate option — it is the warmest and lightest of the eight, and "quiet and close" is a
legitimate direction, just not the one that was chosen first.

## Processing

Downloaded at 2400px from the Pexels CDN, then resized with macOS `sips`:

```
sips -s format jpeg -s formatOptions 21 --resampleWidth 1600 src.jpg --out hero-drying-1600.jpg
sips -s format jpeg -s formatOptions 32 --resampleWidth 800  src.jpg --out hero-drying-800.jpg
```

The width in the filename must be the file's real pixel width. An earlier pass shrank this
one to 1500px to save bytes while leaving the name at `-1600`, which made `Photo.tsx` declare
`1600w` in its `srcset` for a 1500px file — the browser picks candidates from that number, so
a lie there quietly defeats the whole mechanism. Save the bytes with quality, not by
resampling narrower than the name. Every file above has been checked with
`sips -g pixelWidth` against its own name.

**Every hero file must be landscape, 3:2 or wider.** This replaces an earlier note here which
said aspect ratios are deliberately *not* normalised, on the reasoning that `object-cover`
makes the source ratio irrelevant. That reasoning was wrong in one direction. `object-cover`
crops whichever axis has surplus — and a 3:4 portrait source is *narrower* than the 390px hero
band (0.750 vs 0.537), so it gets fitted by height and cropped on **width**, which leaves the
vertical half of `objectPosition` with nothing left to move. `steelracks` and `tomatoes` both
showed sky behind the headline on mobile for exactly this reason, and no CSS value could have
fixed either: the focal points they carried were inert at that breakpoint. Both files were
re-cropped to 3:2 (`steelracks` 220KB → 130KB as a side effect, since the sky was costing
bytes). `scripts/add-hero-photo.sh` now warns on a portrait source.

Three things worth recording, because they will come up again for the chapter bands:

**Quality 22 is not a typo.** A field of individual grains is high-frequency detail, which is
the one thing JPEG cannot discard cheaply — at q50 this file was 529KB against a 180KB
budget. Measured: q22→232KB, q28→276KB, q34→335KB, q40→402KB. At the size it renders (a
full-bleed hero under a scrim) the q22 artefacts are not visible. High-detail photographs
need a lower quality number than smooth ones, not the same one.

**`sips` can crop with an offset — an earlier note here was wrong.** This file previously
claimed `--cropToHeightWidth` crops from the centre only. It does *by default*, which is how
it decapitated three subjects, but `sips --cropOffset <offsetY> <offsetX>` aims it. Correcting
it because the false version would send the next person to CSS-only cropping for a case where
cropping the file is the right answer.

One trap in it: **sips silently returns the image uncropped when `offsetY + height` equals the
source height.** Cropping 2400×3200 to a 1600-tall band at offset 1600 — flush with the bottom
— emits a 2400×3200 file and exit code 0. It cost a confused round trip here, because the
resulting hero looked identical to the uncropped one for no visible reason. Use 1590, and
assert the output height rather than trusting it; `scripts/add-hero-photo.sh` does.

Which to use is not a style preference:

- **Crop in CSS** (`objectPosition` per option) when the whole frame is useful and only the
  *framing* is in question. It is aimable per breakpoint and reversible.
- **Crop the file** when part of the source is never shown at any breakpoint. `hero-mixedtrays`
  came in at 1688×3000 whose top half was sky; at 1600px wide that cost 328KB against ~225KB
  for its neighbours, and the quality curve was flat (q12→290KB, q21→328KB) because the excess
  was pixel *count*, not pixel quality. Cropping to a 3:2 band over the trays first
  (`--cropOffset 1400 0 --cropToHeightWidth 1125 1688`) landed at 226KB **at higher quality**
  than the uncropped q21. Lowering quality to fix a framing problem is the wrong lever.

**A photo on a dark scrim breaks buttons, not just text.** Both failures were measured, not
spotted: `.ayusya-btn-outline` is bronze-on-cream and rendered bronze-on-bronze (invisible),
and then `.ayusya-btn` — which looked safe because it carries its own fill — turned out to
fill with the *same bronze the scrim is made of*, measuring 1.00:1 against its background.
Its cream label still passed contrast, so the text was legible while the button had no shape
at all. Hence `.ayusya-btn-light` / `.ayusya-btn-outline-light` and the `onDark` prop on
`ChapterCTA`. Any future photo band needs `onDark`; check the button's fill against its
ground, not only its label.

JPEG, not WebP: this machine has no `cwebp` and no ImageMagick, and its `sips` build has no
WebP output. `src/components/Photo.tsx` is the single place to add a `<picture>` + WebP
`<source>` if an encoder is ever installed.
