# API client upgrade

1. Re-generate OpenAPI schema:

        make schema

2. Re-generate TypeScript API client based on `backend_api_schema.yml` file:

        make frontend-client

3. Add wiped custom patches to `backendApi.ts`.
4. Format `backendApi.ts`.
5. Rebuild `frontend` image:

        make build

6. Restart `frontend` container:

        make frontend.restart
