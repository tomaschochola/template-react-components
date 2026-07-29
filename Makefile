# Default shell
SHELL := /bin/bash

# Default goal
.DEFAULT_GOAL := never

# Options
export DEBIAN_FRONTEND := noninteractive

# Goals
.PHONY: commit
commit: distclean update fix check

.PHONY: fix
fix: eslint_fix prettier_fix stylelint_fix yq_fix

.PHONY: check
check: lint stan test audit

.PHONY: lint
lint: eslint_check prettier_check stylelint_check

.PHONY: stan
stan: typescript_check

.PHONY: test
test: playwright_test

.PHONY: audit
audit: npm_audit

.PHONY: install
install: npm_install

.PHONY: update
update: npm_update

.PHONY: clean
clean:
	rm -rf ./node_modules
	rm -rf ./dist
	rm -rf ./public/*icon*

.PHONY: distclean
distclean: clean
	git clean -Xfd

.PHONY: eslint_fix
eslint_fix: ./node_modules ./eslint.config.js
	npm exec --ignore-scripts -- eslint --concurrency=auto --fix .

.PHONY: prettier_fix
prettier_fix: ./node_modules ./prettier.config.js
	npm exec --ignore-scripts -- prettier -w .

.PHONY: stylelint_fix
stylelint_fix: ./node_modules ./stylelint.config.js
	npm exec --ignore-scripts -- stylelint --fix ./**/*.{sass,scss,css}

.PHONY: yq_fix
yq_fix:
	find . -type f -name "*.yml" -exec yq -i 'sort_keys(..)' {} \;

.PHONY: eslint_check
eslint_check: ./node_modules ./eslint.config.js
	npm exec --ignore-scripts -- eslint --concurrency=auto .

.PHONY: prettier_check
prettier_check: ./node_modules ./prettier.config.js
	npm exec --ignore-scripts -- prettier -c .

.PHONY: stylelint_check
stylelint_check: ./node_modules ./stylelint.config.js
	npm exec --ignore-scripts -- stylelint ./**/*.{sass,scss,css}

.PHONY: typescript_check
typescript_check: ./node_modules ./tsconfig.json ./tsconfig.playwright.json
	npm exec --ignore-scripts -- tsc --noEmit --project ./tsconfig.json
	npm exec --ignore-scripts -- tsc --noEmit --project ./tsconfig.playwright.json

.PHONY: playwright_test
playwright_test: ./node_modules ./playwright.config.js icons
	npm exec --ignore-scripts -- playwright test

.PHONY: playwright_install
playwright_install: ./node_modules ./playwright.config.js
	npm exec --ignore-scripts -- playwright install --with-deps chromium firefox webkit chrome msedge

.PHONY: npm_audit
npm_audit: ./node_modules ./package.json ./package-lock.json
	npm audit --ignore-scripts --audit-level=critical --install-links --include=prod --include=dev --include=peer --include=optional

.PHONY: npm_install
npm_install: ./package.json ./package-lock.json
	npm install --ignore-scripts --install-links --include=prod --include=dev --include=peer --include=optional

.PHONY: npm_update
npm_update: ./package.json
	rm -rf ./node_modules
	rm -rf ./package-lock.json
	npm update --ignore-scripts --install-links --include=prod --include=dev --include=peer --include=optional

.PHONY: postcreate
postcreate: install icons

.PHONY: start serve server dev
start serve server dev: ./node_modules ./package.json ./package-lock.json icons
	npm exec --ignore-scripts -- webpack-cli serve --mode=${NODE_ENV} --config-node-env=${NODE_ENV} --env APP_ENV=${APP_ENV}

.PHONY: image
image:
	docker compose -f ./docker-compose.yml -f ./docker-compose-swarm.yml build --pull --push

.PHONY: deploy
deploy:
	docker stack deploy -c ./docker-compose.yml -c ./docker-compose-swarm.yml --with-registry-auth --prune --detach=false --resolve-image=always ${CI_PROJECT_PATH_SLUG:-template-express-api}

.PHONY: up
up:
	docker compose -f ./docker-compose.yml -f ./docker-compose-swarm.yml up --build --remove-orphans --always-recreate-deps --force-recreate --pull=always --renew-anon-volumes

.PHONY: down
down:
	docker compose -f ./docker-compose.yml -f ./docker-compose-swarm.yml down --remove-orphans

.PHONY: password
password:
	@tr -dc 'a-zA-Z0-9' < /dev/urandom | head -c 32

.PHONY: secret
secret:
	@tr -dc 'a-zA-Z0-9' < /dev/urandom | head -c 64

.PHONY: devcontainer
devcontainer:
	devcontainer up
	devcontainer exec /bin/bash || true
	docker compose -f ./docker-compose.yml -f ./docker-compose-devcontainer.yml down --remove-orphans

.PHONY: build
build: icons
	npm exec --ignore-scripts -- webpack-cli build --mode=${NODE_ENV} --config-node-env=${NODE_ENV} --env APP_ENV=${APP_ENV}

.PHONY: icons
icons: ./node_modules ./assets/icons/icon.svg
	npm exec --ignore-scripts -- generate-icons ./assets/icons/icon.svg ./public fullbleed white

.PHONY: playwright_failed
playwright_failed: ./node_modules ./playwright.config.js icons
	npm exec --ignore-scripts -- playwright test --last-failed

.PHONY: playwright_headed
playwright_headed: ./node_modules ./playwright.config.js icons
	npm exec --ignore-scripts -- playwright test --headed

.PHONY: playwright_ui
playwright_ui: ./node_modules ./playwright.config.js icons
	npm exec --ignore-scripts -- playwright test --ui

# Dependencies
./package-lock.json ./node_modules: ./package.json
	${MAKE} npm_update
