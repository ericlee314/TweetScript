function read_tweet(text) {
	var string = text; //"> If (#stanfurd is (print 5) 0) (Return 1)";
	// When we input this into tweet_read:
	//"> If (#stanfurd is 0) (Return 1)"
	//We will output:
	//[">", "If", ["#stanfurd", "is", 0], ["Return", 1]]
	//---------------------------------------------------------
	var tokenize = function(tweet) {
	        tweet = tweet.toLowerCase().replace(/[(]/g, " ( ", "gi");
	    tweet = tweet.replace(/[)]/g, " ) ", "gi");
	    var list = tweet.split(" ");
	    for(var i = list.length - 1; i >= 0; i--) {
	        if(list[i] === "") {
	            list.splice(i, 1);
	        }
	        if(is_number(list[i])) {
	            list[i] = Number(list[i]);
	        }
	    }
	    return list;
	};
	//console.log(tokenize(string));
	//[ '>', 'if', '(', '#stanfurd', 'is', 0, ')', '(', 'return', 1, ')' ]
	var is_number = function(token) {
	    return !isNaN(token);
	}

	var number_of_parens =  0;

	var paren_destroyer = function(number, tokenarr)
	{
	    for (var counter = 0; counter < number; counter++)
	    {
	        while(tokenarr[0] !== ")")
	        {
	            if (tokenarr.length === 0)
	            {
	                break;
	            }
	            tokenarr.shift();
	        }
	        tokenarr.shift();
	    }
	    return tokenarr;
	}
  

	var tweetread = function(tokens, arr)
	{
	    if (tokens.length === 0)
	    {
	        return arr;
	    }
	    if (tokens[0] === "(")
	    {
	        arr.push(readtail(tokens.slice(1)));
	        parens = number_of_parens + 1
	        number_of_parens++
	        tokens = paren_destroyer(parens, tokens);
	        tweetread(tokens, arr);
	        return arr;
	    }
	    if (tokens[0] === ")")
	    {
	        tokens.shift
	        return arr;
	    }
	    else
	    {
	        arr.push(tokens[0]);
	        return tweetread(tokens.slice(1), arr);
	    }
	};

	var readtail = function(tokens)
	{
	    if (tokens.length === 0)
	    {
	        return;
	    }
	    return tweetread(tokens, []);    
	};

	//console.log(tokenize(string));
	//console.log(tweetread(tokenize(string), []));
	return tweetread(tokenize(string), []);
}