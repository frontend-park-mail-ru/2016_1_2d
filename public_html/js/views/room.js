define(
    ['views/baseView', 'tmpl/room'],
    function (baseView, tmpl) {
        var baseView = require('views/baseView');
        var tmpl = require('tmpl/room');
        var View = baseView.extend({
            template: tmpl,
            requireAuth: true,
            events: {
                'click .ready-button': function(e) {
                    this.$(".room__profile__status").fadeOut('slow', function () {
                        $(this).load(function () {
                            $(this).fadeIn(400);
                        }).attr("src", "media/not_ready.png");
                    });
                }
            }
        });
        return new View();
    }
);