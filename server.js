var http = require('http'), 
 	fs = require("fs");

// sudo npm install winston
/*
var winston = require('winston');
logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({'timestamp':true})
    ]
}); 	
*/
 	
http.createServer(function (req, res) {
  console.log("Request for "+req.url)
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
  	res.end('You requested '+req.url+'\n');
  }
}).listen(80);
console.log('Server running on port 80, hopefully');
