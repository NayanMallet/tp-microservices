ARG ARCH=amd64
FROM --platform=linux/${ARCH} node:18-alpine AS builder
WORKDIR /app

# Installer outils de compilation nécessaires pour les modules natifs (node-gyp)
RUN apk add --no-cache python3 build-base linux-headers

# Activer pnpm via corepack
RUN corepack enable

# Copier les fichiers de dépendances (workspace + service)
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY shared/package.json ./shared/package.json
COPY item-service/package.json ./item-service/package.json

# Installer les dépendances pour item-service (et ses dépendances internes)
RUN pnpm -r --filter ./item-service... install --frozen-lockfile

# Copier le code source (shared + item-service) et compiler
COPY shared ./shared
COPY item-service ./item-service
RUN pnpm -r --filter ./item-service... run build

# Production stage
ARG ARCH=amd64
FROM --platform=linux/$ARCH node:18-alpine AS production
WORKDIR /app/item-service

# Installer outils de compilation nécessaires pour les modules natifs (node-gyp) et npm
RUN apk add --no-cache python3 build-base linux-headers npm

# Copier uniquement le package.json du item-service
COPY item-service/package.json ./

# Supprimer la dépendance 'shared' du package.json (incompatible npm)
RUN sed -i '/"shared"/d' package.json

# Installer les dépendances de production avec npm (pour sqlite3 natif)
RUN npm install --omit=dev

# Copier le code compilé
COPY --from=builder /app/item-service/dist ./dist
COPY --from=builder /app/shared/dist ../shared/dist

# Rendre le module shared accessible comme un package node_modules
RUN mkdir -p node_modules/shared && cp -r ../shared/dist/* node_modules/shared/

EXPOSE 3003
CMD ["node", "dist/server.js"]

# Astuce :
# Pour builder en x86_64 (plus compatible), lance :
# docker-compose build --build-arg ARCH=amd64
