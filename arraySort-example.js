/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var sort = require('./arraySort.js'),
    arrS = ['lorem', 'ipsum', 'ad', 'scripta', 'blandit', 'partiendo', ',', 'eum', 'fastidii', 'accumsan', 'euripidis', 'in', ',', 'eum', 'liber', 'hendrerit', 'an', '.', 'Lorem'],
    arrN = [1, 9, 2, 8, 3, 7, 4, 6, 5, 0],
    arrO = [{min: 9, max: 1}, {min: 1, max: 1}, {min: 2, max: 1}, {min: 4, max: 1}, {min: 2, max: 1}, {min: 3, max: 1}];

console.log("------------------------------------------------------");
console.log("This example shows how to use the 'arraySort' object to ");
console.log("sort one 'array' of 'strings' in a non blocking manner.");
console.log("\nOriginal 'String' array:");
console.log(arrS);
sort.compute(arrS, function (rstS) {
    'use strict';
    console.log("\nSorted array:");
    console.log(rstS);

    console.log("\nOriginal 'Number' array:");
    console.log(arrN);
    sort.compute(arrN, function (rstN) {
        console.log("\nSorted array:");
        console.log(rstN);

        console.log("\nOriginal 'Object' array:");
        console.log(arrO);
        sort.compute(arrO, function (a, b) {
            return a.min - b.min;
        }, function (rstO) {
            console.log("\nSorted array:");
            console.log(rstO);
        });
    });
});
