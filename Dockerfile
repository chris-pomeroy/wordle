FROM node:20.9.0-alpine3.18

ARG DOCKER_USER=npm
RUN addgroup -S $DOCKER_USER
RUN adduser -S $DOCKER_USER -G $DOCKER_USER
RUN install --owner=$DOCKER_USER --group=$DOCKER_USER --mode=750 --directory /app
USER $DOCKER_USER

WORKDIR /app

COPY public public
COPY src src
COPY index.html package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN npm ci

CMD npm run dev
