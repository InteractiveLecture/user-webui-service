FROM alpine:3.1 
ADD out/main /main
ADD build/app /app
cmd ["/main"]
EXPOSE 80
