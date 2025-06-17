# Client Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.13.2 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
ARG VITE_PROXY_TARGET
ENV VITE_PROXY_TARGET=$VITE_PROXY_TARGET
COPY . .
RUN pnpm build           

FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx","-g","daemon off;"]