# VortexOps CTF Team Website

Official website for the VortexOps Capture The Flag team, hosted on GitHub Pages at [vortexopsctf.github.io](https://vortexopsctf.github.io).

## About

This repository contains the source code for the VortexOps CTF team website, featuring:
- Team information and member profiles
- CTF writeups and challenge solutions
- Competition history and achievements
- Contact and social links

## Project Structure

```
vortexopsctf.github.io/
├── index.html          # Landing page
├── writeups.html       # CTF writeups page
├── team.html          # Team members page
├── assets/
│   ├── css/
│   │   └── style.css  # Main stylesheet
│   ├── js/
│   │   └── main.js    # Interactive features
│   └── images/        # Images and assets
├── CLAUDE.md          # AI assistant guidance
└── README.md          # This file
```

## Development

### Local Preview

For static HTML/CSS/JS (current setup):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.

### Using Jekyll (optional)

If you decide to use Jekyll for blog features:
```bash
bundle install
bundle exec jekyll serve
```

## Deployment

This site is automatically deployed via GitHub Pages:
- **Source Branch**: `main`
- **URL**: https://vortexopsctf.github.io
- **Deploy Time**: 1-2 minutes after push

All commits to the `main` branch will trigger an automatic deployment.

## Customization

### Adding Team Members

Edit `team.html` and duplicate the `.member-card` div. Update:
- Avatar image path
- Name and role
- Bio description
- Social media links

### Adding Writeups

1. Edit `writeups.html`
2. Duplicate the `.writeup-card` div
3. Update the category, title, description, and link
4. Create a separate HTML file for the full writeup or link to an external post

### Updating Styles

All styling is in `assets/css/style.css`. The site uses CSS custom properties (variables) for easy theme customization:
- `--primary-color`: Main accent color (default: #00ff88)
- `--secondary-color`: Secondary accent (default: #0088ff)
- `--dark-bg`: Background color
- `--card-bg`: Card background color

## Technologies

- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- Vanilla JavaScript (no frameworks)
- GitHub Pages for hosting

## Contributing

Team members can contribute by:
1. Cloning the repository
2. Making changes on a feature branch
3. Testing locally
4. Creating a pull request to `main`

## License

Copyright © 2025 VortexOps CTF Team. All rights reserved.
