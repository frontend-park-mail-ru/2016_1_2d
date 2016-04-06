define(function (require) {
    var THREE = require('three');
    var app = require('views/GameModules/app');
    
    var World = {
        init: function (args) {
            'use strict';
            // Set the different geometries composing the room
            var ground = new THREE.PlaneGeometry(2048, 2048, 1, 1),
                height = 128,
                walls = [
                    new THREE.PlaneGeometry(ground.height, height),
                    new THREE.PlaneGeometry(ground.width, height),
                    new THREE.PlaneGeometry(ground.height, height),
                    new THREE.PlaneGeometry(ground.width, height)
                ],
                obstacles = [
                    new THREE.CubeGeometry(64, 64, 64),
                    new THREE.CubeGeometry(64, 64, 64),
                    new THREE.CubeGeometry(64, 64, 64)
                ],
                texture_floor = THREE.ImageUtils.loadTexture('media/game/textures/grass.jpg', {}, function () {
                    app.renderer.render(app.scene, app.camera);
                }),
                texture_wall = THREE.ImageUtils.loadTexture('media/game/textures/wall.jpg', {}, function () {
                    app.renderer.render(app.scene, app.camera);
                }),
                texture_cub = THREE.ImageUtils.loadTexture('media/game/textures/41.gif', {}, function () {
                    app.renderer.render(app.scene, app.camera);
                }),
                groundMaterial = new THREE.MeshPhongMaterial({map: texture_floor}),
                wallMaterial = new THREE.MeshPhongMaterial({map: texture_wall}),
                cubMaterial = new THREE.MeshPhongMaterial({map: texture_cub}),

                material = new THREE.MeshLambertMaterial(args), i;

            this.mesh = new THREE.Object3D();
            // Set and add the ground
            this.ground = new THREE.Mesh(ground, groundMaterial);
            this.ground.rotation.x = -Math.PI / 2;
            this.mesh.add(this.ground);
            this.walls = [];
            for (i = 0; i < walls.length; i += 1) {
                this.walls.push(new THREE.Mesh(walls[i], wallMaterial));
                this.walls[i].position.y = height / 2;
                this.mesh.add(this.walls[i]);
            }
            this.walls[0].rotation.y = -Math.PI / 2;
            this.walls[0].position.x = ground.width / 2;
            this.walls[1].rotation.y = Math.PI;
            this.walls[1].position.z = ground.height / 2;
            this.walls[2].rotation.y = Math.PI / 2;
            this.walls[2].position.x = -ground.width / 2;
            this.walls[3].position.z = -ground.height / 2;
            this.obstacles = [];
            for (i = 0; i < obstacles.length; i += 1) {
                this.obstacles.push(new THREE.Mesh(obstacles[i], cubMaterial));
                this.mesh.add(this.obstacles[i]);
            }
            this.obstacles[0].position.set(128, 32, 128);
            this.obstacles[1].position.set(0, 32, 320);
            this.obstacles[2].position.set(-128, 32, -320);
        },
        getObstacles: function () {
            'use strict';
            return this.obstacles.concat(this.walls);
        }
    };

        return World;
});

