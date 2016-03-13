define(function(require) {
        var Backbone = require('backbone');
        var $ = require('jquery');
        var User = Backbone.Model.extend({
            default: {
                'id': '',
                'username' : '',
                'password': '',
                'score': ''
            },
            //urlRoot : '/api/user/',
            authorize: function(login, password) {
                if(login.length === 0 || password.length === 0) {
                    this.trigger('invalidLoginPassword');
                } else {
                    this.set('username', login);
                    this.set('password', password);
                    this.sendLoginData('/api/session');
                    this.set('password','');
                }
            },
            registerNew: function(login, password) {
                if(login.length === 0 || password.length === 0) {
                    this.trigger('invalidForm');
                } else {
                    this.set('username', login);
                    this.set('password', password);
                    this.regiserNewUser('/api/user');
                    this.set('password','');
                }
            },
            userLogout: function() {
                var self = this;
                $.ajax({
                    method: 'DELETE',
                    url: '/api/session',
                    success: function (msg) {
                        self.trigger('userLogout');
                    }
                });
            },
            regiserNewUser: function (url) {
                var self = this;
                $.ajax({
                    method: 'PUT',
                    url: url,
                    data: {'login': this.get('username'), 'password': this.get('password')},
                    success: function (msg) {
                        //console.log(msg.message);
                        self.set('id', msg.id);
                        self.getUserInfo();
                        self.trigger('userRegistered');
                    },
                    error: function (msg) {
                        self.trigger('invalidLoginPassword',msg.responseJSON);
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
                        console.log(msg);
                        self.set('id', msg.id);
                        self.getUserInfo();
                    },
                    error: function (msg) {
                        self.trigger('invalidLoginPassword', msg.responseJSON);
                    }
                });
            },
            checkAuth : function() {
                var self = this;
                $.ajax({
                    method: 'GET',
                    url: '/api/session/',
                    success: function (msg) {
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
                    url: '/api/user/'+ self.get('id'),
                    success: function (msg) {
                        self.set('score', msg.score);
                        self.set('username', msg.login);
                        self.trigger('userAuthed');
                    },
                    error: function (msg) {
                    }
                });
            }
        });

        return new User();
    }
);