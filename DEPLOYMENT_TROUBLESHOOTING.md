# Deployment Troubleshooting Guide

## Issues Fixed So Far

✅ **File naming issues** - All files with spaces in names have been removed
✅ **Code references** - All image paths updated to use dashes instead of spaces
✅ **Missing file references** - Updated to use existing files
✅ **Build succeeds** - Project compiles without errors

## Known Issues

### 1. Placeholder Binary Files (Non-blocking)
Almost all PNG images are only 20 bytes (placeholder files). This won't prevent deployment but images won't display correctly.

**To fix:** Replace placeholder PNGs with actual image files.

**Affected files:**
- All IconMark-*.png files
- All Limited-*.png files
- All Lockup-*.png files
- All Regtime-*.png files
- All Vertical-*.png files
- All Wordmark-*.png files
- Team headshot files
- Building sequence files

## Common Bolt Deployment Errors

### Error: `[EIO: dirent not found, write]`
**Cause:** Files with spaces or special characters in names
**Status:** ✅ Fixed - All problematic filenames have been corrected

### Error: `Module not found` or `Cannot find module`
**Possible causes:**
1. Missing dependencies in package.json
2. Incorrect import paths
3. Case-sensitive file names

**Check:**
```bash
npm run build
```

### Error: Build timeout or memory issues
**Possible causes:**
1. Large dependencies (three.js, framer-motion)
2. Too many pages being statically generated

**Solutions:**
- Reduce bundle size
- Use dynamic imports for heavy components
- Check `next.config.js` for optimization settings

## How to Debug Your Current Error

1. **Check browser console** (F12 in Chrome/Firefox)
   - Look for red error messages
   - Check the Network tab for failed requests

2. **Check Bolt deployment logs**
   - Look for the first error message (usually most important)
   - Note the file/line number where the error occurs

3. **Run the diagnostic tool:**
   ```bash
   node debug-deployment.js
   ```

4. **Check for TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

5. **Test locally:**
   ```bash
   npm run build
   npm run start
   ```

## Current Project Status

- **Build:** ✅ Succeeds
- **File naming:** ✅ No spaces or special characters
- **TypeScript:** ✅ Configuration valid
- **Environment vars:** ✅ Supabase configured
- **Binary files:** ⚠️ Placeholders (won't block deployment)

## Next Steps

**If you're seeing a specific error:**
1. Copy the exact error message
2. Note when it occurs (build, runtime, page load, etc.)
3. Run the diagnostic tool to identify the issue
4. Check this guide for solutions

**To test deployment:**
1. Ensure `npm run build` succeeds locally
2. Try deploying to Bolt
3. If it fails, check the deployment logs for the error
4. Share the error message for targeted debugging

## Additional Resources

- Next.js deployment docs: https://nextjs.org/docs/deployment
- Vercel troubleshooting: https://vercel.com/docs/errors
- Supabase Next.js guide: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
