define(function (require) {
    var baseView = require('views/baseView');
    var app = require('app');
    var tmpl = require('tmpl/room');
    var ws = require('utils/ws');
   
    var View = baseView.extend({
        template: tmpl,
        requireAuth: true,
        events: {
            'click .room__profile_current-user-ready-button': function(e) {
                if (app.user.get('isReady') == false && ws.socket.readyState != 3) {
                    ws.sendReady(true);
                    app.user.set('isReady', true);
                    $(".room__profile_status", e.target.parentElement).fadeOut('slow', function () {
                        $(this).load(function () {
                            $(this).fadeIn(400);
                        }).attr("src", "media/ready.png");
                    });
                    $(".room__profile_current-user-ready-button", e.target.parentElement)
                        .html('Ready')
                        .css('background-color', '#FF9800');
                } else {
                    if (app.user.get('isReady') == true && ws.socket.readyState != 3) {
                        app.user.set('isReady', false);
                        ws.sendReady(false);
                        $(".room__profile_status", e.target.parentElement).fadeOut('slow', function () {
                            $(this).load(function () {
                                $(this).fadeIn(400);
                            }).attr("src", "media/not_ready.png");
                        });
                        $(".room__profile_current-user-ready-button", e.target.parentElement)
                            .html('Not Ready')
                            .css('background-color', '#039BE5');
                    }
                }
            }
        },
        show: function () {
            baseView.prototype.show.call(this);
            ws.startConnection();
        },
        hide: function () {
            if(ws.socket) {
                ws.closeConnection();
            }
            baseView.prototype.hide.call(this);
        }

    });
    return new View();

});