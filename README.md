# WebTemplate https://gitlab.com/0x29a/web_template/badges/master/pipeline.svg

> My template for quick web services prototyping.

[![Pipeline Status][pipeline-image]][pipeline-url]

## Getting started

1. Create `.env`:
    ```bash
    cp .env.local .env
    ```
1. Create `docker-compose.override.yml`:
    ```bash
    cp docker-compose.override.yml.local docker-compose.override.yml
    ```
1. Start all services:
    ```bash
    make up
    ```
1. Open `http://localhost:8124/` in a browser.


<!-- Badges -->

[pipeline-image]: https://gitlab.com/0x29a/web_template/badges/master/pipeline.svg
[pipeline-url]: https://gitlab.com/0x29a/web_template/-/pipelines
