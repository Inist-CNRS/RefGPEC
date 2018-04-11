FROM fenglc/pgadmin4:2.1-python2.7-alpine

# need jq to parse JSON
RUN apk update && apk add jq

COPY config.json /
COPY docker-entrypoint.overload.sh /usr/local/bin/

# ezmasterization of refgpec
# see https://github.com/Inist-CNRS/ezmaster
# notice: httpPort is useless here but as ezmaster require it (v3.8.1) we just add a wrong port number
RUN echo '{ \
  "httpPort": 5050, \
  "configPath": "/config.json", \
  "configType": "json" \
}' > /etc/ezmaster.json

ENTRYPOINT [ "docker-entrypoint.overload.sh" ]
CMD [ "pgadmin4" ]
