# Build step
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Ensure TypeScript is compiled, and Swagger files are copied correctly
RUN npm run build

# Explicitly copy the Swagger YAML files
RUN mkdir -p dist/swagger && cp -r src/swagger/* dist/swagger/

# Production step
FROM node:18-alpine
WORKDIR /app

# Copy built project and dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Ensure Swagger files are included in the final image
COPY --from=build /app/dist/swagger ./dist/swagger

EXPOSE 8080
CMD ["node", "dist/index.js"]
