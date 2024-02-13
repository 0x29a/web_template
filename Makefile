include .env

# Define PIP_COMPILE_OPTS=-v to get more information during make upgrade.
PIP_COMPILE = pip-compile --rebuild --upgrade $(PIP_COMPILE_OPTS)

# TODO: modify when docker-compose.override.yml file is got rid of in favor
# of multiple config files.
DOCKER_COMPOSE = docker compose
ifeq ($(DOCKER_BUILD_ENVIRONMENT),production)
    DOCKER_COMPOSE = docker compose
endif

upgrade: export CUSTOM_COMPILE_COMMAND=make upgrade
upgrade: ## update the backend/requirements/*.txt files with the latest packages satisfying backend/requirements/*.in
	# Make sure to compile files after any other files they include!
	$(DOCKER_COMPOSE) run --rm backend bash -c 'pip install -qr requirements/pip-tools.txt && \
	$(PIP_COMPILE) -o requirements/pip-tools.txt requirements/pip-tools.in && \
	$(PIP_COMPILE) -o requirements/production.txt requirements/production.in && \
	$(PIP_COMPILE) -o requirements/test.txt requirements/test.in && \
	$(PIP_COMPILE) -o requirements/quality.txt requirements/quality.in && \
	$(PIP_COMPILE) -o requirements/development.txt requirements/development.in' || true

format: ## use black to reformat all files
	$(DOCKER_COMPOSE) run --rm backend bash -c 'black . && isort .' || true

flake8: ## black handles line-length already
	$(DOCKER_COMPOSE) run --rm backend flake8 . --max-line-length=120 --exclude=*/migrations/* || true

pull: ## pull docker containers
	$(DOCKER_COMPOSE) pull
%.pull:
	$(DOCKER_COMPOSE) pull $*

build: ## build docker containers
	$(DOCKER_COMPOSE) build --build-arg APP_USER_ID=$(shell id -u) --build-arg APP_USER_GID=$(shell id -g)
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

backend.restart:
	$(DOCKER_COMPOSE) restart backend

%.shell:
	$(DOCKER_COMPOSE) exec $* bash

frontend.shell:
	$(DOCKER_COMPOSE) exec frontend sh

backend.shell_plus:
	$(DOCKER_COMPOSE) exec backend bash -c 'python manage.py shell_plus'

backend.debugsqlshell:
	$(DOCKER_COMPOSE) exec backend bash -c 'python manage.py debugsqlshell'

backend.urls:
	$(DOCKER_COMPOSE) exec backend bash -c 'python manage.py show_urls'

frontend.client:
	docker run --rm -v "$(shell pwd)/frontend:/local" openapitools/openapi-generator-cli generate -i /local/backend_api_schema.yml -g typescript-fetch -o /local/lib/client
	sudo chown -R $(USER):$(USER) frontend/lib/client

frontend.lint:
	$(DOCKER_COMPOSE) run --rm frontend yarn lint

frontend.format-check:
	$(DOCKER_COMPOSE) run --rm frontend yarn format-check

frontend.fix:
	$(DOCKER_COMPOSE) run --rm frontend sh -c 'yarn lint --fix && yarn format' || true

schema:
	touch backend/schema.yml
	$(DOCKER_COMPOSE) run --rm backend python manage.py spectacular --file schema.yml --validate
	mv backend/schema.yml frontend/backend_api_schema.yml

migrations:
	$(DOCKER_COMPOSE) run --rm backend python manage.py makemigrations

migrate:
	$(DOCKER_COMPOSE) run --rm backend python manage.py migrate

mypy:
	$(DOCKER_COMPOSE) run --rm backend mypy .

test:
	$(DOCKER_COMPOSE) run --rm backend pytest

cleanup:
	rm -rf private_key ansible/variables.yml ansible/hosts ansible/.cache .fenv
