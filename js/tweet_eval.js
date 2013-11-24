var tweeteval = function(tweet) 
{  
    var variables = [];
    var function_name = ""
    var body = tweet.body;
    var children = tweet.children
        
    if first === ">"
    {
        tweeteval_child(body);
    }  
    
    else
    {
        master_functions.push({key: body, value: children})
    }
}

var tweeteval_child = function(tweet)
{
    if (tweet.body.length === 0)
    {
        return;
    }
    var first = tweet.body.shift()
    if (typeof first !== 'string')
    {
        return tweeteval_child(first)
    }
    else if (first in built_in_functions)
    {
        return built_in_functions[first](tweeteval_child(tweet.body))
    }
    else
    {
        return first.concat(tweeteval_child(tweet.body))
    }
}
    
    
    
    
    