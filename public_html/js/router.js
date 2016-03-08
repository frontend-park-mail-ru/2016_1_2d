define(
    function (require) {
        var Backbone = require('backbone');
        var login = require('views/login');
        var register = require('views/register');
        var game = require('views/game');
        var scoreboard = require('views/scoreboard');
        var room = require('views/room');
        var user = require('models/user');
        var main = require('views/main');

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
                this.currentView = main;
                this.listenTo(user, "userAuthed", this.displayMainView);
            },
            displayMainView: function() {
                this.currentView.hide();
                main.show();
                this.currentView = main;
                this.navigate("#main", {trigger: true});
            },
            displayView: function () {
                var fragmentName = Backbone.history.getFragment();
                var view = require('views/'+ fragmentName);
                this.currentView.hide();
                view.show();
                this.currentView = view;
            },
            defaultAction: function () {
                var mainView = main;
                mainView.show();
                this.currentView = mainView;
            }
        });

        return new Router();
    }
);