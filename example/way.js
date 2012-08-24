/*
 * WayJS v0.2.0 2012-08-23 22:44:15 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/wayjs
 */
(function(){var c;c=function(){this.routes=[]};c.prototype={map:function(d,b){var a={params:[]};a.action=b;a.pattern=this.translate(d,a);this.routes.push(a)},translate:function(d,b){var a;a=d.replace(/\//g,"\\/");a=a.replace(/\)/g,function(){return")?"});a=a.replace(/:(\w[\w\d]*)|\(/g,function(a,d){b.params.push("("===a?"_":d);return"("===a?"(":"([^\\/]+)"});a=a.replace(/\*/g,function(){b.params.push("splat");return"(.+)"});return RegExp("^"+a)},match:function(d){var b,a,c,g,f,e;c=[];for(f=0;f<this.routes.length;f++)if(b=
this.routes[f],a={action:b.action,params:[]},g=d.match(b.pattern)){for(e=1;e<g.length;e++)a.params[b.params[e-1]]=g[e];c.push(a)}return c}};"undefined"===typeof window?module.exports=new c:window.way=new c})();
