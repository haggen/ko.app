# Knockout Application

Knockout Application aims to be the glue linking all the features of a modern web application, like routing URLs, session management, template rendering, and off course, data bindings.

It should avail existing libraries as much as possible and provide an easy and familiar API to its users.

It's currently in very early stages of development, but already works, and should become a great tool to build killer apps.

## Dependencies:

- [Knockout 2.1](https://github.com/stevesanderson/knockout)
- [WayJS 0.3](https://github.com/haggen/wayjs)
- [jQuery 1.8](https://github.com/jquery/jquery)
- [Cookies 0.2](https://github.com/scotthamper/cookies)

## Usage:

In your HTML:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>ko.app example</title>
</head>
<body>

<div data-bind="app"></div>

<script src="knockout.js"></script>
<script src="jquery.js"></script>
<script src="way.js"></script>

<script src="../ko.app.js"></script>

<script>
  ko.app(function() {
    this.map('#/hello/:name', function(context) {
      context.name = ko.observable(this.params.name);
      this.render('hello');
    });

    this.root = '#/hello/world';

    this.run();
  });
</script>

</body>
</html>
```

In your template `/templates/hello.html`:

```html
<p>Hello, <span data-bind="text: name"></span></p>
```

Now open `index.html` in your browser. Try changing `world` to your name, it works!

You can see a working version of this example in the `example/` directory.

Also I've included another example to demo the usage of [requirejs](http://requirejs.org/).

## API:

Note that inside your application's constructor you can access `app` by `this`.

### `map(pattern, action[, action[, ...]])`

Register new route. Actions may return `true` to keep chaining the next action. Also within the action `this` refers to the application.

### `session(name[, value])`

Retrieve session variable when value is omitted, or update it with given value. Also `value` may be `null` to delete session variable.

### `redirect(path)`

Redirect user to given location, aware of hash or external redirections.

### `render(template)`

Render given template and bind current context to it. Template files must be in `templates/` directory and must use `.html` extension.

### `dispatch([force])`

Match and dispatch an action based on current location.

### `listen()`

Listen to hash changes with fallback to polling.

### `run()`

Setup and initialize your application.

## Roadmap:

- <del>Session management</del>
- Custom settings (like template directory)
