define(
    function (require) {
        var Backbone = require('backbone');
        var session = require('models/session');
        var user = require('models/user');

        var app = {
            session: new session(),
            user: new user(),
            host: 'localhost',
            gameReady: false,
            createNewSession : function () {
                app.session = new session();
                app.user = new user();
                app.session.set('id', -1);
            }
        };
        app.session.fetch({
            success: function() {
                app.session.set('authed', true);
                app.user.set('id', app.session.get('id'));
                app.user.set('isReady', false);
                app.user.fetch({
                    success: function () {
                        app.user.set('contentLoaded', false);
                        app.Events.trigger('userAuthed');
                }});
            },
            error: function () {
                app.session.set('id', -1);
            }
        });

        app.Events = new _.extend({}, Backbone.Events);
        app.wsEvents = new _.extend({}, Backbone.Events);

        return app
});