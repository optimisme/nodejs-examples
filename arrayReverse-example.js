/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var reverse = require('./arrayReverse.js'),
    arr = ['lorem', 'ipsum', 'ad', 'scripta'];

console.log("------------------------------------------------------");
console.log("This example shows how to use the 'ArrayReverse' object to ");
console.log("reverse one 'array' of 'strings' in a non blocking manner.");
console.log("\nOriginal array:");
console.log(arr);
reverse.compute(arr, function (rst) {
    console.log("\nReversed array:");
    console.log(rst);
});
