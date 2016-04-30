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
            success: function(){
            },
            error: function () {
            }
        });
        

        app.wsEvents = new _.extend({}, Backbone.Events);

        return app
});