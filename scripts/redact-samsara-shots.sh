#!/bin/bash
# Redacts the real Samsara-alerts product screenshots before they are published
# to public/images/samsara/. Kept in the repo so the exact regions that were
# destroyed are auditable, and so a future capture gets the same treatment.
#
# The source captures are NOT in this repo — they contain a customer's driver
# names, plates, unit numbers, GPS fixes and faces. Drop them beside this script
# as orig_tg.png, orig_fuel.png, orig_driver.png, orig_weekly.png,
# orig_drowsy.jpg and orig_fault.jpg, then run it.
#
# Regions are destroyed by downscaling to a few pixels and scaling back, not by
# a light blur, which can be reversed. Board coordinates are derived from the
# renderer in raisedash-apps/samsara-alerts (cardPad=56, boardRowH=52, the
# 5x7 font at scale 2 advancing 12px per character), not measured by eye.
#
# Requires ImageMagick.
set -euo pipefail
cd "$(dirname "$0")"

# pixelate FILE X Y W H  -- destroys the region in place.
pixelate() {
  local f=$1 x=$2 y=$3 w=$4 h=$5
  magick "$f" \
    \( -clone 0 -crop "${w}x${h}+${x}+${y}" +repage \
       -resize 7% -resize "${w}x${h}!" -blur 0x1.5 \) \
    -geometry "+${x}+${y}" -composite "$f"
}

# paintout FILE X Y W H COLOR -- flat fill, for text on a flat background.
paintout() {
  local f=$1 x=$2 y=$3 w=$4 h=$5 c=$6
  magick "$f" -fill "$c" -draw "rectangle $x,$y $((x+w)),$((y+h))" "$f"
}

BG='#0E1016'

# ---------------------------------------------------------------- boards ---
# Carrier name (tenant line, scale-2 text at x=56,y=44) sits on flat colBG.
for f in red_fuel.png red_driver.png; do
  cp "orig_${f#red_}" "$f"
  paintout "$f" 52 38 190 24 "$BG"
done
cp orig_weekly.png red_weekly.png
paintout red_weekly.png 52 38 140 24 "$BG"

# Driver names: nameX=116, textY = top + i*52 + 19, top=452 (upper board),
# 776 (lower board). Widest name ends well before the mileage column at x=724.
for f in red_fuel.png red_driver.png; do
  for top in 452 776; do
    for i in 0 1 2 3 4; do
      pixelate "$f" 112 $((top + i*52 + 15)) 486 22
    done
  done
done

# ------------------------------------------------- telegram desktop shot ---
cp orig_tg.png red_tg.png
# Topic-list previews: unit numbers, an asset id, a driver name and the
# carrier name in the pinned-report preview.
pixelate red_tg.png 524 220  58 24   # truck unit no. in fault preview
pixelate red_tg.png 654 388  56 24   # driver name in obstructed-camera preview
pixelate red_tg.png 476 558  60 24   # truck unit no. in speeding preview
pixelate red_tg.png 672 726  36 24   # unit no., keeping the "Unit:" label
pixelate red_tg.png 600 894  48 26   # unit no., keeping the "Unit:" label
pixelate red_tg.png 543 1149 124 26  # carrier name in the pinned-report preview
pixelate red_tg.png 656 1322 52 24   # asset no., keeping the "Asset:" label
pixelate red_tg.png 308 1472 100 24  # message author name

# Message pane: the cabin still shows two identifiable people, and each
# caption carries driver, plate and GPS fix.
pixelate red_tg.png 830 158 512 152  # cabin dashcam still
pixelate red_tg.png 838 331 300 26   # driver names
pixelate red_tg.png 901 350 180 26   # plate, keeping the "Vehicle:" label
pixelate red_tg.png 910 388 166 26   # GPS
pixelate red_tg.png 838 775 232 26
pixelate red_tg.png 901 795 176 26
pixelate red_tg.png 910 833 176 26
pixelate red_tg.png 838 1477 140 26
pixelate red_tg.png 901 1496 174 26
pixelate red_tg.png 910 1534 170 26

# Telegram's own bottom bar survives the crop below, and its rightmost tab is
# the account owner's profile photo.
pixelate red_tg.png 664 1584 54 54

# Drop the two left rails: the personal folder list and the avatar column for
# every other chat the account is in. Neither belongs on a marketing page.
magick red_tg.png -crop 1666x1612+272+42 +repage crop_tg.png

# ------------------------------------------ message-detail captures ---
# --- drowsy: re-destroy the driver name and plate, redact the GPS fix, then
# --- crop away the header bleed-through at the top and the partial cabin
# --- thumbnail at the bottom.
cp orig_drowsy.jpg red_drowsy.png
pixelate red_drowsy.png 100 612 306 30   # driver name
pixelate red_drowsy.png 176 635 330 30   # plate
pixelate red_drowsy.png 188 683 212 30   # GPS fix
magick red_drowsy.png -crop 660x877+0+98 +repage crop_drowsy.png

# --- fault codes: re-destroy both plates, then keep only the two complete
# --- messages so nothing is clipped by the floating header.
cp orig_fault.jpg red_fault.png
pixelate red_fault.png 206 418 278 34
pixelate red_fault.png 206 870 278 34
magick red_fault.png -crop 990x886+0+370 +repage crop_fault.png

# --------------------------------------------------------- web assets ---
OUT=../public/images/samsara
mkdir -p "$OUT"
magick crop_tg.png -resize 1600x -quality 80 -define webp:method=6 "$OUT/telegram-group.webp"
magick crop_tg.png -crop 497x1500+0+0 +repage -quality 84 -define webp:method=6 "$OUT/telegram-topics.webp"
magick crop_drowsy.png -quality 82 -define webp:method=6 "$OUT/alert-safety-event.webp"
magick crop_fault.png -quality 82 -define webp:method=6 "$OUT/alert-engine-fault.webp"
# The boards are flat-colour bitmap-font renders: lossless keeps the glyphs crisp
# and still lands under 32KB each.
magick red_weekly.png -define webp:lossless=true -define webp:method=6 "$OUT/board-weekly-safety.webp"
magick red_driver.png -define webp:lossless=true -define webp:method=6 "$OUT/board-driver-safety.webp"
magick red_fuel.png   -define webp:lossless=true -define webp:method=6 "$OUT/board-fuel-efficiency.webp"
echo "assets written to $OUT"
