define(
    function (require) {
        var Backbone = require('backbone');
        var viewManager = require('views/viewManager');

        var views = {
            login: require('views/login'),
            register:  require('views/register'),
            game: require('views/game'),
            scoreboard: require('views/scoreboard'),
            room: require('views/room'),
            user: require('models/user'),
            main: require('views/main')
        };
        var Router = Backbone.Router.extend({
            routes: {
                ':url': 'displayView',
                '*default': 'displayMainView'
            },
            initialize: function () {
                this.listenTo(views.user, 'userAuthed', this.displayMainView);
                this.listenTo(views.user, 'userRegistered',this.displayMainView);
            },
            displayMainView: function() {
                views.main.show();
                this.navigate("#main", {trigger: true});
            },
            displayView: function () {
                var fragmentName = Backbone.history.getFragment();
                var view = views[fragmentName];
                view.show();
            }

        });

        return new Router();
    }
);