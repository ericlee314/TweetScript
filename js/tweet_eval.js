var tweeteval = function(tweet) 
{  
    var body = tweet.body;
    var children = tweet.children
        
    if body[0] === ">"
    {
        tweeteval_child(body);
    }  
    
    else
    {
        master_functions.push({key: body, value: children})
    }
}

var tweeteval_child = function(body)
{
    functions = FUNCTION;
    body.shift();
    for (var i = 0, i < body.length, i++)
    {
        functions = functions.filter(function(f);
        {        
            if (typeof body[i] === 'string')
            {
                return body[i] === f[i]
            }
            else
            {
                return f[i][0] === "#";
            }
        });  
    }
    if (functions.length > 0)
    {
        return functions[0];
    }
}
    
    
    
    
    