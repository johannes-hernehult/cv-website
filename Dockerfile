FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY --chmod=644 nginx.conf /etc/nginx/conf.d/default.conf
COPY --chmod=644 index.html /usr/share/nginx/html/
COPY --chmod=755 styles /usr/share/nginx/html/styles
COPY --chmod=755 js /usr/share/nginx/html/js
COPY --chmod=755 assets /usr/share/nginx/html/assets
