#!/bin/bash

# inject config.json parameters to env
# only if not already defined in env
export MAIL_SERVER=${MAIL_SERVER:=$(jq -r -M .MAIL_SERVER /config.json | grep -v null)}
export MAIL_PORT=${MAIL_PORT:=$(jq -r -M .MAIL_PORT /config.json | grep -v null)}
export MAIL_USE_SSL=${MAIL_USE_SSL:=$(jq -r -M .MAIL_USE_SSL /config.json | grep -v null)}
export MAIL_USE_TLS=${MAIL_USE_TLS:=$(jq -r -M .MAIL_USE_TLS /config.json | grep -v null)}
export MAIL_USERNAME=${MAIL_USERNAME:=$(jq -r -M .MAIL_USERNAME /config.json | grep -v null)}
export MAIL_PASSWORD=${MAIL_PASSWORD:=$(jq -r -M .MAIL_PASSWORD /config.json | grep -v null)}
export DEFAULT_USER=${DEFAULT_USER:=$(jq -r -M .DEFAULT_USER /config.json | grep -v null)}
export DEFAULT_PASSWORD=${DEFAULT_PASSWORD:=$(jq -r -M .DEFAULT_PASSWORD /config.json | grep -v null)}

exec /usr/local/bin/docker-entrypoint.sh $@



