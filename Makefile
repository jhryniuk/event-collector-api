.PHONY: build down down-test up up-test lint-backend lint-frontend lint install install-backend install-backend-test

build:
	@echo 'Build docker compose environment'
	docker-compose build

build-test:
	@echo 'Build test environment'
	docker-compose -f docker-compose-test.yml build

install-backend:
	@echo 'Install backend'
	docker-compose exec -T php composer -d /var/www/html install
	docker-compose exec -T php /var/www/html/bin/console doctrine:database:create --if-not-exists
	docker-compose exec -T php /var/www/html/bin/console doctrine:schema:update --force
	docker-compose exec -T php /var/www/html/bin/console lexik:jwt:generate-keypair

install-backend-test:
	@echo 'Install test backend'
	docker-compose -f docker-compose-test.yml exec -T php-test composer -d /var/www/html install
	docker-compose -f docker-compose-test.yml exec -T php-test /var/www/html/bin/console doctrine:database:create --if-not-exists
	docker-compose -f docker-compose-test.yml exec -T php-test /var/www/html/bin/console doctrine:schema:update --force
	docker-compose -f docker-compose-test.yml exec -T php-test /var/www/html/bin/console lexik:jwt:generate-keypair --skip-if-exists

install: install-backend

up:
	@echo 'Start docker compose'
	docker-compose up -d

up-test:
	@echo 'Start docker compose test environment'
	docker-compose -f docker-compose-test.yml up -d

down:
	@echo 'Stop docker compose'
	docker-compose down

down-test:
	@echo 'Stop docker compose for test env'
	docker-compose -f docker-compose-test.yml down

lint-backend:
	@echo 'Run backend lint'
	docker-compose -f docker-compose-test.yml exec -T php-test composer -d /var/www/html run lint

lint-frontend:
	@echo 'Run frontend lint'
	docker-compose -f docker-compose-test.yml exec -T node-test npm run lint

lint: lint-frontend lint-backend

test-backend: up-test install-backend-test
	@echo 'Run tests'
	docker-compose -f docker-compose-test.yml exec -T php-test /var/www/html/vendor/bin/behat