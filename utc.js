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
    /*
            var year = '1970',
                month = '01',
                day = '02',
                hour = '03',
                minute = '04',
                second = '05',
                milli = '678';

            if (value.length >= 18) {
                year = value.substr(value.length - 18, 4);
            }
            if (value.length >= 14) {
                month = value.substr(value.length - 14, 2) - 1;
            }
            if (value.length >= 12) {
                day = value.substr(value.length - 12, 2);
            }
            if (value.length >= 10) {
                hour = value.substr(value.length - 10, 2);
            }
            if (value.length >= 8) {
                minute = value.substr(value.length - 8, 2);
            }
            if (value.length >= 6) {
                second = value.substr(value.length - 6, 2);
            }
            if (value.length >= 3) {
                milli = value.substr(value.length - 3);
            }

            rst = new Date(); // Date.UTC(year, parseInt(month, 10) - 1, day, hour, minute, second, milli);
            rst.setUTCFullYear(year);
            rst.setUTCMonth(parseInt(month, 10) - 1);
            rst.setUTCDate(day);
            rst.setUTCHours(hour);
            rst.setUTCMinutes(minute);
            rst.setUTCSeconds(second);
            rst.setUTCMilliseconds(milli);
            rst = rst.getTime();
            console.log(hour);

            console.log(value + ":" + year + "" + month + "" + day + "" + hour + "" + minute + "" + second + "." + milli + ":" + rst + ":" + getDate(rst));

            return rst;
    */

};

UTC.getDate = function (timestamp) {
    'use strict';
    var date = new Date(timestamp);
    return date;
};


module.exports = UTC;


