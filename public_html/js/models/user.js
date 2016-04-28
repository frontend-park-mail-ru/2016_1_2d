define(function(require) {
        var Backbone = require('backbone');
        var $ = require('jquery');
        var User = Backbone.Model.extend({
            default: {
                'id': '',
                'username' : '',
                'password': '',
                'score': '',
                'authed': false,
                'isReady': false
            },
            url: '/api/user/',
            validate: function(attrs) {
                if(attrs.login.length === 0 || attrs.password.length === 0) {
                    this.trigger('invalidLoginPassword', 'Please enter valid data');
                }
                if(attrs.login.length === 0 || attrs.password.length === 0) {
                    this.trigger('invalidForm', 'Please enter valid data');
                }
            },

            authorize: function(login, password) {
                if(login.length === 0 || password.length === 0) {
                    this.trigger('invalidLoginPassword', 'Please enter valid data');
                } else {
                    this.set('username', login);
                    this.set('password', password);
                    this.sendLoginData('/api/session');
                    this.set('password','');
                }
            },

            registerNew: function(login, password) {
                if(login.length === 0 || password.length === 0) {
                    this.trigger('invalidForm','Please enter valid data');
                } else {
                    this.set('username', login);
                    this.set('password', password);
                    this.registerNewUser('/api/user');
                    this.set('password','');
                }
            },
            userLogout: function() {
                var self = this;
                $.ajax({
                    method: 'DELETE',
                    url: '/api/session',
                    success: function (msg) {
                        self.set('authed', false);
                        self.trigger('userLogout');
                    }
                });
            },
            registerNewUser: function (url) {
                var self = this;
                $.ajax({
                    method: 'PUT',
                    url: url,
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({'login': this.get('username'), 'password': this.get('password')}),
                    success: function (msg) {
                        self.set('id', msg.id);
                        self.getUserInfo();
                        self.trigger('userRegistered');
                    },
                    error: function (msg) {
                        self.trigger('invalidForm',msg.responseJSON.message);
                    }
                });
            },
            sendLoginData: function (url) {
                var self = this;
                $.ajax({
                    method: 'PUT',
                    url: url,

                    dataType: 'json',
                    data: JSON.stringify({'login': this.get('username'), 'password': this.get('password')}),
                    success: function (msg) {
                        self.set('id', msg.id);
                        self.getUserInfo();
                    },
                    error: function (msg) {
                        self.trigger('invalidLoginPassword', msg.responseJSON.message);
                    }
                });
            },
            checkAuth : function() {
                var self = this;
                $.ajax({
                    method: 'GET',
                    url: '/api/session/',
                    success: function (msg) {
                        self.set('authed', true);
                        self.set('id', msg.id);
                        self.getUserInfo();
                    },
                    error: function (msg) {
                        self.userLogout();
                    }
                });
            },
            getUserInfo : function() {
                var self = this;
                $.ajax({
                    method: 'GET',
                    url: '/api/user/' + self.get('id'),

                    success: function (msg) {
                        self.set('authed', true);
                        self.set('score', msg.score);
                        self.set('username', msg.login);
                        self.trigger('userAuthed');
                    },
                    error: function (msg) {
                    }
                });
            }
        });

        return User;
    }
);