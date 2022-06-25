# Frontend notes

## How it has been created

1. `sudo chown 101:101 frontend`
2. `docker-compose run frontend bash`
3. `npx create-next-app@latest --ts` (`web_template`)
4. `cp -r web_template/* .`
5. `rm -r web_template/`
6. `yarn lint` -> `Strict`
7. `yarn add --dev eslint-config-prettier prettier`
8. Added `prettier` to `.eslintrc.json`
9. Added the following to `package.json`:

        "format": "prettier --write pages/ components/ lib/",
        "format-check": "prettier --check pages/ components/ lib/"
