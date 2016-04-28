define(function (require) {
    var baseView = require('views/baseView');
    var user = require('models/user');
    var tmpl = require('tmpl/room');
    var ws = require('utils/ws');
   
    var View = baseView.extend({
        template: tmpl,
        requireAuth: true,
        events: {
            'click .room__profile_current-user-ready-button': function(e) {
                ws.sendReady(true);
                $(".room__profile_status",e.target.parentElement).fadeOut('slow', function () {
                    $(this).load(function () {
                        $(this).fadeIn(400);
                    }).attr("src", "media/not_ready.png");
                });
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