var sys = require('sys');
var http = require('http');
var url = require('url');


var home = require('./app/controllers/home_controller');
var url_controller = require('./app/controllers/url_controller');

var port = 4567;

var server = http.createServer(function(req, res){
	processUrl(req, res);
});

server.listen(port);

sys.puts("Server is running on port " + port);

function processUrl(req, res)
{
	path = url.parse(req.url).pathname;
	switch(path.split('/')[1]) // Only get the first part
	{
		case '':
			home.handleRequest(req, res);
			break;
		case 'create':
			url_controller.handleRequest(req, res);
			break;
		default:
			res.writeHeader(404, {});
			res.write("Not Found");
			res.end();
	}
}