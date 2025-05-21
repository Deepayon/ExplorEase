# Use lightweight Node Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install build dependencies (for native modules like bcrypt)
RUN apk add --no-cache make gcc g++ python3

# Copy package files separately to utilize Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
