define(function (require) {
    var $ = require('jquery');
    var THREE = require('three');
    var app = require('views/GameModules/app');
    var world = require('views/GameModules/worldBuilder');
    
    var Character = {
        init: function (args) {
            'use strict';
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
        // Rotate the character
        rotate: function () {
            'use strict';
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
            'use strict';
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
});