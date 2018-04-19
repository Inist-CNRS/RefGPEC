FROM postgrest/postgrest:v0.4.4.0

ENV PGRST_DB_URI="postgres://refgpec:gpecsecret@refgpec-db:5432/refgpec" \
    PGRST_DB_SCHEMA=public \
    PGRST_DB_ANON_ROLE=web_anon \
    PGRST_DB_POOL=100 \
    PGRST_SERVER_HOST=*4 \
    PGRST_SERVER_PORT=3000 \
    PGRST_SERVER_PROXY_URI="http://127.0.0.1:3000/api/" \
    PGRST_JWT_SECRET= \
    PGRST_SECRET_IS_BASE64=false \
    PGRST_JWT_AUD= \
    PGRST_MAX_ROWS= \
    PGRST_PRE_REQUEST=

COPY ./postgrest.conf /etc/postgrest.conf

# ezmasterization of refgpec
# see https://github.com/Inist-CNRS/ezmaster
RUN echo '{ \
  "httpPort": 3000, \
  "configPath": "/etc/postgrest.conf", \
  "configType": "text" \
}' > /etc/ezmaster.json
