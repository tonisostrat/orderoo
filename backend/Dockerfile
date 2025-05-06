FROM node:22.15-alpine AS src

WORKDIR /app

COPY src ./src
COPY migrations ./migrations
COPY package*.json .
COPY tsconfig*.json .

FROM node:22.15-alpine AS dev

WORKDIR /app

COPY --from=src /app .

CMD ["npm", "run", "start:dev"]
