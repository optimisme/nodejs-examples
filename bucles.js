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

Bucle.recursive = function (arr, func, callback) {
    'use strict';
    var recursive = function (counter, tick) {
            if (counter < arr.length) {
                func(arr[counter], function () {
                    if (tick < 100) {
                        setImmediate(function () {
                            recursive(counter + 1, tick + 1);
                        });
                    } else {
                        setTimeout(function () {
                            recursive(counter + 1, 0);
                        }, 0);
                    }
                });
            } else {
                callback();
            }
        };
    recursive(0, 0);
};

module.exports = Bucles;


