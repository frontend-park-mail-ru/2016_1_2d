define(function (require) {
    var gameInit = require('views/GameModules/gameInit');
    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var app = require('app');
    var gameObjects = require('views/GameModules/gameObjects');
    var THREE = require('three');

    var View = baseView.extend({
        template: tmpl,
        requireAuth: false,
        gameStartedId: null,
        initialize: function () {
            this.render();
            gameInit.init();
            this.listenTo(app.wsEvents, "object_spawned", this.addObject);
        },
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
            gameInit.addToDOM();
            function animate() {
               self.gameStartedId = requestAnimationFrame(animate);
                gameInit.frame();
            }
            animate();  
        },
        endGame: function () {
            cancelAnimationFrame(this.gameStartedId);
            // gameInit.dealloc();
            $('canvas').remove();
        },
        addObject: function (data) {
            if (data.object_type === 'destructible_wall') {
                gameObjects.addObjectToWorld(gameObjects.worldObjects.destructible_crate, new THREE.CubeGeometry(64, 64, 64), data.id, data.x, data.y);
            }
            if (data.object_type === 'undestructible_wall') {
                gameObjects.addObjectToWorld(gameObjects.worldObjects.indestructible_crate, new THREE.CubeGeometry(64, 64, 64), data.id, data.x, data.y);
            }
        }
        
    });
    return new View();

});
