# RefGPEC


Application de gestion d'un référentiel de profils/compétences pour une démarche GPEC.

![https1](https://cloud.githubusercontent.com/assets/328244/21484433/b32cd0d6-cb92-11e6-8f79-6884f09edc2b.jpg)

## Developement

Prerequisites: [NodeJS](https://nodejs.org/en/download/package-manager/) & [Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)

```
npm install -g bower
npm install
bower install
npm run dev
```
Then open http://127.0.0.1:8080 to access RefGPEC.


To simulate a production run, you can just type these commandes:

```
make build
make run-prod
```

## Production

Download the docker-compose.yml and just run it.

```
wget https://raw.githubusercontent.com/Inist-CNRS/RefGPEC/master/docker-compose.yml
docker-compose up -d
```

