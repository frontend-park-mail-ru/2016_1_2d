define(function (require) {
        var $ = require('jquery');
        var THREE = require('three');
        var OrbitControls = require('OrbitControls');
        var Key = require('Key');
        var OBJLoader = require('OBJLoader');

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(26, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        var light = new THREE.PointLight(0xffffff);
        var loader = new THREE.OBJLoader();

        function init() {

            renderer.setClearColor(0xEEEEEE, 1.0);
            renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.35);

            setWorldView();
            initGameWorld();

            renderer.render(scene, camera);
            $('#game').append(renderer.domElement); // прикрепляем во вьюху
        }
        function setWorldView() {
            // LIGHT
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

        function initGameWorld() {  // make world
            var planeGeometry = new THREE.PlaneGeometry(80, 60, 1, 1);
            var texture_floor = THREE.ImageUtils.loadTexture('../media/game/textures/grass.jpg', {}, function () {
                renderer.render(scene, camera);
            });
            var planeMaterial = new THREE.MeshPhongMaterial({map: texture_floor});
            var plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -0.5 * Math.PI;
            plane.rotation.z = -0.159 * Math.PI;
            plane.position.x = 3;
            plane.position.y = 0;
            plane.position.z = -5;
            plane.receiveShadow = true;
            scene.add(plane);

            function cub(posX, posY, posZ) {
                var texture = THREE.ImageUtils.loadTexture('../media/game/textures/41.gif', {}, function () {
                    renderer.render(scene, camera);
                });
                var material = new THREE.MeshPhongMaterial({map: texture});
                var cube = new THREE.Mesh(new THREE.CubeGeometry(4, 4, 4), material);
                cube.position.set(posX, posY, posZ);
                cube.rotation.x = -0.5 * Math.PI;
                cube.rotation.z = -0.155 * Math.PI;
                scene.add(cube);
            }

            var arrKub = [];
            for (i = 0; i < 10; i++) {
                arrKub[i] = new cub((Math.random() - 0.5) * 40, 2, (Math.random() - 0.5) * 40)
            }
        }
    return {
        objects: {
            scene: scene,
            camera : camera,
            renderer: renderer,
            controls: controls,
            lights: light,
            loader: loader
        },
        init: init
    };
});