/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var Bucles = function () {
        'use strict';
    };

Bucles.recursiveFor = function (expr, begin, condition, modifier, call, callback) {
    'use strict';
    var self = this,
        counter = begin,
        recursive = function () {
            if (condition()) {
                call(function () {
                    setImmediate(function () {
                        recursive();
                    });
                });
            } else {
                callback();
            }
            modifier();
        };

    console.log(expr);
    begin();
    recursive();
};

module.exports = Bucles;


