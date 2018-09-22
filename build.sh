#!/bin/bash

docker build . -t rpgapi:latest
docker-compose up -d
