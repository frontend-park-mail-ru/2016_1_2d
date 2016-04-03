define(function (require) {
        var tmpl = require('tmpl/settings');
        var baseView = require('views/baseView');
        var user = require('models/user');
        var camera = require('webcam');
    
        var View = baseView.extend({
            template: tmpl,
            requireAuth: true,
            events: {
                'click .change-avatar': function(e) {
                    this.$('.snapshot').fadeIn(600);
                    this.addCamera();
                },
                'click .snapshot__button': function (e) {
                    this.takeSnapshot();
                },
                'click .snapshot__button_finish': function (e) {
                    this.$('.snapshot').fadeOut(0);
                    this.$('#webcam-monitor').height(0);
                    this.removeCamera();
                },

            },
            initialize: function () {
                this.listenTo(user, "userAuthed", this.render);
                this.render();
            },
            render: function () {
                this.$el.html(this.template(user.toJSON()));
            },
            hide: function () {
                if (this.$('.snapshot').css('display') != 'none') {
                    this.$('.snapshot').fadeOut(0);
                    this.$('#webcam-monitor').height(0);
                    this.removeCamera();
                }
                baseView.prototype.hide.call(this);
            },
            addCamera: function () {
                camera.set({
                    width: 240,
                    height: 240,
                    dest_width: 160,
                    dest_height: 140,
                    image_format: 'jpeg',
                    jpeg_quality: 100,
                    force_flash: false,
                    flip_horiz: true,
                    fps: 50
                });
                camera.attach( this.$('#webcam-monitor')[0]);
            },
            takeSnapshot: function () {
                camera.snap( function(data_uri) {
                    document.getElementById('user_avatar').innerHTML = '<img src="'+data_uri+'"/>';
                } );
            },
            removeCamera : function () {
                camera.reset();
            }

        });

        return new View();
    }
);