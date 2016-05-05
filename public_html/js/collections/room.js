define(function(require) {
    var Backbone = require('backbone');
    var scores = require('models/scores');
    var app = require('app');
    var Player = require('models/roomPlayer');
    
    var Collection = Backbone.Collection.extend({
        model: Player,
        comparator: function(score) {
            return -score.get('rating');
        },

        initialize: function () {
            this.listenTo(app.wsEvents, "user_joined", this.onNewUserJoined);
            this.listenTo(app.wsEvents, "player_disconnected", this.onUserDisconnected);
            this.listenTo(app.wsEvents, "player_ready", this.onPlayerReady);
            this.listenTo(app.wsEvents, "connected", this.onConnectToRoom);
            this.listenTo(app.wsEvents, "start_game_event", this.onStartGame);
        },

        onStartGame: function() {
        },


        disconnectFromRoom: function() {
            // Api.closeConnection();
            _.invoke(this.toArray(), 'destroy');
        },

        onConnectToRoom: function(usersData) {
            _.invoke(this.toArray(), 'destroy');
            this.reset();
            for(var i = 0; i < usersData.length; ++i) {
                this.add(new Player(usersData[i]));
            }
        },

        onNewUserJoined: function(userData) {
            this.add(new Player(userData));
        },

        onUserDisconnected: function(userData) {
            this.remove(this.where({id: userData.player_id}));
        },

        onPlayerReady: function(playerId, readyStatus) {
            var player = this.where({id: playerId});
            player[0].set("isReady", readyStatus);
        },

    });


    return Collection;
});
