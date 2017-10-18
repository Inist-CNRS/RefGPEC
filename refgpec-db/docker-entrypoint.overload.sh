#!/bin/bash

# inject config.json parameters to env
# only if not already defined in env
export POSTGRES_DB=${POSTGRES_DB:=$(jq -r -M .POSTGRES_DB /config.json | grep -v null)}
export POSTGRES_USER=${POSTGRES_USER:=$(jq -r -M .POSTGRES_USER /config.json | grep -v null)}
export POSTGRES_PASSWORD=${POSTGRES_PASSWORD:=$(jq -r -M .POSTGRES_PASSWORD /config.json | grep -v null)}
export PGDATA=${PGDATA:=$(jq -r -M .PGDATA /config.json | grep -v null)}

# load /docker-entrypoint.initdb2.d/ sql files sin background
docker-entrypoint.initdb2.d-loader.sh &

# start postgresql
exec /usr/local/bin/docker-entrypoint.sh $@