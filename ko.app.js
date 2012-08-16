/*
 * Knockout Application v0.0.1 2012-08-16 10:38:08 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/ko.app
 */
(function($, Path, ko, undefined) {

var Application;

Application = function(app) {

  // The context is the view-model bound to the template being rendered
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
  app.map = function(route, action) {
    Path.map(route).to(function() {
      var template;

      action.call(app, app.context);

      template = $('<script type="text/html"></script>');

      template.attr('id', app.template);
      $('body').append(template);

      template.load('/templates/' + app.template + '.html', function() {
        ko.applyBindings({
          template: app.template,
          context: app.context
        });

        $(this).remove();
      });
    }).enter(function() {
      $.each(app.filters, function(pattern, filter) {
        if(pattern.exec && pattern.exec(route) || pattern === route) {
          filter.call(app, app.context);
        }
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

  // Define the root location
  app.root = function(route) {
    Path.root(route);
  };

  // Run your application
  // TODO: May contain more initialization code in the future
  // TODO: Does it really need this method ?
  app.run = function() {
    // Path listener to hash changes
    Path.listen();
  }

  // Your application constructor
  app.apply(app);
};

// This is a syntax sugar to make things easier and transparent,
// but I didn't find a way to set the bindings dynamically
// TODO: Fix this later
$('[data-bind="app"]').attr('data-bind', 'template: { name: template, data: context }');

// Expose plugin
ko.app = Application;

})(window.jQuery, window.Path, window.ko);
