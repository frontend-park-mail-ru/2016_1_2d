define(function(require) {
    var app = require('app');

    var wsApi = {
        WS_URL: 'ws://' + app.host + '/game',
        socket: null,
        startConnection: function() {
            this.socket = new WebSocket(this.WS_URL);
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onerror = this.onError;
            this.socket.onmessage = this.onMessage;
            this.socket.onmessage = this.onMessage;
        },
        closeConnection: function() {
            this.socket.close();
        },

        onOpen: function() {

        },

        onClose: function(code) {
            console.log("CLOSE SOCKET:");
            console.log(code);
        },
        onMessage: function (event) {
            var dataObj = JSON.parse(event.data);
            if (dataObj.type === 'object_spawned') {
                app.wsEvents.trigger('object_spawned', dataObj);
            }
            if (dataObj.type === 'user_joined') {
                app.wsEvents.trigger('user_joined', dataObj);
            }
            console.log(event);
        },
        onError: function(error) {
            console.log("SOCKET ERROR: " + JSON.stringify(error));
        },
        sendReady: function(readyStatus, contentStatus) {
            var data = {
                "type": "user_state_changed",
                "isReady": readyStatus,
                "contentLoaded": contentStatus
            };
            this.socket.send(JSON.stringify(data));
        },

    };

    return wsApi;

});