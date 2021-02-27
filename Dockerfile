FROM node:lts-alpine

WORKDIR /app
RUN mkdir /app/cache

COPY package*.json /app/
RUN npm install

COPY . /app

CMD [ "npm", "run", "start" ]