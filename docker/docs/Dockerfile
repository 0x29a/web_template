FROM python:3.9-slim-bullseye

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Requirements are installed here to ensure they will be cached.
COPY ./requirements /requirements
# All imports needed for autodoc.
RUN pip install -r /requirements/docs.txt

COPY ./docker/docs/start /start-docs
RUN sed -i 's/\r$//g' /start-docs
RUN chmod +x /start-docs

WORKDIR /docs
