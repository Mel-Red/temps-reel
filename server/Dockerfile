FROM node:20

# Create app directory
RUN mkdir -p /
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install

COPY . . 

# Exports
EXPOSE 3001
CMD [ "npm", "run", "dev" ]