var fs = require('fs');
var kiwi = require('kiwi');
var haml = kiwi.require('haml');

var home = exports;

home.handleRequest = function(req, res)
{
	options = {}
	fs.readFile('./app/views/home.haml', function (err, data) {
		if(err)
		{
			res.writeHead(500, {'Content-Type' : 'text/html'});
			res.write("500: Internal server error")
			res.write("<p>No such view file: home.haml</p>");
			res.end();
		}
		else
		{
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.write(haml.render(data, {}));
			res.end();
		}
	});
}