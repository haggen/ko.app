all: ko.app.js
	@curl -s -d output_info=compiled_code --data-urlencode "js_code@ko.app.js" http://closure-compiler.appspot.com/compile > ko.app.min.js
