module.exports = require('./parking.js');


var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('parking\n');
}).listen(80);