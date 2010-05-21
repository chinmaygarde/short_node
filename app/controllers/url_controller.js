var fs = require('fs');
var kiwi = require('kiwi');
var haml = kiwi.require('haml');

var url_controller = exports;

url_controller.handleRequest = function(req, res)
{
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.write("Todo");
	res.end();
	
};