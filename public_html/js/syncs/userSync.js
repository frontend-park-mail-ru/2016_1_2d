define(function(require) {
    return function(method, model, options) {

        var methods = {

            'create': {
                send: function() {
                    this.register();
                },

                register: function() {


                }
            },

            'read': {

                send: function() {
                    
                },


                check: function() {

                }
            },

            'update': {

                send: function() {

                },

                login: function() {

                },

                logout: function() {

                }
            }
        };

        return methods[method].send();
    };
});
