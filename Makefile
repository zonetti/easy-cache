test: hint
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec \
		--bail \
		test.js

hint:
	@./node_modules/.bin/jshint index.js

.PHONY: test