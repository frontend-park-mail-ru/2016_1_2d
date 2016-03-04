define(function (require) {
        var baseView = require('views/baseView');
        var tmpl =require('tmpl/game');
        var View = baseView.extend({
            template: tmpl
        });

        return new View();
    }
);