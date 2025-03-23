#!/bin/sh

dockerize -wait http://laravel/api/ping -timeout 240s -wait-retry-interval 7s
if curl -s --head --request GET http://laravel/api/ping | grep "200 OK" > /dev/null; then
    npm start
fi
