# syntax=docker/dockerfile:1

FROM node:24-trixie AS versionednode
FROM mcr.microsoft.com/devcontainers/typescript-node:24-trixie AS versioneddevcontainer
FROM nginxinc/nginx-unprivileged:1-trixie AS versionednginx

FROM versionednode AS base
WORKDIR /workspaces
ENV APP_ENV=production
ENV APP_VERSION=dev
ENV NODE_ENV=production
RUN <<EOF
  set -euo pipefail
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -y
  apt-get upgrade -y --no-install-recommends
  apt-get install -y --no-install-recommends ca-certificates curl wget build-essential git zip unzip icoutils
  apt-get autoremove -y
  apt-get autoclean -y
  apt-get clean -y
  rm -rf /var/lib/apt/lists/*
EOF
RUN chown node:node /workspaces
USER node

FROM base AS development_deps
COPY --chown=node:node ./.npmrc ./package* ./
RUN npm ci --ignore-scripts --install-links --include=prod --include=dev --include=peer --include=optional

FROM development_deps AS build
ARG APP_ENV=production
ARG APP_VERSION=dev
ARG NODE_ENV=production
COPY --chown=node:node ./ ./
RUN make build \
  APP_ENV="${APP_ENV}" \
  APP_VERSION="${APP_VERSION}" \
  NODE_ENV="${NODE_ENV}"

FROM versionednginx AS nginx
ARG APP_ENV=production
WORKDIR /var/www/html
COPY ./ops/nginx /etc/nginx
RUN <<EOF
	set -euo pipefail
	openssl req -x509 -newkey rsa:4096 -nodes -sha256 -keyout /etc/nginx/snakeoil.key -out /etc/nginx/snakeoil.pem -days 3650 -subj "/CN=localhost" -addext "subjectAltName=DNS:*.localhost,DNS:localhost"
EOF
COPY --from=build /workspaces/dist/${APP_ENV}/ ./

FROM versioneddevcontainer AS devcontainer
WORKDIR /workspaces
ENV APP_ENV=local
ENV APP_VERSION=dev
ENV NODE_ENV=development
ADD --chmod=755 https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 /usr/local/bin/yq
RUN <<EOF
  set -euo pipefail
  apt-get update -y
  apt-get upgrade -y --no-install-recommends
  apt-get install -y --no-install-recommends ca-certificates curl wget build-essential git zip unzip icoutils
  apt-get autoremove -y
  apt-get autoclean -y
  apt-get clean -y
  rm -rf /var/lib/apt/lists/*
EOF
USER node
RUN <<EOF
  set -euo pipefail
  npm exec --ignore-scripts -- playwright install --with-deps chromium firefox webkit chrome msedge
EOF
