var sys = require('sys');
var kiwi = require('kiwi');
var db = kiwi.require('redis-client').createClient();

var mapper = exports;

var hashName = 'urls';

mapper.setShortUrl = function(code, longUrl)
{
	db.hset(hashName, code, longUrl, function(err, newValue){
		if(err)
		{
			sys.puts(err);
		}
	});
};

mapper.getLongUrl = function(code)
{
	db.hget(hashName, code, function(err, newValue){
		if(err)
		{
			sys.puts(err);
		}
	});
};

mapper.incrementCount = function()
{
	db.incr('count', function(err, newValue){
		if(err)
		{
			sys.puts(err);
		}
	});	
};
