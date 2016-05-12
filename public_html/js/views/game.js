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
            if (this.gameStartedId != null) {
                cancelAnimationFrame(this.gameStartedId);
                gameInit.dealloc();
                $('canvas').remove();
                gameInit.init();
            }
        },
        addObject: function (data) {
            if (data.object_type === 'destructible_wall') {
                gameObjects.addObjectToWorld(gameObjects.worldObjects.destructible_crate, new THREE.CubeGeometry(64, 64, 64), data.id, data.x, data.y);
                return
            }
            if (data.object_type === 'undestructible_wall') {
                gameObjects.addObjectToWorld(gameObjects.worldObjects.indestructible_crate, new THREE.CubeGeometry(64, 64, 64), data.id, data.x, data.y);
                return
            }
            if (data.object_type === 'bonus_increase_bomb_range') {
                gameObjects.addObjectToWorldWithNoCollisions(gameObjects.worldObjects.bomb_bonus_range, new THREE.CubeGeometry(64, 64, 64), data.id, data.x, data.y);
                return
            }
            if (data.obect_type === 'bonus_decrease_bomb_spawn_delay') {

            }
            if (data.obect_type === 'bonus_decrease_bomb_explosion_delay') {

            }

        }
        
    });
    return new View();

});
