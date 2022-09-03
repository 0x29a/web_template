#!/bin/bash
set -ex
source $HOME/.profile
cd $(dirname $0)
git pull
docker-compose build
docker-compose stop
docker-compose up -d
