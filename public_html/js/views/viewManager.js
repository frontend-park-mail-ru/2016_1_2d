define(function(require){
    var Backbone = require('backbone'),
        _ = require('underscore');
    var ViewManager = Backbone.Model.extend({
        initialize: function() {
            this.on('show', this.showView.bind(this));
        },
        showView: function(view) {
            if (this.has('_thisView')) {
                this.get('_thisView').hide();
            }
            this.set('_thisView', view);
        }
    });
    return new ViewManager();
});