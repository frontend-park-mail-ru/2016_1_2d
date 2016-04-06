define(function (require) {
    var apppl = require('views/GameModules/app');
    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');

    var View = baseView.extend({
        template: tmpl,
        requireAuth: false,
        show: function () {
            baseView.prototype.show.call(this);
            this.startGame();
        },
        hide: function () {
            this.endGame();
            $(this.el).remove();

        },
        startGame: function () {
            apppl.init();
            function animate() {
                requestAnimationFrame(animate);
                apppl.frame();
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
