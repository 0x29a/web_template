# Google OAuth 2.0 credentials

This document describes how to obtain credentials for Google OAuth 2.0 authorization,
and how to configure `django-allauth` / `dj-rest-auth` using them.

1. Open https://console.cloud.google.com and create a new project.
2. Open https://console.cloud.google.com/apis/credentials?project=<PROJECT_NAME>.
3. Click `CONFIGURE_CONSENT_SCREEN` there and configure the consent screen.
4. Open https://console.cloud.google.com/apis/credentials?project=<PROJECT_NAME>.
5. Click `CREATE CREDENTIALS` -> `OAuth client ID`.
6. Specify `Application type` to be `Web application`.
7. Add the frontend local URL to `Authorized JavaScript origins`, including the port.
8. Configure Google provider, as described here: https://django-allauth.readthedocs.io/en/latest/providers.html#google