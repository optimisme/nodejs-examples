/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var SortObj = function (val, next) {
        'use strict';
        this.val = val;
        this.next = next;
    },
    SortList = function () {
        'use strict';
        this.first = null;
        this.counter = 0;
    },
    ArraySort = function () {
        'use strict';
    };

SortList.prototype.add = function (val, compare, callback) {
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
            return a.charAt(i) < b.charAt(i) ? -1 : 1;
        },
        recursive = function (ptr, first) {
            var tmp = new SortObj('', null),
                cmp = false;

            if (compare !== null) {
                cmp = compare(val, ptr.val);
            } else if (typeof val === 'string') {
                cmp = strCmp(val, ptr.val);
            } else {
                cmp = val - ptr.val;
            }
            if (cmp < 0) {
                tmp.val = ptr.val;
                tmp.next = ptr.next;
                if (first) {
                    self.first = new SortObj(val, new SortObj(tmp.val, tmp.next));
                } else {
                    ptr.val = val;
                    ptr.next = new SortObj(tmp.val, tmp.next);
                }
                callback();
            } else if (ptr.next === null) {
                ptr.next = new SortObj(val, null);
                callback();
            } else {
                setImmediate(function () {
                    recursive(ptr.next, false);
                });
            }
        };

    this.counter = this.counter + 1;

    if (this.first === null) {
        this.first = new SortObj(val, null);
        callback();
    } else {
        recursive(this.first, true);
    }
};

SortList.prototype.getArray = function (callback) {
    'use strict';
    var self = this,
        rst = [],
        recursive = function (pos, ptr) {
            rst[pos] = ptr.val;
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

ArraySort.compute = function (arr, arg1, arg2) {
    'use strict';
    var self = this,
        compare = null,
        callback = null,
        sortList = new SortList(),
        recursive = function (pos) {
            if (pos < arr.length) {
                sortList.add(arr[pos], compare, function () {
                    recursive(pos + 1);
                });
            } else {
                sortList.getArray(callback);
            }
        };

    if (arguments.length === 2) {

        compare = null;
        callback = arg1;

    } else if (arguments.length === 3) {

        compare = arg1;
        callback = arg2;
    }

    recursive(0);
};

module.exports = ArraySort;
