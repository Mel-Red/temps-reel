#!/bin/bash
cd server
npm install
docker-compose up -d
cd ../client
npm install
docker-compose up -d
