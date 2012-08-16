# Knockout Application

Knockout Application is a bridge to link routing, template rendering and data model bindings

## Requirements:

- Knockout 2.1 - https://github.com/stevesanderson/knockout
- Path.js - https://github.com/mtrpcic/pathjs/
- jQuery 1.7 - https://github.com/jquery/jquery

## Usage:

In your HTML:

    <!doctype>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Sample</title>
    </head>
    <body>

    <div data-bind="app"></div>

    <script src="knockout.js"></script>
    <script src="jquery.js"></script>
    <script src="path.js"></script>

    <script src="ko.app.js"></script> <!-- It's important to load it after the others -->

    </body>
    </html>

In your JS:

    var app;

    app = ko.app(function() {

      this.map('#/hello', function(context) {
        // context is the current view-model for the template
        context.me = ko.observable('Nyan Cat');

        // it tells the application which template to load
        // currently, all template are loaded from '/templates' and must have '.html' extension
        this.render('nyan');
      });

      this.root('#/hello');

      this.run();
    });

In your template `/templates/nyan.html`:

    <p data-bind="text: me"></p>

## API:

Note that `app` here will mean `this` inside application main function. See the example above.

### `app.before(pattern, filter)`:

Register a filter to act before the routes that match the `pattern`. The `filter` is a function that may return `false` to prevent the current route of being processed, or redirect the user to another route.

The filter function also receives the `context`. The `pattern` may be a string which will be compared to the route or a regex to match some or all the routes.

### `app.map(route, action)`:

Register a new `action` to be called when `route` matches the current hash location. The action receives the context as first and only argument. The context is the view-model being applied to the template set by `render`.

### `app.render(template)`:

...

### `app.redirect(location)`:

...

### `app.root(route)`:

...

### `app.run()`:

...

## Wishlist:

- Session and cookie manager
- Querystring parameters
- Choose your own template engine
- Custom settings (like template directory)
