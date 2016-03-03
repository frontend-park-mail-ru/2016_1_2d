define(
    ['backbone','underscore','models/scores'],
    function(Backbone, underscore, scores) {

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
                    {name: 'Dima', score: 10011111111},
                    {name: 'Lex', score: 300},
                    {name: 'max', score: 1000500},
                    {name: 'player', score: 100}
                ]);
            }
        });
});
