# Uploading Blog Images to Cloudflare R2

## Setup (one time)

1. Add these to `.env.local` in the project root:

```
CF_API_TOKEN=your-token-here
CF_ACCOUNT_ID=your-account-id
```

2. Install `cwebp` for automatic PNG/JPG to WebP conversion:

```bash
brew install webp
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
