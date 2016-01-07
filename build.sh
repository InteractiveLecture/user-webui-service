#!/bin/bash
CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o out/main .
gulp build
docker build -t openservice/lecture-user-webui .

docker-compose rm -f && docker-compose build && docker-compose up
