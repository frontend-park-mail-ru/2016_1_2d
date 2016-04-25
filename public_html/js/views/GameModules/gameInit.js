define(function (require) {
    var jQuery = require('jquery');
    var THREE = require('three');
    var gameObjects = require('views/GameModules/gameObjects');
    var Character = require('views/GameModules/character');
    var World = require('views/GameModules/worldBuilder');

    var BasicScene = {
        init: function () {
                gameObjects.scene = new THREE.Scene();
                gameObjects.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 10000);
                gameObjects.scene.add(gameObjects.camera);

                gameObjects.light = new THREE.DirectionalLight(0xffffff, 1);
                gameObjects.light.position.set(-600, 0, -600);
                gameObjects.scene.add(gameObjects.light);
                gameObjects.light1 = new THREE.DirectionalLight(0xffffff, 1);
                gameObjects.light1.position.set(600, 1800, 600);
                gameObjects.scene.add(gameObjects.light1);
                gameObjects.light2 = new THREE.DirectionalLight(0xffffff, 1);


                gameObjects.renderer = new THREE.WebGLRenderer();
                this.container = $('#game-canvas');

                gameObjects.firstCharacter = new Character.init({color: 0xff0000}, {x: 4, z: 6});
                gameObjects.secondCharacter = new Character.init({color: 0x00FF00}, {x: 4, z: 9});


                gameObjects.scene.add(gameObjects.secondCharacter.mesh);
                gameObjects.scene.add(gameObjects.firstCharacter.mesh);
                // gameObjects.addPlayerToWorld(8, gameObjects.firstCharacter.mesh);
                // gameObjects.addPlayerToWorld(9, gameObjects.secondCharacter.mesh);
                gameObjects.firstCharacter.setControls('');
                World.init();
                gameObjects.scene.add(World.mesh);

                jQuery(window).resize(function () {
                    BasicScene.setAspect();
                });
                this.setAspect();
                this.container.prepend(gameObjects.renderer.domElement);
            
        },

        setAspect: function () {
            var w = this.container.width();
            var h = jQuery(window).height();
            gameObjects.renderer.setSize(w, h);
            gameObjects.camera.aspect = w / h;
            gameObjects.camera.updateProjectionMatrix();
        },

        frame: function () {
            gameObjects.firstCharacter.motion();
            gameObjects.secondCharacter.motion();
            // gameObjects.secondCharacter.setDirection({
            //     up:true,
            //     left: false,
            //     down: false,
            //     right: false
            // });
            gameObjects.firstCharacter.setFocus(gameObjects.firstCharacter.mesh , 950);
            gameObjects.renderer.render(gameObjects.scene, gameObjects.camera);
        },
        dealloc: function () {
            gameObjects.scene = undefined;
            gameObjects.camera = undefined;
            gameObjects.light = undefined;
            gameObjects.renderer = undefined;
            gameObjects.firstCharacter = undefined;
            gameObjects.obstacles = [];
            gameObjects.objects = {};
        }
    };

    return BasicScene;
});