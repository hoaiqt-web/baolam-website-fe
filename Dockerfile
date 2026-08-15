FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NPM_CONFIG_CACHE=/tmp/.npm \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS production-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NPM_CONFIG_CACHE=/tmp/.npm \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund \
    && rm -rf /tmp/.npm /root/.npm \
    && npm cache clean --force

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ARG NEXT_DEPLOYMENT_ID
ARG RAILWAY_GIT_COMMIT_SHA

ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY \
    NEXT_DEPLOYMENT_ID=$NEXT_DEPLOYMENT_ID \
    RAILWAY_GIT_COMMIT_SHA=$RAILWAY_GIT_COMMIT_SHA

RUN npm run build \
    && rm -rf node_modules /tmp/.npm /root/.npm \
    && npm cache clean --force

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Keep migration/seed tooling available to Railway pre-deploy commands and Console.
COPY --from=production-deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package.json package-lock.json drizzle.config.ts tsconfig.json ./
COPY --chown=nextjs:nodejs drizzle ./drizzle
COPY --chown=nextjs:nodejs scripts ./scripts
COPY --chown=nextjs:nodejs src ./src

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
