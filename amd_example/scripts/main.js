require.config({
  baseUrl: 'scripts',
    paths: {
        'jquery': 'libs/jquery/jquery-1.8.0.min',
        'app': 'libs/ko_app/ko.app',
        'way': 'libs/wayjs/way',
        'cookies': 'libs/cookies/cookies',
        'knockout': 'libs/knockout/knockout-2.1.0',
        'koExt': 'libs/knockout/bindingHandlers',
        
        'viewModels': 'viewModels' 
    }
});

require(['jquery'], function () {
    require(['koExt', 'routes'], function (app) {
        window.app = app;
    });
})