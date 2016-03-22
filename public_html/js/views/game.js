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
        show: function () {
            $('#page').append(this.el);
            this.startGame();
            $(this.el).show();
        },
        hide: function () {
            $('canvas').remove();
            $(this.el).hide();
        },

        startGame: function () { // Выносим в функции все что можно(желательно в другие файлы)
            var self = this;

            var container, light, scene, camera, renderer, controls, keyboard, spotLight;
            var android;

            var animOffset       = 0,   // starting frame of animation
                walking         = false,
                duration        = 1000, // milliseconds to complete animation
                keyframes       = 20,   // total number of animation frames
                interpolation   = duration / keyframes, // milliseconds per frame
                lastKeyframe    = 0,    // previous keyframe
                currentKeyframe = 0;
            init();
            // animate();

            function init() {
                //var stats = initStats();
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(26, window.innerWidth / window.innerHeight, 0.1, 1000);
                renderer = new THREE.WebGLRenderer();
                renderer.setClearColor(0xEEEEEE, 1.0);
                renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.35);
                renderer.shadowMap.Enabled = true;
                container = $(self.el);
                // keyboard = new Key.KeyboardState();
                setWorldView();
                initGameWorld();
                /*	var axes = new THREE.AxisHelper( 20 );
                 scene.add(axes);*/

                android = new THREE.OBJLoader();
                android.load('../media/game/models/Bomberman/Bomberman.obj', addModelToScene);
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


                renderer.render(scene, camera);
                $(self.el).append(renderer.domElement ); // прикрепляем во вьюху

            }
            function setWorldView() {
                controls = new THREE.OrbitControls( camera, renderer.domElement );
                // LIGHT
                light = new THREE.PointLight(0xffffff);
                light.position.set(-100,200,100);
                scene.add(light);
                camera.position.x = -30;
                camera.position.y = 90;
                camera.position.z = 55;
                camera.lookAt(scene.position);

                // add spotlight for the shadows
                spotLight = new THREE.SpotLight(0xffffff);
                spotLight.position.set(-40, 60, -10);
                spotLight.castShadow = true;
                spotLight.castShadow = true;
                scene.add(spotLight);

            }
            function addModelToScene( geometry, materials ) {
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
                // stats.update();
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
            function initGameWorld() { // make world
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

            }

        function addBomberman () { // addPlayer with model
            controls = new THREE.OrbitControls( camera, renderer.domElement );
            // STATS
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.bottom = '0px';
            stats.domElement.style.zIndex = 100;
            container.appendChild( stats.domElement );
            // LIGHT
            var light = new THREE.PointLight(0xffffff);
            light.position.set(-100,200,100);
            scene.add(light);
            // FLOOR
            var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
            floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
            floorTexture.repeat.set( 10, 10 );
            var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
            var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.position.y = -0.5;
            floor.rotation.x = Math.PI / 2;
            scene.add(floor);
            // SKYBOX/FOG
            var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
            var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
            var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
            // scene.add(skyBox);
            scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

            ////////////
            // CUSTOM //
            ////////////

            var jsonLoader = new THREE.JSONLoader();
            jsonLoader.load( "models/android-animations.js", addModelToScene );
            // addModelToScene function is called back after model has loaded

            var ambientLight = new THREE.AmbientLight(0x111111);
            scene.add(ambientLight);

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
                // delta = change in time since last call (seconds)
                delta = clock.getDelta();
                var moveDistance = 100 * delta;
                walking = false;

                if (Gamepad.supported)
                {
                    var pads = Gamepad.getStates();
                    var pad = pads[0]; // assume only 1 player.
                    if (pad)
                    {

                        // adjust for deadzone.
                        if (Math.abs(pad.leftStickX + pad.rightStickX) > 0.3)
                        {
                            android.rotation.y -= delta * (pad.leftStickX + pad.rightStickX);
                            walking = true;
                        }
                        if (Math.abs(pad.leftStickY + pad.rightStickY) > 0.2)
                        {
                            android.translateZ( -moveDistance * (pad.leftStickY + pad.rightStickY) );
                            walking = true;
                        }
                        if ( pad.faceButton0 || pad.faceButton1 || pad.faceButton2 || pad.faceButton3 || pad.select || pad.start )
                        {
                            android.position.set(0,0,0);
                            android.rotation.set(0,0,0);
                        }

                    }
                }

                // move forwards / backwards
                if ( keyboard.pressed("down") )
                    android.translateZ( -moveDistance );
                if ( keyboard.pressed("up") )
                    android.translateZ(  moveDistance );
                // rotate left/right
                if ( keyboard.pressed("left") )
                    android.rotation.y += delta;
                if ( keyboard.pressed("right") )
                    android.rotation.y -= delta;


                var walkingKeys = ["up", "down", "left", "right"];
                for (var i = 0; i < walkingKeys.length; i++)
                {
                    if ( keyboard.pressed(walkingKeys[i]) )
                        walking = true;
                }

                controls.update();
                stats.update();
            }

            function render()
            {
                if ( android && walking ) // exists / is loaded
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
