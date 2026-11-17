FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
COPY styles /usr/share/nginx/html/styles
COPY js /usr/share/nginx/html/js
COPY assets /usr/share/nginx/html/assets
