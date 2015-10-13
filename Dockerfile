FROM nginx
VOLUME /var/www/html/
ADD nginx/nginx.conf /etc/nginx/nginx.conf

