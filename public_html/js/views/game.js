define(function (require) {
    var gameInit = require('views/GameModules/gameInit');
    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');

    var View = baseView.extend({
        template: tmpl,
        requireAuth: false,
        gameStarted: false,
        show: function () {
            baseView.prototype.show.call(this);
            this.gameStarted = true;
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
                    if(self.gameStarted) {
                        requestAnimationFrame(animate);
                        gameInit.frame();
                    }
                }
                animate();
        },
        endGame: function () {
            this.gameStarted = false;
            gameInit.dealloc();
            $('canvas').remove();
        }
        
    });
    return new View();

});
