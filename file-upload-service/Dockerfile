FROM oven/bun:1

WORKDIR /app

RUN mkdir files && chmod ugo+w files

COPY package.json bun.lockb ./

RUN bun i

COPY tsconfig.json ./tsconfig.json
COPY ./src ./src

USER bun
CMD bun run start
