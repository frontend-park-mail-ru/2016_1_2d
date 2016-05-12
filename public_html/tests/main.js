require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'backbone_validation' : {
            deps: ['backbone'],
            exports: 'backbone_validation'
        }
    }
});
var tests = [
    'collections/scoreboard.test',
    'views/viewManager.test'
];

require(tests, function () {
    QUnit.load();
    QUnit.start();
});