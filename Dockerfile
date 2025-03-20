# Use an official Node.js runtime as the base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Compile TypeScript
RUN npm run build

# Expose the port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
