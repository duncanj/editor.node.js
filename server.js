var http = require('http'), 
	path = require("path")
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

var workDir = "./workspace";

 	
http.createServer(function (req, res) {
  console.log(when()+" Request from "+req.connection.remoteAddress+" for "+req.url)
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
      console.log(when()+" An error occurred:");
      console.log(e);      
    }
    return;
  } 
  if( req.url == '/@configuration' ) {      
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('configuration: {"workDir": "'+workDir+'"}\n');
    return;
  }  
  if( req.url.indexOf('/@edit/') == 0 ) {
  	try {
        var pageRef = req.url.substring(7);
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        var editResource = workDir + '/' + pageRef;
        
        console.log(when()+" Edit request for "+editResource);
        
        // need to upgrade to 0.6 or 0.8 for fs.existsSync: https://github.com/viatropos/tower/issues/341
        //if( path.existsSync(editResource) ) {
        // I have upgraded!
        if( fs.existsSync(editResource) ) {
            body = "edit the page: "+ pageRef;        
        } else {
            body = "Could not edit the page: "+ pageRef + " - it doesn't exist (yet)";
        }    
        var out = "<html><head>"
        + "</head><body>"
        + body
        + "</body></html>\n";
        res.end(out);        
  	} catch (e) {
        console.log(when()+" An error occurred:");
        console.log(e);     
        
        // attempt to send something useful back to the client
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Error: '+e+'\n');      
    }
    return;
  }
  
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('You requested '+req.url+'\n');
  
}).listen(80);
console.log(when()+' Server re/started on port 80.');

function when() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');	
}
