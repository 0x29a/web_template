# See https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:18-alpine AS development
WORKDIR /frontend
ENV NODE_ENV=development
CMD [ "yarn", "dev" ]

FROM node:18-alpine AS base
ENV NEXT_TELEMETRY_DISABLED 1

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /frontend

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM base AS production
WORKDIR /frontend

ENV NODE_ENV production

RUN addgroup --system frontend \
    && adduser --system --ingroup frontend frontend

COPY --from=builder /frontend/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown frontend:frontend .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=frontend:frontend /frontend/.next/standalone ./
COPY --from=builder --chown=frontend:frontend /frontend/.next/static ./.next/static

USER frontend

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
