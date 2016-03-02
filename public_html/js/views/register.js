define(
    ['tmpl/register', 'views/baseView', 'models/user'],
    function (tmpl, baseView, user) {
        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #sign-up': function(e) {
                    e.preventDefault();
                    var login = this.$el.find('#login-input').value;
                    var password = this.$el.find('#password-input').value;
                    user.registerNew(login, password);
                }
            },
            initialize: function () {
                this.render();
                this.listenTo(event,'invalidLoginPassword', this.showErrorMessage);
            }
        });

        return new View();
    }
);