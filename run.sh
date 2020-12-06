#!/usr/bin/env bash

cd Server
SERVERDIR=$(pwd)

sed -i "s|directory-to-change|${SERVERDIR}|g" Dockerfile
docker build -t blockchain-app .


cd ../App
APPDIR=$(pwd)

sed -i "s|directory-to-change|${APPDIR}|g" Dockerfile
docker build -t react-app .

docker run -p 3040:3040 --name go-backend blockchain-app &
docker run -p 3000:3000 --name react-frontend react-app &