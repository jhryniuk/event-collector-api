.PHONY: build down up lint

build:
	@echo 'Build docker compose environment'
	docker-compose build
up:
	@echo 'Start docker compose'
	docker-compose up -d
down:
	@echo 'Stop docker compose'
	docker-compose down
lint:
	@echo 'Run backend lint'
	docker-compose exec php composer -d /var/www/html/api run lint
	@echo 'Run frontend lint'
	docker-compose exec node npm run lint