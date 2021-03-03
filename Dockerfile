FROM alpine:latest as base

RUN apk update && \
    apk add nodejs npm python3 py3-pip \
    tesseract-ocr graphicsmagick

FROM base
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

CMD ["npm", "run", "start"]