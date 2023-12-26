FROM node:20.9.0-alpine3.17

WORKDIR /app

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

COPY package*.json ./

RUN npm i

COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src

CMD npm start



