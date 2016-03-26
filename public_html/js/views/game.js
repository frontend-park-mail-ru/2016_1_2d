define(function (require) {

    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var THREE = require('three');
    var OBJLoader = require('OBJLoader');
    var Detector = require('Detector');
    var OrbitControls = require('OrbitControls');
    var Key = require('Key');
    var WorldBuilder = require('views/GameModules/worldBuilder');
    var utils = require('views/GameModules/gameUtils');
    var viewManager = require('views/viewManager');

    var View = baseView.extend({
        template: tmpl,
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
            
            var x = utils.scene;
            console.log(x); // Здесь null! Хотя мы установили в worldBuildere ему значение ?
        }
        
    });
            return new View();

});
