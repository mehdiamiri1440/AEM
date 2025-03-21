# Build step
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code & build
COPY . .
RUN npm run build

# Explicitly copy Swagger files
RUN mkdir -p dist/swagger && cp -r src/swagger/* dist/swagger/

# Production step
FROM node:18-alpine
WORKDIR /app

# Copy built project
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist/swagger ./dist/swagger

# Expose API port
EXPOSE 8080
CMD ["node", "dist/index.js"]
