/*
 * Knockout Application v0.0.4 2012-08-20 17:28:18 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/ko.app
 */
(function($, way, ko, undefined) {

var Application;

Application = function(app) {

  // Root location
  app.root = '#/';

  // Current location
  app.path = '';

  // The context is the current view-model bound to the template just rendered
  app.context = {};

  // Filters are functions that will execute just before the routes their patterns matches
  // They can return false to prevent the route from being executed, they can define
  // new observables in the context or redirect the user to some other location
  app.filters = {};

  // Register new filter
  app.before = function(pattern, filter) {
    app.filters[pattern] = filter;
  };

  // Map new route and action
  // TODO: missing 404 handler
  app.map = function(route, action) {
    way.map(route, function() {
      var template;

      app.params = way.params;

      action.call(app, app.context);

      template = $('<script type="text/html"></script>');

      template.attr('id', app.template);
      $('body').append(template);

      template.load('templates/' + app.template + '.html', function() {
        ko.applyBindings({
          template: app.template,
          context: app.context
        });

        $(this).remove();
      });
    });
  };

  // Change current location
  app.redirect = function(route) {
    if(route.indexOf('#') === 0) {
      location.hash = route;
    } else {
      location.href = route;
    }
  };

  // Choose which template will be rendered
  app.render = function(template) {
    app.template = template;
  };

  // Monitor hash changes and dispatch actions
  app.listen = function() {
    var fn;

    fn = function() {
      var path, action;

      path = location.hash;

      if(path !== app.path) {
        app.path = path;
        action = way.match(path) || way.match('#/404');

        if(action !== undefined) {
          action();
        }
      }
    };

    // Snippet stolen from https://github.com/mtrpcic/pathjs
    // The 'document.documentMode' checks below ensure that it
    // fires the right events even in IE "Quirks Mode".
    if('onhashchange' in window && (!document.documentMode || document.documentMode >= 8)) {
      window.onhashchange = fn;
    } else {
      setInterval(fn, 50);
    }
  };

  // Setup your application
  app.run = function() {
    app.listen();

    if(location.hash === '') {
      app.redirect(app.root);
    }
  };

  // Your application constructor
  app.apply(app);
};

// This is a syntax sugar to make things easier and transparent,
// but I didn't find a way to set the bindings dynamically
// TODO: Fix this later
$('[data-bind="app"]').attr('data-bind', 'template: { name: template, data: context }');

// Expose plugin
ko.app = Application;

})(window.jQuery, window.way, window.ko);
