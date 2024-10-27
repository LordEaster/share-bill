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

# Build the Next.js application
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]