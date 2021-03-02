FROM alpine:latest as base

RUN apk update && \
    apk add make gcc g++ autoconf automake \
    nodejs npm python3 py3-pip tesseract-ocr \
    graphicsmagick

FROM base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD [ "node", "dist/main.js" ]