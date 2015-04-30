/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var Simplify = require('./arraySimplify.js'),
    simplify = new Simplify(),
    limit = 5,
    arr = [
        [100, 0.10],
        [101, 0.15],
        [102, 0.35],
        [103, 0.75],
        [105, 0.80],
        [107, 0.40],
        [108, 0.32],
        [109, 0.30],
        [110, 0.10],
        [111, 0.08],
        [112, 0.12],
        [114, 0.16],
        [116, 0.50],
        [118, 0.55],
        [121, 0.65],
        [123, 0.70],
        [125, 0.85],
        [126, 0.95],
        [127, 0.70],
        [129, 0.50],
        [130, 0.55]
    ];

console.log("------------------------------------------------------");
console.log("This example shows how to use 'ArraySimplify' object'.");
console.log("Using the next array of 'position/value' pairs:");
console.log(arr);

simplify.compute(limit, arr, function (rst) {
    'use strict';
    console.log("\nThe 'simplified' " + limit + " values array is:");
    console.log(JSON.stringify(rst));
});
