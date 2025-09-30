# Multi-stage build for Vite React app served by Nginx on Cloud Run

# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* bun.lockb* ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# 2) Runtime stage
FROM nginx:1.27-alpine AS runner

# Cloud Run expects the container to listen on $PORT (default 8080)
ENV PORT=8080

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx runs on 101 user in alpine image; this keeps root for binding but Cloud Run isolates.
EXPOSE 8080

# Healthcheck (optional but helpful)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1:${PORT}/ || exit 1

CMD ["nginx", "-g", "daemon off;"]


