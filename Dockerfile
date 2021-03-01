FROM alpine:latest as update-apks
RUN apk update 

FROM update-apks as install-buildtools
RUN apk add make gcc g++ autoconf automake

FROM install-buildtools as install-node
RUN apk add nodejs npm 

FROM install-node as install-python
RUN apk add python3 py3-pip 

FROM install-python as install-tesseract
RUN apk add tesseract-ocr

FROM install-tesseract as install-graphicsmagic
RUN apk add graphicsmagick

FROM install-graphicsmagic as prepare-app
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY . /app

CMD [ "npm", "run", "start" ]