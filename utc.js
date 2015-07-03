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

UTC.setDate = function (iso) {
    'use strict';
    return Date.UTC(
        iso.substr(0, 4),
        parseInt(iso.substr(5, 2), 10) - 1,
        iso.substr(8, 2),
        iso.substr(11, 2),
        iso.substr(14, 2),
        iso.substr(17, 2),
        iso.substr(20, 3)
    );
};

module.exports = UTC;


