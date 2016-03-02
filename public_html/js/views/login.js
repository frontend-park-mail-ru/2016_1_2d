define(
    ['tmpl/login', 'views/baseView', 'models/user', 'event'],
    function (tmpl, baseView, user, event) {
        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #sign-in': function(e) {
                    e.preventDefault();
                    var login = document.getElementById('login-input').value;
                    var password = document.getElementById('password-input').value;
                    user.authorize(login, password);
                }
            },
            initialize: function () {
                this.render();
                this.listenTo(event,'invalidLoginPassword', this.showErrorMessage);
            },
            showErrorMessage: function () {
                $('#err-message').html('Error: Invalid Login or Password').fadeIn(400).fadeOut(2200);

            }
        });

        return new View();
    }
);