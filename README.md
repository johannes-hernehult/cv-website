# CV Website

Personal CV site for **Johannes Hernehult**: [cv.jhernehult.com](https://cv.jhernehult.com).

A static site built with semantic HTML, a single structured vanilla CSS stylesheet, and lightweight progressive-enhancement JavaScript. No build step, no dependencies. Served by unprivileged Nginx and deployed with Kamal.

## Features

- **No build step**: plain HTML, CSS, and vanilla JS with zero external dependencies.
- **Structured stylesheet**: `styles/site.css` organized into reset, design tokens, base typography, layout, components, responsive breakpoints, and print rules.
- **Print-ready A4**: `@page` and `@media print` styles in `styles/site.css`, paired with a **Download CV** button (`window.print()`).
- **Experience sorting**: order entries by newest, oldest, or type (`js/experience.js`). Controls stay hidden when JS is disabled.
- **Contact obfuscation**: location and email are assembled client-side on first user interaction or after a 1-second delay (`js/anti-scraper.js`), with a `<noscript>` fallback.
- **Container**: `nginxinc/nginx-unprivileged:1.27-alpine` on port `8080`, 7-day cache on `/assets/`, and a `/up` healthcheck.

## Project Structure

```text
.
├── assets/
│   └── images/           # Portrait (jh.jpg) and favicon
├── config/
│   └── deploy.yml        # Kamal deployment config
├── js/
│   ├── anti-scraper.js   # Client-side contact detail assembly
│   ├── experience.js     # Experience sorting controls
│   └── site.js           # Print button and footer year
├── styles/
│   └── site.css          # Tokens, layout, components, responsive & print styles
├── .dockerignore
├── Dockerfile
├── index.html            # Main CV document
├── nginx.conf            # Server, caching, /up healthcheck
└── README.md
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
