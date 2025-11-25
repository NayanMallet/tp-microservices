# public-api/Dockerfile

# Étape de build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Étape production
FROM node:18-alpine AS production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/server.js"]
