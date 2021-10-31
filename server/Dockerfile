FROM node:14.17.0-alpine
WORKDIR /usr/app

COPY package.json .
RUN yarn install
COPY ./scripts /usr/app/scripts/

COPY . .