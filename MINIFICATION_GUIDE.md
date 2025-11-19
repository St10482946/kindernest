# Minification Guide for Production

This guide explains how to create minified versions of CSS and JavaScript files for production deployment.

## Why Minify?

Minification reduces file sizes by:
- Removing comments
- Removing unnecessary whitespace
- Shortening variable names (in advanced minifiers)

This improves page load times and reduces bandwidth usage.

## Tools for Minification

### Online Tools
- **CSS Minifier**: https://www.minifier.org/
- **JavaScript Minifier**: https://www.minifier.org/
- **CSSNano**: https://cssnano.co/
- **Terser**: https://terser.org/ (for JavaScript)

### Command Line Tools

#### Using Node.js (if installed)
```bash
# Install minifiers globally
npm install -g clean-css-cli terser

# Minify CSS
cleancss -o css/style.min.css css/style.css
cleancss -o css/accordion.min.css css/accordion.css

# Minify JavaScript
terser js/script.js -o js/script.min.js -c -m
```

#### Using PowerShell (Windows)
```powershell
# Basic CSS minification (removes comments and extra whitespace)
$css = Get-Content 'css/style.css' -Raw
$css = $css -replace '/\*.*?\*/', '' -replace '\s+', ' ' -replace '\s*\{\s*', '{' -replace '\s*\}\s*', '}' -replace '\s*:\s*', ':' -replace '\s*;\s*', ';'
$css | Out-File 'css/style.min.css' -Encoding utf8
```

## Current Status

- ✅ **Development files**: Unminified for readability and debugging
- ⚠️ **Production files**: Minified versions should be created before deployment
- 📝 **Note**: For this academic project, unminified files are acceptable. Minification is recommended for production websites.

## File Structure

```
css/
  ├── style.css          (development - unminified)
  ├── style.min.css      (production - minified, to be created)
  ├── accordion.css      (development - unminified)
  └── accordion.min.css  (production - minified, to be created)

js/
  ├── script.js          (development - unminified)
  └── script.min.js      (production - minified, to be created)
```

## Implementation Notes

1. **Development**: Use unminified files for easier debugging
2. **Production**: Switch HTML links to `.min.css` and `.min.js` files
3. **Testing**: Always test minified files before deployment
4. **Source Maps**: Consider generating source maps for easier debugging in production

## Estimated Size Reduction

- **CSS files**: ~30-40% size reduction
- **JavaScript files**: ~40-50% size reduction

## Next Steps

1. Create minified versions using one of the tools above
2. Update HTML files to reference `.min.css` and `.min.js` for production
3. Test the website with minified files
4. Deploy minified versions to production server

