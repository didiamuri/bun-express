# ---- Build stage ----
FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY . .
#RUN bun test
RUN bun run build

# ---- Runner stage ----
FROM oven/bun:alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

USER bun
EXPOSE 3000
CMD ["bun", "dist/main.js"]