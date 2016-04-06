define(function (require) {
    var gameInit = require('views/GameModules/gameInit');
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
            gameInit.init();
            function animate() {
                requestAnimationFrame(animate);
                gameInit.frame();
            }
            animate();
        },
        endGame: function () {
            $('canvas').remove();
        }
        
    });
    return new View();

});
