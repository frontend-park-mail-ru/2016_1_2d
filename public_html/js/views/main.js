define(function (require) {
        var baseView = require('views/baseView');
        var tmpl = require('tmpl/main');
        var authedTmpl = require('tmpl/main_authed');
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
                this.render();
                this.listenTo(user, "userAuthed", this.reloadViewWithAuthTemplate);
                this.listenTo(user, "userLogout",this.reloadView);
            },
            reloadViewWithAuthTemplate: function() {
                this.template = authedTmpl;
                this.render();
            },
            reloadView: function() {
                this.template = tmpl;
                this.render();

            }
        });


        return new View();
    }
);