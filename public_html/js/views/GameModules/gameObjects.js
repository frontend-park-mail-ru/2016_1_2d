define(function (require) {
    var THREE = require('three');

    var objects = {
        getRealCoordinates: function (x, z) {
            return {
                x: -x * 64 + 992, 
                z: z * 64 - 992
            }
        },
        scene: null,
        camera: null,
        light: null,
        renderer: null,
        firstCharacter: null,
        objects: {},
        obstacles: [],
        addObjectToWorld: function (type, obj_geometry, id, x, z) { // needed to place objects by x, y and its id
            var realObj = new THREE.Mesh(obj_geometry, type);
            var coordinates = this.getRealCoordinates(x, z);
            realObj.position.set(coordinates.x, 32, coordinates.z);
            this.obstacles.push(realObj);
            this.objects.id = {
                
            };
            this.scene.add(realObj);
        },
        
    };
    
    return objects;

});