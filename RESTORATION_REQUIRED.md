# Files That Need Manual Restoration from GitHub

## Critical Issue
The current project has **placeholder image files** (only 20 bytes each) instead of the actual branded assets. These need to be replaced with the real files from the GitHub repository.

## GitHub Repository
Source: https://github.com/omarhash95/Regtime-Website

## Files to Download and Replace

### 1. Font Files (CRITICAL for build)
Download from: `https://github.com/omarhash95/Regtime-Website/tree/main/public/fonts`

Required fonts (create directory `/public/fonts/` first):
- `Aspekta-300.woff2`
- `Aspekta-400.woff2`
- `Aspekta-500.woff2`
- `Aspekta-600.woff2`
- `Aspekta-700.woff2`

### 2. Product Logo Images (HIGH PRIORITY)
These are referenced on the homepage and are currently 20-byte placeholders:

- `Regtime Manager Blue 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Marketer Cadet 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Builder Maize 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Builder Night 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Builder White 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Manager Night 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Manager White 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Marketer Night 1080px.png` (currently 20 bytes, needs real file)
- `Regtime Marketer White 1080px.png` (currently 20 bytes, needs real file)

### 3. Brand Logo Variants (MEDIUM PRIORITY)
All IconMark, Limited, Lockup, Vertical, and Wordmark PNG files are placeholders:

**IconMark series** (540px):
- All variants: Alice Blue, Dim Gray, Night, White

**Limited series** (1080px):
- All variants: Alice Blue, Anti-White, Baby Blue, Cadet, Dim Gray, Maize, Night, White

**Lockup series** (1080px):
- All variants: Anti-White, Baby Blue, Dim Gray, Maize, Night, White

**Vertical series** (1080px):
- All variants: Alice Blue, Anti-White, Baby Blue, Cadet, Dim Gray, Maize, Night, White

**Wordmark series** (1080px):
- All variants: Alice Blue, Anti-White, Baby Blue, Cadet, Dim Gray, Maize, Night, White

## Current File Naming Issue

The original GitHub repo uses **spaces** in filenames (e.g., `Regtime Manager Blue 1080px.png`).
The current project has renamed them with **hyphens** (e.g., `Regtime-Manager-Blue-1080px.png`).

### Two Options:

**Option A: Keep Hyphenated Names (Recommended for deployment)**
1. Download files from GitHub
2. Rename them to use hyphens instead of spaces
3. Replace the 20-byte placeholder files in `/public/`

**Option B: Use Original Names with Spaces**
1. Download files from GitHub with original names
2. Replace placeholder files
3. Update all code references to use spaces (enclose in quotes)

## Files Currently Using Placeholder Logo

1. `/app/page.tsx` - Uses SVG placeholder for 3 product logos
2. `/app/auth/login/page.tsx` - Uses SVG placeholder
3. `/components/Footer.tsx` - Uses SVG placeholder
4. `/components/brand/GeometricHero.tsx` - Uses SVG placeholder
5. `/components/brand/PosterTile.tsx` - Uses SVG placeholder

After downloading real image files, update these 5 files to reference the actual PNGs.

## How to Download Files from GitHub

### Method 1: Git Clone (Easiest)
```bash
git clone https://github.com/omarhash95/Regtime-Website temp-repo
cp temp-repo/public/fonts/* /tmp/cc-agent/58682603/project/public/fonts/
cp temp-repo/public/*.png /tmp/cc-agent/58682603/project/public/
rm -rf temp-repo
```

### Method 2: Download Individual Files
Visit each file on GitHub, click "Download raw file" button:
- Font example: `https://github.com/omarhash95/Regtime-Website/raw/main/public/fonts/Aspekta-400.woff2`
- Image example: `https://github.com/omarhash95/Regtime-Website/raw/main/public/Regtime%20Manager%20Blue%201080px.png`

Note: Spaces in URLs are encoded as `%20`

### Method 3: GitHub Desktop or gh CLI
```bash
gh repo clone omarhash95/Regtime-Website
```

## After Restoration

1. Update image references in the 5 files listed above
2. Restore original layout.tsx with font imports (currently removed to allow build)
3. Run `npm run build` to verify everything works
4. Test that all images load correctly in browser

## Build Configuration

The project is currently configured with:
- `next.config.js`: `images.unoptimized: true` (to handle placeholder files)
- Layout uses system fonts (Aspekta fonts removed temporarily)
- Product logos use SVG placeholder temporarily

Once real files are restored, these temporary workarounds can be reverted to use the original configuration.

##  Priority Order

1. **CRITICAL**: Font files (prevents build errors with custom fonts)
2. **HIGH**: Product logo PNGs (Regtime Manager, Marketer, Builder)
3. **MEDIUM**: Other brand variant logos
4. **LOW**: Additional brand assets

## Verification Checklist

After restoration:
- [ ] All font files exist in `/public/fonts/`
- [ ] Product logo PNGs are real images (not 20 bytes)
- [ ] Layout.tsx restored with localFont configuration
- [ ] page.tsx updated to use real product images
- [ ] `npm run build` completes successfully
- [ ] All images display correctly in browser
- [ ] No "Module not found" errors
- [ ] No 404 errors for images in Network tab

