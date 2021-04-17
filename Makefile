# Define PIP_COMPILE_OPTS=-v to get more information during make upgrade.
PIP_COMPILE = pip-compile --rebuild --upgrade $(PIP_COMPILE_OPTS)

upgrade: export CUSTOM_COMPILE_COMMAND=make upgrade
upgrade: ## update the requirements/*.txt files with the latest packages satisfying requirements/*.in
	pip install -qr requirements/pip-tools.txt
	# Make sure to compile files after any other files they include!
	$(PIP_COMPILE) -o requirements/pip-tools.txt requirements/pip-tools.in
	$(PIP_COMPILE) -o requirements/base.txt requirements/base.in
	$(PIP_COMPILE) -o requirements/test.txt requirements/test.in
	$(PIP_COMPILE) -o requirements/quality.txt requirements/quality.in
	$(PIP_COMPILE) -o requirements/dev.txt requirements/dev.in

build: ## build docker containers
	docker-compose -f local.yml build

up: ## start all services defined in docker-compose.yml
	docker-compose -f local.yml up -d

down: ## destroy all containers defined in docker-compose.yml
	docker-compose -f local.yml down

logs: ## show logs from all containers defined in docker-compose.yml
	docker-compose -f local.yml logs -f

format: ## use black to reformat all files
	black ./application -l 120
