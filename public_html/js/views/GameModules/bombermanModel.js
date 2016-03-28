define(function (require) {
    var objects = require('views/GameModules/worldBuilder');
    var THREE = require('three');
    var OrbitControls = require('OrbitControls');
    var Key = require('Key');
    

    function init() {
        var scene = objects.scene;
        var loader = objects.loader;
        var renderer = objects.renderer;
        var camera = objects.camera;
        
        loader.load('../media/game/models/Bomberman/Bomberman.obj', function (object) {

            var texture = THREE.ImageUtils.loadTexture('../media/game/models/Bomberman/AltBombers/blue_body.png', {}, function () {
                renderer.render(scene, camera);
            });
            var materialObj = new THREE.MeshBasicMaterial({map: texture});
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = materialObj;
                    child.scale.set(0.2, 0.2, 0.2)
                }
            });
            //then directly add the object
            scene.add(object);
        });
    }
    
    return {
        init:init
    };
    
});