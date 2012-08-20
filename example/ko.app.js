/*
 * Knockout Application v0.0.4 2012-08-20 17:28:18 -0300
 * by Arthur Corenzan <arthur@corenzan.com>
 * licensed under http://creativecommons.org/licenses/by/3.0
 * more on http://haggen.github.com/ko.app
 */
(function(c,d,e){c('[data-bind="app"]').attr("data-bind","template: { name: template, data: context }");e.app=function(a){a.context={};a.filters={};a.before=function(b,c){a.filters[b]=c};a.map=function(b,f){d.map(b).to(function(){var b;a.params=this.params;f.call(a,a.context);b=c('<script type="text/html"><\/script>');b.attr("id",a.template);c("body").append(b);b.load("templates/"+a.template+".html",function(){e.applyBindings({template:a.template,context:a.context});c(this).remove()})}).enter(function(){c.each(a.filters,
function(c,d){(c.exec&&c.exec(b)||c===b)&&d.call(a,a.context)})})};a.redirect=function(a){0===a.indexOf("#")?location.hash=a:location.href=a};a.render=function(b){a.template=b};a.root=function(a){d.root(a)};a.run=function(){d.listen()};a.apply(a)}})(window.jQuery,window.Path,window.ko);
