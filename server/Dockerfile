# Base image
FROM node:20

# App directory container ke andar
WORKDIR /app

# package files copy karo
COPY package*.json ./

# dependencies install
RUN npm install

# baaki project files copy
COPY . .

# App port expose
EXPOSE 8080

# start command
CMD ["npm", "start"]