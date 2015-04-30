/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var ArrayReverse = function () {
        'use strict';
    };

ArrayReverse.compute = function (arr, callback) {
    'use strict';
    var self = this,
        last = arr.length - 1,
        rst = [],
        recursive = function (pos) {
            if (pos < arr.length) {
                rst[pos] = arr[last - pos];
                setImmediate(function () {
                    recursive(pos + 1);
                });
            } else {
                callback(rst);
            }
        };

    rst.length = arr.length;
    recursive(0);
};

module.exports = ArrayReverse;
