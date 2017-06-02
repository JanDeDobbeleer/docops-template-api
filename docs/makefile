.PHONY: upload images clean

ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
IMAGE:=$(shell docker images -q plantuml)

clean:
	rm -rf Output/

images:
ifeq ($(IMAGE),)
	docker build -t plantuml .
endif
	docker run -v ${ROOT_DIR}:/work --workdir=/work --rm plantuml ./*.puml -o ./Output

upload:
	gdrive sync upload Output 0B9XaCX5-ljs6aW1ZampSRkhLTzQ
