# Server Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@9.13.2 --activate

# Copy package files (if you have a root workspace, copy those too)
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/


# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Build stage
RUN corepack enable && corepack prepare pnpm@9.13.2 --activate

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build
RUN pnpm build

# Production image, copy all the files and run the server
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 serverjs

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Set correct permissions
RUN chown -R serverjs:nodejs /app
USER serverjs

# Set environment
ENV NODE_ENV=production
EXPOSE 4000

CMD ["pnpm", "start:setup"]
