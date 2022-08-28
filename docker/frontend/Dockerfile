FROM node:18-bullseye-slim

ARG APP_HOME=/frontend
ARG BUILD_ENVIRONMENT=production

ENV BUILD_ENV ${BUILD_ENVIRONMENT}

WORKDIR ${APP_HOME}

RUN addgroup --system frontend \
    && adduser --system --ingroup frontend frontend

# copy application code to WORKDIR
COPY --chown=frontend:frontend ./${APP_HOME} ${APP_HOME}

COPY --chown=frontend:frontend ./docker/frontend/start_${BUILD_ENV} /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

# make frontend owner of the WORKDIR directory as well.
RUN chown -R frontend:frontend ${APP_HOME}

USER frontend

# install dependencies for the production at build time
RUN if [ "$BUILD_ENV" = "production" ]; then yarn; fi
