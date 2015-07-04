/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var Bucles = require('./bucles.js'),
    array = [1, 2, 3, 4, 5],
    result = [],
    counter = 0;

console.log("------------------------------------------------------");
console.log("This example shows how to use 'Bucles' object'.");
console.log("Non blocking recursive 'for':");
Bucles.recursiveFor(
    function () {
        'use strict';
        counter = 10;

    },
    function () {
        'use strict';
        return counter > 0;

    },
    function () {
        'use strict';
        counter = counter - 2;

    },
    function (callback) {
        'use strict';
        console.log(counter);
        callback();

    },
    function () {
        'use strict';
        console.log('Done');
    }
);

Bucles.recursive(array,
	function (item, next) {
		result.push(item * 2);
	}, function () {
		console.log(result);
	});
