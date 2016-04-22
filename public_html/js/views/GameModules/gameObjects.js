define(function (require) {
    var THREE = require('three');

    var objects = {
        scene: null,
        camera: null,
        light: null,
        renderer: null,
        firstCharacter: null,
        objects: {}, // here we dump all links to obstacle index by id of object
        obstacles: [], // here we dump all our obstacles for raycaster
        getRealCoordinates: function (x, z) {
            return {
                x: -x * 64 + 992,
                z: z * 64 - 992
            }
        },
        addObjectToWorld: function (type, obj_geometry, id, x, z) { // needed to place objects by x, y and its id
            var realObj = new THREE.Mesh(obj_geometry, type);
            var coordinates = this.getRealCoordinates(x, z);
            realObj.position.set(coordinates.x, 32, coordinates.z);
            this.obstacles.push(realObj);
            this.objects[id] = {
                index: this.obstacles.indexOf(realObj)
            };
            this.scene.add(realObj);
        },
        addPlayerToWorld: function (id, object) {
            this.obstacles.push(object);
            this.objects[id] = {
                index: this.obstacles.indexOf(object)
            };
        },
        deleteObjectFromWorld: function (id) {
            if(this.objects[id]) {
                this.scene.remove(this.obstacles[this.objects[id].index]);
                this.obstacles.splice( this.objects[id].index, 1 );
                delete this.objects[id];
            }
        }
        
    };
    
    return objects;

});