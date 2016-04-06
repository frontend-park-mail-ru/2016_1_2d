define(function (require) {
    var jQuery = require('jquery');
    var THREE = require('three');

    var BasicScene = {
        container: null,
        init: function () {
            'use strict';
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
            this.scene.add(this.camera);
            this.light = new THREE.PointLight();
            this.light.position.set(-256, 256, -256);
            this.scene.add(this.light);
            this.renderer = new THREE.WebGLRenderer();
            this.container = $('#game-canvas');
            Character.init({
                color: 0x7A43B6
            });
            this.scene.add(Character.mesh);
            world.init();
            this.scene.add(world.mesh);
            // Define the size of the renderer
            this.setAspect();
            // Insert the renderer in the container

            this.container.prepend(this.renderer.domElement);
            // Set the camera to look at our user's character
            this.setFocus(Character.mesh);
            this.setControls();

        },
        // Event handlers
        setControls: function () {
            'use strict';
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
            Character.motion();
            // Set the camera to look at our user's character
            this.setFocus(Character.mesh);
            this.renderer.render(this.scene, this.camera);
        }

    };
    var world = {
        init: function () {
                var ground = new THREE.PlaneGeometry(2048, 2048, 1, 1);
                var walls = [
                    new THREE.PlaneGeometry(2048, 256),
                    new THREE.PlaneGeometry(2048, 256),
                    new THREE.PlaneGeometry(2048, 256),
                    new THREE.PlaneGeometry(2048, 256)
                ];
                console.log(walls[0]);
                var obstacles = [
                    new THREE.CubeGeometry(64, 64, 64),
                    new THREE.CubeGeometry(64, 64, 64),
                    new THREE.CubeGeometry(64, 64, 64)
                ];
                var texture_floor = new THREE.TextureLoader().load('media/game/textures/grass.jpg');
                var texture_wall = new THREE.TextureLoader().load('media/game/textures/wall.jpg');
                var texture_cub = new THREE.TextureLoader().load('media/game/textures/41.gif');

            var groundMaterial = new THREE.MeshPhongMaterial({map: texture_floor});
            var wallMaterial = new THREE.MeshPhongMaterial({map: texture_wall});
            var cubMaterial = new THREE.MeshPhongMaterial({map: texture_cub});


            this.mesh = new THREE.Object3D();
            // Set and add the ground
            this.ground = new THREE.Mesh(ground, groundMaterial);
            this.ground.rotation.x = -Math.PI / 2;
            this.mesh.add(this.ground);
            this.walls = [];
            for (var i = 0; i < walls.length; i += 1) {
                this.walls.push(new THREE.Mesh(walls[i], wallMaterial));
                this.walls[i].position.y = 128;
                this.mesh.add(this.walls[i]);
            }

            this.walls[0].rotation.y = -Math.PI / 2;
            this.walls[0].position.x = 2048 / 2;
            this.walls[1].rotation.y = Math.PI;
            this.walls[1].position.z = 2048 / 2;

            this.walls[2].rotation.y = Math.PI / 2;
            this.walls[2].position.x = -2048 / 2;

            this.walls[3].position.z = -2048 / 2;

            // var geometry = walls[0];
            // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            // var plane = new THREE.Mesh( geometry, material );
            // this.mesh.add(plane);

            this.obstacles = [];
            for (var i = 0; i < obstacles.length; i += 1) {
                this.obstacles.push(new THREE.Mesh(obstacles[i], cubMaterial));
                this.mesh.add(this.obstacles[i]);
            }
            this.obstacles[0].position.set(128, 32, 128);
            this.obstacles[1].position.set(0, 32, 320);
            this.obstacles[2].position.set(-128, 32, -320);
        },
        getObstacles: function () {
            return this.obstacles.concat(this.walls);
        }
    };

    var Character = {
        init: function (args) {
            var head = new THREE.SphereGeometry(32, 16, 16),
                hand = new THREE.SphereGeometry(8, 8, 8),
                foot = new THREE.SphereGeometry(16, 4, 8, 0, Math.PI * 2, 0, Math.PI / 2),
                nose = new THREE.SphereGeometry(4, 8, 8),
                material = new THREE.MeshLambertMaterial(args);
            // Set the character modelisation object
            this.mesh = new THREE.Object3D();
            this.mesh.position.y = 48;
            this.head = new THREE.Mesh(head, material);
            this.head.position.y = 0;
            this.mesh.add(this.head);
            this.hands = {
                left: new THREE.Mesh(hand, material),
                right: new THREE.Mesh(hand, material)
            };
            this.hands.left.position.x = -40;
            this.hands.left.position.y = -8;
            this.hands.right.position.x = 40;
            this.hands.right.position.y = -8;
            this.mesh.add(this.hands.left);
            this.mesh.add(this.hands.right);
            this.feet = {
                left: new THREE.Mesh(foot, material),
                right: new THREE.Mesh(foot, material)
            };
            this.feet.left.position.x = -20;
            this.feet.left.position.y = -48;
            this.feet.left.rotation.y = Math.PI / 4;
            this.feet.right.position.x = 20;
            this.feet.right.position.y = -48;
            this.feet.right.rotation.y = Math.PI / 4;
            this.mesh.add(this.feet.left);
            this.mesh.add(this.feet.right);
            this.nose = new THREE.Mesh(nose, material);
            this.nose.position.y = 0;
            this.nose.position.z = 32;
            this.mesh.add(this.nose);
            this.direction = new THREE.Vector3(0, 0, 0);
            this.step = 0;
            this.rays = [
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(1, 0, 1),
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(1, 0, -1),
                new THREE.Vector3(0, 0, -1),
                new THREE.Vector3(-1, 0, -1),
                new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(-1, 0, 1)
            ];
            // And the "RayCaster", able to test for intersections
            this.caster = new THREE.Raycaster();
        },
        // Update the direction of the current motion
        setDirection: function (controls) {
            'use strict';
            var x = controls.left ? 1 : controls.right ? -1 : 0,
                y = 0,
                z = controls.up ? 1 : controls.down ? -1 : 0;
            this.direction.set(x, y, z);
        },
        motion: function () {
            'use strict';
            this.collision();
            if (this.direction.x !== 0 || this.direction.z !== 0) {
                // Rotate the character
                this.rotate();
                // Move the character
                this.move();
                return true;
            }
        },
        // Test and avoid collisions
        collision: function () {
            'use strict';
            var collisions, i,
            // Maximum distance from the origin before we consider collision
                distance = 32,
            // Get the obstacles array from our world
                obstacles = world.getObstacles();
            for (i = 0; i < this.rays.length; i += 1) {
                this.caster.set(this.mesh.position, this.rays[i]);
                collisions = this.caster.intersectObjects(obstacles);
                if (collisions.length > 0 && collisions[0].distance <= distance) {
                    if ((i === 0 || i === 1 || i === 7) && this.direction.z === 1) {
                        this.direction.setZ(0);
                    } else if ((i === 3 || i === 4 || i === 5) && this.direction.z === -1) {
                        this.direction.setZ(0);
                    }
                    if ((i === 1 || i === 2 || i === 3) && this.direction.x === 1) {
                        this.direction.setX(0);
                    } else if ((i === 5 || i === 6 || i === 7) && this.direction.x === -1) {
                        this.direction.setX(0);
                    }
                }
            }
        },
        rotate: function () {
            // Set the direction's angle, and the difference between it and our Object3D's current rotation
            var angle = Math.atan2(this.direction.x, this.direction.z),
                difference = angle - this.mesh.rotation.y;
            // If we're doing more than a 180°
            if (Math.abs(difference) > Math.PI) {
                // We proceed to a direct 360° rotation in the opposite way
                if (difference > 0) {
                    this.mesh.rotation.y += 2 * Math.PI;
                } else {
                    this.mesh.rotation.y -= 2 * Math.PI;
                }
                difference = angle - this.mesh.rotation.y;
            }
            if (difference !== 0) {
                this.mesh.rotation.y += difference / 4;
            }
        },
        move: function () {
            this.mesh.position.x += this.direction.x * ((this.direction.z === 0) ? 4 : Math.sqrt(8));
            this.mesh.position.z += this.direction.z * ((this.direction.x === 0) ? 4 : Math.sqrt(8));
            // using our "step" property ...
            this.step += 1 / 4;
            // hands and feet position
            this.feet.left.position.setZ(Math.sin(this.step) * 16);
            this.feet.right.position.setZ(Math.cos(this.step + (Math.PI / 2)) * 16);
            this.hands.left.position.setZ(Math.cos(this.step + (Math.PI / 2)) * 8);
            this.hands.right.position.setZ(Math.sin(this.step) * 8);
        }
    };

    return BasicScene;
});