# Use official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the application code
COPY . .

# Build the application (if needed)
RUN npm run build || echo "No build script found"

# Create uploads directory
RUN mkdir -p uploads

# Expose the port the app runs on
EXPOSE 8080

# Use the deployment launcher for production
CMD ["node", "index.js"]