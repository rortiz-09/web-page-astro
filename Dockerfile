# Stage 1: Build the project
FROM node:lts-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* bun.lock* ./

# Install dependencies (using npm as per README)
RUN npm install

# Copy source code
COPY . .

# Build the Astro project
RUN npm run build

# Stage 2: Serve the project
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
