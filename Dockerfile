# The one image Gitilizer deploys (contributor/DEPLOYMENT.md). Cloud Build builds it once per commit on main,
# tagged with the commit's SHA; development runs it first, and a release deploys the same image to production.
#
# It runs the API, the built web app, the scheduler and scanner, and the ranking worker. Settings decide which
# of those a service runs (SCHEDULER=off, WORKER=off) and which environment it is (GITILIZER_ENV).
#
#   docker build -t gitilizer .
#   docker run -p 8080:8080 -e DATABASE_URL=... -e ... gitilizer

# --- Build the web app ----------------------------------------------------------
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY app/shared/package.json app/shared/
COPY app/ranker/package.json app/ranker/
COPY app/server/package.json app/server/
COPY app/web/package.json app/web/
RUN npm ci --no-audit --no-fund
COPY app ./app
RUN npm run build -w app/web

# --- Runtime ----------------------------------------------------------------------
FROM node:22-slim
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080 \
    LOG_FORMAT=json \
    LOG_LEVEL=info
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY app/shared/package.json app/shared/
COPY app/ranker/package.json app/ranker/
COPY app/server/package.json app/server/
COPY app/web/package.json app/web/
# Runtime dependencies only. The TypeScript runs through tsx, as it does locally, so there is no compile step
# whose output could differ from what the tests ran.
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY app/shared ./app/shared
COPY app/ranker/src ./app/ranker/src
COPY app/ranker/tsconfig.json ./app/ranker/
COPY app/server/src ./app/server/src
COPY app/server/tsconfig.json ./app/server/
COPY prompts ./prompts
COPY --from=build /app/app/web/dist ./app/web/dist
# The commit the image was built from: Cloud Build passes it, and only the newest release running does
# background work (DESIGN.md, D-14). Empty for an image built elsewhere, which then always does its work.
# Last, so a new commit doesn't invalidate the cached layers above.
ARG GITILIZER_RELEASE=""
ENV GITILIZER_RELEASE=$GITILIZER_RELEASE
USER node
EXPOSE 8080
# One process, so Cloud Run's SIGTERM reaches the server directly (it closes event streams and stops cleanly).
CMD ["node", "--import", "tsx", "app/server/src/main.ts"]
