FROM alpine:latest as base
RUN apk update
RUN apk add make gcc g++ autoconf automake
RUN apk add nodejs npm
RUN apk add python3 py3-pip
RUN apk add tesseract-ocr
RUN apk add graphicsmagick

FROM base
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app
RUN npm run build

CMD [ "node", "dist/main.js" ]