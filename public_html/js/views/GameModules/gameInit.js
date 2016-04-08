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
            gameObjects.light = new THREE.PointLight();
            gameObjects.light.position.set(-256, 256, -256);
            gameObjects.scene.add(gameObjects.light);
            gameObjects.renderer = new THREE.WebGLRenderer();
            this.container = $('#game-canvas');
            Character.init({color: 0xff0000});
            gameObjects.scene.add(Character.mesh);

            World.init();
            gameObjects.scene.add(World.mesh);
            
            this.setAspect();
            this.container.prepend(gameObjects.renderer.domElement);
            
            // Set the camera to look at our user's character
            this.setFocus(Character.mesh);
            this.setControls();

        },
        setControls: function () {
            var user = Character,
                controls = {
                    left: false,
                    up: false,
                    right: false,
                    down: false
                };
            jQuery(document).keydown(function (e) {
                var prevent = true;
                switch (e.keyCode) {
                    case 37:
                        controls.left = true;
                        break;
                    case 38:
                        controls.up = true;
                        break;
                    case 39:
                        controls.right = true;
                        break;
                    case 40:
                        controls.down = true;
                        break;
                    default:
                        prevent = false;
                }
                if (prevent) {
                    e.preventDefault();
                } else {
                    return;
                }
                // Update the character's direction
                user.setDirection(controls);
            });
            jQuery(document).keyup(function (e) {
                var prevent = true;
                switch (e.keyCode) {
                    case 37:
                        controls.left = false;
                        break;
                    case 38:
                        controls.up = false;
                        break;
                    case 39:
                        controls.right = false;
                        break;
                    case 40:
                        controls.down = false;
                        break;
                    default:
                        prevent = false;
                }
                if (prevent) {
                    e.preventDefault();
                } else {
                    return;
                }
                // Update the character's direction
                user.setDirection(controls);
            });
            // On resize
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
            gameObjects.camera.position.set(object.position.x, object.position.y + 200, object.position.z - 512);
            gameObjects.camera.lookAt(object.position);
        },
        frame: function () {
            Character.motion();
            this.setFocus(Character.mesh);
            gameObjects.renderer.render(gameObjects.scene, gameObjects.camera);
        }

    };

    return BasicScene;
});