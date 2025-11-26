FROM node:18-alpine AS builder
WORKDIR /app

# Installer outils de compilation nécessaires pour les modules natifs (node-gyp)
RUN apk add --no-cache python3 build-base linux-headers

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY public-api/package.json ./public-api/package.json

RUN corepack enable \
  && pnpm -r --filter ./public-api... install --frozen-lockfile

COPY public-api ./public-api
RUN pnpm -r --filter ./public-api... run build

FROM node:18-alpine AS production
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY public-api/package.json ./public-api/package.json

# Installer les dépendances de production uniquement pour public-api
RUN corepack enable \
  && pnpm -r --filter ./public-api... install --prod --frozen-lockfile

COPY --from=builder /app/public-api/dist ./public-api/dist

WORKDIR /app/public-api
EXPOSE 3001
CMD ["node", "dist/server.js"]