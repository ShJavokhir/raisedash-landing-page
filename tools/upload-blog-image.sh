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
#   R2_ACCESS_KEY_ID     - R2 token Access Key ID (required)
#   R2_SECRET_ACCESS_KEY - R2 token Secret Access Key (required)
#   R2_S3_ENDPOINT       - R2 S3 endpoint (optional; derived from CF_ACCOUNT_ID)
#   CF_ACCOUNT_ID        - Cloudflare account ID (used to derive the endpoint)
#   CF_BUCKET            - R2 bucket name (default: raisedash)
#
# Uploads use the S3-compatible API (AWS SigV4) via the `aws` CLI. Bucket-scoped
# R2 tokens are S3 credentials and are rejected (HTTP 403) by the Cloudflare REST
# API this script previously used, so it authenticates with the Access Key /
# Secret instead of a Bearer token.
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
read_env() { grep "^$1=" "$ENV_FILE" 2>/dev/null | head -1 | cut -d'=' -f2- | tr -d '"' || true; }
if [[ -f "$ENV_FILE" ]]; then
  [[ -z "${R2_ACCESS_KEY_ID:-}" ]]     && R2_ACCESS_KEY_ID=$(read_env R2_ACCESS_KEY_ID)
  [[ -z "${R2_SECRET_ACCESS_KEY:-}" ]] && R2_SECRET_ACCESS_KEY=$(read_env R2_SECRET_ACCESS_KEY)
  [[ -z "${R2_S3_ENDPOINT:-}" ]]       && R2_S3_ENDPOINT=$(read_env R2_S3_ENDPOINT)
  [[ -z "${CF_ACCOUNT_ID:-}" ]]        && CF_ACCOUNT_ID=$(read_env CF_ACCOUNT_ID)
fi
# Derive the S3 endpoint from the account id when it is not set explicitly.
[[ -z "${R2_S3_ENDPOINT:-}" && -n "${CF_ACCOUNT_ID:-}" ]] && \
  R2_S3_ENDPOINT="https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"

# --- Validation ---

[[ -z "${R2_ACCESS_KEY_ID:-}" ]]     && die "R2_ACCESS_KEY_ID is not set. Add it to .env.local"
[[ -z "${R2_SECRET_ACCESS_KEY:-}" ]] && die "R2_SECRET_ACCESS_KEY is not set. Add it to .env.local"
[[ -z "${R2_S3_ENDPOINT:-}" ]]       && die "R2_S3_ENDPOINT (or CF_ACCOUNT_ID) is not set. Add it to .env.local"
command -v aws >/dev/null 2>&1 || die "aws CLI not found — install with: brew install awscli"
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

  local upload_err
  if upload_err=$(AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID" \
      AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY" \
      AWS_DEFAULT_REGION=auto \
      aws s3api put-object \
        --endpoint-url "$R2_S3_ENDPOINT" \
        --bucket "$BUCKET" \
        --key "$r2_key" \
        --body "$upload_file" \
        --content-type "$content_type" \
        --no-cli-pager 2>&1 >/dev/null); then
    local url="${PUBLIC_URL}/${r2_key}"
    info "Uploaded: $url"
    echo ""
    echo "  Markdown:  ![alt](${url})"
    echo "  MDX:       <img src=\"${url}\" alt=\"\" />"
    echo ""
  else
    die "Upload failed:\n${upload_err:-unknown error}"
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
