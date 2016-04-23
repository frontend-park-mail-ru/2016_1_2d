define(function (require) {
    var gameInit = require('views/GameModules/gameInit');
    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');

    var View = baseView.extend({
        template: tmpl,
        requireAuth: false,
        gameStartedId: null,
        show: function () {
            baseView.prototype.show.call(this);
            this.startGame();
        },
        hide: function () {
            baseView.prototype.hide.call(this);
            this.endGame();

        },
        startGame: function () {
            var self = this;
                gameInit.init();
                function animate() {
                   self.gameStartedId = requestAnimationFrame(animate);
                    gameInit.frame();
                }
                animate();
        },
        endGame: function () {
            cancelAnimationFrame(this.gameStartedId);
            gameInit.dealloc();
            $('canvas').remove();
        }
        
    });
    return new View();

});
