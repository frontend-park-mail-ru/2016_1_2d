var require = {
    urlArgs: '_=' + (new Date()).getTime(),
    baseUrl: 'js',
    paths: {
        underscore: 'lib/underscore',
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        three : 'lib/three.min',
        OBJLoader: 'lib/OBJLoader',
        webcam : 'lib/webcam.min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery': {
            exports: 'jquery'
        },
        'underscore': {
            exports: '_'
        },
        'three': {
            exports: 'three'
        },
        'OBJLoader': {
            deps: ['three'],
            exports: 'OBJLoader'
        },
        'webcam': {
            exports: 'webcam'
        }
      
    }
};