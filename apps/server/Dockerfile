# Stage 1: Lint
FROM node:18-alpine AS lint
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm lint

# Stage 2: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm build

# Stage 3: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY apps/server/.env .env
CMD ["node", "dist/index.js"]