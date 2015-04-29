/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var UTC = function () {
        'use strict';
    };

UTC.getTimestamp = function (date) {
    'use strict';
    return date.getTime();
};

UTC.getDate = function (timestamp) {
    'use strict';
    var date = new Date(timestamp);
    return date;
};


module.exports = UTC;


