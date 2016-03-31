define(function (require) {

    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var WorldBuilder = require('views/GameModules/worldBuilder');
    var Bomberman = require('views/GameModules/bombermanModel');

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
            WorldBuilder.init();
            Bomberman.init();
            //Bomberman.animate();
        },
        endGame: function () {
            $('canvas').remove();
            WorldBuilder.dealloc()
        }
        
    });
    return new View();

});
