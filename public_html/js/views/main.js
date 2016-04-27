define(function (require) {
        var baseView = require('views/baseView');
        var tmpl = require('tmpl/main');
        var user = require('models/user');

        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #logout': function(e) {
                    e.preventDefault();
                    user.userLogout();
                }
            },
            initialize: function () {
                this.listenTo(user, "userAuthed", this.reloadViewWithAuthTemplate);
                this.listenTo(user, "userLogout",this.reloadView);
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
                this.$el.html(this.template(user.toJSON()));
            }
        });

        return new View();
    }

);