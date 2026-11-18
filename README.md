# CV Website

Personal CV site for **Johannes Hernehult**: [cv.jhernehult.com](https://cv.jhernehult.com).

A static site built with semantic HTML, modular vanilla CSS, and a little progressive-enhancement JS. No build step, no dependencies. Served by unprivileged Nginx and deployed with Kamal.

## Features

- **No build step**: plain HTML, CSS, and vanilla JS.
- **Modular CSS**: tokens, reset, base, layout, components, sections, responsive.
- **Print-ready A4**: `styles/print.css` with `@page` rules, plus a Print / Save as PDF button.
- **Experience sorting**: order entries by newest, oldest, or type (`js/experience.js`). Hidden when JS is disabled.
- **Contact obfuscation**: details are assembled client-side after user interaction or a short delay (`js/anti-scraper.js`), with a `<noscript>` fallback.
- **Self-hosted fonts**: preloaded WOFF2 files for Inter Display and Space Grotesk.
- **Container**: `nginxinc/nginx-unprivileged:1.27-alpine` on port 8080, 7-day cache on `/assets/`, `/up` healthcheck.

## Project Structure

```text
.
├── assets/
│   ├── fonts/            # Inter Display & Space Grotesk
│   └── images/           # Portrait and favicon
├── config/
│   └── deploy.yml        # Kamal config
├── js/
│   ├── anti-scraper.js   # Contact detail assembly
│   └── experience.js     # Experience sorting
├── styles/
│   ├── components/       # Profile and card styles
│   ├── sections/         # Experience and skills styles
│   ├── base.css
│   ├── layout.css
│   ├── print.css         # A4 print/PDF
│   ├── reset.css
│   ├── responsive.css
│   ├── style.css
│   └── tokens.css        # Colors, typography, spacing
├── Dockerfile
├── index.html            # Main CV document
└── nginx.conf            # Server, caching, /up healthcheck
```

## Local Development

Serve with any static file server:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

To test the production Nginx setup:

```sh
docker build -t cv-website .
docker run --rm -p 8080:8080 cv-website
```

Open `http://localhost:8080`.

## Deployment

Configured for [Kamal](https://kamal-deploy.org/) in `config/deploy.yml`:

- **Host**: `cv.jhernehult.com` (SSL via Kamal proxy)
- **App port**: `8080`
- **Healthcheck**: `GET /up` returns `200 ok`

```sh
kamal deploy
```
