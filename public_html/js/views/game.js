define(function (require) {
    var gameInit = require('views/GameModules/gameInit');
    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var app = require('app');
    var gameObjects = require('views/GameModules/gameObjects');
    var THREE = require('three');
    var Character = require('views/GameModules/character');

    var View = baseView.extend({
        template: tmpl,
        requireAuth: false,
        gameStartedId: null,
        initialize: function () {
            this.render();
            gameInit.init();
            this.listenTo(app.wsEvents, "object_spawned", this.addObject);
            this.listenTo(app.wsEvents, "bomberman_spawned", this.spawnBomberman);
            this.listenTo(app.wsEvents, "object_destroyed", this.destroyObject);
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
                this.gameStartedId = null;
                gameInit.dealloc();
                $('canvas').remove();
                gameInit.init();
            }
        },
        spawnBomberman: function (data) {
            if (data.user_id === app.user.get('id')) {
                gameObjects.playersCharacter = new Character.init({color: "rgb(" + Math.random() * 255 + ", " +
                Math.random() * 255 + ", " + Math.random() * 255 + ")"},
                    {x: data.x, z: data.y});
                gameObjects.allCharacters[data.id] = gameObjects.playersCharacter;
                gameObjects.scene.add(gameObjects.playersCharacter.mesh);
                if ( data.y > 15 ) {
                    gameObjects.playersCharacter.setControls('top');
                } else {
                    gameObjects.playersCharacter.setControls('bot');
                }
            } else {
                gameObjects.allCharacters[data.id] = new Character.init({color: "rgb(" + Math.random() * 255 + ", " +
                    Math.random() * 255 + ", " + Math.random() * 255 + ")"},
                    {x: data.x, z: data.y});
                gameObjects.scene.add(gameObjects.allCharacters[data.id].mesh);
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
            if (data.object_type === 'bomb') {
                gameObjects.setBomb(data.id, data.x, data.y);
                return
            }

        },
        destroyObject: function (data) {
            console.log(data);
        }
        
    });
    return new View();

});
