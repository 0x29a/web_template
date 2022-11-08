# WebTemplate

[![GitLab CI pipeline status.][pipeline-image]][pipeline-url]

Template for a quick web services prototyping. It's intended to speed up bootstrapping
of production-ready applications, with Django-based backend, and Next.js-based frontend.
In attempt to reduce boilerplate to the absolute possible minimum, it utilizes technologies such as:

- [drf-spectacular](https://github.com/tfranzel/drf-spectacular) to generate OpenAPI 3 schema.
- [redux-toolkit](https://github.com/reduxjs/redux-toolkit) and [@rtk-query/codegen-openapi](https://redux-toolkit.js.org/rtk-query/usage/code-generation#openapi) to generate API client based on RTK Query.
- [pip-tools](https://github.com/jazzband/pip-tools) to manage dependencies.
- [Next.js](https://nextjs.org/) for its file-based routing, nice static pages handling and dozens of other optimizations.
- [Tailwind UI](https://tailwindui.com), as utility classes play really nice with reusable React components.
- [GitLab CI](https://docs.gitlab.com/ee/ci/), which, in addition to quality checking, is used to build and host OCI images.

By default, the template can be deployed to a DigitalOcean droplet, but since the images are pre-built continuously, it's easy to switch to fly.io, AWS ECS or Kubernetes.

In addition to all the cool tooling, I try to document all technological / architectural decisions in `docs/`, so it's easier
to continue working on this project after large breaks.

## Getting started

1. Create `.env`:

    ```bash
    cp .env.local .env
    ```

1. Create `docker-compose.override.yml`:

    ```bash
    make up
    ```

1. Open `http://localhost:8124/` in a browser.

<!-- Badges -->

[pipeline-image]: https://gitlab.com/0x29a/web_template/badges/master/pipeline.svg
[pipeline-url]: https://gitlab.com/0x29a/web_template/-/pipelines
