# WebTemplate

[![GitLab CI pipeline status.][pipeline-image]][pipeline-url]

Template for quick web services prototyping. It's aimed on as fast as possible
bootstrapping of production-ready web services, with Django-based backend, and React SPA frontend.
In order to reduce boilerplate, it utilizes technologies such as:
- [drf-spectacular](https://github.com/tfranzel/drf-spectacular) to generate OpenAPI 3 schema.
- [redux-toolkit](https://github.com/reduxjs/redux-toolkit) and [@rtk-query/codegen-openapi](https://redux-toolkit.js.org/rtk-query/usage/code-generation#openapi) in particular to generate RTK Query-based API client.
- TBA: some React UI library.

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
