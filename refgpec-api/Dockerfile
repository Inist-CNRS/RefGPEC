FROM postgrest/postgrest:v0.4.3.0

COPY ./postgrest.conf /etc/postgrest.conf

# ezmasterization of refgpec
# see https://github.com/Inist-CNRS/ezmaster
RUN echo '{ \
  "httpPort": 3000, \
  "configPath": "/etc/postgrest.conf", \
  "configType": "text" \
}' > /etc/ezmaster.json
