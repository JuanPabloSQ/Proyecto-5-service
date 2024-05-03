# Use the official Node.js 20 image on Alpine Linux
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port 3000 (or any other port your Express app is running on)
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]