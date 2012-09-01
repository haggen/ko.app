/*
 * Knockout Application v0.2.1 2012-08-31 11:21:07 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/ko.app
 */
(function(window, undefined){ 
!function (factory) {
  if (typeof define === 'function' && define['amd']) {
    // [0] AMD anonymous module
    define(['jquery', 'way', 'knockout', 'cookies'], factory);
  } else {
    // [1] No module loader (plain <script> tag) - put directly in global namespace
    factory(window.jQuery, window.way, window.ko, window.Cookies);
  }
}(function($, wayjs, ko, cookies) { // implement amd for wayjs and cookies

  var Application;

  Application = function(app) {

  // Root location
  app.root = '#/';

  // Current location
  app.path = '';

  // Context bound to the template
  app.context = {};

  // Template name
  app.template = '';

  // Route parameters
  app.params = {};

  // Map new route and action
  app.map = function(pattern, action) {
    way.map(pattern, action);
  };

  // Session management
  app.session = function(name, value) {
    if(value !== undefined) {
      if(value === null) {
        Cookies.expire(name);
      } else {
        Cookies.set(name, value);
      }
    }

    return Cookies.get(name);
  };

  // Change current location
  app.redirect = function(route) {
    if(route.indexOf('#') === 0) {
      if(location.hash === route) {
        app.dispatch();
      } else {
        location.hash = route;
      }
    } else {
      location.href = route;
    }
  };

  // Render template
  app.render = function(template) {
    app.template = template;

    template = $('<script type="text/html"></script>');

    template.attr('id', app.template);
    $('body').append(template);

    // TODO: templates directory should be customizable
    template.load('templates/' + app.template + '.html', function() {
      ko.applyBindings({
        template: app.template,
        context: app.context
      });

      $(this).remove();
    });
  };

  // Dispatch action based on route matching
  app.dispatch = function(force) {
    var path, matches, i;

    path = location.hash;

    if(path !== app.path || force) {
      app.path = path;
      matches = way.match(path);

      if(matches.length === 0) {
        matches = way.match('#/404');
      }

      for(i = 0; i < matches.length; i++) {
        app.params = matches[i].params;

        if(!matches[i].action.call(app, app.context)) {
          break;
        }
      }
    }
  };

  // Monitor hash changes
  app.listen = function() {
    // Snippet stolen from https://github.com/mtrpcic/pathjs
    // The 'document.documentMode' checks below ensure that it
    // fires the right events even in IE "Quirks Mode".
    if('onhashchange' in window && (!document.documentMode || document.documentMode >= 8)) {
      window.onhashchange = app.dispatch;
    } else {
      setInterval(app.dispatch, 50);
    }
  };

  // Setup your application
  app.run = function() {
    app.listen();

    if(location.hash === '') {
      app.redirect(app.root);
    }

    app.dispatch();
  };

  // Your application constructor
  app.apply(app);
};

// This is a syntax sugar to make things easier and transparent,
// but I didn't find a way to set the bindings dynamically, so..
// TODO: Fix this later, it shouldn't use jQuery
$('[data-bind="app"]').attr('data-bind', 'template: { name: template, data: context }');

// Expose constructor
ko.app = Application;
return Application;
});
})(window);
