# Based on https://github.com/pydanny/cookiecutter-django/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/compose/production/django/Dockerfile

ARG PYTHON_VERSION=3.10-slim-buster

# define an alias for the specfic python version used in this file.
FROM python:${PYTHON_VERSION} as python

# Python build stage
FROM python as python-build-stage

ARG BUILD_ENVIRONMENT=production

# Install apt packages
RUN apt-get update && apt-get install --no-install-recommends -y \
  # dependencies for building Python packages
  build-essential \
  # psycopg2 dependencies
  libpq-dev

# Requirements are installed here to ensure they will be cached.
COPY ./requirements .

# Create Python Dependency and Sub-Dependency Wheels.
RUN pip wheel --wheel-dir /usr/src/app/wheels  \
  -r ${BUILD_ENVIRONMENT}.txt


# Python 'run' stage
FROM python as python-run-stage

ARG BUILD_ENVIRONMENT=production

ARG APP_HOME=/backend
ARG APP_USER_ID=1000
ARG APP_USER_GID=1000

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV BUILD_ENV ${BUILD_ENVIRONMENT}

# This is needed to match host and container id and gid.
RUN if [ "$APP_USER_ID" = 0 ]; then echo "backend user may not be root" && false; fi
RUN groupadd -g ${APP_USER_GID} backend
RUN useradd --home-dir ${APP_HOME} --create-home --shell /bin/bash --uid ${APP_USER_ID} --gid ${APP_USER_GID} backend

WORKDIR ${APP_HOME}

# Install required system dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
  # psycopg2 dependencies
  libpq-dev \
  # Translations dependencies
  gettext \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

# All absolute dir copies ignore workdir instruction. All relative dir copies are wrt to the workdir instruction
# copy python dependency wheels from python-build-stage
COPY --from=python-build-stage /usr/src/app/wheels  /wheels/

# use wheels to install python dependencies
RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
  && rm -rf /wheels/

COPY --chown=backend:backend entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY --chown=backend:backend start_${BUILD_ENV} /start_django
RUN sed -i 's/\r$//g' /start_django
RUN chmod +x /start_django

COPY --chown=backend:backend start_celeryworker /start_celeryworker
RUN sed -i 's/\r$//g' /start_celeryworker
RUN chmod +x /start_celeryworker

COPY --chown=backend:backend start_celerybeat /start_celerybeat
RUN sed -i 's/\r$//g' /start_celerybeat
RUN chmod +x /start_celerybeat

COPY --chown=backend:backend start_flower /start_flower
RUN sed -i 's/\r$//g' /start_flower
RUN chmod +x /start_flower

# copy the application code to WORKDIR
COPY --chown=backend:backend . ${APP_HOME}

USER backend

ENTRYPOINT ["/entrypoint"]
