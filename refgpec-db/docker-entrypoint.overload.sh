#!/bin/bash

# inject config.json parameters to env
# only if not already defined in env
export POSTGRES_DB=${POSTGRES_DB:=$(jq -r .POSTGRES_DB /config.json)}
export POSTGRES_USER=${POSTGRES_USER:=$(jq -r .POSTGRES_USER /config.json)}
export POSTGRES_PASSWORD=${POSTGRES_PASSWORD:=$(jq -r .POSTGRES_PASSWORD /config.json)}
export PGDATA=${PGDATA:=$(jq -r .PGDATA /config.json)}

exec /usr/local/bin/docker-entrypoint.sh $@