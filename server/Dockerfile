# Use the official Node image as base
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
