# Uploading Blog Images to Cloudflare R2

## Setup (one time)

1. Create a **bucket-scoped R2 API token** (Cloudflare → R2 → Manage API Tokens,
   scoped to the `raisedash` bucket with Object Read & Write) and add its
   S3 credentials to `.env.local` in the project root:

```
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
CF_ACCOUNT_ID=your-account-id   # used to derive the S3 endpoint
```

   (Or set `R2_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com` directly
   instead of `CF_ACCOUNT_ID`.)

2. Install the CLIs the uploader uses:

```bash
brew install awscli   # uploads to R2 over the S3-compatible API
brew install webp     # cwebp: automatic PNG/JPG → WebP conversion
```

Without `cwebp`, images upload in their original format (larger files).

## Usage

```bash
# Basic (filename becomes the URL slug)
./tools/upload-blog-image.sh path/to/image.png

# With custom name (recommended for blog posts)
./tools/upload-blog-image.sh path/to/image.png my-custom-name

# Multiple files at once
./tools/upload-blog-image.sh images/*.png

# Skip WebP conversion
./tools/upload-blog-image.sh --no-convert logo.png

# Custom quality (default 85)
./tools/upload-blog-image.sh --quality 90 hero.png
```

## Workflow for a new blog post

1. Put your images in `tools/temp/`
2. Upload each with a descriptive name:

```bash
./tools/upload-blog-image.sh tools/temp/cover.png my-article-cover
./tools/upload-blog-image.sh tools/temp/screenshot.png my-article-feature
```

3. The script prints the CDN URL after each upload:

```
https://cdn.raisedash.com/media/landing/blog/my-article-cover.webp
```

4. Use that URL in your MDX blog post:

```markdown
![Description of image](https://cdn.raisedash.com/media/landing/blog/my-article-cover.webp)
```

## What the script does

- Reads credentials from `.env.local`
- Converts PNG/JPG to WebP automatically (typically 90%+ smaller)
- Sanitizes filenames (lowercase, spaces to hyphens, strips special chars)
- Uploads to the `raisedash` R2 bucket under `media/landing/blog/`
- Prints the public CDN URL, markdown syntax, and MDX syntax

## URL pattern

All blog images end up at:

```
https://cdn.raisedash.com/media/landing/blog/{filename}.webp
```
