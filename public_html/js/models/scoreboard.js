define(
    ['backbone','underscore'],
    function(Backbone, $, underscore) {
    var ScoreboardModel = Backbone.Model.extend({
        getScores: function() {
            this.sync();
            this.order();
            return {scores: this.get('scores')};
        },
        sync : function () {
            this.set('scores',
                [{name: 'Alex', score: 200},
                    {name: 'Sasha', score: 100},
                    {name: 'Ed', score: 100},
                    {name: 'Dima', score: 100},
                    {name: 'Lex', score: 300},
                    {name: 'Unknown', score: 100},
                    {name: 'max', score: 1000500},
                    {name: 'player', score: 100}
                ]
            );
        },
        order: function () {
            var scores = this.get('scores');
            scores = _.sortBy(scores, 'name');
            scores = _.sortBy(scores, function(obj){return (0 - obj.score)});
            this.set('scores', scores);
        }
    });
    return new ScoreboardModel();
})