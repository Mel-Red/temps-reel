#!/bin/bash

cd client
npm install
docker-compose up -d
cd ../server
npm install
docker-compose up -d

