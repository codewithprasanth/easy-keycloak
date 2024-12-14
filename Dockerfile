FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
COPY dist/geo-db .
