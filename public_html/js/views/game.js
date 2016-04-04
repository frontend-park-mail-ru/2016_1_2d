define(function (require) {

    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var app = require('views/GameModules/app');

    var View = baseView.extend({
        template: tmpl,
        requireAuth: false,
        show: function () {
            this.startGame();
            baseView.prototype.show.call(this);
        },
        hide: function () {
            this.endGame();
            $(this.el).remove();

        },
        startGame: function () {
            app.init();
            function animate() {
                requestAnimationFrame(animate);
                app.frame();
            }
            animate();
        },
        endGame: function () {
            $('canvas').remove();
            // WorldBuilder.dealloc()
        }
        
    });
    return new View();

});
