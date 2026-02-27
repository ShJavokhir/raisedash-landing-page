#!/bin/bash
#
# Upload blog images to Cloudflare R2
# Auto-converts PNG/JPG to WebP for optimal file size.
#
# Usage: ./tools/upload-blog-image.sh [options] <file> [custom-name]
#
# Options:
#   --no-convert   Skip WebP conversion, upload original format
#   --quality N    WebP quality 1-100 (default: 85)
#
# Examples:
#   ./tools/upload-blog-image.sh hero.png
#   ./tools/upload-blog-image.sh photo.jpg my-article-hero
#   ./tools/upload-blog-image.sh --quality 90 hero.png
#   ./tools/upload-blog-image.sh --no-convert logo.png
#   ./tools/upload-blog-image.sh ./images/*.png
#
# Environment:
#   CF_API_TOKEN  - Cloudflare API token (required)
#   CF_ACCOUNT_ID - Cloudflare account ID (required)
#   CF_BUCKET     - R2 bucket name (default: raisedash)
#

set -euo pipefail

R2_BASE_PATH="media/landing/blog"
BUCKET="${CF_BUCKET:-raisedash}"
PUBLIC_URL="https://cdn.raisedash.com"
WEBP_QUALITY=85
CONVERT=true

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
DIM='\033[2m'
NC='\033[0m'

die() { echo -e "${RED}Error: $1${NC}" >&2; exit 1; }
info() { echo -e "${GREEN}$1${NC}"; }
warn() { echo -e "${YELLOW}$1${NC}"; }
dim() { echo -e "${DIM}$1${NC}"; }

cleanup_tmp() { [[ -n "${TMP_DIR:-}" && -d "$TMP_DIR" ]] && rm -rf "$TMP_DIR"; }
trap cleanup_tmp EXIT

# --- Parse options ---

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-convert) CONVERT=false; shift ;;
    --quality)    WEBP_QUALITY="$2"; shift 2 ;;
    -*)           die "Unknown option: $1" ;;
    *)            break ;;
  esac
done

# --- Load env vars ---

ENV_FILE="$(dirname "$0")/../.env.local"
if [[ -f "$ENV_FILE" ]]; then
  [[ -z "${CF_API_TOKEN:-}" ]] && CF_API_TOKEN=$(grep '^CF_API_TOKEN=' "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' || true)
  [[ -z "${CF_ACCOUNT_ID:-}" ]] && CF_ACCOUNT_ID=$(grep '^CF_ACCOUNT_ID=' "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' || true)
fi

# --- Validation ---

[[ -z "${CF_API_TOKEN:-}" ]] && die "CF_API_TOKEN is not set. Export it or add to .env.local"
[[ -z "${CF_ACCOUNT_ID:-}" ]] && die "CF_ACCOUNT_ID is not set. Export it or add to .env.local"
[[ $# -lt 1 ]] && die "Usage: $0 <file> [custom-name]\n  Example: $0 hero.png my-article-hero"

convert_to_webp() {
  local src="$1"
  local dst="$2"
  local ext="${src##*.}"
  ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

  case "$ext" in
    png)
      cwebp -q "$WEBP_QUALITY" -alpha_q 100 "$src" -o "$dst" 2>/dev/null
      ;;
    jpg|jpeg)
      cwebp -q "$WEBP_QUALITY" "$src" -o "$dst" 2>/dev/null
      ;;
    *)
      return 1
      ;;
  esac
}

human_bytes() {
  local bytes=$1
  if (( bytes >= 1048576 )); then
    echo "$(( bytes / 1048576 )).$(( (bytes % 1048576) * 10 / 1048576 ))MB"
  elif (( bytes >= 1024 )); then
    echo "$(( bytes / 1024 ))KB"
  else
    echo "${bytes}B"
  fi
}

upload_file() {
  local file="$1"
  local custom_name="${2:-}"

  [[ ! -f "$file" ]] && die "File not found: $file"

  local original_ext="${file##*.}"
  original_ext=$(echo "$original_ext" | tr '[:upper:]' '[:lower:]')
  local upload_file="$file"
  local converted=false

  # Convert PNG/JPG to WebP if enabled and cwebp is available
  if [[ "$CONVERT" == true ]] && [[ "$original_ext" =~ ^(png|jpg|jpeg)$ ]]; then
    if command -v cwebp &>/dev/null; then
      TMP_DIR=$(mktemp -d)
      local tmp_webp="${TMP_DIR}/converted.webp"

      local orig_size
      orig_size=$(wc -c < "$file" | tr -d ' ')

      if convert_to_webp "$file" "$tmp_webp"; then
        local webp_size
        webp_size=$(wc -c < "$tmp_webp" | tr -d ' ')
        local saved=$(( (orig_size - webp_size) * 100 / orig_size ))

        dim "  Converting ${original_ext} → webp (q${WEBP_QUALITY}): $(human_bytes "$orig_size") → $(human_bytes "$webp_size") (${saved}% smaller)"
        upload_file="$tmp_webp"
        original_ext="webp"
        converted=true
      else
        warn "  WebP conversion failed, uploading original"
      fi
    else
      warn "  cwebp not found, skipping conversion (brew install webp)"
    fi
  fi

  local filename
  if [[ -n "$custom_name" ]]; then
    filename="${custom_name}.${original_ext}"
  else
    filename="$(basename "$file")"
    if [[ "$converted" == true ]]; then
      filename="${filename%.*}.webp"
    fi
  fi

  # Sanitize filename: lowercase, replace spaces with hyphens
  filename=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9._-]//g')

  local r2_key="${R2_BASE_PATH}/${filename}"
  local file_size
  file_size=$(wc -c < "$upload_file" | tr -d ' ')

  # Detect content type
  local content_type
  case "${filename##*.}" in
    jpg|jpeg) content_type="image/jpeg" ;;
    png)      content_type="image/png" ;;
    webp)     content_type="image/webp" ;;
    gif)      content_type="image/gif" ;;
    svg)      content_type="image/svg+xml" ;;
    avif)     content_type="image/avif" ;;
    *)        content_type="application/octet-stream" ;;
  esac

  warn "Uploading: $(basename "$file") → $r2_key ($(human_bytes "$file_size"))"

  local response
  response=$(curl -s -w "\n%{http_code}" \
    -X PUT \
    "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/r2/buckets/${BUCKET}/objects/${r2_key}" \
    -H "Authorization: Bearer ${CF_API_TOKEN}" \
    -H "Content-Type: ${content_type}" \
    --data-binary "@${upload_file}")

  local http_code
  http_code=$(echo "$response" | tail -1)
  local body
  body=$(echo "$response" | sed '$d')

  if [[ "$http_code" -ge 200 && "$http_code" -lt 300 ]]; then
    local url="${PUBLIC_URL}/${r2_key}"
    info "Uploaded: $url"
    echo ""
    echo "  Markdown:  ![alt](${url})"
    echo "  MDX:       <img src=\"${url}\" alt=\"\" />"
    echo ""
  else
    die "Upload failed (HTTP $http_code):\n$body"
  fi
}

# --- Main ---

if [[ $# -eq 2 ]]; then
  upload_file "$1" "$2"
else
  for file in "$@"; do
    upload_file "$file"
  done
fi
