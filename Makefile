# Define PIP_COMPILE_OPTS=-v to get more information during make upgrade.
PIP_COMPILE = pip-compile --rebuild --upgrade $(PIP_COMPILE_OPTS)
DJANGO_USER_ID = $(shell docker-compose run --rm django id -u)
FRONTEND_USER_ID = $(shell docker-compose run --rm frontend id -u)

upgrade: export CUSTOM_COMPILE_COMMAND=make upgrade
upgrade: ## update the requirements/*.txt files with the latest packages satisfying requirements/*.in
	pip install -qr requirements/pip-tools.txt
	# Make sure to compile files after any other files they include!
	$(PIP_COMPILE) -o requirements/pip-tools.txt requirements/pip-tools.in
	$(PIP_COMPILE) -o requirements/production.txt requirements/production.in
	$(PIP_COMPILE) -o requirements/test.txt requirements/test.in
	$(PIP_COMPILE) -o requirements/quality.txt requirements/quality.in
	$(PIP_COMPILE) -o requirements/development.txt requirements/development.in
	$(PIP_COMPILE) -o requirements/docs.txt requirements/docs.in

format: ## use black to reformat all files
	black application && isort application

flake8: ## black handles line-length already
	flake8 application --max-line-length=120

build: ## build docker containers
	docker-compose build
%.build:
	docker-compose build $*

up: ## start services defined in docker-compose.yml
	docker-compose up -d
%.up:
	docker-compose up -d $*

stop: ## stop services defined in docker-compose.yml
	docker-compose stop
%.stop:
	docker-compose stop $*

down: ## destroy all containers defined in docker-compose.yml
	docker-compose down

fresh:
	docker-compose down -v && docker-compose build && docker-compose up -d

logs: ## show logs from all containers defined in docker-compose.yml
	docker-compose logs -f
%.logs:
	docker-compose logs -f $*

restart:
	docker-compose restart
%.restart:
	docker-compose restart $*

django-restart:
	docker-compose restart django

%.bash:
	docker-compose exec $* bash

django-shell:
	docker-compose exec django bash -c 'python manage.py shell_plus'

django-urls:
	docker-compose exec django bash -c 'python manage.py show_urls'

frontend-client:
	sudo chown -R $(FRONTEND_USER_ID) frontend/lib
	docker-compose exec frontend bash -c 'npx @rtk-query/codegen-openapi openapi-config.json'
	sudo chown -R $(USER):$(USER) frontend/lib

frontend.lint:
	docker-compose exec frontend bash -c 'yarn lint'

frontend.format-check:
	docker-compose exec frontend bash -c 'yarn format-check'

frontend.fix:
	sudo chown -R $(FRONTEND_USER_ID) frontend/pages frontend/lib frontend/components
	docker-compose exec frontend bash -c 'yarn lint --fix && yarn format' || true
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

set_django_permissions:
	sudo chown -R $(DJANGO_USER_ID) application

set_django_permissions_podman:
	sudo chown -R $(DJANGO_USER_ID) application

set_django_permissions_back:
	sudo chown -R $(USER):$(USER) application

schema:
	touch application/schema.yml
	sudo chown 101:101 application/schema.yml
	docker-compose run --rm django python manage.py spectacular --file schema.yml --validate
	sudo chown $(USER):$(USER) application/schema.yml
	mv application/schema.yml frontend/backend_api_schema.yml

migrations:
	docker-compose run --rm django python manage.py makemigrations

migrate:
	docker-compose run --rm django python manage.py migrate

mypy:
	docker-compose run --rm django mypy .

test:
	docker-compose run --rm django pytest

ci-build-images:
	docker build \
		--build-arg BUILDKIT_INLINE_CACHE=1 \
		--cache-from "${CI_REGISTRY_IMAGE}/intermediary:latest" \
		--cache-from "${CI_REGISTRY_IMAGE}$(IMAGE):$(TAG)" \
		--cache-from "${CI_REGISTRY_IMAGE}$(IMAGE):latest" \
		-t "${CI_REGISTRY_IMAGE}$(IMAGE):$(TAG)" \
		-t "${CI_REGISTRY_IMAGE}$(IMAGE):latest" \
		-f ./compose/production/django/Dockerfile .