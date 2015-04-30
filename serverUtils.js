
/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var zlib    = require('zlib'),
    Utils   = function () {
        'use strict';
    };

Utils.prototype.returnBuffer = function (buffer, request, response) {
    'use strict';
    var code = 200,
        headers = {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=data.bin',
            'Access-Control-Allow-Origin': '*'
        };

    this.returnContent(code, buffer, headers, 'binary', request, response);
};

Utils.prototype.returnJson = function (content, request, response) {
    'use strict';
    var code = 200,
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

    this.returnContent(code, JSON.stringify(content), headers, 'text', request, response);
};

Utils.prototype.returnPlain = function (content, request, response) {
    'use strict';
    var code = 200,
        headers = {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        };

    this.returnContent(code, content, headers, 'text', request, response);
};

Utils.prototype.returnContent = function (code, content, headers, type, request, response) {
    'use strict';
    var encoding = request.headers['accept-encoding'],
        returnPlain = function (code, content, headers) {
            response.writeHead(code, headers);
            if (type === 'binary') {
                response.end(content, 'binary');
            } else {
                response.end(content);
            }
        };

    if (encoding && encoding.indexOf('gzip') !== -1) {
        zlib.gzip(content, function (err, result) {
            if (!err) {
                headers['Content-Encoding'] = 'gzip';
                response.writeHead(200, headers);
                response.end(result);
            } else {
                returnPlain(code, content, headers);
            }
        });
    } else {
        returnPlain(code, content, headers);
    }
};

module.exports = Utils;
