# Use Node.js 18 as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]