define(
    ['backbone'],
    function(Backbone) {
        var Score = Backbone.Model.extend({
            default: {
                'username' : 'Test',
                'score': 0
            }
        });
        return Score;
    });