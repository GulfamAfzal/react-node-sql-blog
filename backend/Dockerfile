# Stage 1: Build stage 
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./ 
# Force a clean install layer execution
RUN npm ci --only=production 

# Stage 2: Production stage
FROM node:18-alpine 
WORKDIR /app 

# Copy files directly to ensure the latest local changes write fresh blocks
COPY . . 

# Explicitly pull production modules from the isolated builder setup
COPY --from=builder /app/node_modules ./node_modules

# Expose port 3001 to align with your Azure load-balancer settings
EXPOSE 3001 

# Set environment string properties to completely bypass local file drift
ENV NODE_ENV=production

CMD ["node", "index.js"]