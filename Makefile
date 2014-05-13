BIN=./node_modules/.bin

run: ./*.js
	$(BIN)/jshint ./*.js
	@node ./server.js
