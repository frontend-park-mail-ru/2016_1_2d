define(function(require) {
    var Backbone = require('backbone');
    var Player = Backbone.Model.extend({
        defaults: {
            id: "",
            avatar: "",
            name: '',
            rating: 0,
            isReady: false
        }
    });

    return Player;
});
