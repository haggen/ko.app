/*
 * Knockout Application v0.0.1 2012-08-13 22:33:36 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/ko.app
 */
(function(ko, undefined) {

var Application;

Application = function(app) {

  // Current model-view
  app.context = {};

  // Route filters, hook with #before
  app.filters = {};

  // app.template = function(engine) {
  //   if(engine === 'underscore' && '_' in window) {
  //     // http://jsfiddle.net/6pStz/
  //     /* ---- Begin integration of Underscore template engine with Knockout. Could go in a separate file of course. ---- */
  //     ko.underscoreTemplateEngine = function() {};
  //     ko.underscoreTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(), {
  //       renderTemplateSource: function(templateSource, bindingContext, options) {
  //         // Precompile and cache the templates for efficiency
  //         var precompiled = templateSource['data']('precompiled');
  //         if(!precompiled) {
  //           precompiled = _.template("<% with($data) { %> " + templateSource.text() + " <% } %>");
  //           templateSource['data']('precompiled', precompiled);
  //         }
  //         // Run the template and parse its output into an array of DOM elements
  //         var renderedMarkup = precompiled(bindingContext).replace(/\s+/g, " ");
  //         return ko.utils.parseHtmlFragment(renderedMarkup);
  //       },
  //       createJavaScriptEvaluatorBlock: function(script) {
  //         return "<%= " + script + " %>";
  //       }
  //     });
  //     ko.setTemplateEngine(new ko.underscoreTemplateEngine());
  //     /* ---- End integration of Underscore template engine with Knockout ---- */
  //   }
  // };

  // Register new filter
  app.before = function(pattern, filter) {
    app.filters[pattern] = filter;
  };

  // Map new route to some action
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
      $.each(app.filters, function(filter, pattern) {
        if('exec' in pattern && pattern.exec(route) || pattern === route) {
          filter.call(app, app.context);
        }
      });
    });
  };

  // Change current hash/location
  app.redirect = function(route) {
    // Path.history.pushState({}, '', route);
    location.hash = route;
  };

  // Set current template to be loaded
  app.render = function(template) {
    app.template = template;
  };

  // Set root route
  app.root = function(route) {
    Path.root(route);
  };

  // Setup application
  app.run = function() {
    Path.listen();
  };

  app.apply(app);
};

// @TODO Fix this later
$('[data-bind="app"]').attr('data-bind', 'template: { name: template, data: context }');

// Expose plugin
ko.app = Application;

})(window.ko);
