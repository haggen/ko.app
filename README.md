# Knockout Application

Knockout Application aims to be the glue linking every feature of your modern web application, like routing URL, session management, template rendering, and off course, data bindings.

It should avail existing libraries as much as possible and provide an easy and familiar API to its users.

It's currently in very early stages of development, but already works, and should become a great tool to build killer apps.

## Dependencies:

- Knockout 2.1 - https://github.com/stevesanderson/knockout
- WayJS 0.1 - https://github.com/haggen/wayjs
- jQuery 1.7 - https://github.com/jquery/jquery
- Cookies 0.2 - https://github.com/scotthamper/cookies

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

In your template `/templates/hello.html`:

    <p>Hello, <span data-bind="text: name"></span></p>

Now open `index.html` in your browser. Try changing `world` to your name, it works!

You can see a working version of this example in the `example/` directory.

## API:

Note that inside your application's constructor you can access `app` by `this`.

### \#map

    map(string pattern, function(context) action)

Map new route to given action. Actions may return `true` to chain more routes that matches the current path. Also within the action `this` refers to the application.

### \#session

    session(string name[, string value])

Retrieve session variable when value is omitted, otherwise update it with given value. Also `value` may be `null` to delete given session variable.

### \#redirect

    redirect(string path)

Redirect user to given location.

### \#render

    render(string template)

Render given template and bind current context to it. Template files must be in `templates/` directory and must use `.html` extension.

### \#dispatch

    dispatch()

Match and dispatch an action based on current location.

### \#listen

    listen()

Listen to hash changes.

### \#run

    run()

Setup and initialize your application.

## Roadmap:

- <del>Session management</del>
- Custom settings (like template directory)
