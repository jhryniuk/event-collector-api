.PHONY: build down up lint-backend lint-frontend lint

build:
	@echo 'Build docker compose environment'
	docker-compose build

up:
	@echo 'Start docker compose'
	docker-compose up -d

down:
	@echo 'Stop docker compose'
	docker-compose down

lint-backend:
	@echo 'Run backend lint'
	docker-compose exec -T php composer -d /var/www/html/api run lint

lint-frontend:
	@echo 'Run frontend lint'
	docker-compose exec -T node npm run lint

lint: lint-frontend lint-backend