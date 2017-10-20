# RefGPEC


Application de gestion d'un référentiel de profils/compétences pour une démarche GPEC.

![https1](https://cloud.githubusercontent.com/assets/328244/21484433/b32cd0d6-cb92-11e6-8f79-6884f09edc2b.jpg)

## Developement

Prerequisites: [NodeJS](https://nodejs.org/en/download/package-manager/) & [Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) & Docker-compose

```
make install
make run-debug
```
Then open http://127.0.0.1:8081 to access RefGPEC.


To simulate a production run, you can just type these commandes:

```
make build
make run-prod
```

## Production

FIXME...
Download the [docker-compose.yml](https://raw.githubusercontent.com/Inist-CNRS/RefGPEC/master/docker-compose.yml) and just run it.

```
wget https://raw.githubusercontent.com/Inist-CNRS/RefGPEC/master/docker-compose.yml
docker-compose up -d
```
