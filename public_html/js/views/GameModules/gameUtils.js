define(function (require) {
    var $ = require('jquery');
    var THREE = require('three');
    var OBJLoader = require('OBJLoader');
    var Detector = require('Detector');
    var OrbitControls = require('OrbitControls');
    var Key = require('Key');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(26, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var controls =  new THREE.OrbitControls(camera, renderer.domElement);
    var lights =  new THREE.PointLight(0xffffff);

    var tools = {
        returnScene: function () {
        
            return scene
        },
        returnCamera: function () {
    
            return camera
        },
        returnRenderer: function () {
    
            return renderer
        },
        returnControls: function () {
            return controls
        },
        returnLights: function () {
            return lights
        },

};
    return tools;
});