define([
        'views/baseView',
        'tmpl/room'
    ], function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl
        });

        return new View();
    }
);