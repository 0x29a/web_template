# Frontend notes

## How it has been initialized

### create-next-app

1. `rm -rf frontend`
2. `mkdir frontend`
3. `docker run --rm --mount type=bind,source="$(pwd)"/frontend,target=/frontend -it node:21 /bin/bash`
4. `npx create-next-app@latest --ts` (`web_template`)
5. `cp -R web_template/* /frontend/`
6. `exit`

### Preparation

1. Copy `Dockerfile` back.
2. Add `.gitignore`.
3. Add the following to `.dockerignore`:

        node_modules/
        build
        .next/
        yarn-error.log

4. Run `make build`
5. `docker compose run frontend sh`

### Linting and formatting

1. `yarn lint` -> `Strict`
2. `yarn add --dev eslint-config-prettier prettier`
3. Run this:

        cat > .eslintrc.json <<EOF
        {
          "extends": [
            "prettier"
          ]
        }
        EOF

4. `exit`
5. Added the following to `package.json`:

        "format": "prettier --write app/ components/ lib/",
        "format-check": "prettier --check app/ components/ lib/"


### shadcn/ui

1. `docker compose exec frontend /bin/sh`
2. `npx shadcn-ui@latest init` (specify `tailwind.config.ts`)

### API client

1. Add `.prettierignore` and `.eslintignore`, add `lib/client` to both.
2. `make schema`
3. `make frontend.client`

### NextAuth.js

1. `docker compose exec frontend /bin/sh`
2. `yarn add next-auth`
3. Create `app/api/auth/[...nextauth]/route.ts` directory.
4. 
