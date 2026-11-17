FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html style.css reset.css experience.js anti-scraper.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
