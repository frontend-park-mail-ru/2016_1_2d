define(function (require) {
    var jQuery = require('jquery');
    var THREE = require('three');
    var world = require('views/GameModules/worldBuilder');
    var Character = require('views/GameModules/character');

    var BasicScene = {
        init: function () {
            'use strict';
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
            this.scene.add(this.camera);
            this.light = new THREE.PointLight();
            this.light.position.set(-256, 256, -256);
            this.scene.add(this.light);
            this.renderer = new THREE.WebGLRenderer();
            // Define the container for the renderer
            this.container = jQuery('#basic-scene');
            // Create the user's character
            this.user = Character.init({
                color: 0x7A43B6
            });
            this.scene.add(this.user.mesh);
            this.world = world.init({
                color: 0xF5F5F5
            });
            this.scene.add(this.world.mesh);
            // Define the size of the renderer
            this.setAspect();
            // Insert the renderer in the container
            this.container.prepend(this.renderer.domElement);
            // Set the camera to look at our user's character
            this.setFocus(this.user.mesh);
            this.setControls();
        },
        // Event handlers
        setControls: function () {
            'use strict';
            var user = this.user,
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
            // jQuery(window).resize(function () {
            //     // Redefine the size of the renderer
            //     basicScene.setAspect();
            // });
        },
        // Defining the renderer's size
        setAspect: function () {
            'use strict';
            var w = this.container.width(),
                h = jQuery(window).height();
            this.renderer.setSize(w, h);
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        },
        // Updating the camera to follow and look at a given Object3D / Mesh
        setFocus: function (object) {
            'use strict';
            this.camera.position.set(object.position.x, object.position.y + 128, object.position.z - 256);
            this.camera.lookAt(object.position);
        },
        // Update and draw the scene
        frame: function () {
            'use strict';
            this.user.motion();
            // Set the camera to look at our user's character
            this.setFocus(this.user.mesh);
            this.renderer.render(this.scene, this.camera);
        }
    };
    return BasicScene;
});