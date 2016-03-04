define(function (require) {
    var Scoreboard = require('collections/scoreboard');
    var baseView = require('views/baseView');
    var tmpl = require('tmpl/scoreboard');
    var View = baseView.extend({
        template: tmpl,
        collection: new Scoreboard(),

        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
        }
    });

    return new View();
});