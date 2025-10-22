# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Pages website for VortexOps CTF team hosted at `vortexopsctf.github.io`. The repository is configured to deploy static content via GitHub Pages.

## Repository Structure

This is a fresh repository. A typical GitHub Pages site structure would include:
- `index.html` - Main landing page
- `_config.yml` - Jekyll configuration (if using Jekyll)
- `assets/` - CSS, JavaScript, images
- `_posts/` - Blog posts/writeups (if using Jekyll)
- Custom HTML pages for different sections

## GitHub Pages Deployment

**Important**: GitHub Pages serves content directly from the repository. Changes pushed to the `main` branch will automatically deploy to `https://vortexopsctf.github.io`.

### Deployment verification:
- Check GitHub repository Settings > Pages to verify source branch
- Allow 1-2 minutes after push for changes to appear
- Use `https://vortexopsctf.github.io` to view the live site

## Development Workflow

### Local Preview with Jekyll (if using Jekyll):
```bash
bundle install
bundle exec jekyll serve
# Site available at http://localhost:4000
```

### Local Preview with Simple HTTP Server (for static HTML):
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

## Architecture Considerations

Since this is a CTF team website, typical sections include:
- Team information and member profiles
- CTF writeups and blog posts
- Achievements and competition history
- Contact information
- Resources and tools

## Git Workflow

- Main branch: `main` (deploys to production)
- All commits to `main` trigger automatic GitHub Pages deployment
- No build step required for pure HTML/CSS/JS sites
- Jekyll sites auto-build via GitHub Pages
