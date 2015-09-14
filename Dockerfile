FROM nginx
ADD build/app /var/www/html
ADD nginx/nginx.conf /etc/nginx/nginx.conf

