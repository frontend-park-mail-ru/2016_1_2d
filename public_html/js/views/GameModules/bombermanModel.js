define(function (require) {
    var objects = require('views/GameModules/worldBuilder');
    var THREE = require('three');
    var OrbitControls = require('OrbitControls');
    var Key = require('Key');

    var keyboard = new KeyboardState();

    function init() {
        var scene, renderer, loader, camera, controls;
        // var clock = THREE.Clock();

        scene = objects.scene;
        loader = objects.loader;
        renderer = objects.renderer;
        camera = objects.camera;
        controls = objects.controls;

        var geometry = new THREE.SphereGeometry( 6, 6, 8 );
        var material = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0,6,0);
        objects.player = mesh;
        objects.scene.add(mesh);


        // loader.load('../media/game/models/Bomberman/Bomberman.obj', function (object) {
        //
        //     var texture = THREE.ImageUtils.loadTexture('../media/game/models/Bomberman/AltBombers/blue_body.png', {}, function () {
        //         renderer.render(scene, camera);
        //     });
        //     objects.player = new THREE.MeshBasicMaterial({map: texture});
        //
        //     object.traverse(function (child) {
        //         if (child instanceof THREE.Mesh) {
        //             child.material = objects.player;
        //             child.scale.set(0.2, 0.2, 0.2)
        //         }
        //     });
        //     //then directly add the object
        //     scene.add(object);
        // }
        // );
        console.log(objects.player.position);
        animate();
    }
    function animate() {
        requestAnimationFrame( animate );
        render();
        update();
    }
    function update()
    {
        objects.keyboard.update();

        var moveDistance = 5;

        if ( objects.keyboard.down("left") ) {
            objects.player.position.x(-0.5);
        }

        if ( objects.keyboard.down("right") )
            objects.player.translateX(  5 );

        if ( objects.keyboard.pressed("A") )
            objects.player.translateX( -moveDistance );

        if ( objects.keyboard.pressed("D") )
            objects.player.translateX(  moveDistance );

        if ( objects.keyboard.down("R") )
            objects.player.material.color = new THREE.Color(0xff0000);
        if ( objects.keyboard.up("R") )
            objects.player.material.color = new THREE.Color(0x0000ff);

        objects.controls.update();
    }
    function render() {
        objects.renderer.render( objects.scene, objects.camera );
    }
    
    return {
        init:init
    };
    
});