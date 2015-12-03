FROM scratch
#ADD ca-certificates.crt /etc/ssl/certs/
ADD out/main /main
ADD build/app /app
ADD tmp /tmp
#ADD mime.types /etc/mime.types
cmd ["/main"]
EXPOSE 8000

