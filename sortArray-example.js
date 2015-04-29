/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var SortArray = require('./sortArray.js'),
    arr = ['lorem', 'ipsum', 'ad', 'scripta', 'blandit', 'partiendo', ',', 'eum', 'fastidii', 'accumsan', 'euripidis', 'in', ',', 'eum', 'liber', 'hendrerit', 'an', '.', 'Lorem'],
    rst = [];

console.log("------------------------------------------------------");
console.log("This example shows how to use the 'SortArray' object to ");
console.log("sort one 'array' of 'strings' in a non blocking manner.");
console.log("\nOriginal array:");
console.log(arr);
console.log("\nSorted (non blocking) array:");
SortArray.run(arr, function (rst) {
    'use strict';
    console.log(rst);
});
