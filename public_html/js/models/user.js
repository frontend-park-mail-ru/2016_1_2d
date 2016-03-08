define( function(require) {
        var Backbone = require('backbone');
        var $ = require('jquery');
        var User = Backbone.Model.extend({
            default: {
                'token' : '',
                'username' : 'Guest',
                'password': '',
                'endPoint': 'localhost',
                'port': 8080
            },
            authorize: function(login, password) {
                if(login.length === 0 || password.length === 0) {
                    this.trigger('invalidLoginPassword');
                } else {
                    this.set('username', login);
                    this.set('password', password);
                    this.sendLoginData('/login');
                    this.set('password','');
                }
            },
            registerNew: function(login, password) {
                if(login.length === 0 || password.length === 0) {
                    this.trigger('invalidForm');
                } else {
                    this.set('username', login);
                    this.set('password', password);
                    this.sendLoginData('/register');
                    this.set('password','');
                }
            },
            userLogout: function() {
                var self = this;
                $.ajax({
                    method: 'DELETE',
                    url: '/logout',
                    success: function (msg) {
                        self.trigger('userLogout');
                    }
                });
            },
            sendLoginData: function (url) {
                var self = this;
                $.ajax({
                    method: 'PUT',
                    url: url,
                    data: {'login': this.get('username'), 'password': this.get('password')},
                    success: function (msg) {
                        self.trigger('userAuthed');
                        console.log(msg);
                    },
                    error: function (msg) {
                        self.trigger('invalidLoginPassword',msg.responseJSON);
                    }
                });
            }
        });

        return new User();
    }
);