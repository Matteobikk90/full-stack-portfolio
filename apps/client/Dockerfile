# Build Stage
FROM node:20-alpine AS build

# VITE build-time vars (if needed)
ARG VITE_API_URL=""
ARG VITE_SENTRY_DSN=""
ARG VITE_ENV=""

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY apps/client ./
RUN pnpm install
RUN pnpm run build

# Runtime Stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html