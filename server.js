var sys = require('sys');
var http = require('http');
var url = require('url');

var port = 4567;

var server = http.createServer(function(req, res){
	processUrl(req, res);
});

server.listen(port);

sys.puts("Server is running on port " + port);

function processUrl(req, res)
{
	path = url.parse(req.url).pathname;
	switch(path)
	{
		case '/':
			res.writeHeader(200, {'Content-Type': 'text/html'});
			res.write("<h1>Simple URL Shortener written in Node.js</h1>");
			res.end();
			break;
		case '/About':
			res.writeHeader(200, {'Content-Type': 'text/html'});
			res.write("<h2>Some stuff that goes into the about page</h2>");
			res.end();
			break;
		default:
			res.writeHeader(404, {'Content-Type': 'text/html'});
			res.write("Page Not Found at " + path);
			res.end();
	}
}