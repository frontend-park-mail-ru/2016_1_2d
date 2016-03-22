var require = {
    urlArgs: '_=' + (new Date()).getTime(),
    baseUrl: 'js',
    paths: {
        underscore: 'lib/underscore',
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        three : 'lib/three.min',
        stats: 'lib/stats.min',
        OBJLoader: 'lib/OBJLoader',
        Key: 'lib/KeyboardBoomber',
        OrbitControls: 'lib/OrbitControls',
        Detector: 'lib/Detector'
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
        'stats': {
            exports: 'stats.min'
        },
        'Key': {
            exports: 'Key'
        },
        'Detector': {
            exports: 'Detector'
        },
        'OrbitControls': {
            deps: ['three'],
            exports: 'OrbitControls'
        }
    }
};