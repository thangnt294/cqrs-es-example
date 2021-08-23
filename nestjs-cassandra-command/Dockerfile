FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN npm install
COPY . .
RUN npm run build

