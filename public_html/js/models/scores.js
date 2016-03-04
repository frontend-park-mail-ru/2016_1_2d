define(function(require) {
        var Backbone = require('backbone');
        var Score = Backbone.Model.extend({
            default: {
                'username' : '',
                'score': 0
            }
        });
        return Score;
    });