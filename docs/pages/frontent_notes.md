# Linting

`eslint` has been installed by running `yarn add -D eslint` withing the
`frontend` container, and then has been configured with `npx eslint --init`.

Then, `prettier` has been installed:

        `yarn add -D prettier eslint-config-prettier`

`.eslintrc` needed to be tweaked to match `.prettierrc`,
as `prettier`conflicts with `eslint`, and can't disable rules from `rules`
section in the `.eslintrc`.

API-client has been exluded in `.prettierignore`, as it's auto-generated and
shoudln't be formatted.

Additonally, some entries has been added to the `scripts` section of `package.json`
for convenience.

Finally, `eslint-plugin-react` has been configured to detect `React` version.
