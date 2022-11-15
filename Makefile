include .env

# Define PIP_COMPILE_OPTS=-v to get more information during make upgrade.
PIP_COMPILE = pip-compile --rebuild --upgrade $(PIP_COMPILE_OPTS)
BACKEND_USER_ID = $(shell docker-compose run --rm backend id -u)
FRONTEND_USER_ID = $(shell docker-compose run --rm frontend id -u)

# TODO: modify when docker-compose.override.yml file is got rid of in favor
# of multiple config files.
DOCKER_COMPOSE = docker-compose
ifeq ($(DOCKER_BUILD_ENVIRONMENT),production)
    DOCKER_COMPOSE = docker-compose
endif

upgrade: export CUSTOM_COMPILE_COMMAND=make upgrade
upgrade: ## update the backend/requirements/*.txt files with the latest packages satisfying backend/requirements/*.in
	pip install -qr backend/requirements/pip-tools.txt
	# Make sure to compile files after any other files they include!
	$(PIP_COMPILE) -o backend/requirements/pip-tools.txt backend/requirements/pip-tools.in
	$(PIP_COMPILE) -o backend/requirements/production.txt backend/requirements/production.in
	$(PIP_COMPILE) -o backend/requirements/test.txt backend/requirements/test.in
	$(PIP_COMPILE) -o backend/requirements/quality.txt backend/requirements/quality.in
	$(PIP_COMPILE) -o backend/requirements/development.txt backend/requirements/development.in

format: ## use black to reformat all files
	black backend && isort backend

flake8: ## black handles line-length already
	flake8 backend --max-line-length=120

pull: ## pull docker containers
	$(DOCKER_COMPOSE) pull
%.pull:
	$(DOCKER_COMPOSE) pull $*

build: ## build docker containers
	$(DOCKER_COMPOSE) build
%.build:
	$(DOCKER_COMPOSE) build $*

up: ## start services defined in docker-compose.yml
	$(DOCKER_COMPOSE) up -d
%.up:
	$(DOCKER_COMPOSE) -d $*

stop: ## stop services defined in docker-compose.yml
	$(DOCKER_COMPOSE) stop
%.stop:
	$(DOCKER_COMPOSE) stop $*

down: ## destroy all containers defined in docker-compose.yml
	$(DOCKER_COMPOSE) down

fresh:
	$(DOCKER_COMPOSE) down -v && $(DOCKER_COMPOSE) build && $(DOCKER_COMPOSE) up -d

logs: ## show logs from all containers defined in docker-compose.yml
	$(DOCKER_COMPOSE) logs -f
%.logs:
	$(DOCKER_COMPOSE) logs -f $*

restart:
	$(DOCKER_COMPOSE) restart
%.restart:
	$(DOCKER_COMPOSE) restart $*

backend-restart:
	$(DOCKER_COMPOSE) restart backend

%.bash:
	$(DOCKER_COMPOSE) exec $* bash

backend-shell:
	$(DOCKER_COMPOSE) exec backend bash -c 'python manage.py shell_plus'

backend-urls:
	$(DOCKER_COMPOSE) exec backend bash -c 'python manage.py show_urls'

frontend-client:
	sudo chown -R $(FRONTEND_USER_ID) frontend/lib
	$(DOCKER_COMPOSE) exec frontend bash -c 'npx @rtk-query/codegen-openapi openapi-config.json'
	sudo chown -R $(USER):$(USER) frontend/lib

frontend.lint:
	$(DOCKER_COMPOSE) exec frontend bash -c 'yarn lint'

frontend.format-check:
	$(DOCKER_COMPOSE) exec frontend bash -c 'yarn format-check'

frontend.fix:
	sudo chown -R $(FRONTEND_USER_ID) frontend/pages frontend/lib frontend/components
	$(DOCKER_COMPOSE) exec frontend bash -c 'yarn lint --fix && yarn format' || true
	sudo chown -R $(USER):$(USER) frontend/pages frontend/lib frontend/components

set_frontend_permissions:
	touch frontend/yarn-error.log
	mkdir -p frontend/.next
	mkdir -p frontend/node_modules
	sudo chown -R $(FRONTEND_USER_ID) frontend/.next frontend/node_modules frontend/package.json frontend/yarn.lock frontend/yarn-error.log

set_frontend_permissions_podman:
	touch frontend/yarn-error.log
	mkdir -p frontend/.next
	mkdir -p frontend/node_modules
	podman unshare chown -R $(FRONTEND_USER_ID) frontend/.next frontend/node_modules frontend/package.json frontend/yarn.lock frontend/yarn-error.log

set_frontend_permissions_back:
	sudo chown -R $(USER):$(USER) frontend/.next frontend/node_modules frontend/package.json frontend/yarn.lock frontend/yarn-error.log

set_backend_permissions:
	sudo chown -R $(BACKEND_USER_ID) backend

set_backend_permissions_podman:
	sudo chown -R $(BACKEND_USER_ID) backend

set_backend_permissions_back:
	sudo chown -R $(USER):$(USER) backend

schema:
	touch backend/schema.yml
	sudo chown 101:101 backend/schema.yml
	$(DOCKER_COMPOSE) run --rm backend python manage.py spectacular --file schema.yml --validate
	sudo chown $(USER):$(USER) backend/schema.yml
	mv backend/schema.yml frontend/backend_api_schema.yml

migrations:
	$(DOCKER_COMPOSE) run --rm backend python manage.py makemigrations

migrate:
	$(DOCKER_COMPOSE) run --rm backend python manage.py migrate

mypy:
	$(DOCKER_COMPOSE) run --rm backend mypy .

test:
	$(DOCKER_COMPOSE) run --rm backend pytest
