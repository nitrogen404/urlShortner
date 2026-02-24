FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy dependency definitions and install
COPY package*.json ./
RUN npm install

# Copy all the application code
COPY . .

# Expose the API port
EXPOSE 3000

# Start command
CMD ["npm", "run", "dev"]
