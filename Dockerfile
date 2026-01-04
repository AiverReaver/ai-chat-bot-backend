FROM node:25.2-bullseye-slim AS builder
ENV CI=true

WORKDIR /usr/src/app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN --mount=type=cache,target=/usr/src/app/pnpm/store \
    pnpm install \
        --store-dir=/usr/src/app/pnpm/store \
        --frozen-lockfile \
        --prefer-offline

COPY . .

RUN pnpm run build

RUN pnpm prune --prod

FROM node:25.2-bullseye-slim AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.env ./
COPY package*.json ./

USER node

EXPOSE 3009

CMD ["node", "dist/main.js"]