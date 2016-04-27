define(function(require) {
    var user = require('models/user');
    var wsApi = {

        WS_URL: 'ws://' + 'localhost' + '/game',

        READY_CODE: 3,
        EVENT_CODE: 6,
        UPDATE_PATCH_CODE : 15,
        currentApi: null,

        startConnection: function() {
            this.socket = new WebSocket(this.WS_URL);
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.onClose;
            this.socket.onerror = this.onError;
            // this.currentApi.ws_api = this;
            // this.socket.onmessage = this.currentApi.onMessage;
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
            console.log(event)
        },
        onError: function(error) {
            console.log("SOCKET ERROR: " + JSON.stringify(error));
        },
        sendReady: function(readyStatus) {
            var data = {
                "type": "user_state_changed",
                "isReady": readyStatus,
                "contentLoaded" : true,
                "id" : user.get('id')
            };
            console.log(data);
            this.socket.send(JSON.stringify(data));
        }
    };

    return wsApi;

});