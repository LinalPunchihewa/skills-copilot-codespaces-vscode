// Create web server
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  if (request.method == 'POST') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      var comment = qs.parse(body);
      fs.appendFile('comments.txt', comment.comment + '\n', function(err) {
        if (err) throw err;
        console.log('Comment saved');
        response.end('Comment saved');
      });
    });
  } else {
    fs.readFile('comments.txt', function(err, data) {
      response.end(data);
    });
  }
});

// Listen on port 8000, IP defaults to