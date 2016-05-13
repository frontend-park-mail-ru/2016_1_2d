define(function (require) {
    QUnit.module("views/manager");

    QUnit.test("ViewManager - экземпляр Backbone.View", function () {

        var ViewManager = require('views/viewManager');
        var viewManager = new ViewManager();

        QUnit.ok(viewManager instanceof Backbone.View);

    });
    

});