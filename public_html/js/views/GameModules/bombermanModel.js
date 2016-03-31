define(function (require) {
    var objects = require('views/GameModules/worldBuilder');
    var THREE = require('three');
    var OrbitControls = require('OrbitControls');
    var Key = require('Key');
    var keyboard;
    var player;
    var scene, renderer, loader, camera, controls;
    var clock = THREE.Clock();

    function init() {
        scene = objects.scene;
        loader = objects.loader;
        renderer = objects.renderer;
        camera = objects.camera;
        controls = objects.controls;
        keyboard = objects.keyboard;

        loader.load('../media/game/models/Bomberman/Bomberman.obj', function (object) {

            var texture = THREE.ImageUtils.loadTexture('../media/game/models/Bomberman/AltBombers/blue_body.png', {}, function () {
                renderer.render(scene, camera);
            });
            var player = new THREE.MeshBasicMaterial({map: texture});
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = player;
                    child.scale.set(0.2, 0.2, 0.2)
                }
            });
            //then directly add the object
            scene.add(object);
        }
        );
        animate();
    }
    function animate() {
        requestAnimationFrame( animate );
        render();
        update();
    }
    function update() {
        keyboard.update();

        var moveDistance = 50 * clock.getDelta();

        if ( keyboard.down("left") )
            player.translateX( -50 );

        if ( keyboard.down("right") )
            player.translateX(  50 );

        if ( keyboard.pressed("A") )
            player.translateX( -moveDistance );

        if ( keyboard.pressed("D") )
            player.translateX(  moveDistance );

        if ( keyboard.down("R") )
            player.material.color = new THREE.Color(0xff0000);
        if ( keyboard.up("R") )
            player.material.color = new THREE.Color(0x0000ff);

        controls.update();
    }
    function render()
    {
        renderer.render( scene, camera );
    }
    
    return {
        init:init
    };
    
});