define(function(require) {
        var Backbone = require('backbone');
        var underscore = require('underscore');
        var scores = require('models/scores');
        return Backbone.Collection.extend({
            model: scores,

            initialize: function() {
                this.initFakeScores();
            },

            comparator: function(item) {
                return -item.get('score');
            },

            initFakeScores: function() {
                this.set([
                    {name: 'Pasha', score: 200},
                    {name: 'Sasha', score: 100},
                    {name: 'Ed', score: 100},
                    {name: 'Dima', score: 900},
                    {name: 'Lex', score: 300},
                    {name: 'max', score: 100500},
                    {name: 'player', score: 100}
                ]);
            }
        });
});
