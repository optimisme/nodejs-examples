/*global console*/
/*global global*/
/*global module*/
/*global process*/
/*global require*/
/*global setImmediate*/

var http    = require('http'),
    Server  = require('./server.js'),
    app     = new Server();

console.log("------------------------------------------------------");
console.log("This example shows how to run a simple server and return");
console.log("different data types with compression (if accepted).");

console.log("\nStarting server...");
process.on('SIGINT', function () {
    'use strict';
    app.stop(function () {
        process.exit();
    });
});

process.on('exit', function (code) {
    'use strict';
});

app.start();

// Test server:
var callServer = function (path) {
    'use strict';
    var self = this,
        options = {
            host : app.config.ip,
            port : app.config.port,
            path : path,
            method : 'POST'
        },
        rst = '',
        req;


    req = http.request(options, function (res) {
        res.on('data', function (chunk) {
            rst = rst + chunk;
        });
        res.on('end', function () {
            console.log(rst);
        });
    });

    req.write('');
    req.end();
    req.on('error', function (e) {
        console.log('Error');
        console.log(e);
    });
};

setTimeout(function () {
    'use strict';
    var path = "/buffer",
        url = app.config.ip + ":" + app.config.port;
    console.log("\nCall server at: " + url);
    callServer(path);
}, 1500);

setTimeout(function () {
    'use strict';
    var path = "/json",
        url = app.config.ip + ":" + app.config.port;
    console.log("\nCall server at: " + url);
    callServer(path);
}, 3000);

setTimeout(function () {
    'use strict';
    var path = "/plain",
        url = app.config.ip + ":" + app.config.port;
    console.log("\nCall server at: " + url);
    callServer(path);
}, 4500);
