define(function(require){
    var Backbone = require('backbone');
    var currentView = null;
    var ViewManager = Backbone.View.extend({
        initialize: function() {
            this.on('show', this.showView);
        },
        showView: function(view) {
            if (currentView != null ) {
                currentView.hide();
            }
            currentView = view;
        }
    });
    return new ViewManager();
});
