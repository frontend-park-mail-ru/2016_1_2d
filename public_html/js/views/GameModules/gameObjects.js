define(function (require) {

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
        
        
    };
    
    return objects;

});