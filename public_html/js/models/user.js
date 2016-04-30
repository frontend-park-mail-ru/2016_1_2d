define(function(require) {
        var Backbone = require('backbone');
        var userSync = require('syncs/userSync');
        var User = Backbone.Model.extend({
            sync: userSync,
            url: '/api/user/',
            defaults: {
                id: -1,
                login: '',

            },

        });

        return User;
});