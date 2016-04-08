define(function (require) {
    var THREE = require('three');
    var gameObjects = require('views/GameModules/gameObjects');

    var World = {
        init: function () {
            var ground = new THREE.PlaneGeometry(2048, 2048);
            var walls = [
                new THREE.BoxGeometry(2048, 70, 64),
                new THREE.BoxGeometry(2176, 70, 64),
                new THREE.BoxGeometry(2048, 70, 64),
                new THREE.BoxGeometry(2176, 70, 64)
            ];
            var obstacles = [
                new THREE.CubeGeometry(64, 64, 64),
                new THREE.CubeGeometry(64, 64, 64),
                new THREE.CubeGeometry(64, 64, 64)
            ];
            var texture_floor = new THREE.TextureLoader().load('media/game/textures/grass.jpg');
            var texture_wall = new THREE.TextureLoader().load('media/game/textures/wall.jpg');
            var texture_cub = new THREE.TextureLoader().load('media/game/textures/destruct_crate.gif');

            texture_wall.minFilter = THREE.LinearFilter;
            texture_cub.minFilter = THREE.LinearFilter;

            var groundMaterial = new THREE.MeshPhongMaterial({map: texture_floor});
            var wallMaterial = new THREE.MeshPhongMaterial({map: texture_wall});
            var cubMaterial = new THREE.MeshPhongMaterial({map: texture_cub});

            this.defMaterial = cubMaterial;
            this.addSkybox();

            this.mesh = new THREE.Object3D();
            // Set and add the ground
            this.ground = new THREE.Mesh(ground, groundMaterial);
            this.ground.rotation.x = -Math.PI / 2;
            this.mesh.add(this.ground);

            this.walls = [];
            for (var i = 0; i < walls.length; i += 1) {
                this.walls.push(new THREE.Mesh(walls[i], wallMaterial));
                this.walls[i].position.y = 35;
                this.mesh.add(this.walls[i]);
            }

            this.walls[0].rotation.y = -Math.PI / 2;
            this.walls[0].position.x = 1056 ;
            this.walls[1].rotation.y = Math.PI;
            this.walls[1].position.z = 1056;

            this.walls[2].rotation.y = Math.PI / 2;
            this.walls[2].position.x = -1056;

            this.walls[3].position.z = -1056;

            this.obstacles = [];
            for (var i = 0; i < obstacles.length; i += 1) {
                this.obstacles.push(new THREE.Mesh(obstacles[i], cubMaterial));
                this.mesh.add(this.obstacles[i]);
            }
            this.obstacles[0].position.set(128, 32, 128);
            this.obstacles[1].position.set(0, 32, 320);
            this.obstacles[2].position.set(-128, 32, -320);
            this.addObjectToWorld(null, 1, 1);
            this.addObjectToWorld(null, 0, 0);
            this.addObjectToWorld(null, 2, 2);
        },
        addObjectToWorld: function (type, x, z) {
            var obj = new THREE.CubeGeometry(64, 64, 64);

            var realObj = new THREE.Mesh(obj, this.defMaterial);
            this.mesh.add(realObj);
            realObj.position.set(-x * 64 + 992, 32, z * 64 - 992);

            this.obstacles.push(realObj);
            gameObjects.scene.add(realObj);

        },
        getObstacles: function () {
            return this.obstacles.concat(this.walls);
        },
        addSkybox: function () {
            var imagePrefix = "media/game/skybox/panorama/";
            var directions  = ['0004.png',
                '0002.png',
                '0006.png',
                '0005.png',
                '0001.png',
                '0003.png'];
            var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );
            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push( new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] ),
                    side: THREE.BackSide
                }));
            var skyMaterial = new THREE.MeshFaceMaterial( materialArray );

            var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
            gameObjects.scene.add( skyBox );
        }
    };
    return World
});