
# ============= DEV STAGE =============
FROM node:20-alpine AS dev

WORKDIR /app

# Copy package files and install ALL deps (including dev)
COPY package*.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps --include=dev

# Copy source (after deps for better caching)
COPY . .

# Enable hot reload inside Docker
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000
CMD ["npm", "run", "dev"]

# ============= PROD STAGE =============
FROM node:20-alpine AS prod

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Remove dev deps after build
RUN npm prune --production

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start”]
and this version: "3.9"