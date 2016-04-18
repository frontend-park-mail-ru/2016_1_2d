define(function (require) {
    var jQuery = require('jquery');
    var THREE = require('three');
    var gameObjects = require('views/GameModules/gameObjects');
    var Character = require('views/GameModules/character');
    var World = require('views/GameModules/worldBuilder');

    var BasicScene = {
        init: function () {
            gameObjects.scene = new THREE.Scene();
            gameObjects.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10000);
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

            gameObjects.firstCharacter = new Character.init({color: 0xff0000}, {x: 5, z: 7});
            
            
            var lol = new  Character.init({color: 0x00FF00}, {x: 4, z: 9});

            gameObjects.scene.add(lol.mesh);
            gameObjects.scene.add(gameObjects.firstCharacter.mesh);

            World.init();
            gameObjects.scene.add(World.mesh);

            this.setAspect();
            this.container.prepend(gameObjects.renderer.domElement);
            
            // Set the camera to look at our user's character
            this.setFocus(gameObjects.firstCharacter.mesh);
            this.setControls();

        },
        setControls: function () {
            var controls = {
                left: false,
                up: false,
                right: false,
                down: false
            };
            function makeControls(status, keyCode) {
                var pressed = false;
                if (status === 'pressed') {
                    pressed = true;
                }
                switch (keyCode) {
                    case 37:
                        controls.left = pressed;
                        break;
                    case 38:
                        controls.up = pressed;
                        break;
                    case 39:
                        controls.right = pressed;
                        break;
                    case 40:
                        controls.down = pressed;
                        break;
                }
                gameObjects.firstCharacter.setDirection(controls);
            }
            jQuery(document).keydown(function (e) {
               makeControls('pressed', e.keyCode);
                e.preventDefault();
            });
            jQuery(document).keyup(function (e) {
                makeControls('none', e.keyCode);
                e.preventDefault();
            });
            jQuery(window).resize(function () {
                BasicScene.setAspect();
            });
        },

        setAspect: function () {
            var w = this.container.width();
            var h = jQuery(window).height();
            gameObjects.renderer.setSize(w, h);
            gameObjects.camera.aspect = w / h;
            gameObjects.camera.updateProjectionMatrix();
        },
        setFocus: function (object) {
            gameObjects.camera.position.set(object.position.x, object.position.y + 400, object.position.z - 950);
            gameObjects.camera.lookAt(object.position);
        },
        frame: function () {
            gameObjects.firstCharacter.motion();
            this.setFocus(gameObjects.firstCharacter.mesh);
            gameObjects.renderer.render(gameObjects.scene, gameObjects.camera);
        }
    };

    return BasicScene;
});