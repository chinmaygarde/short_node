var fs = require('fs');
var sys = require('sys');
var url = require('url');
var kiwi = require('kiwi');
var haml = kiwi.require('haml');
var mapper = require('../models/url_mapper');

var url_controller = exports;

url_controller.handleGetRequest = function(req, res)
{
	mapper.getLongUrl(url.parse(req.url).pathname.replace('/',''), 
		function(longUrl){
			res.writeHead(303, {'Location' : longUrl});
			res.end();	
		},
		function(data){
			res.writeHead(404, {'Content-Type' : 'text/html'});
			res.write("Request could not be completed: " + data);
			res.end();
		}
	);
}

url_controller.handleCreateRequest = function(req, res)
{
	query = url.parse(req.url, true).query;
	try
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
	catch(err)
	{
		//TODO: Choose a more appropriate error code
		res.writeHead(404, {'Content-Type' : 'text/html'});
		res.write("Request could not be completed" + err);
		res.end();		
	}
};