FROM node:10.11.0-jessie

COPY ./node /api
WORKDIR /api

RUN npm install
CMD ["node", "app.js"]
