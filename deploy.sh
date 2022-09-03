#!/bin/bash
set -ex
git pull
docker-compose pull
docker-compose build
docker-compose stop
docker-compose up -d
