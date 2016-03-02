define(
    ['models/scoreboard', 'views/baseView', 'tmpl/scoreboard'],
    function (scoreboard, baseView, tmpl) {

    var View = baseView.extend({
        template: tmpl,
        render: function () {
            this.$el.html(this.template(this.model.getScores()));
        }
    });

    return new View({model: scoreboard});
});