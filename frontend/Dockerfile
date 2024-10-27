# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files, including `lib`, `components`, and `pages` directories
COPY . .

# Run the Next.js build command
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]