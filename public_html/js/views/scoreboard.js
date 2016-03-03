define(
    ['collections/scoreboard', 'views/baseView', 'tmpl/scoreboard'],
    function (Scoreboards, baseView, tmpl) {

    var View = baseView.extend({
        template: tmpl,
        collection: new Scoreboards(),

        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
        }
    });

    return new View();
});