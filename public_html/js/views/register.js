define(function (require) {
        var tmpl = require('tmpl/register');
        var baseView = require('views/baseView');
        var user = require('models/user');
        var event = require('event');
        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #sign-up': function(e) {
                    e.preventDefault();
                    var login = document.getElementById('login-input').value;
                    var password = document.getElementById('password-input').value;
                    user.registerNew(login, password);
                }
            },
            initialize: function () {
                this.render();
                this.listenTo(event,'invalidForm', this.showErrorMessage);
            },
            showErrorMessage: function () {
                $('#err-message').html('Error: Empty Login or Password').fadeIn(400).fadeOut(2200);

            }

        });

        return new View();
    }
);