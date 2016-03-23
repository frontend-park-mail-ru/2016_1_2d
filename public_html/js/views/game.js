define(function (require) {

    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var THREE = require('three');
    var OBJLoader = require('OBJLoader');
    var Detector = require('Detector');
    var OrbitControls = require('OrbitControls');
    var Key = require('Key');
    var WorldBuilder = require('views/GameModules/worldBuilder');

    var View = baseView.extend({
        template: tmpl,
        show: function () {
            $('#page').append(this.el);
            this.startGame();
            $(this.el).show();
        },
        hide: function () {
            $('canvas').remove();
            $(this.el).hide();
        },
        startGame: function () { // Выносим в функции все что можно(желательно в другие файлы)
            WorldBuilder();

        }
        
    });
            return new View();

});
