# API client upgrade

1. Run `make schema` to re-generate OpenAPI schema.
2. Pull the latest `openapitools/openapi-generator-cli` container: `docker pull openapitools/openapi-generator-cli`. 
3. Run `frontend-client` to re-generate TypeScript API client based on `schema.yml` file.
4. Restart `frontend` container: `make frontend.stop && make frontend.up`.