# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Run
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.env.docker ./packages/server/.env.docker
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/server/dist ./packages/server/dist

COPY --from=builder /app/packages/shared/package*.json ./packages/shared
COPY --from=builder /app/packages/server/package*.json ./packages/server
EXPOSE 3000
CMD ["node", "--env-file=packages/server/.env.docker", "packages/server/dist/index.js"]
