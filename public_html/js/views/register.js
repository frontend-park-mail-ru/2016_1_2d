define(function (require) {
        var tmpl = require('tmpl/register');
        var baseView = require('views/baseView');
        var user = require('models/user');
        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #sign-up': function(e) {
                    e.preventDefault();
                    $('.alert-box.error').finish();
                    var login = document.getElementById('reg-login-input').value;
                    var password = document.getElementById('reg-password-input').value;
                    $('#sign-in').prop("disabled", true);
                    user.registerNew(login, password);
                }
            },
            initialize: function () {
                this.render();
                this.listenTo(user, "invalidForm", this.showErrorMessage);
                this.listenTo(user, 'userAuthed', this.reloadAll);
            },
            reloadAll: function() {
                $('#sign-in').prop("disabled", false);
                document.getElementById('login-input').value = "";
                document.getElementById('password-input').value = "";
            },
            showErrorMessage: function (msg) {
                $('.alert-box.error').html('Error: ' + msg.message).fadeIn(400,function(){
                    $('#sign-in').prop("disabled", false)}).fadeOut(2200);
            }

        });

        return new View();
    }
);