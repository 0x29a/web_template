# Define PIP_COMPILE_OPTS=-v to get more information during make upgrade.
PIP_COMPILE = pip-compile --rebuild --upgrade $(PIP_COMPILE_OPTS)

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
	black ./application -l 120

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

web-restart:
	docker-compose restart web

%.bash:
	docker-compose exec $* bash

web-shell:
	docker-compose exec web bash -c 'python manage.py shell_plus'

web-urls:
	docker-compose exec web bash -c 'python manage.py show_urls'

# In case web service is unable to write to the shared volume,
# use this command to fetch uid and gid, then change ownership of the shared
# directory on host.
# Also see: https://stackoverflow.com/a/40510068
web_user_id:
	docker-compose exec web id

# In case frontend service is unable to write to the shared volume,
# use this command to fetch uid and gid, then change ownership of the node_modules:
# sudo chown -R 101:101 frontend/node_modules
# Also see: https://stackoverflow.com/a/29251160
front_user_id:
	docker-compose exec frontend id

set_frontend_permissions:
	touch frontend/yarn-error.log
	mkdir -p frontend/node_modules
	sudo chown -R 101:101 frontend/node_modules frontend/package.json frontend/yarn.lock frontend/yarn-error.log

set_frontend_permissions_back:
	sudo chown -R $(USER):$(USER) frontend/node_modules frontend/package.json frontend/yarn.lock frontend/yarn-error.log

schema:
	sudo chown 101:101 application/schema.yml
	docker-compose exec web bash -c 'python manage.py spectacular --file schema.yml --validate --fail-on-warn'
	sudo chown $(USER):$(USER) application/schema.yml

frontend-client:
	docker run --rm \
		-v $(shell pwd)/application/schema.yml:/application/schema.yml \
		-v $(shell pwd)/frontend/src/packages/client/:/frontend/src/packages/client/ \
		openapitools/openapi-generator-cli generate \
		-i /application/schema.yml \
		--config /frontend/src/packages/client/openapi-generator-config.json \
		-g typescript-axios \
		-o /frontend/src/packages/client

migrations:
	docker-compose exec web bash -c 'python manage.py makemigrations'

migrate:
	docker-compose exec web bash -c 'python manage.py migrate'
