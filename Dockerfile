FROM nginx:1.13.3

# to help docker debugging
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl gnupg2

# nodejs installation used for build tools
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y build-essential nodejs

# install tools for bundle.js
WORKDIR /app/
COPY ./package.json /app/
RUN npm install

# nginx config
COPY ./nginx.prod.conf /etc/nginx/conf.d/default.conf

# ezmasterization of refgpec
# see https://github.com/Inist-CNRS/ezmaster
RUN echo '{ \
  "httpPort": 80, \
  "configPath": "/app/config.json" \
}' > /etc/ezmaster.json

# build www/dist/bundle.js and www/dist/bundle.css for production
COPY ./src /app/src/
COPY ./public /app/public/
RUN npm run build

# remove service-worker stuff
# see https://github.com/facebookincubator/create-react-app/issues/2398
RUN rm -f /app/build/service-worker.js