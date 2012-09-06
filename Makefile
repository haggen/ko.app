all: ko.app.js
	@head -n 6 ko.app.js > ko.app.min.js
	@curl -s -d output_info=compiled_code --data-urlencode "js_code@ko.app.js" http://closure-compiler.appspot.com/compile >> ko.app.min.js
