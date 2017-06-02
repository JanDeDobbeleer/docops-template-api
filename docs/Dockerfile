FROM anapsix/alpine-java:jre
MAINTAINER JanJoris <jan@herebedragons.io>

ENV PLANTUML_VERSION 1.2017.13
ENV LANG en_US.UTF-8
RUN apk add --no-cache graphviz ttf-droid ttf-droid-nonlatin curl \
    && mkdir /app \
    && curl -L https://sourceforge.net/projects/plantuml/files/plantuml.${PLANTUML_VERSION}.jar/download -o /app/plantuml.jar \
    && apk del curl

ENTRYPOINT [ "java","-DPLANTUML_LIMIT_SIZE=8192", "-jar", "/app/plantuml.jar" ]
CMD [ "-h" ]