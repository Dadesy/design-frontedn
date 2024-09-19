include .env

INDEX=efko-design

up: docker-up
down: docker-down
restart: down up

install:
	@$(MAKE) -s down
	@$(MAKE) -s docker-build
	@$(MAKE) -s up

docker-build: \
	docker-build-app \
	docker-build-nginx

docker-build-nginx:
	@docker build --target=nginx \
         -t ${DOCKER_REGISTRY}/${ENV}/${DOCKER_IMAGE_NAME}-nginx:${DOCKER_IMAGE_VERSION} -f ./docker/Dockerfile .

docker-build-app:
	@docker build --target=build-production \
         -t ${DOCKER_REGISTRY}/${ENV}/${DOCKER_IMAGE_NAME}-build:${DOCKER_IMAGE_VERSION} -f ./docker/Dockerfile .

docker-up:
	@docker compose -p ${INDEX} up -d

docker-down:
	@docker compose -p ${INDEX} down --remove-orphans

docker-down-clear:
	@docker compose down -v --remove-orphans

shell:
	@docker compose run --rm ${INDEX} /bin/sh
