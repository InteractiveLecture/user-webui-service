FROM nginx
ADD build/app /var/www/html/user-webfrontend-service
ADD nginx/nginx.conf /etc/nginx/nginx.conf

