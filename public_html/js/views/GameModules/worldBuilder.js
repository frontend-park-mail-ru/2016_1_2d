define(function (require) {
        var $ = require('jquery');
        var THREE = require('three');
        var OrbitControls = require('OrbitControls');
        var Key = require('Key');
        var OBJLoader = require('OBJLoader');
    
     function setWorldView() {
        var scene = instance.scene;
        var camera = instance.camera;
        var light = instance.light;

        light.position.set(-100, 200, 100);
        scene.add(light);
        camera.position.x = -30;
        camera.position.y = 90;
        camera.position.z = 55;
        camera.lookAt(scene.position);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        spotLight.castShadow = true;
        scene.add(spotLight);
    }
    
     function initGameWorld () {
        var scene = instance.scene;
        var renderer = instance.renderer;
        var camera = instance.camera;

        var planeGeometry = new THREE.PlaneGeometry(84, 50, 1, 1);
        var texture_floor = THREE.ImageUtils.loadTexture('../media/game/textures/grass.jpg', {}, function () {
            renderer.render(scene, camera);
        });
        var planeMaterial = new THREE.MeshPhongMaterial({map: texture_floor});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.rotation.z = -0.159 * Math.PI;
        plane.position.x = 3;
        plane.position.y = -9;
        plane.position.z = -5;
        plane.receiveShadow = true;
        scene.add(plane);

        function cub(posX, posY, posZ) {
            var texture = THREE.ImageUtils.loadTexture('../media/game/textures/41.gif', {}, function () {
                renderer.render(scene, camera);
            });
            var material = new THREE.MeshPhongMaterial({map: texture});
            var cube = new THREE.Mesh(new THREE.CubeGeometry(4, 4, 4), material);
            cube.position.set(posX+3, posY-9, posZ-5);
            cube.rotation.x = -0.5 * Math.PI;
            cube.rotation.z = -0.155 * Math.PI;
            scene.add(cube);
        }

        var arrKub = [];
        for (i = 0; i < 26; i++) {
            arrKub[i] = new cub(-28, 2, -32 )
        }
    }
    var instance = {
        scene: null,
        camera: null,
        renderer: null,
        controls: null,
        light: null,
        loader: null,
        initializeObjects: function () {
            if (this.scene == null) {
                this.scene = new THREE.Scene();
                //this.camera = new THREE.PerspectiveCamera(26, window.innerWidth / window.innerHeight, 0.1, 1000);
                this.camera = new THREE.OrthographicCamera(
                    window.innerWidth / - 30, window.innerWidth / 30,
                    window.innerHeight / 30, window.innerHeight / - 30,
                    -200, 500 );
                this.renderer = new THREE.WebGLRenderer();
                this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
                this.light = new THREE.PointLight(0xffffff);
                this.loader = new THREE.OBJLoader();
            }
        },
        init: function () {
            this.initializeObjects();
            var scene = this.scene;
            var renderer = this.renderer;
            var camera = this.camera;

            renderer.setClearColor(0xEEEEEE, 1.0);
            renderer.setSize(window.innerWidth/1.15 , window.innerHeight);

            setWorldView();
            initGameWorld();

            renderer.render(scene, camera);
            $('#game').append(renderer.domElement); // прикрепляем во вьюху
        },
        dealloc: function () {
            if (this.scene != null) {
                this.scene = null;
                this.camera = null;
                this.renderer = null;
                this.controls = null;
                this.light = null;
                this.loader = null;
            }
        }
    };
    return instance;
});