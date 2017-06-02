.PHONY: clean validate interactive full swagger mock

IMAGES:=$(shell docker images -f "reference=docops-*" -q)

clean:
	docker rmi ${IMAGES} -f || true

validate:
	docker-compose run --rm mock node compile.js

interactive:
	docker-compose run --rm mock /bin/sh

full:
	docker-compose up

swagger:
	docker-compose up swagger

mock:
	docker-compose up mock