/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/

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
                    setTimeout(function () {
                        recursive();
                    }, 0);
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


