FROM node:20.9.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./tsconfig.json ./tsconfig.json
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./next.config.js ./next.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./postcss.config.js ./postcss.config.js
COPY ./src ./src

CMD npm run dev



