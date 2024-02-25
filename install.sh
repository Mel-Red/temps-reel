#!/bin/bash

cd server
npm install
docker-compose up -d --remove-orphans
cd ../client
npm install
docker-compose up -d --remove-orphans