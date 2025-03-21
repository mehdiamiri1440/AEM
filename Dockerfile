# Build Step
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Copy Swagger files separately
RUN mkdir -p dist/swagger && cp -r src/swagger/* dist/swagger/

# Production Step
FROM node:18-alpine
WORKDIR /app

# Copy built app and dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Copy Swagger files
COPY --from=build /app/dist/swagger ./dist/swagger

EXPOSE 8080
CMD ["node", "dist/index.js"]
