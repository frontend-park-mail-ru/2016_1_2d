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
            $('canvas').remove();
            $(this.el).hide();

        },
        startGame: function () { // Выносим в функции все что можно(желательно в другие файлы)
            WorldBuilder.init();
            Bomberman.init();
        }
        
    });
    return new View();

});
