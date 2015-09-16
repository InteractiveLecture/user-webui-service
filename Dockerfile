FROM nginx
ADD build/app /var/www/html/user-web
ADD nginx/nginx.conf /etc/nginx/nginx.conf

