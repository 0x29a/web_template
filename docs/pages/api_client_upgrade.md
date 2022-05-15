# API client upgrade

Currently, due to some bug in React, we import API client using the relative import.
Ideally, we want to import it like `import LoginApi from 'api-client'`.

1. Re-generate OpenAPI schema:

		make schema

2. Pull [the new version](https://hub.docker.com/r/openapitools/openapi-generator-cli/tags) of `openapitools/openapi-generator-cli` container.
3. Re-generate TypeScript API client based on `schema.yml` file:

		make frontend-client

4. Rebuild `frontend` image:

		make build

5. Restart `frontend` container:

		make frontend.restart
