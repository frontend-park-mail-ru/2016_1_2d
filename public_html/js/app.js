define(
    function (require) {
        var Backbone = require('backbone');
        var session = require('models/session');
        var user = require('models/user');

        var app = {
            session: new session(),
            user: new user(),
            host: 'localhost'
        };
        app.session.fetch({
            success: function() {
                app.user.set('id', app.session.get('id'));
                app.user.fetch({success: function () {
                    app.Events.trigger('userAuthed');
                }});
            }
        });

        
        app.Events = new _.extend({}, Backbone.Events);
        app.wsEvents = new _.extend({}, Backbone.Events);

        return app
});