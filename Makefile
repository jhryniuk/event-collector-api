.PHONY: build down up

build:
	@echo 'Build docker compose environment'
	docker-compose build
up:
	@echo 'Start docker compose'
	docker-compose up -d
down:
	@echo 'Stop docker compose'
	docker-compose down