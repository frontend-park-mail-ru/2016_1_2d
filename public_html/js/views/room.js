define(
    ['views/baseView', 'tmpl/room'],
    function (baseView, tmpl) {
        var baseView = require('views/baseView');
        var tmpl = require('tmpl/room');
        var View = baseView.extend({
            template: tmpl
        });
        return new View();
    }
);