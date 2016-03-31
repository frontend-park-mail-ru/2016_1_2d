define(function (require) {
    var viewManager = require('views/viewManager');
    var mainView = require('views/main');
    var loginView = require('views/login');

    QUnit.module("views/viewManager");

    QUnit.test("ViewManager works correctly", function () {
        mainView.initialize();
        mainView.show();
        var firstView = viewManager.returnCurrentVIew();
        loginView.show();
        var secondView = viewManager.returnCurrentVIew();
        QUnit.ok(firstView != secondView);
    });

    QUnit.test("View manager shows exact view ", function () {
        mainView.initialize();
        mainView.show();
        QUnit.ok(viewManager.returnCurrentVIew().cid === 'view3' );
    });
    


});

