/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var Simplify = function () {
        'use strict';
        this.limit = 0;
        this.arrData = [];
        this.arrSteps = [];
    };

Simplify.prototype.run = function (limit, arr, callback) {
    'use strict';

    // Example of 'arr' data:
    // [[20150101000015000,0.7281675217673182],[20150101000015000,0.7518433248624206]]

    this.limit = limit - 1;
    this.arrData = arr;
    this.arrSteps = [[0, arr.length - 1]];
    this.callback = callback;

    if (this.arrData.length <= this.limit) {
        callback(arr);
    } else {
        this.simplifyArr();
    }
};

Simplify.prototype.getSqSegDist = function (p, p1, p2) {
    'use strict';
    var x = p1[0],
        y = p1[1],
        dx = p2[0] - x,
        dy = p2[1] - y,
        t = 0;

    if (dx !== 0 || dy !== 0) {

        t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2[0];
            y = p2[1];

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = p[0] - x;
    dy = p[1] - y;

    return dx * dx + dy * dy;
};

Simplify.prototype.getMaximumStepDistance = function (begin, end, callback) {
    'use strict';
    var self = this,
        maxObj = {distance: 0, pos: begin},
        recursive = function (pos) {
            var distance = 0;
            if (pos < end) {

                distance = self.getSqSegDist([self.arrData[pos][0], self.arrData[pos][1]],
                                             [self.arrData[begin][0], self.arrData[begin][1]],
                                             [self.arrData[end][0], self.arrData[end][1]]);

                if (distance > maxObj.distance) {
                    maxObj.distance = distance;
                    maxObj.pos = pos;
                }

                setImmediate(function () {
                    recursive(pos + 1);
                });

            } else {
                callback(maxObj);
            }
        };

    recursive(begin);
};

Simplify.prototype.addNextStep = function (callback) {
    'use strict';
    var self = this,
        maxObj = {distance: 0, position: 0, step: 0},
        recursive = function (step) {
            var distance = 0,
                ref = null;
            if (step < self.arrSteps.length) {

                self.getMaximumStepDistance(self.arrSteps[step][0], self.arrSteps[step][1], function (stepObj) {

                    if (stepObj.distance > maxObj.distance) {
                        maxObj.distance = stepObj.distance;
                        maxObj.position = stepObj.pos;
                        maxObj.step = step;
                    }

                    setImmediate(function () {
                        recursive(step + 1);
                    });

                });
            } else {
                ref = self.arrSteps[maxObj.step];
                self.arrSteps = self.arrSteps.slice(0, maxObj.step).concat([[ref[0], maxObj.position]]).concat([[maxObj.position, ref[1]]]).concat(self.arrSteps.slice(maxObj.step + 1));
                callback();
            }
        };

    recursive(0);
};

Simplify.prototype.buildResult = function () {
    'use strict';
    var self = this,
        stepLimit = self.arrSteps.length,
        stepLast = stepLimit - 1,
        rst = [],
        recursive = function (step) {

            var ref = null;

            if (step < stepLimit) {

                ref = self.arrSteps[step][0];
                rst.push(self.arrData[ref]);

                if (step === stepLast) {
                    ref = self.arrSteps[step][1];
                    rst.push(self.arrData[ref]);
                }

                setImmediate(function () {
                    recursive(step + 1);
                });

            } else {

                self.callback(rst);
            }
        };

    recursive(0);
};

Simplify.prototype.simplifyArr = function () {
    'use strict';
    var self = this,
        recursive = function () {

            if (self.arrSteps.length < self.limit) {

                self.addNextStep(function () {
                    setImmediate(function () {
                        recursive();
                    });
                });

            } else {

                self.buildResult();
            }
        };

    recursive();
};

module.exports = Simplify;
