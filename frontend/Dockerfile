FROM node:22.15-alpine AS src

WORKDIR /app

COPY src ./src
COPY public ./public
COPY angular.json .
COPY package*.json .
COPY tsconfig*.json .

FROM node:22.15-alpine AS dev

WORKDIR /app

COPY --from=src /app .

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
