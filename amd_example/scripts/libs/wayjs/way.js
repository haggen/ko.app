/*
 * WayJS v0.2.0 2012-08-24 18:47:20 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/wayjs
 */
(function(undefined) {

  'use strict';

  var Way;

  Way = function() {
    this.routes = [];
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
      var route, match, matches, m, i, j;

      matches = [];

      for(i = 0; i < this.routes.length; i++) {
        route = this.routes[i];
        match = { action: route.action, params: [] };
        m = path.match(route.pattern);

        if(m) {
          for(j = 1; j < m.length; j++) {
            match.params[route.params[j - 1]] = m[j];
          }

          matches.push(match);
        }
      }

      return matches;
    }
  };

  if(typeof window === 'undefined') {
    module.exports = new Way();
  } else {
    window.way = new Way();
  }

})();
