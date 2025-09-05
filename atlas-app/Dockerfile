# ===== DEV =====
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps --include=dev
COPY . .
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ===== PROD =====
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
RUN npm prune --production
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
