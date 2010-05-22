var fs = require('fs');
var sys = require('sys');
var url = require('url');
var kiwi = require('kiwi');
var haml = kiwi.require('haml');
var mapper = require('../models/url_mapper');

var url_controller = exports;

url_controller.handleRequest = function(req, res)
{
	query = url.parse(req.url, true).query;
	if(query['long_url'])
	{
		mapper.setShortUrl(mapper.createShortCode(), query['long_url'],
			function(code, value){
				res.writeHead(200, {'Content-Type' : 'text/html'});
				res.write(code);
				res.end();
			},
			function(error){
				//TODO: Choose a more appropriate error code
				res.writeHead(404, {'Content-Type' : 'text/html'});
				res.write("An error occurred: " + value);
				res.end();
				
			}
		);
	}
	else
	{
		//TODO: Choose a more appropriate error code
		res.writeHead(404, {'Content-Type' : 'text/html'});
		res.write("Request could not be completed");
		res.end();
	}
};