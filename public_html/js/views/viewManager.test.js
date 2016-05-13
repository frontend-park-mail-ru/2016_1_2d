define(function (require) {
    var ViewManager = require('views/viewManager');
    var LoginView = require('views/login');
    var RegView = require('views/register');


    QUnit.module("views/viewManager");
    
    QUnit.test("ViewManager - экземпляр Backbone.View", function () {
        
        var viewManager = new ViewManager();
    
        QUnit.ok(viewManager instanceof Backbone.View);
    
    });

    QUnit.test("Logic test for ViewManager", function () {
        var views = {
                login: LoginView,
            }; 
        var viewManager = new ViewManager(views);
    
        QUnit.equal(views['login'].$el.css('display') === 'none', true);
    
    });

});