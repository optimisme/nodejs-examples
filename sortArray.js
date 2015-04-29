/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var SortStr = function (str, next) {
        'use strict';
        this.str = str;
        this.next = next;
    },
    SortObj = function () {
        'use strict';
        this.first = null;
        this.counter = 0;
    },
    SortArray = function () {
        'use strict';
    };

SortObj.prototype.add = function (str, callback) {
    'use strict';
    var self = this,
        strCmp = function (a, b) {
            var i = 0,
                n = Math.max(a.length, b.length);
            for (i = 0; i < n; i = i + 1) {
                if (a.charAt(i) !== b.charAt(i)) {
                    break;
                }
            }
            if (i === n) {
                return 0;
            }
            return a.charAt(i) > b.charAt(i) ? -1 : 1;
        },
        recursive = function (ptr, first) {
            var tmp = new SortStr('', null);
            if (strCmp(str, ptr.str) > 0) {
                tmp.str = ptr.str;
                tmp.next = ptr.next;
                if (first) {
                    self.first = new SortStr(str, new SortStr(tmp.str, tmp.next));
                } else {
                    ptr.str = str;
                    ptr.next = new SortStr(tmp.str, tmp.next);
                }
                callback();
            } else if (ptr.next === null) {
                ptr.next = new SortStr(str, null);
                callback();
            } else {
                setImmediate(function () {
                    recursive(ptr.next, false);
                });
            }
        };

    this.counter = this.counter + 1;

    if (this.first === null) {
        this.first = new SortStr(str, null);
        callback();
    } else {
        recursive(this.first, true);
    }
};

SortObj.prototype.getArray = function (callback) {
    'use strict';
    var self = this,
        rst = [],
        recursive = function (pos, ptr) {
            rst[pos] = ptr.str;
            if (ptr.next !== null) {
                setImmediate(function () {
                    recursive(pos + 1, ptr.next);
                });
            } else {
                callback(rst);
            }
        };

    rst.length = this.counter;
    recursive(0, this.first);
};

SortArray.run = function (arr, callback) {
    'use strict';
    var sortObj = new SortObj(),
        recursive = function (pos) {
            if (pos < arr.length) {
                sortObj.add(arr[pos], function () {
                    recursive(pos + 1);
                });
            } else {
                sortObj.getArray(callback);
            }
        };

    recursive(0);
};

module.exports = SortArray;
