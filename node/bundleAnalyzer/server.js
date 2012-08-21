var http = require('http');
var url = require('url');
var bundleAnalyzer = require('./bundleAnalyzer');

http.createServer(function (req, res) {
    var parsed = url.parse(req.url, true);
    try {
        var stats = bundleAnalyzer.getStats();

        res.writeHead(200, {
            "Content-Type" : "application/json"
        });

        res.end(parsed.query.callback + "(" + JSON.stringify(stats) + ")");
    } catch (ex) {
        res.writeHead(500);
        res.end(ex.message);
    }
}).listen(1337);
console.log('Server running at http://localhost:1337/');
