define([
        'app',
        'viewModels/dashboard',
        'viewModels/contacts'
       ],
    function (
        application,
        dashboard,
        contacts) {
        var app = application(function () {
            this.configure({templatesPath : 'views/' });

            this.map('#/', function () {
                this.context = dashboard;
                this.render('dashboard');
            });

            this.map('#/contacts', function () {
                this.context = contacts;
                this.render('contacts');
            });

            this.run();
        });

        return app;
    });