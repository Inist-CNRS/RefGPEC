FROM postgres:9.6.3

# need jq to parse JSON
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install jq tmpreaper

COPY config.json /
RUN mkdir -p /docker-entrypoint-initdb2.d/
COPY ./sql/* /docker-entrypoint-initdb2.d/
COPY docker-entrypoint.initdb2.d-loader.sh /usr/local/bin/
COPY docker-entrypoint.overload.sh /usr/local/bin/

# PGDATA location
RUN mkdir -p /ezmaster-data/postgresql-data/

# backup stuff
RUN mkdir -p /ezmaster-data/sqldump/
COPY pg_dump.periodically.sh /usr/local/bin/

# ezmasterization of refgpec
# see https://github.com/Inist-CNRS/ezmaster
# notice: httpPort is useless here but as ezmaster require it (v3.8.1) we just add a wrong port number
RUN echo '{ \
  "httpPort": 80, \
  "configPath": "/config.json", \
  "configType": "json", \
  "dataPath": "/ezmaster-data/" \
}' > /etc/ezmaster.json

ENTRYPOINT [ "docker-entrypoint.overload.sh" ]
CMD [ "postgres" ]