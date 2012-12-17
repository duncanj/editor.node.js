var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World, this is the server\n');
}).listen(8150);
console.log('Server running on port 8150');
