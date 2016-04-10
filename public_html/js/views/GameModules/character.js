define(function (require) {
    var THREE = require('three');
    var gameObjects = require('views/GameModules/gameObjects');
    var world = require('views/GameModules/worldBuilder');

    var Character = {
        init: function (args) {
            var head = new THREE.SphereGeometry(32, 16, 16),
                hand = new THREE.SphereGeometry(8, 8, 8),
                foot = new THREE.SphereGeometry(16, 4, 8, 0, Math.PI * 2, 0, Math.PI / 2),
                nose = new THREE.SphereGeometry(4, 8, 8),
                material = new THREE.MeshLambertMaterial(args);
            //control camera while player walkig
            this.CameraCharaterPosition = 0;

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
            this.caster = new THREE.Raycaster();
            //Change camera angel like COMPAS for follow player
            this.changeCamera = function (position){
                switch(position){
                    case 0:
                        this.CameraCharaterPosition = position;
                        break;
                    case 1:
                        this.CameraCharaterPosition = position;
                        break;
                    case 2:
                        this.CameraCharaterPosition = position;
                        break;
                    case 3:
                        this.CameraCharaterPosition = position;
                        break;
                }
            };
            // Update the direction of the current motion
            // ассоциация с шутерами, когда "враг на 12 часов" в данном случае 0:12ч 1:3ч ... и т.д.
            // для каждого игрока "свои 12 часов"
            this.setDirection = function (controls) {
                var x, y, z;
                switch (this.CameraCharaterPosition) {
                    case 0:
                        if (controls.left) {
                            this.changeCamera(3);
                            x = 1;
                        } else if (controls.right) {
                            this.changeCamera(1);
                            x = -1;
                        } else {
                            x = 0;
                        }
                        y = 0;
                        if (controls.up) {
                            z = 1;
                        } else if (controls.down) {
                            this.changeCamera(2);
                            z = -1;
                        } else {
                            z = 0;
                        }
                        break;

                    case 1:
                        if (controls.down) {
                            this.changeCamera(3);
                            x = 1;
                        } else if (controls.up) {
                            x = -1;
                        } else {
                            x = 0;
                        }
                        y = 0;
                        if (controls.left) {
                            this.changeCamera(0);
                            z = 1;
                        } else if (controls.right) {
                            this.changeCamera(2);
                            z = -1;
                        } else {
                            z = 0;
                        }
                        break;
                    case 2:
                        if (controls.right) {
                            this.changeCamera(3);
                            x = 1;
                        } else if (controls.left) {
                            this.changeCamera(1);
                            x = -1;
                        } else {
                            x = 0;
                        }
                        y = 0;
                        if (controls.down) {
                            this.changeCamera(0);
                            z = 1;
                        } else if (controls.up) {
                            z = -1;
                        } else {
                            z = 0;
                        }
                        break;
                    case 3:
                        if (controls.up) {
                            x = 1;
                        } else if (controls.down) {
                            this.changeCamera(1);
                            x = -1;
                        } else {
                            x = 0;
                        }
                        y = 0;
                        if (controls.right) {
                            this.changeCamera(0);
                            z = 1;
                        } else if (controls.left) {
                            this.changeCamera(2);
                            z = -1;
                        } else {
                            z = 0;
                        }
                        break;
                }
                this.direction.set(x, y, z);
            };

            this.motion = function () {
                this.collision();
                if (this.direction.x !== 0 || this.direction.z !== 0) {
                    this.rotate();
                    this.move();
                    return true;
                }
            };

            this.collision = function () {
                var collisions;
                var i;
                // Maximum distance from the origin before we consider collision
                var distance = 32;
                // Get the obstacles array from our world
                var obstacles = world.getObstacles();

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
            };

            this.rotate = function () {
                // Set the direction's angle, and the difference between it and our Object3D's current rotation
                var angle = Math.atan2(this.direction.x, this.direction.z),
                    difference = angle - this.mesh.rotation.y;
                // If we're doing more than a 180°
                if (Math.abs(difference) > Math.PI) {
                    // We proceed to a direct 360° rotation in the opposite way
                    if (difference > 0) {
                        this.mesh.rotation.y += 2 * Math.PI;
                        //console.log(this.mesh.rotation.y);
                    } else {
                        this.mesh.rotation.y -= 2 * Math.PI;
                        //console.log(this.mesh.rotation.y);
                    }
                    difference = angle - this.mesh.rotation.y;
                }
                if (difference !== 0) {
                    this.mesh.rotation.y += difference / 4;
                }
            };

            this.move = function () {
                this.mesh.position.x += this.direction.x * ((this.direction.z === 0) ? 4 : Math.sqrt(8));
                this.mesh.position.z += this.direction.z * ((this.direction.x === 0) ? 4 : Math.sqrt(8));
                // using our "step" property ...
                this.step += 1 / 4;
                // hands and feet position
                this.feet.left.position.setZ(Math.sin(this.step) * 16);
                this.feet.right.position.setZ(Math.cos(this.step + (Math.PI / 2)) * 16);
                this.hands.left.position.setZ(Math.cos(this.step + (Math.PI / 2)) * 8);
                this.hands.right.position.setZ(Math.sin(this.step) * 8);
            };

        }
    };
    return Character
});