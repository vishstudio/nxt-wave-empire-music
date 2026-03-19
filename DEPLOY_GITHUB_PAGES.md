# Instructions for deploying this Next.js app to GitHub Pages

1. Push your code to the `main` branch of your GitHub repository.
2. The GitHub Actions workflow in `.github/workflows/gh-pages.yml` will automatically build and export your static site to the `gh-pages` branch.
3. The workflow sets the correct `basePath` and `assetPrefix` for GitHub Pages, and disables image optimization for compatibility.
4. Your site will be available at:
   https://<your-github-username>.github.io/nxt-wave-empire-music/

## Local build for GitHub Pages

To test locally with the correct base path:

```
GITHUB_PAGES=true npm run build && npx next export
```

Then serve the `out` directory:

```
npx serve out
```

## Notes

- Update the `repo` variable in `next.config.js` if your repository name changes.
- All internal links and assets should use Next.js's `basePath` and `assetPrefix` support.
- Images use `unoptimized: true` for static export compatibility.
