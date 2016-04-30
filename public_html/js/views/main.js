define(function (require) {
        var baseView = require('views/baseView');
        var tmpl = require('tmpl/main');
        var app = require('app');

        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #logout': function(e) {
                    e.preventDefault();
                    // app.user.userLogout();
                }
            },
            initialize: function () {
                this.render();
                // this.listenTo(app.user, "userAuthed", this.reloadViewWithAuthTemplate);
                // this.listenTo(app.user, "userLogout",this.reloadView);

                
            },
            reloadViewWithAuthTemplate: function() {
                this.template = require('tmpl/main_authed');
                this.render();
            },
            reloadView: function() {
                this.template = tmpl;
                this.render();
            },
            render: function () {
                this.$el.html(this.template(app.user.toJSON()));
            }
        });

        return new View();
    }

);