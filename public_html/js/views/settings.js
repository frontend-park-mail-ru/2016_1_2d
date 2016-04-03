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
                    e.preventDefault();
                    this.addCamera();
                }
            },
            initialize: function () {
                this.listenTo(user, "userAuthed", this.render);
                this.render();
            },
            render: function () {
                this.$el.html(this.template(user.toJSON()));
            },
            addCamera: function () {
                camera.set({
                    width: 380,
                    height: 240,
                    dest_width: 380,
                    dest_height: 240,
                    image_format: 'jpeg',
                    jpeg_quality: 100,
                    force_flash: false,
                    flip_horiz: true,
                    fps: 50
                });
                camera.attach( this.$('#webcam-monitor')[0]);
            },

        });

        return new View();
    }
);