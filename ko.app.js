/*
 * Knockout Application v0.2.5 2012-09-06 13:09:35 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/ko.app
 */
(function(window, undefined) {

  // Factory
  var fn = function($, way, ko, Cookies) {
    var Application = function(app) {

      // Root location
      app.root = '#/';

      // Location currently dispatched
      app.location = '';

      // Context bound to the template
      app.context = {};

      // Template name
      app.template = '';

      // Route parameters
      app.params = {};

      // Map new route and action
      app.map = function() {
        way.map.apply(way, arguments);
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
        var path, match, i;

        path = location.hash;

        if(path !== app.location || force) {
          app.location = path;
          match = way.match(path);

          if(match === undefined) {
            match = way.match('#/404');

            if(match === undefined) {
              throw 'No route match and missing 404';
            }
          }

          app.params = match.params;

          for(i = 0; i < match.actions.length; i++) {
            if(match.actions[i].call(app, app.context) !== true) {
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

    // Expose plugin constructor and module
    return ko.app = Application;
  };

  // Switch between AMD and plain script loading, as suggested by @adimkov
  if(typeof window.define === 'function' && 'amd' in window.define) {
    window.define(['jquery', 'way', 'knockout', 'Cookies'], fn);
  } else {
    fn(window.jQuery, window.way, window.ko, window.Cookies);
  }

})(window);
