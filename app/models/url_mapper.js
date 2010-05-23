var sys = require('sys');
var kiwi = require('kiwi');
var db = kiwi.require('redis-client').createClient();

var mapper = exports;

var totalCount = 'count';

var countHashName = 'url_count';
var urlHashName = 'url';

// Thanks StackOverflow
mapper.createShortCode = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

mapper.setShortUrl = function(code, longUrl, success, failure)
{
	db.hset(urlHashName, code, longUrl, function(err, newValue){
		if(err)
		{
			failure(err);
		}
		else
		{
			mapper.incrementCount();
			success(code, newValue);
		}
	});
};

mapper.getLongUrl = function(code, success, failure)
{
	db.hget(urlHashName, code, function(err, newValue){
		if(err)
		{
			failure(err);
		}
		else
		{
			if(newValue)
			{
				success(newValue);				
			}
			else
			{
				failure("No such value");
			}
		}
	});
};

mapper.incrementCount = function()
{
	db.incr(totalCount, function(err, newValue){
		if(err)
		{
			sys.puts(err);
		}
	});	
};
