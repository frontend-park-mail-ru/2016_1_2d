define(function (require) {
    var THREE = require('three');
    var gameObjects = require('views/GameModules/gameObjects');

    var World = {
        init: function () {
            var ground = new THREE.PlaneGeometry(2048, 2048, 1, 1);
            var walls = [
                new THREE.BoxGeometry(2098, 70, 70),
                new THREE.BoxGeometry(2098, 70, 70),
                new THREE.BoxGeometry(2098, 70, 70),
                new THREE.BoxGeometry(2098, 70, 70)
            ];
            var obstacles = [
                new THREE.CubeGeometry(64, 64, 64),
                new THREE.CubeGeometry(64, 64, 64),
                new THREE.CubeGeometry(64, 64, 64)
            ];
            var texture_floor = new THREE.TextureLoader().load('media/game/textures/grass.jpg');
            var texture_wall = new THREE.TextureLoader().load('media/game/textures/wall.jpg');
            var texture_cub = new THREE.TextureLoader().load('media/game/textures/41.gif');

            texture_wall.minFilter = THREE.LinearFilter;
            texture_cub.minFilter = THREE.LinearFilter;

            var groundMaterial = new THREE.MeshPhongMaterial({map: texture_floor});
            var wallMaterial = new THREE.MeshPhongMaterial({map: texture_wall});
            var cubMaterial = new THREE.MeshPhongMaterial({map: texture_cub});


            this.mesh = new THREE.Object3D();
            // Set and add the ground
            this.ground = new THREE.Mesh(ground, groundMaterial);
            this.ground.rotation.x = -Math.PI / 2;
            this.mesh.add(this.ground);
            this.addSkybox();
            this.walls = [];
            for (var i = 0; i < walls.length; i += 1) {
                this.walls.push(new THREE.Mesh(walls[i], wallMaterial));
                this.walls[i].position.y = 35;
                this.mesh.add(this.walls[i]);
            }

            this.walls[0].rotation.y = -Math.PI / 2;
            this.walls[0].position.x = 2048 / 2;
            this.walls[1].rotation.y = Math.PI;
            this.walls[1].position.z = 2048 / 2;

            this.walls[2].rotation.y = Math.PI / 2;
            this.walls[2].position.x = -2048 / 2;

            this.walls[3].position.z = -2048 / 2;

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
        },
        addSkybox: function () {
            var imagePrefix = "media/game/skybox/dawnmountain-";
            var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
            var imageSuffix = ".png";
            var skyGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );

            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push( new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
                    side: THREE.BackSide
                }));
            var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
            var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
            gameObjects.scene.add( skyBox );
        }
    };
    return World
});