.PHONY: clean validate interactive full swagger mock watch

IMAGES:=$(shell docker images -f "reference=docops-*" -q)

clean:
	docker rmi ${IMAGES} -f || true

validate:
	docker-compose run --rm mock node_modules/gulp/bin/gulp.js validate

interactive:
	docker-compose run --rm mock /bin/sh

full:
	docker-compose up

swagger:
	docker-compose up swagger

mock:
	docker-compose up mock

watch:
	docker-compose run -p3000:3000 -p3001:3001 swagger watch

