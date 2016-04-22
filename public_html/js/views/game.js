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
            baseView.prototype.hide.call(this);
            this.endGame();

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
            gameInit.dealloc();
            $('canvas').remove();
        }
        
    });
    return new View();

});
