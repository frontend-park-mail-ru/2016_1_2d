define(function (require) {

    var baseView = require('views/baseView');
    var tmpl = require('tmpl/game');
    var THREE = require('three');

    var View = baseView.extend({
        template: tmpl,
        initialize: function () {
            this.render();
            var self = this;
            var scene, camera, renderer;
            var geometry, material, mesh;

            init();
            animate();

            function init() {

                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 1000;

                geometry = new THREE.BoxGeometry( 200, 200, 200 );
                material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

                mesh = new THREE.Mesh( geometry, material );
                scene.add( mesh );

                renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth / 1.2, window.innerHeight / 1.2 );
                var elem = self.$el;
                elem.append( renderer.domElement );
            }

            function animate() {

                requestAnimationFrame( animate );

                mesh.rotation.x += 0.1;
                mesh.rotation.y += 0.02;

                renderer.render( scene, camera );

            }
        },
        //show: function () {
        //    $('#page').append(this.el);
        //    $(this.el).show();
        //},
        //hide: function () {
        //    $(this.el).remove();
        //
        //}

    });
    return new View();
    }
);