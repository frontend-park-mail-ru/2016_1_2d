define(function (require) {
        var Backbone = require('backbone');
        var View = Backbone.View.extend({
            template: {},
            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
            },
            show: function () {
                $('#page').append(this.el);
                $(this.el).show();
            },
            hide: function () {
                $(this.el).hide();

            }
        });

        return View;
    }
);