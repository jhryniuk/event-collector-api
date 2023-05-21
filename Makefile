.PHONY: build install up down test-backend

build:
	@echo 'Build docker compose environment'
	docker compose build

install:
	@echo 'Install backend'
	docker compose exec -T php composer -d /var/www/html install
	docker compose exec -T php /var/www/html/bin/console doctrine:database:create --if-not-exists
	docker compose exec -T php /var/www/html/bin/console doctrine:schema:update --force
	docker compose exec -T php /var/www/html/bin/console lexik:jwt:generate-keypair

up:
	@echo 'Start docker compose'
	docker compose up -d

down:
	@echo 'Stop docker compose'
	docker compose down


test-backend:
	@echo 'Run tests'
	docker compose exec -T php /var/www/html/vendor/bin/behat
