var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World, this is the server\n');
}).listen(80);
console.log('Server running on port 80, hopefully');
