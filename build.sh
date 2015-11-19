#!/bin/bash
GO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o out/main .
gulp build
docker build -t interactive-lecture/user-webui .

