var require = {
    urlArgs: '_=' + (new Date()).getTime(),
    baseUrl: 'js',
    paths: {
        underscore: 'lib/underscore',
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        three : 'lib/three.min',
        OBJLoader: 'lib/OBJLoader',
        Key: 'lib/KeyboardBoomber',
        OrbitControls: 'lib/OrbitControls',
        Detector: 'lib/Detector',
        webcam : 'lib/webcam.min',
        app :'views/GameModules/app'
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
        'Key': {
            exports: 'Key'
        },
        'Detector': {
            exports: 'Detector'
        },
        'webcam': {
            exports: 'webcam'
        },
        'app': {
            exports: 'app'
        }
    }
};