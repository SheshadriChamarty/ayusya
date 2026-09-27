# Photography credits

The photograph here comes from **Pexels** under the [Pexels License](https://www.pexels.com/license/):
free for commercial use, no attribution required, modification allowed. Attribution is
recorded anyway so the provenance of the asset is traceable, and so a future replacement can
be sourced from the same place.

Not permitted by that licence, and therefore not done: reselling unaltered copies, or
implying the people shown endorse Ayusya.

**How this was sourced.** The photo ID and alt text were read off Pexels' rendered public
search pages in a browser, then the file was downloaded from the public `images.pexels.com`
CDN. Pexels' internal search API is not used: it requires a private `Secret-Key` header that
is not ours to send, and using it would not be a legitimate way to use their service
regardless of whether it happened to work.

## Assets

| Base | Pexels ID | Source | 1600 / 800 bytes | Dimensions | Subject |
|---|---|---|---|---|---|
| `hero-trays` | 33588417 | https://www.pexels.com/photo/33588417/ | 123,780 / 55,121 | 1600×1066 | Chillies drying in direct sun on woven bamboo trays |

Two widths, one base: **~180KB on disk.** A visit loads one 1600px hero (~124KB).

This was a six-candidate set feeding a `/hero-options` review board. The hero is now
owner-locked to the bamboo trays, so the board and the other five photographs are deleted —
git history has them, with the full comparison, if the decision is ever reopened.

The focal point, scrim opacity and lock note live in `src/components/story/heroOptions.ts`,
next to the code that uses them, rather than here.

The honest upgrade is a photograph of the real terrace in Gudivada. Everything here is a
real photograph of real solar drying, but it is not Ayusya's own terrace.

## Processing

Downloaded at 2400px from the Pexels CDN, then resized with macOS `sips`:

```
sips -s format jpeg -s formatOptions 21 --resampleWidth 1600 src.jpg --out hero-trays-1600.jpg
sips -s format jpeg -s formatOptions 32 --resampleWidth 800  src.jpg --out hero-trays-800.jpg
```

The width in the filename must be the file's real pixel width. An earlier pass shrank a file
to 1500px to save bytes while leaving the name at `-1600`, which made `Photo.tsx` declare
`1600w` in its `srcset` for a 1500px file — the browser picks candidates from that number, so
a lie there quietly defeats the whole mechanism. Save bytes with quality, not by resampling
narrower than the name. Check with `sips -g pixelWidth` against the name.

**Every hero file must be landscape, 3:2 or wider.** `object-cover` crops whichever axis has
surplus — and a 3:4 portrait source is *narrower* than the 390px hero band (0.750 vs 0.537),
so it gets fitted by height and cropped on **width**, which leaves the vertical half of
`objectPosition` with nothing left to move. Two earlier candidates showed sky behind the
headline on mobile for exactly this reason, and no CSS value could have fixed either: the
focal points they carried were inert at that breakpoint. `scripts/add-hero-photo.sh` warns on
a portrait source.

Three things worth recording, because they will come up again for the chapter bands:

**A low quality number is not a typo.** High-frequency detail (a field of individual grains,
a tray of split chillies) is the one thing JPEG cannot discard cheaply — one candidate hit
529KB at q50 against a 180KB budget. Measured on that file: q22→232KB, q28→276KB, q34→335KB,
q40→402KB. At the size it renders — full-bleed under a scrim — the q22 artefacts are not
visible. High-detail photographs need a *lower* quality number than smooth ones.

**`sips` can crop with an offset.** It crops from the centre by default, which is how it
decapitated three subjects, but `sips --cropOffset <offsetY> <offsetX>` aims it. One trap:
**sips silently returns the image uncropped when `offsetY + height` equals the source
height.** Cropping 2400×3200 to a 1600-tall band at offset 1600 — flush with the bottom —
emits a 2400×3200 file and exit code 0. Use 1590, and assert the output height rather than
trusting it; `scripts/add-hero-photo.sh` does.

Which to use is not a style preference:

- **Crop in CSS** (`objectPosition`) when the whole frame is useful and only the *framing* is
  in question. It is aimable per breakpoint and reversible.
- **Crop the file** when part of the source is never shown at any breakpoint. One candidate
  came in at 1688×3000 whose top half was sky; at 1600px wide that cost 328KB against ~225KB
  for its neighbours, and the quality curve was flat (q12→290KB, q21→328KB) because the excess
  was pixel *count*, not pixel quality. Cropping to a 3:2 band first landed at 226KB **at
  higher quality** than the uncropped q21. Lowering quality to fix a framing problem is the
  wrong lever.

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
