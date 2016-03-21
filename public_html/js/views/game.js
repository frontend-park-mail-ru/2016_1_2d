define(function (require) {

    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var THREE = require('three');
    var OBJLoader = require('OBJLoader');
    var Detector = require('Detector');
    var OrbitControls = require('OrbitControls');
    var Key = require('Key');

    var View = baseView.extend({
        template: tmpl,

        initialize: function () {
            this.render();

            //var scene, camera, renderer;
            //var geometry, material, mesh;
        },
        show: function () {
            $('#page').append(this.el);
            this.startGame();
            $(this.el).show();
        },
        hide: function () {
            $(this.el).remove();
        },
        startGame: function () {
            var self = this;

            var container, scene, camera, renderer, controls, stats, keyboard;
// custom global variables
            var android;

            init();
            animate();

            function init() {
                //var stats = initStats();
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(26, window.innerWidth / window.innerHeight, 0.1, 1000);
                renderer = new THREE.WebGLRenderer();
                renderer.setClearColor(0xEEEEEE, 1.0);
                renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.35);
                renderer.shadowMap.Enabled = true;
                container = document.getElementById( 'game' );
                keyboard = new Key.THREEx.KeyboardState();
                container.appendChild( renderer.domElement );
                // EVENTS
                //THREEx.WindowResize(renderer, camera);
                //THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
                // CONTROLS
                controls = new THREE.OrbitControls( camera, renderer.domElement );
                // LIGHT
                var light = new THREE.PointLight(0xffffff);
                light.position.set(-100,200,100);
                scene.add(light);
                /*	var axes = new THREE.AxisHelper( 20 );
                 scene.add(axes);*/

                var planeGeometry = new THREE.PlaneGeometry(80, 60,1 ,1);
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


                var loader = new THREE.OBJLoader();
                loader.load('../media/game/models/Bomberman/Bomberman.obj', addModelToScene);
                //{
                //
                //    //if you want to add your custom material
                //    var texture = THREE.ImageUtils.loadTexture('../media/game/models/Bomberman/AltBombers/blue_body.png', {}, function () {
                //        renderer.render(scene, camera);
                //    });
                //    var materialObj = new THREE.MeshBasicMaterial({map: texture});
                //    object.traverse(function (child) {
                //        if (child instanceof THREE.Mesh) {
                //            child.material = materialObj;
                //            child.scale.set(0.2, 0.2, 0.2)
                //        }
                //    });
                //    //then directly add the object
                //    scene.add(object);
                //});


                camera.position.x = -30;
                camera.position.y = 90;
                camera.position.z = 55;
                camera.lookAt(scene.position);

                // add spotlight for the shadows
                var spotLight = new THREE.SpotLight(0xffffff);
                spotLight.position.set(-40, 60, -10);
                spotLight.castShadow = true;
                spotLight.castShadow = true;
                scene.add(spotLight);


                $("#WebGL-output").append(renderer.domElement);
                renderer.render(scene, camera);

                self.$el.append( renderer.domElement ); // прикрепляем во вьюху

            }
            function addModelToScene( geometry, materials )
            {
                // for preparing animation
                for (var i = 0; i < materials.length; i++)
                    materials[i].morphTargets = true;

                var material = new THREE.MeshFaceMaterial( materials );
                android = new THREE.Mesh( geometry, material );
                android.scale.set(10,10,10);
                scene.add( android );
            }
            function animate()
            {
                requestAnimationFrame( animate );
                render();
                update();
            }

            function update()
            {
                if ( keyboard.pressed("z") )
                {
                    // do something
                }
                controls.update();
                stats.update();
            }

            function render()
            {
                if ( android ) // exists / is loaded
                {
                    // Alternate morph targets
                    time = new Date().getTime() % duration;
                    keyframe = Math.floor( time / interpolation ) + animOffset;
                    if ( keyframe != currentKeyframe )
                    {
                        android.morphTargetInfluences[ lastKeyframe ] = 0;
                        android.morphTargetInfluences[ currentKeyframe ] = 1;
                        android.morphTargetInfluences[ keyframe ] = 0;
                        lastKeyframe = currentKeyframe;
                        currentKeyframe = keyframe;
                    }
                    android.morphTargetInfluences[ keyframe ] =
                        ( time % interpolation ) / interpolation;
                    android.morphTargetInfluences[ lastKeyframe ] =
                        1 - android.morphTargetInfluences[ keyframe ];
                }

                renderer.render( scene, camera );
            }

        }
    });
            return new View();

});
