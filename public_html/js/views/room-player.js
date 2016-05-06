define(function (require) {
    var tmpl = require('tmpl/room-player');
    var Backbone = require('backbone');

    var View = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            this.render();
            this.listenTo(this.model, "remove", this.removeMe);
            this.listenTo(this.model, "change:isReady", this.setReadyStatus);
        },

        removeMe: function() {
            this.trigger("removeMe", this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.setReadyStatus();
        },

        setReadyStatus: function() {
            var readyValue = this.model.get('isReady');
            if (readyValue === true) {
                $(".room__profile_status", this.$el).fadeOut('slow', function () {
                    $(this).load(function () {
                            $(this).fadeIn(400);
                        }).attr("src", "media/ready.png");
                });
                $(".room__profile_current-user-ready-button", this.$el)
                    .html('Ready')
                    .css('background-color', '#039BE5');
            } else {
                $(".room__profile_status", this.$el).fadeOut('slow', function () {
                    $(this).load(function () {
                        $(this).fadeIn(400);
                    }).attr("src", "media/not_ready.png");
                });
                $(".room__profile_current-user-ready-button", this.$el)
                    .html('Not Ready')
                    .css('background-color', '#B71C1C');
            }
        }
    });

    return View;
});
