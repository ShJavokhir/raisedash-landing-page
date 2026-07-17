#!/bin/bash
#
# Generate a Raisedash blog illustration with Grok Imagine (via fal.ai).
# Prepends the LOCKED hand-drawn "ink cross-hatch" house style block so every
# image shares one consistent editorial look (the brand moat), while the scene
# you pass varies per post (the creativity). Saves to tools/temp/<name>.png.
#
# Usage: ./tools/generate-blog-image.sh [options] "<scene description>" <output-name>
#
# Options:
#   --size 16:9|3:2|4:3|1:1|9:16|2:3|3:4   Aspect ratio (default: 16:9)
#   --resolution 1k|2k                     Grok resolution (default: 2k, ~$0.07/image)
#   --raw                                  Send the scene verbatim, skip the house style block
#
# Examples:
#   ./tools/generate-blog-image.sh "a clipboard holding a driver training checklist, top row checked in orange" training-audit-cover
#   ./tools/generate-blog-image.sh --size 3:2 "an open interstate highway at dawn, a semi truck driving into the distance, taillight the orange accent" pre-arrival-hero
#
# Environment:
#   FAL_KEY - fal.ai API key (read from .env.local if not exported)
#
# After generating, review the image, then upload with:
#   ./tools/upload-blog-image.sh tools/temp/<name>.png <name>
#

set -euo pipefail

# ---- LOCKED HOUSE STYLE BLOCK — the single source of truth for the blog look ----
# Strict two-tone to match the landing palette (src/styles/globals.css):
# warm near-black ink #26251e on warm paper #f7f7f4, with #f54e00 orange as the
# single accent. Keep this identical across posts: consistency is the moat.
STYLE_BLOCK="Hand-drawn pen-and-ink editorial illustration, strictly minimal two-tone: warm near-black ink (#26251e) on warm off-white paper (#f7f7f4). All shading and depth created only through fine liner cross-hatching and stippling — no gray fills, no color washes. Generous negative space, subtle paper grain, clearly hand-drawn by a skilled editorial illustrator. Exactly one accent permitted: a restrained warm orange (#f54e00) on a single small focal element. No other colors at all (no green, no blue, no amber), no photorealism, no 3D render, no text, no labels, no watermark, no border, no signature."

SIZE="16:9"
RESOLUTION="2k"
RAW=false

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
DIM='\033[2m'
NC='\033[0m'

die() { echo -e "${RED}Error: $1${NC}" >&2; exit 1; }
info() { echo -e "${GREEN}$1${NC}"; }
warn() { echo -e "${YELLOW}$1${NC}"; }
dim() { echo -e "${DIM}$1${NC}"; }

# --- Parse options ---

while [[ $# -gt 0 ]]; do
  case "$1" in
    --size)       SIZE="$2"; shift 2 ;;
    --resolution) RESOLUTION="$2"; shift 2 ;;
    --raw)        RAW=true; shift ;;
    -*)           die "Unknown option: $1" ;;
    *)            break ;;
  esac
done

[[ $# -lt 2 ]] && die "Usage: $0 [options] \"<scene description>\" <output-name>"

SCENE="$1"
NAME="$2"

case "$SIZE" in
  16:9|3:2|4:3|1:1|9:16|2:3|3:4) ;;
  *) die "Unknown --size: $SIZE (grok aspect ratios: 16:9, 3:2, 4:3, 1:1, 9:16, 2:3, 3:4)" ;;
esac

case "$RESOLUTION" in
  1k|2k) ;;
  *) die "Unknown --resolution: $RESOLUTION (use 1k or 2k)" ;;
esac

# --- Load env ---

ENV_FILE="$(dirname "$0")/../.env.local"
if [[ -z "${FAL_KEY:-}" && -f "$ENV_FILE" ]]; then
  FAL_KEY=$(grep '^FAL_KEY=' "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' || true)
fi
[[ -z "${FAL_KEY:-}" ]] && die "FAL_KEY is not set. Export it or add to .env.local"

OUT_DIR="$(dirname "$0")/temp"
mkdir -p "$OUT_DIR"
OUT_FILE="${OUT_DIR}/${NAME}.png"

if [[ "$RAW" == true ]]; then
  PROMPT="$SCENE"
else
  PROMPT="${STYLE_BLOCK} The scene: ${SCENE}"
fi

BODY=$(python3 -c '
import json, sys
print(json.dumps({
    "prompt": sys.argv[1],
    "aspect_ratio": sys.argv[2],
    "resolution": sys.argv[3],
    "num_images": 1,
    "output_format": "png",
}))' "$PROMPT" "$SIZE" "$RESOLUTION")

warn "Generating ${SIZE} ${RESOLUTION} hand-drawn illustration via Grok Imagine..."
dim "  Scene: $SCENE"

RESPONSE=$(curl -s --max-time 300 -X POST "https://fal.run/xai/grok-imagine-image/quality/text-to-image" \
  -H "Authorization: Key ${FAL_KEY}" \
  -H "Content-Type: application/json" \
  -d "$BODY") || die "fal.ai request failed"

IMAGE_URL=$(python3 -c '
import json, sys
try:
    payload = json.loads(sys.argv[1])
except json.JSONDecodeError:
    sys.exit("not-json")
images = payload.get("images") or []
url = images[0].get("url") if images else None
if not url:
    sys.exit("no-url")
print(url)' "$RESPONSE" 2>/dev/null) || die "fal.ai returned no image URL. Response:\n$RESPONSE"

curl -s --max-time 120 -o "$OUT_FILE" "$IMAGE_URL" || die "Failed to download generated image"
[[ -s "$OUT_FILE" ]] || die "Downloaded image is empty"

SIZE_BYTES=$(wc -c < "$OUT_FILE" | tr -d ' ')
info "Generated: $OUT_FILE ($(( SIZE_BYTES / 1024 ))KB)"
echo ""
echo "  Review it, then upload with:"
echo "  ./tools/upload-blog-image.sh $OUT_FILE $NAME"
echo ""
