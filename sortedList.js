/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var SortedListObj = function (value, position, next) {
        'use strict';
        this.value = value;
        this.position = position;
        this.next = next;
    },
    SortedList = function (decrease) {
        'use strict';
        this.first = null;
        this.length = 0;
        this.decrease = decrease || false;
    };

SortedList.prototype.add = function (value, position, callback) {
    'use strict';
    var self = this,
        newElement = new SortedListObj(value, position, null),
        recursive = function (element) {

            if (self.first === null) {

                self.first = newElement;
                callback();

            } else if ((value > self.first.value && self.decrease) || (value < self.first.value && !self.decrease)) {

                newElement.next = self.first;
                self.first = newElement;
                callback();

            } else if (element.next === null) {

                element.next = newElement;
                callback();

            } else if ((value > element.next.value && self.decrease) || (value < element.next.value && !self.decrease)) {

                newElement.next = element.next;
                element.next = newElement;
                callback();

            } else {

                setImmediate(function () {
                    recursive(element.next);
                });
            }
        };

    this.length = this.length + 1;
    recursive(this.first);
};

module.exports = SortedList;


