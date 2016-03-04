define(function (require) {
        var Backbone = require('backbone');
        var login = require('views/login');
        var register = require('views/register');
        var game = require('views/game');
        var scoreboard = require('views/scoreboard');
        var room = require('views/room');

        var Router = Backbone.Router.extend({
            routes: {
                'main': 'displayView',
                'login': 'displayView',
                'register': 'displayView',
                'scoreboard': 'displayView',
                'game': 'displayView',
                'room':'displayView',
                '*default': 'defaultAction'
            },
            initialize: function () {
                this.currentView = require('views/main');
                this.listenTo(require('event'), 'navigate', this.changeRoute);
            },
            displayView: function () {
                var fragmentName = Backbone.history.getFragment();
                var view = require('views/'+fragmentName);
                this.currentView.hide();
                view.show();
                this.currentView = view;
            },
            defaultAction: function () {
                var mainView = require('views/main');
                mainView.show();
                this.currentView = mainView;
            },
            changeRoute: function (route) {
                this.navigate(route, {trigger: true});
            }
        });

        return new Router();
    }
);