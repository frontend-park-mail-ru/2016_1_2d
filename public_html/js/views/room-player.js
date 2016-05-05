define(function (require) {
    var tmpl = require('tmpl/room-player');
    var Backbone = require('backbone');

    var View = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            this.render();
            this.listenTo(this.model, "remove", this.removeMe);
            this.listenTo(this.model, "isReady", this.setReady);
        },

        removeMe: function() {
            this.trigger("removeMe", this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.setReady();
        },

        setReady: function() {
            var readyValue = this.model.get('isReady');
            
        }
    });

    return View;
});
