define(function (require) {
        var Backbone = require('backbone');
        var viewManager = require('views/viewManager');
        var View = Backbone.View.extend({
            template: {},
            requireAuth: false,
            initialize: function () {
                this.render();
                $('#page').append(this.el);
                this.hide();
            },
            render: function () {
                this.$el.html(this.template());
            },
            show: function () {
                viewManager.trigger('show', this);
                this.$el.appendTo("#page");
                this.$el.show();

            },
            hide: function () {
                this.$el.hide();
                this.$el.detach();
            }
        });
        return View;
    }
);