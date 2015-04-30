/*global Buffer*/
/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

// TIP view Openshift logs: tail -f ~/app-root/logs/nodejs.log

var http        = require('http'),
    Utils       = require('./serverUtils.js');

var App = function () {
    'use strict';
    var self = this;
    this.config = {
        clients:    50000,
        ip:         process.env.OPENSHIFT_NODEJS_IP || '192.168.0.103',
        name:       process.env.OPENSHIFT_APP_NAME || 'local',
        port:       process.env.OPENSHIFT_NODEJS_PORT || 16000,
        repo:       process.env.OPENSHIFT_REPO_DIR || '.',
        folder:     process.env.OPENSHIFT_DATA_DIR ? process.env.OPENSHIFT_DATA_DIR.slice(0, -1) : './', // Remove last '/' if OPENSHIFT
        ignore:     false
    };
    this.server     = http.createServer();
    this.sockets    = {};
    this.utils      = new Utils();

    this.server.on('connection', function (socket) {
        self.connection(socket);
    });

    this.server.on('request', function (request, response) {
        self.request(request, response);
    });
};

App.prototype.connection = function (socket) {
    'use strict';
    var self = this,
        counter = 0;

    while (this.sockets.hasOwnProperty(counter.toString())) {
        counter = counter + 1;
    }

    socket.on('close', function () { delete self.sockets[counter.toString()]; });
    self.sockets[counter.toString()] = socket;
};

App.prototype.request = function (request, response) {
    'use strict';
    var url = request.url;

    if (Object.keys(this.sockets).length > this.config.clients) {

        this.utils.returnPlain('Server bussy', request, response);

    } else {

        if (url === '/') {

            this.utils.returnPlain('', request, response);

        } else if (url === '/buffer') {

            this.utils.returnBuffer(new Buffer([0, 1, 2, 3, 4, 5]), request, response);

        } else if (url === '/json') {

            this.utils.returnJson({ json: 'example', result: 'ok' }, request, response);

        } else if (url === '/plain') {

            this.utils.returnPlain('Plain text response', request, response);

        } else {

            this.utils.returnPlain('Unknown URL', request, response);
        }
    }
};

App.prototype.start = function () {
    'use strict';
    this.server.listen(this.config.port, this.config.ip);
    console.log('Server running at: ' + this.config.ip + ':' + this.config.port);
};

App.prototype.stop = function (callBack) {
    'use strict';
    var self = this,
        prop;

    for (prop in self.sockets) {
        if (self.sockets.hasOwnProperty(prop)) {
            self.sockets[prop].destroy();
        }
    }
    this.server.close();
    callBack();
};

// Export as a module
module.exports = App;
