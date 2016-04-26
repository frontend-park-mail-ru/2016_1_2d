define(function (require) {
    var Backbone = require('backbone');
    var router = require('router');
    var ws = require('utils/ws');
    Backbone.history.start();
    ws.startConnection();
    
    
});

