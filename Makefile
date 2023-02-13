.PHONY: build down up lint-backend lint-frontend lint install  install-backend

build:
	@echo 'Build docker compose environment'
	docker-compose build


install-backend:
	@echo 'Install backend'
	docker-compose exec -T php composer -d /var/www/html/api install
	docker-compose exec -T php /var/www/html/api/bin/console doctrine:schema:update --force
	docker-compose exec -T php /var/www/html/api/bin/console lexik:jwt:generate-keypair

install: install-backend

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