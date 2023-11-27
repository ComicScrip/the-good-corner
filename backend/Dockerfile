FROM node:20.9.0-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src ./src
COPY tsconfig.json ./tsconfig.json

CMD npm start