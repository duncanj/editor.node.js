var http = require('http'), 
 	fs = require("fs");
http.createServer(function (req, res) {
  if( req.url == '/@process.log' ) {
    var logfile = '/var/tmp/editor.node.js-master-server.log';
    try {
   	  fs.readFile(logfile, "binary", function(err, file) {
	  	  if(err) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.write(err + "\n");
          res.end();
          return;
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(file, "binary");
        res.end();

      });    
    } catch (e) {
      console.log("An error occurred:");
      console.log(e);      
    }
    
  } else {
  	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World, this is the server.  You requested '+req.url+'\n');
  }
}).listen(80);
console.log('Server running on port 80, hopefully');
