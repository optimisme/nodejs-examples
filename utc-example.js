/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var UTC = require('./utc.js'),
    date = new Date('1970-01-02T03:04:05.678Z'),
    timestamp = UTC.getTimestamp(date),
    back = UTC.getDate(timestamp);

console.log("------------------------------------------------------");
console.log("This example shows how to use 'UTC' object'.");
console.log("Convert the next date to timestamp and back:");
console.log(date.toUTCString());
console.log(timestamp);
console.log(back.toUTCString());

