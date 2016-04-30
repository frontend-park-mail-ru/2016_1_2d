define(function(require) {
    var app = require('app');
    var wsApi = {
        WS_URL: 'ws://' + app.host + '/game',

        currentApi: null,
        socket: null,
        startConnection: function() {
            this.socket = new WebSocket(this.WS_URL);
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onerror = this.onError;
            this.currentApi = this;
            this.socket.onmessage = this.currentApi.onMessage;
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
            console.log(JSON.parse(event.data))
        },
        onError: function(error) {
            console.log("SOCKET ERROR: " + JSON.stringify(error));
        },
        sendReady: function(readyStatus) {
            var data = {
                "type": "user_state_changed",
                "isReady": readyStatus,
                "contentLoaded" : true,
            };
            console.log(data);
            // this.socket.send(JSON.stringify(data));
        }
    };

    return wsApi;

});