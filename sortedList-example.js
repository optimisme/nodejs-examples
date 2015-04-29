/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var SortedList = require('./sortedList.js'),
    listIncrease = new SortedList(),
    listDecrease = new SortedList(true),
    list = [1, 9, 2, 8, 3, 7, 4, 6, 5, 0],
    counter = 0,
    adderDecrease = function () {
        'use strict';
        if (counter < list.length) {
            listDecrease.add(list[counter], counter, function () {
                counter = counter + 1;
                adderDecrease();
            });
        } else {
            console.log("\nSortedList object: (decreasing)");
            console.log(JSON.stringify(listDecrease));
        }
    },
    adderIncrease = function () {
        'use strict';
        if (counter < list.length) {
            listIncrease.add(list[counter], counter, function () {
                counter = counter + 1;
                adderIncrease();
            });
        } else {
            counter = 0;
            adderDecrease();
            console.log("\nSortedList object:");
            console.log(JSON.stringify(listIncrease));
        }
    };

console.log("------------------------------------------------------");
console.log("This example shows how to use 'SortedList' object.");
console.log("Using the next array: [" + list + "]");
adderIncrease();
