#!/bin/bash
#
# Generate a Raisedash blog illustration with gpt-image-2 (via fal.ai).
# Prepends the house flat-illustration style block so every image matches
# the brand, then saves the result to tools/temp/<name>.png.
#
# Usage: ./tools/generate-blog-image.sh [options] "<scene description>" <output-name>
#
# Options:
#   --size 3:2|16:9|1:1   Aspect ratio (default: 3:2 → 1536x1024)
#   --quality low|medium|high   gpt-image-2 quality (default: high, ≈$0.17/image)
#   --raw                 Send the scene description verbatim, skip the style block
#
# Examples:
#   ./tools/generate-blog-image.sh "a clipboard with a driver training checklist, one row highlighted" training-audit-cover
#   ./tools/generate-blog-image.sh --size 16:9 "a phone receiving an SMS invite in front of a parked semi truck" pre-arrival-hero
#
# Environment:
#   FAL_KEY - fal.ai API key (read from .env.local if not exported)
#
# After generating, review the image, then upload with:
#   ./tools/upload-blog-image.sh tools/temp/<name>.png <name>
#

set -euo pipefail

# House style block — the single source of truth for the blog illustration look.
# Matches the site's "Paper" palette (src/styles/globals.css).
STYLE_BLOCK="Flat vector-style editorial illustration for a B2B trucking software blog. Warm paper background (#f7f7f4). Confident, minimal shapes drawn in warm near-black ink (#26251e). Exactly one restrained accent color: orange (#f54e00), used sparingly on the single most important element. Optional muted blue (#2f6ce0) as a quiet supporting tone. Generous negative space, clean geometric composition, subtle matte paper texture. Modern, calm, premium editorial style. Constraints: no gradients, no 3D rendering, no photorealism, no drop shadows, no text, no labels, no watermark, no border or frame. If people appear, render them as simplified flat figures without detailed facial features."

SIZE="3:2"
QUALITY="high"
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
    --size)    SIZE="$2"; shift 2 ;;
    --quality) QUALITY="$2"; shift 2 ;;
    --raw)     RAW=true; shift ;;
    -*)        die "Unknown option: $1" ;;
    *)         break ;;
  esac
done

[[ $# -lt 2 ]] && die "Usage: $0 [options] \"<scene description>\" <output-name>"

SCENE="$1"
NAME="$2"

case "$SIZE" in
  3:2)  WIDTH=1536; HEIGHT=1024 ;;
  16:9) WIDTH=1920; HEIGHT=1088 ;;
  1:1)  WIDTH=1024; HEIGHT=1024 ;;
  *)    die "Unknown --size: $SIZE (use 3:2, 16:9, or 1:1)" ;;
esac

case "$QUALITY" in
  low|medium|high) ;;
  *) die "Unknown --quality: $QUALITY (use low, medium, or high)" ;;
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
    "image_size": {"width": int(sys.argv[2]), "height": int(sys.argv[3])},
    "quality": sys.argv[4],
    "num_images": 1,
    "output_format": "png",
}))' "$PROMPT" "$WIDTH" "$HEIGHT" "$QUALITY")

warn "Generating ${WIDTH}x${HEIGHT} ${QUALITY}-quality image (takes 60-90s)..."
dim "  Scene: $SCENE"

RESPONSE=$(curl -s --max-time 300 -X POST "https://fal.run/openai/gpt-image-2" \
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
