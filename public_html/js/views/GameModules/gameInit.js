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

            gameObjects.light = new THREE.DirectionalLight( 0xffffff, 1 );
            gameObjects.light.position.set(-600, 0, -600);
            gameObjects.scene.add(gameObjects.light);
            gameObjects.light1 = new THREE.DirectionalLight( 0xffffff, 1 );
            gameObjects.light1.position.set(600, 1800, 600);
            gameObjects.scene.add(gameObjects.light1);
            gameObjects.light2 = new THREE.DirectionalLight( 0xffffff, 1 );


            gameObjects.renderer = new THREE.WebGLRenderer();
            this.container = $('#game-canvas');

            gameObjects.firstCharacter = new Character.init({color: 0xff0000}, {x: 31, z: 31});
            
            
            var lol = new  Character.init({color: 0x00FF00}, {x: 4, z: 9});

            gameObjects.scene.add(lol.mesh);
            gameObjects.scene.add(gameObjects.firstCharacter.mesh);
            // gameObjects.addPlayerToWorld(8, gameObjects.firstCharacter.mesh);
            gameObjects.addPlayerToWorld(9, lol.mesh);
            gameObjects.firstCharacter.setControls('top');

            World.init();
            gameObjects.scene.add(World.mesh);
            // gameObjects.firstCharacter.setFocus(gameObjects.firstCharacter.mesh, -950);

            jQuery(window).resize(function () {
                BasicScene.setAspect();
            });
            this.setAspect();
            // gameObjects.camera.position.set(0, 800, 1900);
            // gameObjects.camera.lookAt(World.mesh.position);
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
            gameObjects.firstCharacter.setFocus(gameObjects.firstCharacter.mesh , -950);
            gameObjects.renderer.render(gameObjects.scene, gameObjects.camera);
        }
    };

    return BasicScene;
});