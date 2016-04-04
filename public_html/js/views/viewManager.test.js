define(function (require) {
    var viewManager = require('views/viewManager');
    var mainView = require('views/main');
    var loginView = require('views/login');

    QUnit.module("views/viewManager");

    QUnit.test("ViewManager works correctly", function () {
        mainView.initialize();
        mainView.show();
        var firstView = viewManager.returnCurrentView();
        loginView.show();
        var secondView = viewManager.returnCurrentView();
        QUnit.ok(firstView != secondView);
    });
    

});

