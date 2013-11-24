var tweeteval = function(tweet) 
{  
    var variables = [];
    var function_name = ""
    var body = tweet.body;
    var children = tweet.children
        
    if first === ">"
    {
        tweeteval_chid(body);
    }  
    
    else
    {
        master_functions.push({key: body, value: children})
    }
}

var tweeteval_child = function(tweet)
{
    var body = tweet.body;
    return built_in_functions(body);
}
    
    
    
    
    