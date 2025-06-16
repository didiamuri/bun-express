# ---- Build stage ----
FROM oven/bun:1 AS builder
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install
COPY . .
RUN bun build ./src/main.ts --target bun --outdir dist

# ---- Runner stage ----
FROM oven/bun:1 AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "dist/main.js"]
