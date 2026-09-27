#!/bin/bash
#
# Turn one source image into a hero asset pair.
#
#   ./scripts/add-hero-photo.sh <source-image> <name>
#   ./scripts/add-hero-photo.sh ~/Downloads/mixed.png mixedcloth
#
# Writes public/assets/photos/hero-<name>-1600.jpg and -800.jpg.
#
# Every rule this encodes was learned by getting it wrong first:
#
#  * The width in the filename must be the file's REAL pixel width. Photo.tsx
#    declares `1600w` in its srcset from that number, so a file named -1600 that is
#    actually 1500px wide makes the browser choose candidates against a lie.
#    Asserted below rather than trusted.
#
#  * The source must be LANDSCAPE, 3:2 or wider. A portrait source is narrower than
#    the 390px hero band (0.750 vs 0.537), so object-cover fits it by height and crops
#    the width — which leaves the vertical half of `objectPosition` with nothing to
#    move, and sky reappears behind the headline on mobile with no CSS fix available.
#    Two candidates failed exactly this way. Warned about below.
#
#  * Quality 24/34, not 70. These render full-bleed under a bronze scrim, where the
#    artefacts are invisible; the budget is ~180-240KB for the 1600px file. High-detail
#    subjects (fields of grain, hundreds of chillies) need a LOWER number than smooth
#    ones to hit the same size, not the same one.
#
# JPEG rather than WebP because this machine has no cwebp and no ImageMagick, and its
# sips build has no WebP output. Photo.tsx is the one place to add a <picture> if that
# ever changes.
set -euo pipefail

SRC=${1:-}
NAME=${2:-}
if [ -z "$SRC" ] || [ -z "$NAME" ]; then
  sed -n '2,8p' "$0" | sed 's/^# \{0,1\}//'
  exit 64
fi
[ -f "$SRC" ] || { echo "No such file: $SRC" >&2; exit 66; }

DEST="$(cd "$(dirname "$0")/.." && pwd)/public/assets/photos"

read -r SW SH <<<"$(sips -g pixelWidth -g pixelHeight "$SRC" \
  | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{print w, h}')"
printf 'source: %sx%s (%.3f)\n' "$SW" "$SH" "$(echo "scale=4; $SW/$SH" | bc)"

if [ "$SW" -lt "$((SH * 3 / 2))" ]; then
  echo "WARNING: not 3:2 or wider. Expect sky behind the headline at 390px — see the" >&2
  echo "         note at the top of this script. Crop it landscape first:" >&2
  echo "         sips --cropOffset <topY> 0 --cropToHeightWidth <h> <w> \"$SRC\" --out cropped.jpg" >&2
  echo "         (sips silently returns the image UNCROPPED if topY + h == source height.)" >&2
fi

for pair in "1600 24" "800 34"; do
  set -- $pair
  out="$DEST/hero-$NAME-$1.jpg"
  sips -s format jpeg -s formatOptions "$2" --resampleWidth "$1" "$SRC" --out "$out" >/dev/null
  read -r w h <<<"$(sips -g pixelWidth -g pixelHeight "$out" \
    | awk '/pixelWidth/{a=$2} /pixelHeight/{b=$2} END{print a, b}')"
  [ "$w" = "$1" ] || { echo "FAIL: $out is ${w}px but named $1" >&2; exit 1; }
  printf '  %-34s %7d bytes  %sx%s\n' "$(basename "$out")" "$(stat -f%z "$out")" "$w" "$h"
done

echo
echo "Wired in? Not yet. The hero is owner-locked — read the lock note in"
echo "src/components/story/heroOptions.ts before pointing HERO at these files."
