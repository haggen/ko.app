/*
 * WayJS v0.3.3 2012-09-05 23:14:53 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/wayjs
 */
(function(e){"use strict";var t;t=function(){this.routes=[]},t.prototype={map:function(){var e={};e.params=[],e.pattern=this.translate([].shift.apply(arguments),e),e.actions=[].slice.apply(arguments),this.routes.push(e)},translate:function(e,t){var n;return n=e.replace(/\//g,"\\/"),n=n.replace(/\)/g,function(){return")?"}),n=n.replace(/:(\w[\w\d]*)|\(/g,function(e,n){return t.params.push(e==="("?"_":n),e==="("?"(":"([^\\/]+?)"}),n=n.replace(/\*/g,function(){return t.params.push("splat"),"(.+?)"}),new RegExp("^"+n+"$")},match:function(e){var t,n,r,i,s,o;for(s=0;s<this.routes.length;s++){t=this.routes[s],n={actions:t.actions,params:{}},i=e.match(t.pattern);if(i){for(o=1;o<i.length;o++)r=t.params[o-1],r==="splat"?"splat"in n.params?n.params.splat.push(i[o]):n.params.splat=[i[o]]:n.params[r]=i[o];return n}}}},typeof window=="object"?typeof window.define=="function"&&"amd"in window.define?window.define("way",function(){return new t}):window.way=new t:typeof module=="object"&&"exports"in module&&(module.exports=new t)})();