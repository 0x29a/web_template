#!/bin/bash
set -ex
source $HOME/.profile
cd $(dirname $0)
docker-compose pull
docker-compose stop
git pull
docker-compose up -d
