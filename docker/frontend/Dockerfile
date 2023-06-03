FROM node:18-bullseye-slim

ARG APP_HOME=/frontend
ARG BUILD_ENVIRONMENT=production

ENV NODE_ENV ${BUILD_ENVIRONMENT}

WORKDIR ${APP_HOME}

RUN addgroup --system frontend \
    && adduser --system --ingroup frontend frontend

# copy the application code to WORKDIR
COPY --chown=frontend:frontend ./${APP_HOME} ${APP_HOME}

COPY --chown=frontend:frontend ./docker/frontend/start_${NODE_ENV} /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

# make frontend owner of the WORKDIR directory as well.
RUN chown -R frontend:frontend ${APP_HOME}

USER frontend

# install dependencies for the production at build time
RUN if [ "$NODE_ENV" = "production" ]; then yarn install; fi

RUN if [ "$NODE_ENV" = "production" ]; then yarn build; fi
