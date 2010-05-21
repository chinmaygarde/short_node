var sys = require('sys');
var http = require('http');
var url = require('url');


var home = require('./app/controllers/home_controller')

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
			home.handleRequest(req, res);
			break;
		default:
			res.writeHeader(404, {'Content-Type': 'text/html'});
			res.write("Page Not Found at");
			res.end();
	}
}