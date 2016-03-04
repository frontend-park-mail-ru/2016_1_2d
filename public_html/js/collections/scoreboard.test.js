define(function (require) {
    var Backbone = require('backbone');
    var scoreboard = require('collections/scoreboard');
    var underscore = require('underscore');
    QUnit.module("collections/scoreboard");
    var rand = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    QUnit.test("Scoreboard is sorted", function () {
            var collection = new scoreboard();
            _.each(collection.toJSON(), function(item) {
                QUnit.ok(item.score < item.score + 1);
            });
        });


    QUnit.test("Scoreboard is instance of collection", function () {
        var collection = new scoreboard();
        QUnit.ok(collection instanceof Backbone.Collection);
    });

    QUnit.test("Scoreboard sorting in auto", function () {
        var collection = new scoreboard();
        collection.add([
            {name: 'Pasha', score: 200},
            {name: 'Ana', score: 200},
            {name: 'ProGamer', score:200000}
        ]);
        _.each(collection.toJSON(), function(item) {
            QUnit.ok(item.score < item.score + 1);
        });
    });

    });

