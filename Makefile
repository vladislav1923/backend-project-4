install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

lint:
	npm run lint

test:
	npm run test

test-coverage:
	npm run test:coverage
