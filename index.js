var http = require("http"); 
var fs = require("fs");
var episodes = require("./episodes");
var url = require('url');

http.createServer(function(req,res) {
  //var path = url.toLowerCase();
  var pathname = url.parse(req.url).pathname;

  switch(pathname) {

    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(episodes.getAll()));
      res.end();
      
      break;
      
    case '/get':

      // parse the query string
      var thisquery = url.parse(req.url, true).query;

      res.writeHead(200, {'Content-Type': 'text/plain'});
      if(episodes.getOne(thisquery.epnum)) {
        res.write(JSON.stringify(episodes.getOne(thisquery.epnum)));
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify({wat:'Not an episode.'}));
        res.end();
      }
      res.end();

      break;

    case '/kill':

      // parse the query string
      var thisquery = url.parse(req.url, true).query;

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(episodes.killOne(thisquery.epnum)));
      res.end();

      break;

    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);