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

up: ## start services defined in docker-compose.yml
	docker-compose up -d
up.%:
	docker-compose up -d $*

stop: ## stop services defined in docker-compose.yml
	docker-compose stop
stop.%:
	docker-compose stop $*

down: ## destroy all containers defined in docker-compose.yml
	docker-compose down

fresh:
	docker-compose down -v && docker-compose build && docker-compose up -d

logs: ## show logs from all containers defined in docker-compose.yml
	docker-compose logs -f
logs.%:
	docker-compose logs -f $*

web-restart:
	docker-compose restart web

web-bash:
	docker-compose exec web bash

web-shell:
	docker-compose exec web bash -c 'python manage.py shell_plus'

web-urls:
	docker-compose exec web bash -c 'python manage.py show_urls'

user_id: ## https://stackoverflow.com/a/40510068
	docker-compose exec web id

schema:
	docker-compose exec web bash -c 'python manage.py spectacular --file schema.yml --validate --fail-on-warn'

migrations:
	docker-compose exec web bash -c 'python manage.py makemigrations'

migrate:
	docker-compose exec web bash -c 'python manage.py migrate'
