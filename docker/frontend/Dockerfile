FROM node:16.13.1-bullseye-slim

ARG APP_HOME=/frontend

WORKDIR ${APP_HOME}

RUN addgroup --system frontend \
    && adduser --system --ingroup frontend frontend

# copy application code to WORKDIR
COPY --chown=frontend:frontend ./${APP_HOME} ${APP_HOME}

# make django owner of the WORKDIR directory as well.
RUN chown -R frontend:frontend ${APP_HOME}

USER frontend

RUN yarn install

RUN yarn add file:/frontend/packages/client
