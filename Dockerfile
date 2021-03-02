FROM alpine:latest
WORKDIR /app

RUN apk update && \
    apk add make gcc g++ autoconf automake \
    nodejs npm python3 py3-pip tesseract-ocr \
    graphicsmagick

COPY package*.json /app/
RUN npm install

COPY . /app

CMD [ "npx". "babel-node", "src/main.js" ]