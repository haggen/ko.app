/*
 * WayJS v0.1.0 2012-08-21 10:58:17 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/wayjs
 */
(function(undefined) {

  'use strict';

  var Way;

  Way = function() {
    this.routes = [];
    this.hooks = {};
    this.params = {};
  };

  Way.prototype = {

    map: function(pattern, action) {
      var route = {};

      route.params = [];
      route.action = action;
      route.pattern = this.translate(pattern, route);

      this.routes.push(route);
    },

    translate: function(pattern, route) {
      var re;

      // Escape forward slashes
      re = pattern.replace(/\//g, '\\/');

      // Fix optional groups
      re = re.replace(/\)/g, function() {
        return ')?';
      });

      // Translate named parameters
      re = re.replace(/:(\w[\w\d]*)|\(/g, function(m, n) {
        // console.log(m, n, m === '(' ? '_' : n, m === '(' ? '(' : '([^\\/]+?)');
        route.params.push(m === '(' ? '_' : n);
        return m === '(' ? '(' : '([^\\/]+?)';
      });

      // Translate splats
      re = re.replace(/\*/g, function() {
        route.params.push('splat');
        return '(.+?)';
      });

      return new RegExp('^' + re + '$');
    },

    match: function(path) {
      var way, route, match, i, j;

      way = this;
      way.params = [];

      for(i = 0; i < way.routes.length; i++) {
        route = way.routes[i];
        match = path.match(route.pattern);

        if(match) {
          for(j = 1; j < match.length; j++) {
            way.params[route.params[j - 1]] = match[j];
          }

          return route.action;
        }
      }
    }
  };

  if(typeof window === 'undefined') {
    module.exports = new Way();
  } else {
    window.way = new Way();
  }

})();
