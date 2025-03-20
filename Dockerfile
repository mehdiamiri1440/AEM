# Build step
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install Sentry CLI
RUN npm install -g @sentry/cli

# Copy source files and build project
COPY . .
RUN npm run build

# Copy Swagger files
RUN cp -r src/swagger dist/swagger

# Production step
FROM node:18-alpine
WORKDIR /app

# Set environment variables
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

# Copy built files and dependencies from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose port
EXPOSE 8080

# Start application
CMD ["node", "dist/index.js"]
