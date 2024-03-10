FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY public public
COPY src src
COPY index.html package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN npm ci

CMD npm run dev -- --host
