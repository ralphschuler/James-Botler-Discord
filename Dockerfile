FROM alpine:latest as base

RUN apk update && \
    apk add make gcc g++ autoconf automake \
    nodejs npm python3 py3-pip tesseract-ocr \
    graphicsmagick

FROM base
WORKDIR /usr/src/app

COPY package*.json /usr/src/app
RUN npm install

COPY . /usr/src/app
RUN npm run build

CMD ["node", "dist/main.js"]