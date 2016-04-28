define(
    function (require) {
        var Backbone = require('backbone');
        var user = require('models/user');

        var app = {
            user: new user(),
        };

        return app
});