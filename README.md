# Knockout Application

Knockout Application aims to be the link between every feature of a modern web application, like routing hash locations, session management, template rendering, data bindings and much more stuff.

It should use existing libraries as much as possible and should provide an easy and familiar API to its users.

It's currently in very early stages of development, but already works, and should become a great tool to build killer apps.

## Requirements:

- Knockout 2.1 - https://github.com/stevesanderson/knockout
- Path.js - https://github.com/mtrpcic/pathjs/
- jQuery 1.7 - https://github.com/jquery/jquery

## Usage:

In your HTML:

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
    <script src="path.js"></script>

    <script src="ko.app.js"></script>

    <script>
      var app;

      app = ko.app(function() {
        this.map('#/hello/:name', function(context) {
          context.name = ko.observable(this.params.name);
          this.render('hello');
        });

        this.root('#/hello/world');

        this.run();
      });
    </script>

    </body>
    </html>

In your template `/templates/hello.html`:

    <p>Hello, <span data-bind="text: name"></span></p>

Now open `index.html` in your browser. Try changing `world` to your name, it works!

You can check this out in the `example/` directory.

## API:

Note that `app` here will mean `this` inside your application's constructor. See the example above.

### `app.before(pattern, filter)`:

Register a filter that will be executed before routes that match the `pattern`. The `filter` is a function that may return `false` to prevent the current route from being processed, define new observables in the `context` or redirect the user to another location.

The `pattern` may be a string or a regular expression. The `filter` receives one argument: the `context`.

### `app.map(route, action)`:

Register a new `action` that will be executed when `route` matches the current location.

The `route` must be a string starting with `#/`. The `action` receives the `context` as first and only argument.

### `app.render(template)`:

Define which template will be loaded and rendered. Currently, all templates must be in a `templates/` directory and use `.html` extension, but soon it will be customizable.

The templates are the views for your application. Each route may load one template. But inside the templates you're free to use all the features of Knockout, like rendering another templates.

The template rendered is bound to the `context`.

### `app.redirect(location)`:

Redirect the user to another location.

### `app.root(route)`:

Define a root route to redirect the user when the hash is empty.

### `app.run()`:

Initialize your application.

## Wishlist:

- Session and cookie manager
- Querystring parameters
- Choose your own template engine
- Custom settings (like template directory)
- Error handling (?)
