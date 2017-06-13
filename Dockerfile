FROM node:alpine
MAINTAINER JanJoris <jan@herebedragons.io>

WORKDIR /model
COPY . /model

RUN apk --update add wget curl tar \
    && wget -O /usr/bin/prism https://github.com/stoplightio/prism/releases/download/v0.6.21/prism_linux_amd64 \
    && chmod +x /usr/bin/prism \
    && rm -rf output \  
    && npm install --save
